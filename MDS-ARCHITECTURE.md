# Matrix Design System (MDS) Architecture

## Overview

The Matrix Design System (MDS) is a comprehensive CSS architecture that separates concerns into distinct layers, enabling maintainable, scalable, and testable design systems for Craft CMS projects.

## Core Architecture Principles

### 1. Separation of Concerns
- **Skeleton Layer**: Structural layout only (positioning, flexbox, grid, dimensions)
- **Style Layer**: Visual properties only (colors, typography, spacing, effects)
- **Theme Layer**: Brand-specific customizations and overrides

### 2. Token-Based Design System
- **Design Tokens**: Semantic variables for consistent design decisions
- **Component Tokens**: Contextual variables for specific UI components
- **Responsive Tokens**: Breakpoint-specific values for adaptive design

### 3. Layered CSS Architecture
```
@layer base, components, utilities;
```

## File Structure

```
assets/css/
├── app.css                           # Main entry point
├── mds/
│   ├── mds.tokens.css               # Core design tokens
│   ├── mds.variables.css            # MDS variable system
│   └── wireframe/
│       ├── wireframe.skeleton/      # Structural layout layer
│       │   ├── wireframe.skeleton.index.css
│       │   ├── wireframe.skeleton.utilities.css
│       │   ├── wireframe.skeleton.base.css
│       │   ├── wireframe.skeleton.buttons.css
│       │   ├── wireframe.skeleton.header.css
│       │   ├── wireframe.skeleton.navigation.css
│       │   ├── wireframe.skeleton.footer.css
│       │   ├── wireframe.skeleton.hero.css
│       │   ├── wireframe.skeleton.components.css
│       │   ├── wireframe.skeleton.search.css
│       │   └── wireframe.skeleton.pagination.css
│       └── wireframe.style/         # Visual styling layer
│           ├── wireframe.style.index.css
│           ├── wireframe.style.utilities.css
│           ├── wireframe.style.base.css
│           ├── wireframe.style.typography.css
│           ├── wireframe.style.buttons.css
│           ├── wireframe.style.header.css
│           ├── wireframe.style.navigation.css
│           ├── wireframe.style.footer.css
│           ├── wireframe.style.hero.css
│           ├── wireframe.style.components.css
│           ├── wireframe.style.search.css
│           └── wireframe.style.pagination.css
└── theme/
    ├── theme.index.css              # Theme entry point
    └── theme.variables.css          # Brand-specific overrides
```

## Layer Responsibilities

### Skeleton Layer (`wireframe.skeleton/`)
**Purpose**: Provides functional layout structure without visual styling.

**Contains**:
- Flexbox and CSS Grid layouts
- Positioning (`absolute`, `relative`, `fixed`)
- Dimensions (`width`, `height`, `max-width`)
- Transforms and transitions (structural)
- Visibility states (`hidden`, `visible`, `opacity`)
- Overflow and scrolling behavior
- Z-index stacking
- Pointer events and cursor states

**Example**:
```css
/* wireframe.skeleton.buttons.css */
.btn {
  @apply inline-flex items-center justify-center;
  @apply cursor-pointer;
  @apply transition-all duration-200;
}

.btn-primary {
  @apply relative;
}

.action-buttons {
  @apply flex flex-col gap-4;
  @apply md:flex-row md:items-center;
}
```

### Style Layer (`wireframe.style/`)
**Purpose**: Provides visual styling using MDS design tokens.

**Contains**:
- Colors (background, text, borders)
- Typography (font-size, font-weight, line-height)
- Spacing (padding, margins)
- Borders and shadows
- Visual transitions and animations
- All MDS design tokens

**Example**:
```css
/* wireframe.style.buttons.css */
.btn {
  padding: var(--mds-button-padding-y) var(--mds-button-padding-x);
  font-size: var(--mds-button-font-size);
  font-weight: var(--mds-button-font-weight);
  border-radius: var(--mds-button-border-radius);
  transition-duration: var(--mds-button-transition-duration);
}

.btn-primary {
  background-color: var(--mds-button-primary-background-color);
  color: var(--mds-button-primary-text-color);
  &:hover {
    background-color: var(--mds-button-primary-background-color-hover);
  }
}
```

### Theme Layer (`theme/`)
**Purpose**: Brand-specific customizations and overrides.

**Contains**:
- Brand color palette overrides
- Typography scale customizations
- Component-specific modifications
- Project-specific design decisions

## Design Token System

### Core Token Categories

#### 1. Color Tokens
```css
/* Primary palette */
--mds-color-primary-50: #eff6ff;
--mds-color-primary-500: #3b82f6;
--mds-color-primary-900: #1e3a8a;

/* Semantic colors */
--mds-text-primary: var(--mds-color-gray-900);
--mds-text-secondary: var(--mds-color-gray-600);
--mds-surface-primary: var(--mds-color-white);
--mds-surface-secondary: var(--mds-color-gray-50);
```

