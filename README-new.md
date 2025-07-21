# Craft CMS Starter Project - Technical Overview

## Project Overview

This is the **Matrix Create Craft CMS starter project** that serves as the foundational starting point for all Craft CMS projects developed by Matrix Create. It provides a production-ready foundation for building complex Craft CMS websites with a flexible, block-based content management system.

### Technology Stack

**Core Platform:**
- **Craft CMS 5.8.2** (Pro edition)
- **PHP 8.4** platform requirement
- **Vite 6.3.5** for asset building with Hot Module Replacement
- **Tailwind CSS 3.1.8** utility-first framework
- **Alpine.js 3.14.8** for reactive frontend components
- **PostCSS** with import and nesting support

**Build Tools:**
- **Vite** modern asset pipeline with development server
- **Swiper.js 8.4.4** for carousel components
- **Vue.js 3.2.41** for complex interactive components

## Plugin Ecosystem

The starter includes 13+ carefully selected plugins for comprehensive functionality:

### Content Management
- **Formie 3.0.31** - Advanced form builder with spam protection and integrations
- **Hyper 2.2.6** - Enhanced link fields for complex URL management
- **CKEditor 4.9.0** - Rich text editing with customizable toolbar
- **Icon Picker 3.0.4** - SVG icon selection system
- **Button Box 5.0.0** - UI field enhancements and custom controls

### SEO & Performance
- **SEOmatic 5.1.16** - Comprehensive SEO management with structured data
- **Retour 5.0.11** - 301/302 redirect management and monitoring
- **Vite Plugin 5.0.1** - Modern asset pipeline integration

### Development & Utilities
- **Field Manager 4.0.3** - Field management and organization tools
- **Cloner 3.0.1** - Content duplication utilities
- **Color Swatches 5.1.0** - Advanced color picker fields
- **Code Field 5.0.1** - Syntax-highlighted code editing
- **Navigation 3.0.8** - Menu builder and navigation management
- **Store Hours 4.2.0** - Business hours management
- **Feed Me 6.1.0** - Content import and synchronization
- **Auth 2.0.3** - Enhanced authentication features
- **Sprig 3.6.1** - HTMX-like reactive components
- **OEmbed 3.1.5** - Media embedding capabilities

## Architecture Overview

### Section Structure
The project implements 6 main content sections:

1. **Homepage** (Single) - Landing page with custom template (`index.twig`)
2. **Pages** (Structure) - Hierarchical page architecture with unlimited nesting (`/slug` URLs)
3. **Blog** (Channel) - Article management with `/blog/{slug}` URL pattern
4. **Team** (Structure) - Team member profiles and organization
5. **Testimonials** (Channel) - Customer testimonial management
6. **Error Pages** (Channel) - Custom 404/503 error handling

### Matrix Field System

**Content Blocks (`contentBlocks` field):**
The system uses Matrix fields for flexible, block-based page building with 11+ content block types:

- **Blog Listing** - Dynamic blog post displays
- **Call to Action** - Conversion-focused sections
- **Contact & Location** - Business information blocks
- **Contact Form** - Formie integration
- **Embed** - Media and iframe embedding
- **Entry Cards** - Related content displays
- **FAQ** - Accordion-style Q&A sections
- **Rich Text** - WYSIWYG content areas
- **USPs** - Unique selling proposition highlights
- **Tabbed Navigator** - Multi-section content organization
- **Testimonials** - Social proof displays
- **Text & Media** - Combined content and media layouts

**Hero System (`hero` field):**
- Single Matrix block for hero sections
- Responsive image variants (desktop/mobile)
- Rich text content with action buttons
- Background customization options

### Template Architecture

**Current Structure:**
```
templates/
├── _content-blocks/          # Matrix block templates (11+ types)
├── _components/              # Reusable UI components
├── _layouts/                 # Page layout templates
├── _macros/                  # Utility functions and helpers
├── _partials/                # Page sections (header, footer, etc.)
├── _email/                   # Email template system (MJML + Twig)
└── _entry-types/             # Entry-specific templates
```

