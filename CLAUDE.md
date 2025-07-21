# Craft CMS Starter Project - Technical Reference

## Quick Reference

### Key Commands
```bash
# Development
npm run dev              # Start Vite dev server with HMR
npm run build           # Production asset build
npm run watch           # Watch mode for assets

# Craft CMS  
./craft project-config/apply    # Apply config changes
./craft clear-caches/all       # Clear all caches
./craft migrate/all            # Run migrations
```

### Critical File Paths
```
config/
├── general.php                 # Craft CMS main config
├── project/project.yaml       # Project config sync
├── vite.php                   # Vite integration config
└── project/
    ├── fields/contentBlocks--f3e37f1f-e46a-4f2b-af64-1d03d6ca119e.yaml
    ├── sections/              # Section definitions
    └── entryTypes/            # Entry type configurations

templates/
├── _layouts/_content.twig     # Matrix block renderer  
├── _content-blocks/           # Individual Matrix block templates
├── _components/               # Reusable UI components
├── _macros/                   # Utility functions
└── index.twig                # Homepage template

composer.json                  # PHP dependencies and platform requirements
package.json                   # Node.js dependencies and scripts
vite.config.js                # Asset build configuration
tailwind.config.js            # Tailwind CSS configuration
```

### Technology Stack
**IMPORTANT**: Always check `composer.json` and `package.json` for current versions as these are updated regularly.

Current major versions (check files for exact versions):
- **Craft CMS 5.x** (Pro edition) - see `composer.json`
- **PHP 8.4+** platform requirement - see `composer.json`
- **Vite 6.x** with HMR - see `package.json`
- **Tailwind CSS 4.x** - see `package.json`
- **Alpine.js 3.x** - see `package.json`
- **Multiple plugins** (Formie, SEOmatic, Retour, etc.) - see `composer.json`

## Current Architecture

### Section Structure
1. **Homepage** (Single) → `index.twig`
2. **Pages** (Structure) → `pages/_entry.twig` (hierarchical, unlimited nesting)
3. **Blog** (Channel) → `blog/_entry.twig` (`/blog/{slug}`)
4. **Team** (Structure) → Team member profiles
5. **Testimonials** (Channel) → Customer testimonials  
6. **Error Pages** (Channel) → Custom 404/503 handling

### Matrix Field System

**Content Blocks Field (`contentBlocks`):**
- **Location:** `config/project/fields/contentBlocks--f3e37f1f-e46a-4f2b-af64-1d03d6ca119e.yaml`
- **Renderer:** `templates/_layouts/_content.twig`
- **Templates:** `templates/_content-blocks/[blockType].twig`

**Available Block Types:**
- `accordion` → Collapsible content sections
- `blogListing` → Blog post listings
- `callToAction` → CTA sections  
- `contactForm` → Formie integration
- `contactLocation` → Business info blocks
- `entryCards` → Related content cards
- `faq` → FAQ sections
- `hero` → Hero sections
- `heroCarousel` → Hero carousel/slider
- `newsletterSignup` → Newsletter subscription forms
- `reviews` → Review/testimonial content
- `tabbedNavigator` → Multi-tab content sections
- `testimonials` → Customer testimonials
- `text` → WYSIWYG content (formerly richText)
- `textAndImage` → Combined text and image layouts
- `trustLinks` → Trust/partner links
- `usps` → USP highlights
- `video` → Video content blocks

**Hero Field (`hero`):**
- **Location:** `config/project/fields/hero--901519ce-e6de-4761-90a4-faaa0a48014f.yaml`
- **Type:** Single Matrix block
- **Features:** Desktop/mobile images, rich text, action buttons

### Component System

**Component Organization (Dot Notation):**
- `templates/_components/` → Reusable UI components
- **Naming convention:** Use dot notation for logical grouping
- **Examples:**
  - `accordion.items` → Individual accordion items
  - `blog.card.twig` → Blog post card component
  - `entry.card.twig` → Generic entry card component  
  - `hero.slide.twig` → Individual hero slide component
  - `search.form.twig` → Search form component
  - `search.result.card.twig` → Search result card component
  - `blog.grid.standard.twig` → Standard blog grid layout
  - `blog.grid.sprig.twig` → Dynamic blog grid with Sprig
  - `blog.filter.twig` → Blog filtering component

