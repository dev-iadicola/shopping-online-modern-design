# Shop Online

Frontend ecommerce concept built with React and Vite.

Live demo:
[https://dev-iadicola.github.io/shopping-online-modern-design/](https://dev-iadicola.github.io/shopping-online-modern-design/)

## Stack

- React 18
- Vite
- React-Bootstrap
- Swiper
- Lucide React

## Features

- Responsive editorial-style storefront
- Light and dark theme toggle
- Local catalog dataset for stable development and production builds
- Product carousel, cards, feedback toasts, and image fallbacks
- Docker production build with Nginx

## Local development

```bash
npm install
npm start
```

Default dev server:

```bash
http://localhost:5173
```

## Test and build

```bash
npm test
npm run build
```

## Docker

```bash
docker build -t shop-online .
docker run --rm -p 8080:80 shop-online
```

Then open:

```bash
http://localhost:8080
```

## Notes

- The catalog is served from `public/products.json`.
- Production asset paths use Vite `base`, so GitHub Pages deploys work correctly.
