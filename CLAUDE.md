# AI.School - Educational Platform

## Project Overview
AI.School is an educational platform focused on AI development courses. Built with React 18 + Vite, featuring interactive course cards, glassmorphism UI, and UPI payment integration.

## Tech Stack
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Routing**: React Router v6
- **3D Effects**: React Three Fiber + Three.js
- **Deployment**: Cloudflare Pages

## Quick Start
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
```

## Project Structure
```
/
├── src/
│   ├── App.jsx                    # Main app with routes
│   ├── main.jsx                   # React entry point
│   ├── components/
│   │   ├── effects/
│   │   │   └── Dither.jsx         # WebGL dithered background effect
│   │   ├── layout/
│   │   │   ├── Layout.jsx         # App wrapper
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── Hero.jsx           # Hero section
│   │   ├── profile/
│   │   │   ├── ProfileCard.jsx    # Holographic profile card
│   │   │   ├── CredentialsCard.jsx
│   │   │   ├── StackedProfileCards.jsx
│   │   │   └── ContactModal.jsx
│   │   └── ui/
│   │       └── ShinyText.jsx      # Animated text effect
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with hero + ProfileCard
│   │   ├── CoursesPage.jsx        # Interactive stacked course cards
│   │   └── PaymentPage.jsx        # UPI/Bank payment page
│   └── styles/
│       ├── globals.css            # Global styles
│       └── App.css                # App-specific styles
├── public/                        # Static assets
├── dist/                          # Production build output
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── wrangler.toml                  # Cloudflare Pages config
└── styles.css                     # Legacy styles (1100+ lines)
```

## Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Landing page with hero, pricing, ProfileCard |
| `/courses` | CoursesPage | Interactive stacked course cards |
| `/payment/:courseId` | PaymentPage | Course-specific payment page |

## Current Courses
| Course ID | Title | Price |
|-----------|-------|-------|
| `prototyping-designing` | Prototyping & Designing with AI | ₹3,999 |
| `deep-learning` | Deep Learning | ₹5,999 |
| `ai-coders` | First-Time AI-Coders | ₹3,999 |
| `zero-one` | Zero → One | ₹4,999 |
| `claude-code` | Master Claude Code | ₹2,999 |
| `ai-engineering-workflow` | AI-Powered Engineering | ₹5,999 |
| `master-mcp` | Master MCP | ₹4,999 |
| `ai-agents` | AI Agents | ₹4,999 |

## Key Features

### Stacked Cards Animation
- Cards start stacked and explode into grid on click
- Located in `CoursesPage.jsx` with CSS animations in `globals.css`
- Doodle-style annotation guides users to click

### Dither Background Effect
- WebGL shader-based animated background
- React Three Fiber implementation in `Dither.jsx`
- Mouse-interactive waves with customizable parameters

### Payment System
- UPI QR code payment (primary)
- Manual UPI ID copy
- Course-specific routing via `/payment/:courseId`
- Environment variable for UPI ID: `VITE_UPI_ID`

### ProfileCard
- Holographic card effect with mouse tracking
- Multiple gradient layers and animations
- Located in `src/components/profile/ProfileCard.jsx`

## Design System

### Colors
- Primary: `#4f46e5` (indigo)
- Success: `#059669` (green)
- Background: `#f8f9fa` (light gray)
- Text: `#333`, `#1a1a1a`

### Typography
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- Hero titles: `3.5rem`, weight `700`
- Section titles: `1.5-3.2rem`
- Body: `1rem`, line-height `1.6`

### Component Patterns
- **Cards**: Glassmorphism with `backdrop-filter: blur()`
- **Widgets**: Size variants - `large`, `medium`, `small`
- **Buttons**: `mic-glow-button` with `liquid-glass-text`
- **Backgrounds**: Custom CSS classes like `design-bg`, `ai-bg`, `claude-bg`

## Adding a New Course

1. **Add card to CoursesPage.jsx**:
```jsx
<div className="widget-card medium image-background your-course-bg">
  <div className="widget-overlay"></div>
  <div className="widget-content-overlay">
    <p className="widget-category">Course</p>
    <h3 className="widget-title-overlay">Course Title</h3>
    <p className="widget-subtitle-overlay">Course subtitle</p>
  </div>
  <div className="widget-footer-overlay">
    <div className="widget-price">₹X,XXX</div>
    <Link to="/payment/course-id" className="mic-glow-button">
      <span className="liquid-glass-text">Enroll</span>
    </Link>
  </div>
</div>
```

2. **Add course data to PaymentPage.jsx** in the `courseData` object:
```jsx
'course-id': {
  title: 'Course Title',
  price: '₹X,XXX',
  originalPrice: '₹X,XXX',
  description: 'Course description'
}
```

3. **Add background CSS** in `globals.css` or `styles.css`:
```css
.your-course-bg {
  background: url('/your-image.png') center/cover;
}
```

## Environment Variables
```bash
VITE_UPI_ID=your-upi-id@bank    # UPI ID for payments
```

## Deployment
- **Platform**: Cloudflare Pages
- **Config**: `wrangler.toml`
- **Build command**: `npm run build`
- **Output directory**: `dist`

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS Grid, Flexbox, backdrop-filter
- WebGL required for Dither effect

## Performance Notes
- CSS animations use `transform`/`opacity` for GPU acceleration
- Three.js components lazy-load where possible
- Images should be optimized before adding to project