**Component Usage:**
```twig
{# Use dot notation in includes #}
{% include '_components/blog.card' with { entry: entry } %}
{% include '_components/search.form' with { variant: 'header' } %}
```

**Important:** Content blocks in `_content-blocks/` are Matrix field templates only. Reusable components belong in `_components/` with dot notation naming.

### Plugin Configuration

**Essential Plugins (check `composer.json` for current versions):**
- **Formie** → `config/project/formie/` (forms, spam protection)
- **SEOmatic** → SEO management, structured data
- **Retour** → Redirect management
- **Hyper** → Enhanced link fields
- **Navigation** → Menu builder
- **Field Manager** → Field organization
- **Vite Plugin** → Asset pipeline integration

### Header Enhancement System

**Smart Header Behaviors (CMS Configurable):**
- **Sticky Header**: `siteConfig.stickyHeader` - Basic sticky positioning
- **Shrink on Scroll**: `siteConfig.shrinkHeaderOnScroll` - Reduces logo size and padding when scrolling
- **Hide on Scroll**: `siteConfig.hideHeaderOnScroll` - Hides header when scrolling down, shows when scrolling up

**JavaScript Modules:**
- `assets/js/source/headerHeight.js` → Maintains live `--header-height` CSS variable
- `assets/js/source/headerShrink.js` → Shrink functionality with anti-stuttering hysteresis
- `assets/js/source/headerHide.js` → Hide/show functionality with smart scroll detection

**Implementation Details:**
- **Anti-stuttering**: Both shrink and hide use hysteresis thresholds to prevent flickering
- **Performance optimized**: RequestAnimationFrame throttling + passive scroll listeners
- **Responsive aware**: Logo shrinking maintains existing breakpoint patterns
- **Theme customizable**: Easy CSS overrides in theme files using Tailwind 4 syntax
- **HeaderHeight integration**: Automatically updates layout calculations when header state changes

**Template Integration:**
```twig
{# templates/_partials/header.twig #}
<header class="header {% if stickyHeader %}header-sticky{% endif %} js-header" 
        data-shrink-on-scroll="{{ shrinkHeaderOnScroll ? '1' : '0' }}" 
        data-hide-on-scroll="{{ hideHeaderOnScroll ? '1' : '0' }}">
```

**CSS Structure:**
- `wireframe.style.header.css` → Header shrink styles and animations
- `.header-shrunk` → Applied when header is in shrunk state
- `.header-hidden` → Applied when header is hidden (transforms)
- `.company-logo` → Responsive sizing with breakpoint-specific dimensions

## Coding Standards & Patterns

### Matrix Block Template Pattern
```twig
{# templates/_content-blocks/text.twig #}
{% import "_macros/utils.twig" as utils %}
{% import "_macros/ui.twig" as ui %}

{# Set color classes from CMS-driven block settings #}
{% set backgroundColour = block.backgroundColour.color[0].background %}
{% set headingColour = block.headingColour.color[0].heading %}
{% set textColour = block.textColour.color[0].text %}

<section class="rich-text content-block {{ headingColour }} {{ textColour }} {{ backgroundColour }}"
  {{ utils.debugAttributes(entry, block.type, 'Text') }}>
    <div class="content-block-inner container-medium">
        {{ ui.component('rich-text', { 
            content: block.richText 
        }) }}
    </div>
</section>
```

### UI Component System (Current)
```twig
{# Import the UI macro system #}
{% import '_macros/ui.twig' as ui %}

{# Use components with props pattern #}
{{ ui.component('button', {
    type: 'link',
    text: 'Click me',
    href: '/contact',
    class: 'btn-primary'
}) }}

{# Component with Craft data #}
{{ ui.component('entry.card', {
    title: entry.title,
    content: entry.excerpt,
    image: entry.featuredImage.one(),
    url: entry.url
}) }}

{# Rich text rendering #}
{{ ui.richText(block.richText) }}
```

