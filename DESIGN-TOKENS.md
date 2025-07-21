# Design Tokens Implementation Guide

## Project Context

This Craft CMS starter project has begun implementing a design token system using CSS custom properties (CSS variables) with the following goals:

1. **Reusable & Extensible**: Establish defaults in `base.css` for wireframe styling, with `theme.css` overrides for project-specific design
2. **CMS Integration**: Connect design tokens with Craft CMS color configuration via `config/colour-swatches.php`
3. **Future-ready**: Prepare for Figma workflow integration and potential AI/MCP automation
4. **Maintainable**: Single source of truth for design decisions across CSS, Tailwind, and CMS

## Current Implementation

### Files Structure
```
assets/css/
├── base.css          # Wireframe defaults with CSS custom properties
└── theme.css         # Project-specific overrides

config/
└── colour-swatches.php  # CMS color picker configuration

tailwind.config.js     # Tailwind color extensions
```

### Current State
- **base.css**: Contains CSS custom properties for colors, spacing, typography, and layout
- **theme.css**: Overrides base tokens with project-specific values
- **colour-swatches.php**: Defines CMS color palettes (currently disconnected from CSS tokens)
- **tailwind.config.js**: Extended colors and custom utilities

## Recommended Architecture

### 1. Centralized Token Source
Create `tokens/design-tokens.js` as single source of truth:

```javascript
const designTokens = {
  colors: {
    semantic: {
      primary: { 50: '#eff6ff', 500: '#149BD7', 900: '#1e3a8a' },
      secondary: { 50: '#fff7ed', 500: '#ed7712', 900: '#9a3412' },
      neutral: { 50: '#fafafa', 500: '#737373', 900: '#181818' }
    },
    brand: {
      'dark-blue': '#149BD7',
      'light-blue': '#48C0F5',
      'dark-orange': '#ed7712'
    }
  },
  spacing: { xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem' },
  typography: {
    fontFamily: { display: ['DM Serif Display', 'serif'], body: ['DM Sans', 'sans-serif'] },
    fontSize: { sm: '0.875rem', base: '1rem', lg: '1.125rem' }
  },
  layout: {
    containers: { narrow: '64rem', medium: '80rem', wide: '118rem' }
  }
};
```

### 2. Enhanced CSS Token System
Restructure CSS to use semantic naming:

```css
/* assets/css/tokens/semantic.css */
@layer base {
  :root {
    /* Color tokens */
    --color-primary-500: #149BD7;
    --color-secondary-500: #ed7712;
    --color-neutral-900: #181818;
    
    /* Semantic aliases */
    --color-primary: var(--color-primary-500);
    --color-text: var(--color-neutral-900);
    --color-background: var(--color-neutral-50);
    
    /* Component tokens */
    --btn-primary-bg: var(--color-primary);
    --btn-primary-text: var(--color-neutral-50);
    
    /* Spacing, typography, layout tokens */
    --space-md: 1.5rem;
    --font-family-body: 'DM Sans', sans-serif;
    --container-narrow: 64rem;
  }
}
```

### 3. Unified CMS Integration
Create `config/DesignTokens.php` to synchronize tokens with Craft CMS:

```php
class DesignTokens {
    public static function getColorPalettes() {
        $tokens = self::loadDesignTokens();
        return [
            'Background Colours' => self::generateCMSColorConfig($tokens['colors']['semantic']),
            'Text Colours' => self::generateTextColorConfig($tokens['colors']['semantic']),
            'Brand Colours' => self::generateBrandColorConfig($tokens['colors']['brand'])
        ];
    }
}
```

### 4. Build System Integration
Create `build/generate-tokens.js` to generate multiple outputs:

```javascript
// Generate CSS custom properties
function generateCSS(tokens) { /* ... */ }

// Generate Tailwind config
function generateTailwindConfig(tokens) { /* ... */ }

// Generate PHP config for Craft CMS
function generatePHPConfig(tokens) { /* ... */ }

// Generate Figma tokens (Design Tokens Community format)
function generateFigmaTokens(tokens) { /* ... */ }
```

### 5. Package.json Scripts
```json
{
  "scripts": {
    "tokens:build": "node build/generate-tokens.js",
    "tokens:figma": "node build/figma-sync.js",
    "tokens:watch": "chokidar 'tokens/**/*.js' -c 'npm run tokens:build'",
    "dev": "npm run tokens:build && vite",
    "build": "npm run tokens:build && vite build"
  }
}
```

## Implementation Benefits

1. **Single Source of Truth**: All design decisions centralized in one location
2. **Multi-format Output**: Generates CSS, Tailwind, PHP, and Figma-compatible formats
3. **Automated Sync**: Build process maintains consistency across all systems
4. **Semantic Naming**: Better maintainability and clearer design intent
5. **Future-ready**: Easy integration with Figma workflows and AI/MCP tools

## Future Figma Integration

1. **Export from Figma**: Use Figma's Variables API or Design Tokens plugin
2. **Import to build system**: Process Figma tokens into central format
3. **Generate outputs**: Use same build system for CSS, Tailwind, and PHP configs
4. **Automated workflow**: Potential for AI/MCP integration for seamless updates

## Action Items for Implementation

1. Create centralized `tokens/design-tokens.js` file
2. Restructure `assets/css/` to use semantic token naming
3. Build `config/DesignTokens.php` for CMS integration
4. Create `build/generate-tokens.js` build script
5. Update `package.json` with token build scripts
6. Test integration across CSS, Tailwind, and CMS
7. Document token usage for team adoption

This approach provides a robust, scalable foundation for design token management that integrates seamlessly with Craft CMS while preparing for future Figma and AI-assisted workflows.