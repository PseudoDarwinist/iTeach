# Claude Code Best Practices for iTeach Project

This document outlines missing Claude Code best practices that could improve our development workflow and collaboration efficiency.

## 📁 Project Configuration

### Missing Files & Configurations

#### `.claudeignore`
```
# Dependencies
node_modules/
*.log
.git/

# Build outputs
dist/
build/
*.min.js
*.min.css

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
```

#### Enhanced `.claude/settings.local.json`
```json
{
  "permissions": {
    "allow": [
      "Bash(cp:*)", 
      "Write(*)", 
      "Edit(*)",
      "Bash(npm:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Bash(rm:*)", 
      "Bash(sudo:*)",
      "Bash(curl:*)"
    ]
  },
  "context": {
    "include": [
      "CLAUDE.md", 
      "IMPROVEMENTS.md", 
      "package.json",
      "README.md"
    ],
    "exclude": [
      "node_modules", 
      "*.log", 
      ".git",
      "dist",
      "build"
    ]
  },
  "preferences": {
    "code_style": "modern_js",
    "max_file_size": "2000_lines",
    "response_format": "concise"
  }
}
```

#### Missing Context Files
- [ ] `.claude/context/domain-knowledge.md` - Educational platform terminology
- [ ] `.claude/context/user-personas.md` - Target audience definitions
- [ ] `.claude/context/business-rules.md` - Pricing, enrollment logic

## 🎯 Workflow Optimization

### Missing Command Templates

#### `.claude/command/feature.md`
```markdown
# Feature Development Workflow

## Steps:
1. Create GitHub issue using issues.md
2. Create sandbox branch: `git-ai-sandbox`
3. Implement with patch markers (≤40 lines)
4. Test manually in browser
5. Update CLAUDE.md with new context
6. Cherry-pick to feature branch
7. Create PR with feature template

## Checklist:
- [ ] Responsive design tested
- [ ] Cross-browser compatibility
- [ ] Accessibility basics
- [ ] Performance impact minimal
```

#### `.claude/command/deploy.md`
```markdown
# Deployment Workflow

## Pre-deployment:
- [ ] All tests pass
- [ ] Performance audit complete
- [ ] Cross-browser testing done
- [ ] Accessibility review passed

## Deployment Steps:
1. Build production assets
2. Optimize images
3. Update CDN cache
4. Deploy to staging
5. Smoke test staging
6. Deploy to production
7. Monitor for issues

## Rollback:
- Keep previous version ready
- Document rollback procedure
- Test rollback in staging first
```

#### `.claude/command/debug.md`
```markdown
# Common Debugging Procedures

## CSS Issues:
1. Check browser dev tools
2. Verify CSS specificity
3. Test mobile breakpoints
4. Validate CSS syntax

## JavaScript Issues:
1. Check console errors
2. Verify event listeners
3. Test across browsers
4. Check mobile touch events

## Performance Issues:
1. Run Lighthouse audit
2. Check image optimization
3. Verify CSS/JS minification
4. Test on slow connection
```

#### `.claude/command/test.md`
```markdown
# Testing Procedures

## Manual Testing:
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (iOS Safari, Android Chrome)
- [ ] Tablet breakpoints
- [ ] Accessibility tools (screen reader, keyboard nav)

## Performance Testing:
- [ ] Lighthouse score >90
- [ ] Core Web Vitals green
- [ ] Image optimization verified
- [ ] Load time <3 seconds

## Functional Testing:
- [ ] Navigation works
- [ ] Carousel functionality
- [ ] Form submissions
- [ ] Responsive design
```

#### `.claude/command/refactor.md`
```markdown
# Code Cleanup Workflows

## CSS Refactoring:
1. Identify duplicate styles
2. Extract common patterns
3. Optimize selectors
4. Remove unused CSS
5. Organize by components

## JavaScript Refactoring:
1. Extract reusable functions
2. Improve error handling
3. Add input validation
4. Optimize performance
5. Add documentation

## HTML Refactoring:
1. Improve semantic structure
2. Add ARIA labels
3. Optimize for SEO
4. Clean up unused elements
```

## 💬 Communication Patterns

### Missing Prompt Engineering

