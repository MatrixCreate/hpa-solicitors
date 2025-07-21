# Templating Architecture Analysis

This document outlines potential improvements to the Craft CMS starter's templating system, comparing different approaches and providing a recommended path forward.

## Current State Analysis

### Existing Template Structure
```
templates/
├── _content-blocks/          # Matrix block templates
├── _components/              # Reusable UI components
├── _layouts/                 # Page layout templates
├── _macros/                  # Utility functions
└── _partials/                # Page sections
```

### Current Approach
- **Matrix blocks** render via `_layouts/_content.twig`
- **Components** use direct includes with variable passing
- **Styling** handled via utility classes and component-specific CSS
- **Content blocks** map 1:1 to template files

### Strengths
- ✅ Simple and readable
- ✅ Easy to debug and modify
- ✅ Craft CMS integration works naturally
- ✅ Low abstraction overhead
- ✅ Direct mapping between CMS fields and templates

### Areas for Improvement
- Inconsistent component interfaces
- Repeated code across similar components
- Manual prop handling without defaults
- No standardized component system

## Alternative Approaches Considered

### 1. Full Atomic Design System

**Structure:**
```
templates/
├── _atoms/           # Basic elements (buttons, text, icons)
├── _molecules/       # Component combinations (cards, forms)
├── _organisms/       # Complex sections (headers, grids)
└── _blocks/          # Matrix block wrappers
```

**Pattern:**
```twig
{# Props definition file #}
{%- set props = {
    content: options.content ??? null,
    color: options.color ??? 'gray-900',
    utilities: options.utilities ?? null,
} -%}

{# Component implementation #}
{%- extends '_atoms/texts/_text--props' -%}
{%- block text -%}
    <span class="{{ props.color }} {{ props.utilities }}">
        {{ props.content | raw }}
    </span>
{%- endblock -%}

{# Usage via macro #}
{{ render.atom('text', 'title', { content: 'Hello World' }) }}
```

**Assessment:**
- ✅ Strict consistency and design system enforcement
- ✅ Highly reusable components
- ✅ Clear component hierarchy
- ❌ **Very verbose** - 35+ lines for simple components
- ❌ **Complex debugging** - multiple inheritance layers
- ❌ **Overkill for most projects** - better suited for large teams/products
- ❌ **High maintenance burden** - requires discipline and documentation

### 2. Component Functions (Macros Only)

**Pattern:**
```twig
{# _macros/components.twig #}
{% macro button(text, url, style='primary', class='') %}
    <a href="{{ url }}" class="btn btn-{{ style }} {{ class }}">{{ text }}</a>
{% endmacro %}

{% macro card(title, content, image=null, class='') %}
    <div class="card {{ class }}">
        {% if image %}<img src="{{ image }}" />{% endif %}
        <h3>{{ title }}</h3>
        <p>{{ content }}</p>
    </div>
{% endmacro %}
```

**Assessment:**
- ✅ Lightweight and simple
- ✅ Function-like interface
- ❌ Limited flexibility for complex components
- ❌ No inheritance or variants
- ❌ Becomes unwieldy with many parameters

### 3. Smart Includes with Defaults

**Pattern:**
```twig
{# _components/button.twig #}
{% set defaults = {
    text: 'Button',
    url: '#',
    variant: 'primary'
} %}
{% set props = defaults|merge(props ?? {}) %}

<a href="{{ props.url }}" class="btn btn-{{ props.variant }}">
    {{ props.text }}
</a>

{# Usage #}
{% include '_components/button' with { props: { text: 'Click me' } } %}
```

**Assessment:**
- ✅ Clean defaults system
- ✅ Flexible prop passing
- ✅ Single file per component
- ❌ Still requires manual includes
- ❌ No centralized component system

## Recommended Approach: UI Component System

### Architecture Overview

Combines the best aspects of multiple approaches:
- **Props system** for consistent interfaces
- **Single file per component** for maintainability  
- **Centralized macro** for clean usage syntax
- **Minimal abstraction** to avoid complexity

### Implementation Structure

```
templates/
├── _components/              # Component library
│   ├── button.twig          # Single file per component
│   ├── card.twig
│   ├── hero.twig
│   └── rich-text.twig
├── _macros/
│   └── ui.twig              # Component loader macro
├── _content-blocks/         # Matrix block templates (use components)
└── _layouts/_content.twig   # Content builder
```

### Component Pattern

