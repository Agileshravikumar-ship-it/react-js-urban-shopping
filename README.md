# Urban Threads — React Frontend Project

A responsive fashion e-commerce storefront built with React + Vite.

## Features
- Responsive layout for desktop and mobile
- Product grid with HD product photography
- Category filters and live search
- Add to bag, quantity controls, subtotal calculation
- Cart drawer and empty-cart state
- Newsletter form interaction
- Clean fashion-editorial design

## Run it on your laptop
1. Install **Node.js LTS** from https://nodejs.org/
2. Extract this ZIP folder.
3. Open the extracted folder in VS Code.
4. In VS Code, choose **Terminal → New Terminal**.
5. Run these commands:

```bash
npm install
npm run dev
```

6. Open the local URL Vite shows, usually `http://localhost:5173`.

## Create a production build
```bash
npm run build
```

## Main files
- `src/App.jsx` — all React components and product/cart behavior
- `src/styles.css` — responsive styling
- `src/main.jsx` — React entry point
- `index.html` — page entry

## Images
Product and editorial images are loaded from Unsplash image URLs at high quality (`q=90` or `q=95`). An internet connection is needed to load them. The project includes image alt text and a fallback image for product cards.

## Note
This is a frontend demo. Checkout is not connected to a payment provider or backend.