### Content Block Renderer
```twig
{# templates/_layouts/_content.twig #}
{% set baseUrl = "_content-blocks/" %}
{% set blocks = entry.contentBlocks.all() %}

{% for block in blocks %}
    {% include baseUrl ~ block.type ~ '.twig' %}
{% endfor %}
```

### Utility and UI Macro Usage
```twig
{# templates/_macros/utils.twig functions #}
{{ utils.debugAttributes(entry, block.type, 'Block Name') }} # Debug info (admin only)

{# templates/_macros/ui.twig functions #}
{{ ui.component('component-name', { prop: 'value' }) }}      # Component loader
{{ ui.richText(content, 'custom-class', false) }}           # Rich text renderer

{# CMS-driven color classes (from color picker fields) #}
{% set backgroundColour = block.backgroundColour.color[0].background %}
{% set headingColour = block.headingColour.color[0].heading %}
{% set textColour = block.textColour.color[0].text %}
```

### Component Structure and Props
```twig
{# Component files use props pattern with defaults #}
{# templates/_components/button.twig #}
{% set defaults = {
  type: 'button',
  text: '',
  href: '#',
  target: null,
  class: '',
  id: '',
  attributes: []
} %}

{% set p = defaults|merge(props ?? {}) %}

{# Component implementation with merged props #}
{% if p.type == 'link' %}
  <a class="{{ p.class }}" href="{{ p.href }}">{{ p.text }}</a>
{% endif %}
```

## Architecture Decisions

### Why Matrix Fields Over Flexible Content
- **Chosen:** Matrix fields with entry types for content blocks
- **Alternative:** Single flexible content field or Neo
- **Rationale:** Better content modeling, easier maintenance, structured approach, native Craft integration

### Why Vite Over Laravel Mix
- **Previous:** Laravel Mix (noted in git history: "Migrate laravel mix to Vite")
- **Chosen:** Vite 6.3.5 for asset building
- **Rationale:** Faster HMR, modern ES modules, better development experience, smaller bundle sizes

### Template Strategy Decision
- **Current:** Direct includes with manual prop passing
- **Considered:** Full Atomic Design system (analyzed - too complex for project scale)
- **Future:** UI component system with props (balanced approach)
- **Rationale:** See `TEMPLATING.md` for complete analysis and comparison

### Plugin Selection Strategy
- **Formie** over Contact Form 7 → Better spam protection, more flexible
- **SEOmatic** over Yoast → Craft-native, structured data integration
- **Hyper** over standard Link fields → Enhanced functionality, better UX
- **Navigation** over manual menus → GUI menu builder, hierarchical support

## Common Development Tasks

### Adding a New Matrix Block Type
1. **Create entry type in Craft admin:**
   - Go to Settings → Entry Types
   - Create new entry type with required fields
   - Note the UID for reference

2. **Add to contentBlocks field:**
   - Settings → Fields → Content (contentBlocks)
   - Add new entry type to available types
   - Save and apply project config

3. **Create template:**
   ```twig
   {# templates/_content-blocks/[newBlockType].twig #}
   {% import "_macros/utils.twig" as utils %}
   
   <section class="[block-name] content-block {{ utils.backgroundColour(block.backgroundColour.class) }}">
       <div class="content-block-inner container-narrow">
           {# Block-specific content #}
       </div>
   </section>
   ```

4. **Apply changes:**
   ```bash
   ./craft project-config/apply
   ./craft clear-caches/all
   ```

### Creating a New Component
1. **Create component file:**
   ```twig
   {# templates/_components/[componentName].twig #}
   {% set text = text ?? 'Default text' %}
   {% set variant = variant ?? 'default' %}
   {% set class = class ?? '' %}
   
   <div class="component component--{{ variant }} {{ class }}">
       {{ text }}
   </div>
   ```

2. **Use in templates:**
   ```twig
   {% include '_components/[componentName]' with {
       text: 'Custom text',
       variant: 'primary'
   } %}
   ```

### Setting Up New Environment
1. **Clone and install:**
   ```bash
   git clone [repository]
   composer install
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with database credentials and security key
   ```