#### 2. Typography Tokens
```css
/* Font families */
--mds-font-family-sans: 'Inter', system-ui, sans-serif;
--mds-font-family-display: 'Poppins', var(--mds-font-family-sans);

/* Font sizes */
--mds-font-size-xs: 0.75rem;
--mds-font-size-sm: 0.875rem;
--mds-font-size-base: 1rem;
--mds-font-size-lg: 1.125rem;

/* Component-specific typography */
--mds-heading-h1-font-size: 2.25rem;
--mds-heading-h1-font-weight: 700;
--mds-button-font-size: 0.875rem;
--mds-button-font-weight: 500;
```

#### 3. Spacing Tokens
```css
/* Base spacing scale */
--mds-space-xs: 0.5rem;
--mds-space-sm: 1rem;
--mds-space-md: 1.5rem;
--mds-space-lg: 2rem;
--mds-space-xl: 3rem;

/* Component-specific spacing */
--mds-button-padding-x: 1rem;
--mds-button-padding-y: 0.5rem;
--padding-block-md: 2rem;
--padding-block-2xl: 4rem;
```

### Component Token Examples

#### Navigation Tokens
```css
/* Navigation typography */
--mds-nav-font-size: 0.875rem;
--mds-nav-font-weight: 500;
--mds-nav-level-2-font-size: 0.8125rem;

/* Navigation colors */
--mds-nav-text: var(--mds-text-primary);
--mds-nav-text-hover: var(--mds-color-primary-600);
--mds-nav-background: var(--mds-surface-primary);
--mds-nav-background-hover: var(--mds-color-gray-50);
```

#### Button Tokens
```css
/* Button sizing */
--mds-button-padding-x: 1rem;
--mds-button-padding-y: 0.5rem;
--mds-button-font-size: 0.875rem;
--mds-button-border-radius: 0.375rem;

/* Button colors */
--mds-button-primary-background-color: var(--mds-color-primary-500);
--mds-button-primary-text-color: var(--mds-color-white);
--mds-button-primary-background-color-hover: var(--mds-color-primary-600);
```

## Development Workflow

### For Human Developers

#### 1. Testing Layout Structure
```css
/* In app.css - comment out style layer to test skeleton */
@import './mds/wireframe/wireframe.skeleton/wireframe.skeleton.index.css';
/* @import './mds/wireframe/wireframe.style/wireframe.style.index.css'; */
```

#### 2. Adding New Components
1. **Create skeleton structure** in `wireframe.skeleton.components.css`
2. **Add visual styling** in `wireframe.style.components.css`
3. **Define component tokens** in `mds.variables.css`
4. **Test both layers** independently

#### 3. Customizing for Projects
1. **Override tokens** in `theme.variables.css`
2. **Add brand-specific styles** in theme layer
3. **Maintain separation** between structure and styling

### For AI Development Sessions

#### Key Architectural Rules
1. **NEVER mix skeleton and style properties** in the same file
2. **ALWAYS use MDS tokens** for visual properties in style layer
3. **MAINTAIN file naming conventions** exactly as shown
4. **PRESERVE @layer organization** (base, components, utilities)

#### Skeleton Layer Rules
- ✅ Layout properties: `flex`, `grid`, `position`, `width`, `height`
- ✅ Structural utilities: `overflow`, `visibility`, `z-index`
- ✅ Functional states: `cursor`, `pointer-events`
- ❌ NO visual properties: colors, fonts, spacing, shadows

#### Style Layer Rules
- ✅ Visual properties: `color`, `background-color`, `font-size`, `padding`
- ✅ MDS design tokens: `var(--mds-*)`
- ✅ Visual transitions: `transition`, `animation`
- ❌ NO structural properties: positioning, dimensions, layout

#### Token Usage Patterns
```css
/* CORRECT - Using MDS tokens in style layer */
.button {
  background-color: var(--mds-button-primary-background-color);
  font-size: var(--mds-button-font-size);
  padding: var(--mds-button-padding-y) var(--mds-button-padding-x);
}

/* INCORRECT - Hardcoded values */
.button {
  background-color: #3b82f6;
  font-size: 14px;
  padding: 8px 16px;
}
```

## Component Architecture

### Standard Component Pattern
Each component follows this structure:

#### 1. Skeleton Definition
```css
/* wireframe.skeleton.components.css */
.testimonial-card {
  @apply flex flex-col h-full;
  @apply cursor-default select-none;
}

.testimonial-content {
  @apply flex-1 flex flex-col justify-between;
  @apply gap-4;
}

.testimonial-nav-btn {
  @apply absolute top-1/2 -translate-y-1/2 z-10;
  @apply hidden md:flex md:items-center md:justify-center;
  @apply w-10 h-10 rounded-full;
}
```

#### 2. Style Definition
```css
/* wireframe.style.components.css */
.testimonial-card {
  @apply p-6;
  @apply bg-[var(--mds-testimonial-card-background-color)];
  @apply text-[var(--mds-testimonial-card-text-color)];
  @apply rounded-[var(--mds-testimonial-card-corner-radius)];
}

.testimonial-quote {
  font-size: var(--mds-testimonial-quote-font-size);
  font-weight: var(--mds-testimonial-quote-font-weight);
  @apply italic;
}

.testimonial-nav-btn {
  @apply bg-[var(--mds-testimonial-nav-btn-background-color)];
  @apply hover:bg-[var(--mds-testimonial-nav-btn-background-color-hover)];
  @apply shadow-md transition-all duration-200;
}
```