**Key Templates:**
- `_layouts/_content.twig` - Dynamic Matrix block renderer
- `_availableblocks.twig` - Template inheritance structure
- `_layouts/generic-page-layout.twig` - Base page template
- `_components/` - 20+ reusable UI components

### Field System

**Comprehensive Field Library:**
- 80+ configured custom fields
- Organized field groups (Content, SEO, Page Options)
- Standardized naming conventions
- Responsive image handling (desktop/mobile variants)

**Entry Type System:**
- 30+ entry types for different content structures
- Hierarchical field organization
- Consistent field layouts across types
- Custom icons and field groupings

### Global Content Management

**Global Sets:**
- **Settings** - Site-wide configuration
- **Admin Settings** - Backend customizations
- **Sitewide Content** - Reusable content blocks

**Asset Management:**
- **Images** volume - Optimized image storage
- **Documents** volume - File downloads and resources
- **Brand Assets** volume - Logos and brand materials

### Development Environment

**Configuration Management:**
- Environment-based settings (`dev`, `production`)
- Secure configuration with environment variables
- Craft Project Config for version control
- Comprehensive logging and debugging

**Asset Pipeline:**
- Vite development server with HMR
- Tailwind CSS with custom configuration
- PostCSS processing pipeline
- Critical CSS generation
- Modern JavaScript bundling

**Security Features:**
- Environment-specific settings
- Secure key management
- CSRF protection for guests
- Formie spam protection (reCAPTCHA integration)

## Frontend Architecture

### Styling System
- **Tailwind CSS** utility-first approach
- **PostCSS** with nesting and import support
- **Custom components** for complex UI patterns
- **Responsive design** with mobile-first approach

### JavaScript Architecture
- **Alpine.js** for reactive components
- **Swiper.js** for carousel functionality
- **Vite** module bundling and HMR
- **ES6+ modules** with modern syntax

### Performance Optimizations
- **Lazy loading** for images and components
- **Critical CSS** extraction
- **Modern asset pipeline** with Vite
- **Optimized font loading** strategy

## Content Management Features

### Form Management
- **Formie integration** with advanced form builder
- **Spam protection** via reCAPTCHA
- **Email notifications** with MJML templates
- **Conditional fields** and validation

### SEO Management
- **SEOmatic integration** for comprehensive SEO
- **Structured data** generation
- **Social media** optimization
- **Sitemap** generation and submission

### Navigation System
- **Navigation plugin** for menu management
- **Hierarchical** menu structures
- **Mobile navigation** patterns
- **Breadcrumb** generation

### Front-end Search
- Automatically search all sections
- Configure with config/search.php


## Development Workflow

### Project Setup
- **Composer** dependency management
- **NPM** frontend dependencies
- **Environment** configuration
- **Database** migration system

### Content Modeling
- **Project Config** for version control
- **Field** synchronization across environments
- **Entry type** management
- **Asset volume** configuration

### Deployment
- **Environment-specific** configurations
- **Asset compilation** and optimization
- **Database migration** handling
- **Cache management** strategies

## FUTURE UPGRADES

### 1. Tailwind CSS 4 Migration
**Objective:** Upgrade to Tailwind CSS 4 for improved performance and new features.

**Key Changes:**
- Migrate from Tailwind 3.x to 4.x
- Update PostCSS configuration for new engine
- Leverage new container queries and advanced features
- Optimize bundle size with tree-shaking improvements
- Update component classes for v4 compatibility

**Benefits:**
- Faster build times with new Rust-based engine
- Better tree-shaking and smaller CSS bundles
- New CSS features (container queries, cascade layers)
- Improved developer experience with better IntelliSense

### 2. CSS Custom Properties (Variables) System
**Objective:** Implement comprehensive CSS custom properties for design tokens.

**Implementation:**
- **Base Design System:**
  ```css
  :root {
    /* Colors */
    --color-primary-50: #eff6ff;
    --color-primary-500: #3b82f6;
    --color-primary-900: #1e3a8a;
    
    /* Typography */
    --font-family-primary: 'Inter', sans-serif;
    --font-size-base: 1rem;
    --line-height-base: 1.5;
    
    /* Spacing */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    
    /* Layout */
    --container-max-width: 1200px;
    --border-radius-base: 0.5rem;
    
    /* Animation */
    --transition-base: 0.2s ease-in-out;
  }
  ```

