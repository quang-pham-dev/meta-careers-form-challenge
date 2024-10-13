# Meta Careers Form Challenge

## Project Overview

This project implements a modern Sign Up form using Next.js, React, and various cutting-edge libraries. It showcases form validation techniques, reusable UI components, and focuses on the behavior of a Sign Up form, demonstrating best practices in modern web development.

## Tech Stack

### Core Technologies:

- [Next.js](https://nextjs.org/) (v15.0.0-rc.0)
- [React](https://react.dev/) (v19.0.0-rc-06d0b89e-20240801)
- [React DOM](https://reactjs.org/docs/react-dom.html) (v19.0.0-rc-06d0b89e-20240801)
- [TypeScript](https://www.typescriptlang.org/) (v5)

### Form Handling and Validation:

- [React Hook Form](https://react-hook-form.com/) (v7.53.0)
- [Zod](https://github.com/colinhacks/zod) (v3.23.8)
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) (v3.9.0)

### UI and Styling:

- [Tailwind CSS](https://tailwindcss.com/) (v3.4.1)
- [Shadcn/ui](https://ui.shadcn.com/) (v0.0.4)
- [Lucide React](https://lucide.dev/) (v0.451.0)
- [Framer Motion](https://www.framer.com/motion/) (v11.11.8)
- [Radix UI](https://www.radix-ui.com/) components:
  - [@radix-ui/react-icons](https://www.radix-ui.com/icons) (v1.3.0)
  - [@radix-ui/react-label](https://www.radix-ui.com/primitives/docs/components/label) (v2.1.0)
  - [@radix-ui/react-select](https://www.radix-ui.com/primitives/docs/components/select) (v2.1.2)
  - [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot) (v1.1.0)
  - [@radix-ui/react-toast](https://www.radix-ui.com/primitives/docs/components/toast) (v1.2.2)
- [class-variance-authority](https://cva.style/docs) (v0.7.0)
- [clsx](https://github.com/lukeed/clsx) (v2.1.1)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) (v2.5.3)
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) (v1.0.7)

### Utilities:

- [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) (v1.11.11)

### Development Tools:

- [ESLint](https://eslint.org/) (v8)
- [Prettier](https://prettier.io/) (v3.3.3)

### Testing:

- [Vitest](https://vitest.dev/) (v2.1.2)
- [Playwright](https://playwright.dev/) (v1.48.0)

## Project Features

This project demonstrates:

1. Sign-up form implementation inspired by Meta's careers page
2. Form validation using Zod schemas
3. ~~Responsive design with Tailwind CSS~~
4. Reusable UI components from shadcn/ui
5. Error handling and user feedback
6. Unit testing with Vitest
7. End-to-end testing with Playwright

## Getting Started

### Prerequisites:

Ensure you have Node.js and pnpm installed on your system. Use the versions specified in the `package.json` file.

### Running the Project

To run the project locally:

1. Install dependencies:

   ```
   pnpm install
   ```

2. Start the development server:

   ```
   pnpm dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

For production:

1. Build the project:

   ```
   pnpm build
   ```

2. Start the production server:
   ```
   pnpm start
   ```

### Running Tests

To run unit tests:

```
pnpm test
```
