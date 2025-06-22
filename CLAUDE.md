# iTeach Project Context

## Project Overview
Educational platform focused on AI development courses. **Migrated from static HTML to React.js** for enhanced component architecture and ProfileCard functionality.

## Architecture v2.0 (React Migration - COMPLETED ✅)
- **React 18 + Vite** - Modern build system with fast hot-reload
- **Component-based architecture** with proper state management
- **React Router v6** - Client-side routing between pages
- **Original ProfileCard** - Fully functional with holographic effects
- **Main Components**:
  - `HomePage.jsx` - Landing page with hero, pricing, and ProfileCard
  - `CoursesPage.jsx` - Interactive stacked cards with explosion animation
  - `Layout.jsx` - Navigation wrapper with active route highlighting
- **Responsive design** preserved from original with glassmorphism effects
- **CSS preserved** - All existing styles maintained in globals.css

## Legacy Architecture (Preserved for Reference)
- **Static HTML/CSS/JS** - Original implementation in root directory
- **3 main pages**:
  - `index.html` - Landing page with hero section and pricing
  - `courses.html` - Carousel-based course browser
  - `courses2.html` - Widget-style course layout

## Key Features
- Hero sections with background images
- Interactive course carousel with navigation controls
- Widget-based layout system for courses
- Pricing cards with promotional pricing
- Mobile-responsive grid layouts
- CSS animations (mercury pulse, card glow, liquid glass effects)

## File Structure
```
/
├── index.html          # Main landing page
├── courses.html        # Carousel courses page
├── courses2.html       # Widget courses page
├── styles.css          # All styles (1100+ lines)
├── carousel.js         # Carousel functionality
├── *.png, *.jpg        # Course images and backgrounds
└── .claude/            # Project configuration
```

## Commands
### Development (React)
```bash
npm run dev          # Start Vite dev server (http://localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
```

### Legacy Development
```bash
# Static files - open directly in browser
open index.html
# Or use a simple server
python -m http.server 8000
```

### Testing
- **React Testing** - Component testing with fast refresh
- **Manual testing** - Open in different browsers/devices  
- **Responsive testing** - Check mobile breakpoints at 968px, 640px, 480px
- **Interactive testing** - ProfileCard holographic effects, stacked cards animation

## Design System
### Colors
- Primary: `#4f46e5` (indigo)
- Success: `#059669` (green) 
- Background: `#f8f9fa` (light gray)
- Text: `#333`, `#1a1a1a` (dark)

### Typography
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- Hero titles: `3.5rem`, weight `700`
- Section titles: `1.5-3.2rem`
- Body text: `1rem`, line-height `1.6`

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Rounded corners, hover transforms
- **Navigation**: Fixed position, semi-transparent
- **Widgets**: Grid-based with size variants (large, medium, small)

## Course Content
1. **Prototyping and Designing with AI** - Visual design course
2. **Zero → One** - Idea to app development
3. **First-Time AI-Coders** - Beginner-friendly AI programming

## Pricing Strategy
- Original prices: ₹6999-₹8999
- Current prices: ₹3999-₹4999 (promotional)
- Lifetime access model

## Development Notes
- Uses CSS Grid and Flexbox for layouts
- Extensive use of CSS custom properties for theming
- JavaScript only for carousel functionality
- Images optimized for web (course thumbnails, hero backgrounds)
- SEO-friendly semantic HTML structure

## React Migration Session (2025-06-21) 
### Migration Completed ✅:
- ✅ **React 18 + Vite Setup**: Modern development environment with hot-reload
- ✅ **Component Architecture**: Modular components in organized structure
- ✅ **Original ProfileCard**: Fully functional with all holographic effects restored
- ✅ **React Router**: Navigation between HomePage and CoursesPage
- ✅ **State Management**: Stacked cards animation with proper React state
- ✅ **CSS Preservation**: All existing styles maintained and working
- ✅ **Asset Migration**: Profile images and course assets properly referenced

### Technical Implementation:
- **Framework**: React 18.3.1 with Vite 6.0.5 build tool
- **Routing**: React Router v6 for client-side navigation  
- **Components**: 
  - `Layout/Navbar.jsx` - Navigation with active route highlighting
  - `ProfileCard.jsx` - Original React component with full effects
  - `HomePage.jsx` - Complete landing page with ProfileCard integration
  - `CoursesPage.jsx` - Stacked cards with explosion animation
- **Performance**: Fast development server, optimized builds
- **Migration Strategy**: Preserved all functionality while modernizing architecture

### Resolved Issues:
- ✅ **ProfileCard Colors**: Holographic effects now work perfectly in React
- ✅ **Component State**: Proper event handling and animations  
- ✅ **Build System**: Modern tooling with instant feedback
- ✅ **Code Organization**: Maintainable component structure

## Previous Session Summary (2025-06-19)
### Completed Features:
- ✅ **Stacked Cards Animation**: Interactive course cards that start stacked and animate to grid on click
- ✅ **Playful Annotation**: Doodle-style arrow and text guide users to click the stack
- ✅ **Navigation Cleanup**: Removed old courses tab, renamed "Courses 2" to "Courses"
- ✅ **GitHub Workflow**: Set up proper issues.md workflow and created issue #2
- ✅ **MCP Integration**: Configured local (filesystem) and remote (Linear) MCP servers

### Technical Implementation:
- **Files Modified**: courses2.html, styles.css, stacked-cards.js, index.html
- **CSS**: ~80 lines of stacked card animations with staggered delays
- **JavaScript**: Click handling and one-time explosion animation
- **Design**: Coral/orange gradient colors, bouncy animations, glassmorphism

### Current Status:
- ✅ Feature branch: `feature/stacked-cards-animation` 
- ✅ GitHub issue: https://github.com/PseudoDarwinist/iTeach/issues/2
- ⏳ Ready for merge after MCP testing
- ⏳ MCP servers configured, need Claude Code restart to activate

### Next Steps:
1. Restart Claude Code to activate MCP servers
2. Test Linear integration for project management
3. Create PR for stacked cards feature
4. Continue with next educational platform features

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Backdrop-filter support for glassmorphism effects

## Performance Considerations
- Static assets only - fast loading
- Optimized images for course thumbnails
- CSS animations use transform/opacity for GPU acceleration
- Minimal JavaScript footprint