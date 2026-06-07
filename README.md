# Phantom Website

Marketing and information site for [Phantom](https://phantom.com.np) — a Nepal-based embedded systems engineering company specializing in PCB design, firmware development, UAV avionics, IoT platforms, and educational electronics kits.

Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test` | Run test suite (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run lint` | ESLint |

## Project Structure

```
app/                    Next.js App Router pages and API routes
components/             React components (navbar, Hero, Footer, etc.)
data/                   Content data layer (types, adapters, content API)
lib/                    Shared utilities (contact form, cn helper)
hooks/                  Custom React hooks
public/                 Static assets (images, logos, sitemap)
docs/                   Documentation
```

## Documentation

- [Architecture Overview](docs/reference/architecture.md) — tech stack, route structure, component tree, data flow
- [Content Data Layer](docs/reference/content-data.md) — data types, adapter pattern, hardcoded content
- [Navbar Reference](docs/reference/navbar.md) — navigation, mega menus, search modal
- [Contact API](docs/reference/contact-api.md) — form submission endpoint and client API
- [How to Add a Nav Item](docs/howto/add-nav-item.md) — step-by-step guide
- [Content Adapter Pattern](docs/explanation/content-adapter.md) — why content is separated from components
- [Mega Menu Design](docs/explanation/mega-menu-design.md) — Stripe-style panel rationale and trade-offs