- **Project-Specific Overrides:**
  ```css
  /* Custom theme variables per project */
  :root {
    --color-brand-primary: var(--color-blue-600);
    --color-brand-secondary: var(--color-gray-800);
    --font-family-heading: 'Poppins', var(--font-family-primary);
  }
  ```

**Benefits:**
- Runtime theme switching capability
- Consistent design token management
- Easier client customization
- Better maintainability across projects
- Dynamic theming possibilities

### 3. Theme Architecture Implementation
**Objective:** Establish base theme system with project-specific customizations.

**Structure:**
```
assets/css/
├── base/                    # Base design system
│   ├── tokens.css          # Design tokens (CSS custom properties)
│   ├── reset.css           # CSS reset and normalize
│   ├── typography.css      # Base typography system
│   └── components.css      # Base component styles
├── themes/
│   └── project/            # Project-specific theme
│       ├── tokens.css      # Project design tokens
│       ├── components.css  # Component overrides
│       └── utilities.css   # Custom utilities
└── app.css                 # Main entry point
```

**Implementation:**
- **Base Theme:** Reusable across all projects
- **Project Theme:** Client-specific customizations
- **Component Variants:** Theme-aware component system
- **Build System:** Vite integration for theme compilation

### 4. Enhanced Templating System
**Objective:** Implement the UI component system outlined in TEMPLATING.md.

**Key Features:**
- **Props-based components** with consistent interfaces
- **Centralized macro system** (`ui.component()` syntax)
- **Single file per component** architecture
- **Default value handling** for all component props
- **Variant system** for component styles

**Migration Plan:**
1. Implement UI macro system alongside existing templates
2. Convert existing `_components/` to use props pattern
3. Update Matrix blocks to use `ui.component()` syntax
4. Standardize component interfaces and documentation

**Example Implementation:**
```twig
{# Usage #}
{{ ui.component('button', {
    text: 'Submit Form',
    url: '/submit',
    variant: 'primary',
    size: 'lg'
}) }}

{# Matrix block integration #}
{{ ui.component('hero', {
    title: block.heading,
    content: block.richText,
    image: block.desktopImage.one(),
    variant: 'primary'
}) }}
```

### 5. CMS-Specific Documentation Website
**Objective:** Create comprehensive, hosted documentation for the Craft CMS starter system.

**Documentation Scope:**
- **Content Modeling Guide:** How to use fields, sections, and entry types
- **Template Development:** Component system and best practices
- **Plugin Configuration:** Setup and customization guides
- **Deployment Workflow:** Environment management and deployment
- **Troubleshooting:** Common issues and solutions
- **Video Tutorials:** Step-by-step walkthroughs
- **API Reference:** Field types, macros, and utilities

**Technical Implementation:**
- **Static Site Generator:** VitePress or similar for documentation
- **Interactive Examples:** Live code examples and previews
- **Version Control:** Synchronized with starter project versions
- **Search Functionality:** Full-text search across documentation
- **Contribution Workflow:** Team contribution guidelines

**Content Structure:**
```
docs/
├── getting-started/         # Initial setup and configuration
├── content-modeling/        # Fields, sections, entry types
├── templating/             # Component system and patterns
├── deployment/             # Environment and deployment
├── troubleshooting/        # Common issues and solutions
├── api-reference/          # Technical reference
└── video-tutorials/        # Step-by-step guides
```

**Hosting Strategy:**
- **Primary Site:** Dedicated documentation domain
- **Version Management:** Multiple versions for different starter releases
- **Analytics:** Usage tracking for content optimization
- **Feedback System:** User feedback and improvement suggestions

### Implementation Timeline

**Phase 1** (Foundation): Tailwind 4 + CSS Custom Properties
**Phase 2** (Architecture): Theme system + Enhanced templating  
**Phase 3** (Documentation): Comprehensive documentation website

Each upgrade builds upon the previous, creating a more robust, maintainable, and well-documented foundation for Craft CMS projects.