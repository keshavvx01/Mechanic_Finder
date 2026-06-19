# PitStop Pulse

Full-stack roadside assistance app built with React, Vite, Tailwind CSS, Framer Motion, React Leaflet, and an Express backend.

## What is included

- Driver experience with animated onboarding, live geolocation, a dark Leaflet map, dynamic mechanic filters, and an assistance request flow.
- Mechanic onboarding view so new mechanics can publish themselves into the live nearby feed.
- Backend API with persistent JSON storage for mechanics and assistance requests.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Run both the API and frontend together:

```bash
npm run dev
```

3. Open the Vite app URL shown in the terminal. The frontend proxies `/api` calls to `http://localhost:3001`.

## Scripts

- `npm run dev`: runs the client and API together.
- `npm run dev:client`: runs the Vite frontend.
- `npm run dev:server`: runs the Express API with file watching.
- `npm run build`: builds the frontend.
- `npm run start`: starts the API server.

## API overview

- `GET /api/health`
- `GET /api/mechanics?lat=..&lng=..&distanceKm=..&maxBudget=..`
- `POST /api/mechanics/register`
- `GET /api/assistance-requests`
- `GET /api/assistance-requests/:id`
- `POST /api/assistance-requests`
- `PATCH /api/assistance-requests/:id/status`

## Environment notes

- `PORT`: API server port. Defaults to `3001`.
- `CLIENT_ORIGIN`: optional comma-separated CORS allowlist for deployed frontends.
- `VITE_API_BASE_URL`: optional frontend API base override for production deployments. Defaults to `/api`.

## Frontend structure

- `src/App.jsx`: orchestrates driver mode, mechanic mode, overlays, and backend-fed state.
- `src/components/LiveMap.jsx`: dark-mode Leaflet map, user pulse marker, and animated mechanic pins.
- `src/components/ServiceRequestSheet.jsx`: rescue request submission flow.
- `src/components/MechanicRegistrationPanel.jsx`: mechanic publishing flow.
- `src/components/RoleDock.jsx`: driver/mechanic mode switcher.

## Backend structure

- `server/src/app.js`: Express app and middleware.
- `server/src/routes/*.routes.js`: API route modules.
- `server/src/services/*.service.js`: mechanics and assistance request business logic.
- `server/data/*.json`: lightweight persistent storage for local development and simple deployments.

## Tailwind notes

- `tailwind.config.js` extends the cyber-garage palette, glow shadows, and keyframed marker animations.
- `src/styles.css` contains Leaflet theming, slider styling, input skins, and custom map marker visuals.

## Free map layer

The map uses CARTO's `dark_all` tiles with OpenStreetMap data, which stays free and aligns with the premium dark-mode visual direction.
# Mechanic_Finder
