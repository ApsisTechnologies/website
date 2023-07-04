# RockinDev's Nuxt 3 SSG frontend starter

This repo includes all the necessary setup to develop a Nuxt v3 application and prerender it via `nuxt generate`.

## Features

- Base global styles & fontfaces.
- Layout + pages.
- PostCSS config for global media queries.
- Pinia stores.
- Internationalization support via `@nuxt/i18n` module + pre-configured locales.
- Page meta via `unhead` for `<head>` configuration.
- Loading of .svg files as Vue components via `nuxt-svgo`.
- Theme manager plugin + composable.
- Event bus plugin + composable.
- ESLint configuration.
- Global application setup + error handling via `plugin/main.client.ts`.

## Setup

Install dependencies:

```bash
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn generate
```

Locally preview production build:

```bash
yarn serve
```
