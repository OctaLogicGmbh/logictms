# Stack

- Runtime: `nodejs 22` & `pnpm`
- bundler: `Vite 5`
- Framework: `React 18`
- Routing: `React Router`
- Styling: `Tailwind 3.4` / `Postcss` / `shadcn`
- Forms: `React Hook Form` // This is currently unused
- Linting: `Eslint 8` / `Prettier` (tailwind plugin)
- Schemas: `Zod`
- Server: `Hono`

# Getting Started

Install PNPM globally

```sh
npm install -g pnpm
```

Start the development server

```sh
pnpm install
pnpm run dev
```

# `.env` Files | [DOCS](https://vitejs.dev/guide/env-and-mode#env-files)

Vite uses `dotenv` to load additional environment variables from the following files in your environment directory:

```sh
.env # loaded in all cases
.env.local # loaded in all cases, ignored by git
.env.[mode] # only loaded in specified mode
.env.[mode].local # only loaded in specified mode, ignored by git
```

# Build for Production

```sh
pnpm run build
```

This will build your app for production to the `dist` folder and client side assets to the `build` folder.

# Run Production Server

```sh
pnpm run start
```

# Mock data

Mock data is stored in `./.mock` directory.
You can define your mock data in `./.mock` folder.

`unstorage` packages is used to store data in memory / file system / redis.
You can change the storage type in `./src/api/shipments/service.ts` file.
[unstorage docs](https://unstorage.unjs.io/)

# Models and Schemas

Models and Schemas are stored in `./src/models` directory.
`zod` package is used to define schemas and models.
[zod docs](https://zod.dev/)

# Routes, Forms and Data

Currently all forms work with `actions` and `loaders` with `react-router-dom`.
[react-router-dom docs](https://reactrouter.com/en/main)

# Form errors

Form action data is used to display form errors.
Example of errors can be found in `./src/routes/shipments/shipment/steps/sub-steps/components/SubStepActionData.tsx` component.

# Shipments Data Sync

Logic for syncing shipments data is stored in `./src/routes/shipments/shipment/components/ShipmentRevalidator.tsx` file.

# Sub Steps

All sub steps are stored in `./src/routes/shipments/shipment/steps/sub-steps/forms` directory.
Routing for sub steps is defined in `./src/routes/shipments/shipment/steps/sub-steps/route.ts` file.

# API

API is stored in `./src/api` directory.
`client` is used to make API RPC calls.