3. **Database and assets:**
   ```bash
   ./craft setup/security-key
   ./craft install
   ./craft project-config/apply
   npm run dev
   ```

### Adding a New Plugin
1. **Install via Composer:**
   ```bash
   composer require vendor/plugin-name
   ```

2. **Enable in Craft:**
   ```bash
   ./craft plugin/install plugin-handle
   ```

3. **Apply configuration:**
   ```bash
   ./craft project-config/apply
   ```

## Troubleshooting Guide

### Matrix Block Not Rendering
**Symptoms:** Block appears in admin but not on frontend
- **Check:** Block type matches template filename exactly
- **Check:** Template exists in `templates/_content-blocks/`
- **Debug:** Add `{{ dump(block.type) }}` to see actual block type
- **Solution:** Ensure template naming follows `[blockType].twig` pattern

### Vite Assets Not Loading
**Symptoms:** CSS/JS not loading, 404 errors for assets
- **Check:** `npm run dev` is running on correct port
- **Check:** Vite configuration in `config/vite.php`
- **Check:** `@web` alias is correctly set in `config/general.php`
- **Solution:** Restart Vite, clear template caches, check network requests

### Field Changes Not Appearing
**Symptoms:** Field modifications not visible in admin
- **Check:** Project config is out of sync
- **Solution:** Run `./craft project-config/apply`
- **Alternative:** Settings → Project Config → Apply pending changes

### Template Errors
**Symptoms:** Twig syntax errors, undefined variables
- **Check:** Enable Dev Mode in `config/general.php` (dev environment only)
- **Check:** Template syntax and variable names
- **Debug:** Use `{{ dump(variableName) }}` to inspect data
- **Solution:** Check Craft logs in `storage/logs/`

### Plugin Installation Issues
**Symptoms:** Plugin not found, license issues
- **Check:** Plugin compatibility with Craft CMS 5.8.2
- **Check:** License key configuration in Project Config
- **Solution:** Verify plugin requirements, check license status

### Performance Issues
**Symptoms:** Slow page loads, asset build times
- **Check:** Database query efficiency with Debug Toolbar
- **Check:** Image optimization and asset sizes
- **Solution:** Enable template caching, optimize images, use eager loading

## Project Overview

This is the **Matrix Create Craft CMS starter project** that serves as the foundational starting point for all Craft CMS projects developed by Matrix Create. It provides a production-ready foundation for building complex Craft CMS websites with a flexible, block-based content management system.

### Content Management Features

**Form Management:**
- Formie integration with advanced form builder
- Spam protection via reCAPTCHA
- Email notifications with MJML templates (`templates/_email/`)
- Conditional fields and validation

**SEO Management:**
- SEOmatic integration for comprehensive SEO
- Structured data generation
- Social media optimization
- Automatic sitemap generation and submission

**Navigation System:**
- Navigation plugin for GUI menu management
- Hierarchical menu structures
- Mobile navigation patterns
- Breadcrumb generation

**Asset Management:**
- **Images** volume → `assets/cms/images/`
- **Documents** volume → `assets/cms/resources/`  
- **Brand Assets** volume → `assets/cms/brand-assets/`

### Email System
**MJML Integration:**
- `templates/_email/admin.mjml` → Admin notifications
- `templates/_email/customer.mjml` → Customer confirmations
- Responsive email templates with brand consistency

### Global Content
**Global Sets:**
- **Settings** (`config/project/globalSets/settings--*.yaml`) → Site-wide configuration
- **Admin Settings** → Backend customizations  
- **Sitewide Content** → Reusable content blocks

## FUTURE UPGRADES

### 1. MDS Architecture (Implemented)
**Status:** ✅ Current system architecture.

**Layer Structure:**
- **mds.tokens.css** → Base design tokens and foundations
- **mds.variables.css** → Semantic color and typography system
- **wireframe.skeleton** → Structure and layout only (no styling)
- **wireframe.style** → Basic styling with greyscale colors
- **theme** → Project-specific customizations and branding

**Benefits:**
- Systematic approach to design system implementation
- Clear separation between structure, styling, and theming
- Semantic token system for consistent color usage
- Maintainable and scalable CSS architecture