**Component Definition:**
```twig
{# _components/button.twig #}
{% set defaults = {
    text: 'Button',
    url: '#',
    variant: 'primary',
    size: 'md',
    icon: null,
    disabled: false,
    class: ''
} %}

{% set props = defaults|merge(props ?? {}) %}

{% set variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'text-blue-600 hover:bg-blue-50 border border-blue-600'
} %}

{% set sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
} %}

<a href="{{ props.url }}" 
   class="inline-flex items-center rounded transition-colors {{ variants[props.variant] }} {{ sizes[props.size] }} {{ props.class }}"
   {% if props.disabled %}aria-disabled="true"{% endif %}>
    {% if props.icon %}
        <i class="{{ props.icon }} mr-2"></i>
    {% endif %}
    {{ props.text }}
</a>
```

**UI Macro System:**
```twig
{# _macros/ui.twig #}
{% macro component(name, props = {}) %}
    {% include '_components/' ~ name with { props: props } %}
{% endmacro %}

{# Optional shortcuts for frequently used components #}
{% macro button(text, url = '#', variant = 'primary', props = {}) %}
    {% set buttonProps = props|merge({
        text: text,
        url: url,
        variant: variant
    }) %}
    {{ _self.component('button', buttonProps) }}
{% endmacro %}
```

### Usage Examples

**Basic Usage:**
```twig
{% import '_macros/ui' as ui %}

{# Generic component syntax #}
{{ ui.component('button', {
    text: 'Submit Form',
    url: '/submit',
    variant: 'primary',
    size: 'lg',
    icon: 'fas fa-paper-plane'
}) }}

{# Shortcut syntax #}
{{ ui.button('Click me', '/contact', 'secondary') }}

{# Minimal usage (uses defaults) #}
{{ ui.component('button', { text: 'Save' }) }}
```

**Craft CMS Integration:**
```twig
{# Matrix block template #}
{% import '_macros/ui' as ui %}

{{ ui.component('hero', {
    title: block.heading,
    subtitle: block.subheading,
    content: block.richText,
    image: block.desktopImage.one(),
    buttons: block.actionButtons.all(),
    variant: 'primary'
}) }}

{# Entry listings #}
{% for entry in craft.entries.section('blog').limit(3).all() %}
    {{ ui.component('card', {
        title: entry.title,
        content: entry.excerpt,
        image: entry.featuredImage.one(),
        url: entry.url,
        variant: 'blog'
    }) }}
{% endfor %}
```

**Content Builder Integration:**
```twig
{# _layouts/_content.twig #}
{% import '_macros/ui' as ui %}

{% for block in entry.contentBlocks.all() %}
    {% switch block.type %}
        
        {% case 'hero' %}
            {{ ui.component('hero', {
                title: block.heading,
                content: block.richText,
                image: block.desktopImage.one(),
                variant: 'primary'
            }) }}
            
        {% case 'callToAction' %}
            {{ ui.component('cta', {
                title: block.heading,
                content: block.text,
                button: {
                    text: block.buttonText,
                    url: block.buttonUrl,
                    variant: 'secondary'
                }
            }) }}
            
        {% case 'richText' %}
            {{ ui.component('rich-text', {
                content: block.richText,
                variant: block.backgroundColour.class
            }) }}
            
    {% endswitch %}
{% endfor %}
```

### Key Benefits

**Developer Experience:**
- ✅ **Simple syntax**: `ui.component('name', { props })`
- ✅ **Consistent interface**: All components use same prop pattern
- ✅ **Single source of truth**: One file per component
- ✅ **IntelliSense friendly**: Easy to discover available components
- ✅ **Easy debugging**: Clear path from usage to implementation

**Maintainability:**
- ✅ **DRY**: No code repetition across variants
- ✅ **Flexible**: Props system handles any complexity
- ✅ **Extensible**: Easy to add new components or variants
- ✅ **Testable**: Components can be rendered in isolation

**Craft CMS Integration:**
- ✅ **Natural data flow**: Craft fields map directly to component props
- ✅ **Matrix block friendly**: Easy integration with existing block system
- ✅ **Content-first**: Preserves Craft's content modeling approach
- ✅ **Performance**: No significant overhead compared to direct includes

### Migration Strategy

1. **Phase 1**: Implement UI macro system alongside existing templates
2. **Phase 2**: Convert existing `_components/` to use props pattern
3. **Phase 3**: Update Matrix blocks to use `ui.component()` syntax
4. **Phase 4**: Standardize component interfaces and add documentation

### Comparison Summary

| Approach | Complexity | Maintenance | Flexibility | Craft Integration |
|----------|------------|-------------|-------------|------------------|
| **Current** | Low | Medium | Medium | Excellent |
| **Full Atomic** | Very High | High | Very High | Good |
| **Macro Functions** | Low | Low | Low | Good |
| **Smart Includes** | Medium | Medium | High | Excellent |
| **UI Components** | **Medium** | **Low** | **High** | **Excellent** |

The UI Component approach provides the optimal balance of simplicity, maintainability, and functionality for a Craft CMS starter project.