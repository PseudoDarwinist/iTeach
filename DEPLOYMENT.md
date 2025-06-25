# Cloudflare Pages Deployment Guide

## Prerequisites
- GitHub repository with your code
- Cloudflare account (free tier)

## Step 1: Prepare for Deployment

### Build the project locally to test:
```bash
npm run build
npm run preview
```

### Commit all changes:
```bash
git add .
git commit -m "feat: prepare for Cloudflare deployment with security improvements"
git push origin master
```

## Step 2: Cloudflare Pages Setup

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Sign up/login with your account

2. **Create New Pages Project**
   - Click "Pages" in the sidebar
   - Click "Create a project"
   - Choose "Connect to Git"

3. **Connect GitHub Repository**
   - Authorize Cloudflare to access your GitHub
   - Select your repository: `AI_Project/iTeach`

4. **Configure Build Settings**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   ```

5. **Environment Variables**
   In Cloudflare dashboard, add these environment variables:
   ```
   VITE_UPI_ID = 8130071804@sbi
   VITE_LINKEDIN_URL = https://www.linkedin.com/in/chetan-singh-484407b5/
   VITE_TWITTER_URL = https://x.com/hItLeRsInGs
   ```

6. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete (~2-3 minutes)

## Step 3: Custom Domain (Optional)

1. **Add Custom Domain**
   - In Pages project settings, go to "Custom domains"
   - Add your domain (e.g., ai-school.com)
   - Follow DNS configuration instructions

2. **SSL/TLS Settings**
   - Go to SSL/TLS > Overview
   - Set encryption mode to "Full (strict)"

## Step 4: Performance Optimizations

### Enable Additional Cloudflare Features:
1. **Caching**
   - Go to Caching > Configuration
   - Enable "Always Online"
   - Set Browser Cache TTL to 4 hours

2. **Speed**
   - Go to Speed > Optimization
   - Enable "Auto Minify" for HTML, CSS, JS
   - Enable "Brotli" compression

3. **Security**
   - Go to Security > Settings
   - Set Security Level to "Medium"
   - Enable "Challenge Passage" for 24 hours

## Step 5: Monitoring Setup

1. **Analytics**
   - Enable Web Analytics in Pages project
   - Add analytics snippet if needed

2. **Performance Monitoring**
   - Monitor Core Web Vitals
   - Set up alerts for downtime

## Security Checklist ✅

- [x] Environment variables configured
- [x] Security headers added (_headers file)
- [x] External links secured with noopener,noreferrer
- [x] HTTPS enforced by Cloudflare
- [x] XSS protection enabled
- [x] Content Security Policy configured

## Free Tier Limits

Cloudflare Pages Free Tier includes:
- ✅ Unlimited sites
- ✅ Unlimited requests
- ✅ 500 builds per month
- ✅ 1 build at a time
- ✅ 20,000 files per deployment
- ✅ 25 MB max file size

Perfect for your AI.School website!

## Useful Commands

```bash
# Local development
npm run dev

# Build and preview
npm run build
npm run preview

# Deploy (automatic via git push)
git push origin master
```

## Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Check build logs in Cloudflare dashboard

### Environment Variables Not Working
- Restart build after adding env vars
- Ensure variables start with VITE_
- Check variable names match exactly

### Performance Issues
- Enable Cloudflare optimizations
- Optimize images and assets
- Use Cloudflare's CDN features

## Next Steps

1. Set up custom domain
2. Configure analytics
3. Set up error monitoring
4. Implement backend API for payment verification
5. Add form validation and security improvements