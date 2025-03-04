# Frontend Application

React + TypeScript + Vite application with Cypress testing setup.

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI
- Cypress (E2E & Component Testing)
- ESLint
- React Router DOM

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn

### Installation

```bash
cd packages/frontend
yarn install
```

### Development

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Testing

### Cypress Configuration

The project uses Cypress for both E2E and Component testing. Configuration is in `cypress.config.js`:

```javascript
{
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents() {
      // implement node event listeners here
    }
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite"
    }
  }
}
```

### Cypress Environment Setup

Create a `cypress.env.json` file in the frontend directory:

```json
{
  "signInEmail": "your-test-email@example.com",
  "signInPassword": "your-test-password"
}
```

Required Cypress environment variables:

- `signInEmail`: Test user email for authentication tests
- `signInPassword`: Test user password for authentication tests

Note: `cypress.env.json` is gitignored by default for security. You can also set these variables using:

```bash
CYPRESS_signInEmail=email CYPRESS_signInPassword=password yarn cy:run
```

### Running Tests

```bash
# Open Cypress Test Runner
yarn cy:open

# Run E2E tests in headless mode
yarn cy:run-e2e

# Run Component tests
yarn cy:run-unit
```

### Test Structure

```
cypress/
├── component/        # Component tests
├── e2e/             # End-to-end tests
│   ├── auth/        # Authentication tests
│   └── crud/        # CRUD operation tests
├── fixtures/        # Test data
└── support/         # Support files and commands
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

Required environment variables:

- `VITE_API_URL`: Backend API URL
- `CYPRESS_BASE_URL`: Base URL for Cypress tests

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── hooks/          # Custom React hooks
├── pages/          # Page components
└── App.tsx         # Main application component
```

## Authentication

The application uses `@concepta/react-auth-provider` for authentication with features:

- Sign In
- Social Sign In (Google, Apple)
- Forgot Password
- Reset Password

## Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn lint`: Run ESLint
- `yarn preview`: Preview production build
- `yarn cy:open`: Open Cypress Test Runner
- `yarn cy:run-e2e`: Run E2E tests
- `yarn cy:run-unit`: Run component tests

## Docker Support

The application includes Docker configuration for containerized development:

```bash
# Build and run with Docker
docker build -t frontend .
docker run -p 5173:5173 frontend

# Or using docker-compose from root directory
docker-compose up frontend
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