### 2. UI Component System (Implemented)
**Status:** ✅ Props-based component system is now active.

**Implementation:**
```twig
{# Component usage #}
{% import '_macros/ui.twig' as ui %}
{{ ui.component('button', { type: 'link', text: 'Click me', href: '/contact' }) }}

{# Component structure (in _components/button.twig) #}
{% set defaults = { type: 'button', text: '', href: '#' } %}
{% set p = defaults|merge(props ?? {}) %}
```

**Benefits:**
- Consistent prop handling across all components
- Default value merging for robust components
- Centralized component loading via ui.component() macro
- Improved maintainability and reusability

**MDS (Matrix Design System) Architecture:**
```css
/* assets/css/app.css - Main CSS architecture */
@import 'tailwindcss';
@plugin "@tailwindcss/typography";

/* MDS Layer System */
@import './mds/mds.tokens.css';                                   /* Base design tokens */
@import './mds/mds.variables.css';                               /* Semantic color/typography system */
@import './mds/wireframe/wireframe.skeleton/wireframe.skeleton.index.css';  /* Structure only */
@import './mds/wireframe/wireframe.style/wireframe.style.index.css';        /* Basic styling */

/* Theme Layer (project-specific customizations) */
/* @import './theme/theme.index.css'; */                        /* Uncomment for theme */
```

**MDS Variables (Semantic Color System):**
```css
/* assets/css/mds/mds.variables.css */
:root {
  /* Text Colors */
  --mds-text-primary: theme(colors.grey-900);
  --mds-text-secondary: theme(colors.grey-700);
  --mds-text-muted: theme(colors.grey-500);
  
  /* Interactive Colors */
  --mds-interactive-primary: theme(colors.grey-600);
  --mds-interactive-primary-hover: theme(colors.grey-800);
  
  /* Typography Scale */
  --mds-heading-h1-font-size: var(--mds-font-size-3xl);
  --mds-heading-h1-font-weight: var(--mds-font-weight-semibold);
  
  /* Button Tokens */
  --mds-button-primary-background-color: theme(colors.grey-600);
  --mds-button-border-radius: 0;
}
```

### 3. CMS-Driven Color System (Implemented)
**Status:** ✅ Color classes now come directly from CMS color picker fields.

**Implementation:**
```twig
{# Access color classes from CMS block settings #}
{% set backgroundColour = block.backgroundColour.color[0].background %}
{% set headingColour = block.headingColour.color[0].heading %}
{% set textColour = block.textColour.color[0].text %}

{# Apply to section #}
<section class="content-block {{ headingColour }} {{ textColour }} {{ backgroundColour }}">
```

**Benefits:**
- Content editors can control color schemes without developer intervention
- Consistent color application across all content blocks
- Simplified template code with direct CMS integration
- Flexible color combinations defined in the CMS

**Vite Integration:**
```js
// vite.config.js theme compilation
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "assets/css/base/tokens.css";
          @import "assets/css/themes/project/tokens.css";
        `
      }
    }
  }
})
```

### 4. Debug and Development Tools (Current)
**Debug Information:**
```twig
{# Admin-only debug attributes (current implementation) #}
{{ utils.debugAttributes(entry, block.type, 'Block Name') }}
{# Outputs: data-title="Block Name" data-template="blockType" (admin only) #}
```

**Development Patterns:**
- Use `adminSettings.showDebugInfo` for conditional debug output
- Matrix block templates consistently use debug attributes
- Component dot-notation naming (`blog.card.twig`, `entry.card.twig`)
- Clear separation between content blocks and reusable components

### 5. Future Improvements

**Potential Enhancements:**
- **Enhanced Theme System:** Expand theme layer for more comprehensive project-specific customizations
- **Component Documentation:** Interactive component library and style guide
- **Advanced MDS Tokens:** Extended semantic token system for spacing, shadows, and animations
- **Performance Optimizations:** Further CSS optimization and component lazy loading

**Current Status:**
The foundational systems (MDS architecture, UI components, CMS-driven colors) are implemented and production-ready. Future improvements should focus on expanding these established patterns rather than architectural changes.