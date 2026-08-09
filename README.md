# NOMNOW — Food, but louder.

A bold editorial food ordering system built around the original NOMNOW specification: MERN + Stripe, with a new high-contrast visual identity inspired by the supplied food-poster references.

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- Stripe Checkout
- JWT + bcryptjs authentication

## Run locally
1. Install Node.js 20+.
2. From this folder run `npm install`.
3. Copy `server/.env.example` to `server/.env` and fill in `MONGODB_URI`, `JWT_SECRET`, and optionally `STRIPE_SECRET_KEY`.
4. Run `npm run dev`.
5. Open `http://localhost:5173`.

The client includes demo food data so the visual experience works even before MongoDB is seeded. The server exposes `/api/food`, `/api/auth`, `/api/orders`, and `/api/payments`.

## Stripe
Add a Stripe test secret key to `server/.env` to activate the Stripe Checkout button. Never put the secret key in the client.

## Notes
The current build is a strong working foundation: customer browsing, search/filtering, cart persistence, authentication endpoints, order endpoints, admin-ready authorization middleware, and Stripe Checkout architecture are included. A production deployment should add full admin UI, server-side order creation tied to authenticated users, payment webhooks, image upload/storage, validation/rate limiting, and deployment secrets.

## NOMNOW UI update

The current client uses the refreshed NOMNOW visual direction: warm cream surfaces, forest green as the main grounding color, deep red and golden yellow accents, bold Anton display typography, INR pricing, a reference-inspired hero, category navigation, expanded food catalog, working navigation routes, search, cart, and editorial About / Contact pages.

Stripe checkout is configured for INR in `server/routes/payments.js` and still requires a valid test secret in `server/.env`.


## IMAGE SOURCES

The refreshed catalogue uses a mix of existing Unsplash images and web-sourced food photography for the demo catalogue. Before commercial deployment, replace any third-party image URLs with assets you have permission to use and keep any required attribution.
