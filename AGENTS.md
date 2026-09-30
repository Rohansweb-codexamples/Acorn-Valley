# Acorn Valley

An isometric farm-building game built with React + Vite.

## Running locally

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

The app is served on port 3000 (mapped to Vite dev server on 5173).

## Tech stack

- React 18 + Vite 6
- No backend — pure frontend game
- Game assets are remote images hosted on Base44 media CDN

## How it works

- Isometric tile grid rendered with CSS clip-path diamonds
- Buildings produce acorns over time; click to collect
- Build & Shop menu lets you place new buildings on grass tiles
- Quest system with character-driven tasks
- Resource management: acorns (currency) and stars (premium)
