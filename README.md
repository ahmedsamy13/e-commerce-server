# E-commerce Category API

An ongoing e-commerce backend project built with Node.js, Express 5, PostgreSQL, Prisma 8 prerelease packages, and Zod. The current implementation supports creating, listing, retrieving, and updating product categories.

## Implemented features

- Four REST endpoints under `/api/v1/category`.
- Separate router, controller, validation, and database modules.
- Zod request-body validation for category titles.
- PostgreSQL persistence through Prisma's contract-based runtime.
- Unique category titles backed by a database enum.
- Database connectivity check before the HTTP server starts.
- Graceful HTTP server and database shutdown on SIGINT and SIGTERM.
- Product and category data models with a one-to-many relationship.

## API reference

See [API.md](API.md) for request examples, response shapes, and current error behavior.

| Method | Path | Operation |
| --- | --- | --- |
| GET | `/api/v1/category` | List categories |
| POST | `/api/v1/category` | Create a category |
| GET | `/api/v1/category/:id` | Retrieve a category |
| PATCH | `/api/v1/category/:id` | Update a category |

## Local setup

Use a Node.js version matching `package.json` (`^22.18.0`, `^24.11.0`, or `>=26.0.0`) and a local development PostgreSQL database.

```sh
git clone --branch category https://github.com/ahmedsamy13/e-commerce-server.git
cd e-commerce-server
npm ci
```

Copy `.env.example` to `.env` and set `DATABASE_URL` for your development database. `PORT` defaults to `3000`.

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ecommerce?schema=public"
PORT=3000
```

The repository uses Prisma 8 prerelease tooling. Follow [PRISMA-WORKFLOW.md](PRISMA-WORKFLOW.md) to generate the contract, plan/apply database changes, and verify the schema. Run migration commands against your development database.

```sh
npm run db:check
npm run dev
```

Use `npm start` to start without watch mode and `npm run lint` for linting.

## Project structure

```text
app.js                         Express application and route mount
server.js                      Database check, startup, and shutdown
src/routes/category.js         Category endpoints
src/controllers/               Request handlers
src/validators/                Zod schemas
src/prisma/                    Data contract and database connection
migrations/                    Database migration history
```

## Current scope

This is a work in progress. The mounted API currently covers categories. Product routes, authentication, and category deletion are future work. The checked-in product model and installed JWT/bcrypt dependencies describe planned building blocks.

Documentation was checked against the source on the `category` branch. Runtime examples are illustrative and have not been verified against a running database. A public hosted API demo is not listed in this repository.
