# Task Tracker

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), using with Framer Motion animations, Tailwind CSS styling, Bulletproof React patterns & Jest testing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure and Features

### Styling with Tailwind CSS

This project uses Tailwind CSS for styling. Tailwind provides a utility-first CSS framework that helps you build custom designs without leaving your HTML/JSX.

Key features:

- Utility-first CSS framework
- Built-in responsive design utilities
- Custom configuration in `tailwind.config.js`
- PostCSS integration with Next.js

### Animations with Framer Motion

Framer Motion is integrated to provide smooth, powerful animations:

- Page transitions
- Component animations
- Variants for coordinated animations

### Code Structure (Bulletproof React)

This project follows Bulletproof React architecture patterns for maintainable and scalable code:

```
src/
  ├── components/
  │   ├── common/
  │   └── features/
  ├── hooks/
  ├── features/
  ├── lib/
  ├── app/
  └── constants/
```

Key principles:

- Feature-based architecture
- Shared components and hooks
- Consistent file naming
- Type safety with TypeScript
- State management patterns using context API

### Testing with Jest

The project uses Jest for unit and integration testing:

```bash
# Run tests
npm test
# or
yarn test

# Run tests in watch mode
npm test:watch
# or
yarn test:watch
```

Testing guidelines:

- Test files located next to implementation
- Use React Testing Library for component tests
- Mock external dependencies
- Coverage reports in `/coverage`

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
