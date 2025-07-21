# 🪄 Matrix Create Craft CMS Starter

Starter scaffolding for new projects - CraftCMS/Vite/Tailwind

## 🔗 Links

- [CraftCMS v5](https://craftcms.com/docs/5.x)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev)
- [AlpineJS](https://alpinejs.dev)

## 🏗 Local Development

Using your local development environment:

### 🌄 Setup

1. Clone the repo.
2. Run `composer install` to install PHP dependencies, Craft and plugins.
3. `npm install` to install JS dependencies
4. [Laravel Herd](https://herd.laravel.com/) (or your preference) to run local dev server
5. Edit `.env` file to setup env settings

### ⚙️ Craft Setup

1. Uncomment `#web/assets/cms` from .gitignore to exclude CMS assets from project.
2. Export latest starter database from staging server and import into local ([TablePlus](https://tableplus.com/))

### 🪪 Craft Licenses

1. Log in to [Craft Console](https://console.craftcms.com/)
2. Search for a license for `matrixcreate.com` domain, or the production license for the project.
3. Paste license into `/config/license.key`
4. Update Plugin licenses if necessary.

### 🗜️ Compiling Assets

Uses [Vite](https://vitejs.dev) for fast development and optimized builds.

`npm run dev` - Start development server with HMR

`npm run build` - Build for production

`npm run watch` - Watch mode for development

## 🖥️ Server Requirements

- PHP 8.4
- MySQL 8.0
- Composer 2
- Node.js (for Vite asset compilation)

## ☑️ Project Start Checklist

- [x] Create starter repo from template.
- [x] Import starter database export.
- [x] Configure `.env` (e.g., database credentials, etc).

## Required PHP Extensions

- ctype
- cURL
- GD or ImageMagick
- iconv
- JSON
- Multibyte String
- OpenSSL
- PCRE
- PDO MySQL Driver or PDO PostgreSQL Driver
- PDO
- Reflection
- SPL
- Zip
- DOM

## 🧰 Tech Stack

- **CraftCMS 5.8.5** - Content management system
- **Vite 6.3.5** - Frontend build tool with HMR
- **Tailwind CSS 4.1.11** - Utility-first CSS framework  
- **AlpineJS 3.14.8** - Lightweight JavaScript framework
- **PHP 8.4** - Server-side language
- **MJML 4.15.3** - Responsive email templates

## 🔌 Key Plugins

- **Formie 3.0.31** - Advanced form builder
- **SEOmatic 5.1.16** - SEO management
- **Retour 5.0.11** - Redirect management
- **Hyper 2.2.6** - Enhanced link fields
- **Navigation 3.0.9** - Menu builder
- **Vite Plugin 5.0.1** - Asset pipeline integration

## 📄 Documentation

For detailed documentation, see `CLAUDE.md` in the project root.
