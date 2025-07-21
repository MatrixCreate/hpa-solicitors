# MDS AI Reference Guide

## Quick Architecture Summary

The Matrix Design System (MDS) separates CSS into two distinct layers:

- **Skeleton Layer**: Structure/layout only (no visual styling)
- **Style Layer**: Visual properties only (colors, typography, spacing)

## Critical Rules for AI Sessions

### 1. File Structure (DO NOT MODIFY)
```
assets/css/
├── mds/
│   ├── mds.tokens.css
│   ├── mds.variables.css
│   └── wireframe/
│       ├── wireframe.skeleton/
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
│       └── wireframe.style/
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
```

### 2. Skeleton Layer Rules

#### ✅ ALLOWED in skeleton files:
- Layout: `flex`, `grid`, `position`, `display`
- Dimensions: `width`, `height`, `max-width`, `min-width`
- Spacing structure: `gap`, `space-y`, `space-x` (for layout)
- Positioning: `absolute`, `relative`, `fixed`, `sticky`
- Transforms: `translate`, `rotate`, `scale`
- States: `opacity`, `visibility`, `pointer-events`
- Behavior: `overflow`, `scroll`, `cursor`
- Layering: `z-index`
- Responsive: `@apply md:flex`, `@apply lg:grid`

#### ❌ FORBIDDEN in skeleton files:
- Colors: `color`, `background-color`, `border-color`
- Typography: `font-size`, `font-weight`, `font-family`
- Spacing: `padding`, `margin` (except structural)
- Borders: `border-width`, `border-style`, `border-radius`
- Shadows: `box-shadow`, `drop-shadow`
- Visual transitions: `transition-colors`
- MDS tokens: `var(--mds-*)`

### 3. Style Layer Rules

#### ✅ ALLOWED in style files:
- Colors: `color`, `background-color`, `border-color`
- Typography: `font-size`, `font-weight`, `font-family`
- Spacing: `padding`, `margin`
- Borders: `border-width`, `border-style`, `border-radius`
- Shadows: `box-shadow`, `drop-shadow`, `text-shadow`
- Visual effects: `opacity` (for visual effects)
- Transitions: `transition`, `animation`
- MDS tokens: `var(--mds-*)` (REQUIRED for all visual properties)

#### ❌ FORBIDDEN in style files:
- Layout: `flex`, `grid`, `position`, `display`
- Dimensions: `width`, `height`, `max-width`
- Positioning: `absolute`, `relative`, `fixed`
- Transforms: `translate`, `rotate`, `scale`
- Behavioral properties: `overflow`, `scroll`, `cursor`
- Layering: `z-index`

### 4. MDS Token Usage (MANDATORY)

#### ALWAYS use MDS tokens in style layer:
```css
/* CORRECT */
.button {
  background-color: var(--mds-button-primary-background-color);
  font-size: var(--mds-button-font-size);
  padding: var(--mds-button-padding-y) var(--mds-button-padding-x);
  border-radius: var(--mds-button-border-radius);
}

/* INCORRECT - Never hardcode values */
.button {
  background-color: #3b82f6;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
}
```

#### Common MDS Token Categories:
- **Colors**: `--mds-color-primary-500`, `--mds-text-primary`, `--mds-surface-primary`
- **Typography**: `--mds-font-size-base`, `--mds-font-weight-medium`, `--mds-heading-h1-font-size`
- **Spacing**: `--mds-space-md`, `--padding-block-md`, `--mds-button-padding-x`
- **Component-specific**: `--mds-nav-font-size`, `--mds-testimonial-card-background-color`

### 5. File Header Comments (REQUIRED)

#### Skeleton files must start with:
```css
/* [Component Name] - structural layout only */
@layer components {
  /* Your CSS here */
}
```

#### Style files must start with:
```css
/* [Component Name] - visual styling only */
@layer components {
  /* Your CSS here */
}
```

### 6. Common Patterns

#### Button Component Example:
```css
/* wireframe.skeleton.buttons.css */
/* Buttons - structural layout only */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center;
    @apply cursor-pointer;
    @apply transition-all duration-200;
  }
  
  .action-buttons {
    @apply flex flex-col gap-4;
    @apply md:flex-row;
  }
}
```

```css
/* wireframe.style.buttons.css */
/* Buttons - visual styling only */
@layer components {
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
}
```

### 7. Testing Separation

#### To test skeleton layer only:
In `app.css`, comment out the style layer:
```css
@import './mds/wireframe/wireframe.skeleton/wireframe.skeleton.index.css';
/* @import './mds/wireframe/wireframe.style/wireframe.style.index.css'; */
```

This should show functional layout with no visual styling.

### 8. Edge Cases & Decision Rules

#### Responsive Properties:
- **Layout changes** → Skeleton (e.g., `@apply md:flex lg:grid`)
- **Visual changes** → Style (e.g., `@apply md:text-lg`)

#### Border Properties:
- **Border structure** → Skeleton (e.g., `@apply border`)
- **Border styling** → Style (e.g., `border-color: var(--mds-border-primary)`)

#### Transitions:
- **Structural transitions** → Skeleton (e.g., `@apply transition-transform`)
- **Visual transitions** → Style (e.g., `@apply transition-colors`)

### 9. Component Token Naming Convention

When creating new component tokens in `mds.variables.css`:
```css
/* Component name - property - modifier */
--mds-button-font-size: 0.875rem;
--mds-button-padding-x: 1rem;
--mds-button-primary-background-color: var(--mds-color-primary-500);
--mds-button-primary-background-color-hover: var(--mds-color-primary-600);

--mds-nav-font-size: 0.875rem;
--mds-nav-background-hover: var(--mds-color-gray-50);
--mds-nav-level-2-font-size: 0.8125rem;
```

### 10. Common Mistakes to Avoid

1. **Mixing concerns**: Never put layout properties in style files or visual properties in skeleton files
2. **Hardcoded values**: Always use MDS tokens for visual properties
3. **Wrong file modifications**: Never modify the file structure or import order
4. **Missing @layer**: Always wrap CSS in `@layer components`
5. **Inconsistent naming**: Follow exact naming conventions for files and tokens

### 11. When Adding New Components

1. **Add skeleton structure** to appropriate `.skeleton.` file
2. **Add visual styling** to matching `.style.` file
3. **Define tokens** in `mds.variables.css` if needed
4. **Test skeleton-only** by commenting out style layer
5. **Verify MDS token usage** in style layer

### 12. Emergency Debugging

If separation seems broken:
1. Check file headers for correct comments
2. Verify no visual properties in skeleton files
3. Confirm all visual properties use MDS tokens
4. Test skeleton-only rendering
5. Validate @layer usage is consistent

## Quick Checklist for AI Sessions

- [ ] Skeleton files contain only layout/structural properties
- [ ] Style files contain only visual properties with MDS tokens
- [ ] File headers have correct comments
- [ ] All CSS wrapped in `@layer components`
- [ ] No hardcoded values in style files
- [ ] Separation can be tested by commenting out style layer
- [ ] File structure and naming conventions maintained
- [ ] New tokens follow naming convention if created

This architecture enables complete separation of structure and styling, making the design system maintainable, testable, and scalable.