#### Project-Specific Prompts
```markdown
# Standard Prompts for iTeach

## New Feature Prompt:
"You're working on the iTeach educational platform. Follow our git workflow with sandbox branches and patch markers. Keep changes minimal and focused. Always consider mobile-first responsive design and accessibility."

## Code Review Prompt:
"Review this code for the iTeach project. Check for: responsive design, accessibility, performance impact, consistency with existing patterns, and educational platform best practices."

## Bug Fix Prompt:
"Fix this issue on iTeach platform. Use sandbox branch workflow, keep changes minimal, test across devices, and update CLAUDE.md with any new insights."
```

#### Context Primers
```markdown
# When working on iTeach, always remember:

## Design Principles:
- Mobile-first responsive design
- Glassmorphism aesthetic with backdrop blur
- Smooth animations and hover effects
- Educational content focus

## Technical Constraints:
- Static HTML/CSS/JS (no build system currently)
- Keep CSS organized and maintainable
- Optimize for performance
- Cross-browser compatibility

## Business Context:
- Educational platform for AI development
- Target audience: aspiring developers
- Pricing strategy: promotional discounts
- Course-focused content structure
```

## 🔄 Session Management

### Missing Session Continuity

#### CLAUDE.md Update Templates
```markdown
## Session Summary Template:
- **Date**: [DATE]
- **Tasks Completed**: [LIST]
- **Decisions Made**: [ARCHITECTURAL/DESIGN CHOICES]
- **Context Added**: [NEW INSIGHTS]
- **Next Steps**: [TODO ITEMS]
- **Issues Encountered**: [PROBLEMS AND SOLUTIONS]
```

#### Decision Logging
```markdown
## Decision Records:
- **DR-001**: Chose static HTML over React for simplicity
- **DR-002**: Used single CSS file for easier maintenance
- **DR-003**: Implemented carousel with vanilla JS
- **DR-004**: Chose glassmorphism design for modern appeal
```

## 📋 Task Management Integration

### Missing TodoWrite Patterns

#### Task Templates
```markdown
## Feature Development Tasks:
1. Research and planning
2. Design mockups/wireframes
3. HTML structure implementation
4. CSS styling and responsiveness
5. JavaScript functionality
6. Testing and debugging
7. Documentation updates

## Bug Fix Tasks:
1. Reproduce issue
2. Identify root cause
3. Implement fix
4. Test fix across browsers
5. Update documentation
6. Deploy to staging
```

#### Priority Classification
- 🔥 **Critical**: Blocking users, security issues
- 🔶 **High**: Core functionality, performance
- 🔵 **Medium**: Enhancements, minor bugs
- 🟢 **Low**: Nice-to-have features, cleanup

## 🧠 Context Optimization

### Missing Knowledge Management

#### Domain Glossary
- **MVP**: Minimum Viable Product
- **Glassmorphism**: Design trend with translucent elements
- **Responsive Design**: Adapts to different screen sizes
- **Carousel**: Rotating content display
- **Widget Layout**: Modular component arrangement

#### Performance Baselines
- **Load Time**: <3 seconds
- **Lighthouse Score**: >90
- **Core Web Vitals**: All green
- **Image Optimization**: WebP format, <500KB
- **CSS Size**: <100KB minified

## 🔍 Code Analysis Helpers

### Missing Analysis Tools

#### Code Quality Checklist
- [ ] Semantic HTML structure
- [ ] Accessible markup (ARIA labels)
- [ ] Responsive design implementation
- [ ] Performance optimization
- [ ] Cross-browser compatibility
- [ ] SEO best practices
- [ ] Security considerations

#### Performance Review Template
```markdown
## Performance Audit:
- [ ] Image optimization
- [ ] CSS/JS minification
- [ ] Critical path optimization
- [ ] Lazy loading implementation
- [ ] Caching strategies
- [ ] Bundle size analysis
```

## 🚀 Implementation Priority

### Phase 1 (Immediate):
- [ ] Create `.claudeignore`
- [ ] Enhance `.claude/settings.local.json`
- [ ] Create `.claude/command/feature.md`
- [ ] Update CLAUDE.md with session templates

### Phase 2 (Short-term):
- [ ] Create debugging and testing command files
- [ ] Add project-specific prompts
- [ ] Implement decision logging
- [ ] Create domain glossary

### Phase 3 (Long-term):
- [ ] Advanced workflow automation
- [ ] Performance monitoring integration
- [ ] Comprehensive testing procedures
- [ ] Documentation automation

---

**Note**: These practices should be implemented gradually to avoid overwhelming the development process. Start with the most impactful ones first.