#### 3. Token Definition
```css
/* mds.variables.css */
/* Testimonial component tokens */
--mds-testimonial-card-background-color: var(--mds-surface-primary);
--mds-testimonial-card-text-color: var(--mds-text-primary);
--mds-testimonial-card-corner-radius: 0.5rem;
--mds-testimonial-quote-font-size: 1.125rem;
--mds-testimonial-quote-font-weight: 400;
--mds-testimonial-nav-btn-background-color: var(--mds-color-white);
--mds-testimonial-nav-btn-background-color-hover: var(--mds-color-gray-50);
```

## Import Structure

### Main Entry Point (`app.css`)
```css
@import 'tailwindcss';
@plugin "@tailwindcss/typography";

@import './mds/mds.tokens.css';
@import './mds/mds.variables.css';
@import './mds/wireframe/wireframe.skeleton/wireframe.skeleton.index.css';
@import './mds/wireframe/wireframe.style/wireframe.style.index.css';
@import './theme/theme.index.css';
```

### Skeleton Index (`wireframe.skeleton.index.css`)
```css
@import './wireframe.skeleton.utilities.css';
@import './wireframe.skeleton.base.css';
@import './wireframe.skeleton.buttons.css';
@import './wireframe.skeleton.header.css';
@import './wireframe.skeleton.navigation.css';
@import './wireframe.skeleton.footer.css';
@import './wireframe.skeleton.hero.css';
@import './wireframe.skeleton.components.css';
@import './wireframe.skeleton.search.css';
@import './wireframe.skeleton.pagination.css';
```

### Style Index (`wireframe.style.index.css`)
```css
@import './wireframe.style.utilities.css';
@import './wireframe.style.base.css';
@import './wireframe.style.typography.css';
@import './wireframe.style.buttons.css';
@import './wireframe.style.header.css';
@import './wireframe.style.navigation.css';
@import './wireframe.style.footer.css';
@import './wireframe.style.hero.css';
@import './wireframe.style.components.css';
@import './wireframe.style.search.css';
@import './wireframe.style.pagination.css';
```

## Testing and Validation

### Skeleton Testing
1. Comment out style layer import in `app.css`
2. Verify all layouts function correctly
3. Check responsive behavior
4. Ensure no visual styling is present

### Style Testing
1. Enable both skeleton and style layers
2. Verify MDS tokens are applied correctly
3. Test hover states and transitions
4. Validate color contrast and typography

### Integration Testing
1. Test with theme layer overrides
2. Verify component consistency
3. Check cross-browser compatibility
4. Validate accessibility standards

## Best Practices

### For Maintainability
1. **Always use MDS tokens** for visual properties
2. **Keep skeleton and style separation** strict
3. **Follow naming conventions** consistently
4. **Document component tokens** clearly

### For Scalability
1. **Create semantic token names** that describe purpose, not appearance
2. **Use component-specific tokens** for customization
3. **Maintain consistent file structure** across projects
4. **Version control token changes** carefully

### For Performance
1. **Minimize CSS custom property usage** in critical paths
2. **Use @layer directive** for proper cascade control
3. **Optimize token calculations** for runtime performance
4. **Consider build-time optimizations** for production

## Migration Guide

### From Monolithic CSS
1. **Audit existing styles** and categorize as skeleton vs style
2. **Extract design tokens** from hardcoded values
3. **Separate files** according to MDS structure
4. **Test incrementally** with skeleton-only testing
5. **Refactor components** to use MDS tokens

### From Other Design Systems
1. **Map existing tokens** to MDS token structure
2. **Preserve component APIs** where possible
3. **Migrate gradually** with hybrid approach
4. **Update documentation** and team processes
5. **Train team** on new architecture patterns

## Troubleshooting

### Common Issues

#### 1. Mixed Concerns
**Problem**: Layout properties in style layer or visual properties in skeleton layer
**Solution**: Review layer responsibilities and move properties to correct layer

#### 2. Token Conflicts
**Problem**: Inconsistent token naming or missing token definitions
**Solution**: Follow token naming conventions and ensure all tokens are defined in variables file

#### 3. Import Order
**Problem**: Styles not applying correctly due to import order
**Solution**: Maintain strict import order: tokens → variables → skeleton → style → theme

#### 4. Testing Failures
**Problem**: Broken layouts when testing skeleton-only
**Solution**: Ensure skeleton layer contains all necessary structural properties

## Future Enhancements

### Planned Features
1. **Automated token generation** from design tools
2. **Component documentation** with live examples
3. **Theme builder** for easy brand customization
4. **Performance monitoring** for CSS optimization
5. **Accessibility auditing** for compliance checking

### Extensibility
1. **Plugin system** for custom components
2. **Token transformation** for different output formats
3. **Build-time optimizations** for production
4. **IDE integrations** for better developer experience
5. **Visual regression testing** for design consistency

This architecture provides a robust foundation for scalable, maintainable design systems while maintaining clear separation of concerns and enabling efficient development workflows.