
# Vanity Address e-Commerce Webapp
Generates Split Key vanity Addresses trustlessly

## Technologies
Nextjs 14, TailwindCSS, Shadcn/UI, Mongodb, Express

## Getting Started

development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Run build and start application with pm2
```bash
pnpm run build
pm2 start pnpm --name "vanity-service" -- start
```
