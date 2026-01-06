import { test, expect } from '@playwright/test';

// Performance thresholds
const THRESHOLDS = {
  LCP: 2500,      // Largest Contentful Paint (ms) - should be < 2.5s
  FCP: 1800,      // First Contentful Paint (ms) - should be < 1.8s
  TBT: 200,       // Total Blocking Time (ms) - should be < 200ms
  CLS: 0.1,       // Cumulative Layout Shift - should be < 0.1
  TTI: 3800,      // Time to Interactive (ms) - should be < 3.8s
  pageLoadTime: 3000, // Total page load (ms)
  bundleSize: 500000, // Max JS bundle size (bytes) - 500KB target
};

test.describe('Performance Benchmarks', () => {

  test('Homepage - Core Web Vitals', async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();

    // Navigate to homepage
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    console.log(`Page Load Time: ${loadTime}ms`);

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');

      const fcp = paint.find(p => p.name === 'first-contentful-paint');

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive,
        firstContentfulPaint: fcp ? fcp.startTime : null,
        transferSize: navigation.transferSize,
        encodedBodySize: navigation.encodedBodySize,
        decodedBodySize: navigation.decodedBodySize,
      };
    });

    console.log('Performance Metrics:', JSON.stringify(performanceMetrics, null, 2));

    // Verify critical content is visible
    await expect(page.locator('h1')).toBeVisible();

    // Check load time threshold
    expect(loadTime).toBeLessThan(THRESHOLDS.pageLoadTime);
  });

  test('Homepage - Resource Loading Analysis', async ({ page }) => {
    const resourceTimings = [];

    // Listen for all requests
    page.on('response', async (response) => {
      const url = response.url();
      const timing = response.timing();

      if (url.includes('.js') || url.includes('.css')) {
        const headers = await response.headers();
        resourceTimings.push({
          url: url.split('/').pop(),
          status: response.status(),
          size: headers['content-length'] || 'unknown',
          contentType: headers['content-type'],
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('Resource Timings:', JSON.stringify(resourceTimings, null, 2));

    // Calculate total JS size
    const jsResources = resourceTimings.filter(r => r.url?.endsWith('.js'));
    console.log(`Total JS Resources: ${jsResources.length}`);
  });

  test('Courses Page - Load Performance', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/courses');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    console.log(`Courses Page Load Time: ${loadTime}ms`);

    // Verify course cards are visible
    await expect(page.locator('.widget-card').first()).toBeVisible();

    expect(loadTime).toBeLessThan(THRESHOLDS.pageLoadTime);
  });

  test('Navigation Performance - SPA Routing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Measure SPA navigation time
    const startNav = Date.now();
    await page.click('a[href="/courses"]');
    await page.waitForLoadState('networkidle');
    const navTime = Date.now() - startNav;

    console.log(`SPA Navigation Time: ${navTime}ms`);

    // SPA navigation should be much faster than full page load
    expect(navTime).toBeLessThan(1000);
  });

  test('Memory Usage Analysis', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get JS heap size if available
    const memoryInfo = await page.evaluate(() => {
      if (performance.memory) {
        return {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        };
      }
      return null;
    });

    if (memoryInfo) {
      console.log('Memory Usage:', JSON.stringify({
        usedHeap: `${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        totalHeap: `${(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        heapLimit: `${(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      }, null, 2));
    }
  });

  test('Layout Stability - CLS Check', async ({ page }) => {
    await page.goto('/');

    // Wait a bit for any layout shifts
    await page.waitForTimeout(2000);

    const clsValue = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        });

        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(cls);
        }, 1000);
      });
    });

    console.log(`Cumulative Layout Shift: ${clsValue}`);
    expect(clsValue).toBeLessThan(THRESHOLDS.CLS);
  });

  test('Image Loading Performance', async ({ page }) => {
    const imageLoadTimes = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
        const headers = await response.headers();
        imageLoadTimes.push({
          url: url.split('/').pop(),
          size: headers['content-length'] || 'unknown',
          contentType: headers['content-type'],
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('Image Resources:', JSON.stringify(imageLoadTimes, null, 2));
  });

});

test.describe('Bundle Size Analysis', () => {

  test('Analyze JS Bundle Size', async ({ page }) => {
    const jsResources = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.js') && !url.includes('node_modules')) {
        try {
          const buffer = await response.body();
          jsResources.push({
            url: url.split('/').pop(),
            size: buffer.length,
            sizeKB: (buffer.length / 1024).toFixed(2),
          });
        } catch (e) {
          // Skip if we can't get the body
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalSize = jsResources.reduce((acc, r) => acc + r.size, 0);
    console.log('JS Bundle Analysis:', JSON.stringify({
      resources: jsResources,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
    }, null, 2));

    // Check against threshold
    expect(totalSize).toBeLessThan(THRESHOLDS.bundleSize);
  });

  test('Analyze CSS Bundle Size', async ({ page }) => {
    const cssResources = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.css')) {
        try {
          const buffer = await response.body();
          cssResources.push({
            url: url.split('/').pop(),
            size: buffer.length,
            sizeKB: (buffer.length / 1024).toFixed(2),
          });
        } catch (e) {
          // Skip if we can't get the body
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalSize = cssResources.reduce((acc, r) => acc + r.size, 0);
    console.log('CSS Bundle Analysis:', JSON.stringify({
      resources: cssResources,
      totalSizeKB: (totalSize / 1024).toFixed(2),
    }, null, 2));
  });

});
