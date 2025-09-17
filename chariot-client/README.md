# React Boilerplate# React + TypeScript + Vite

A modern React boilerplate with TypeScript, Tailwind CSS v4, shadcn/ui components, and comprehensive testing setup.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 🚀 FeaturesCurrently, two official plugins are available:

- **React 19** - Latest React version with concurrent features- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

- **TypeScript** - Full type safety and excellent IDE support- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Vite 7** - Lightning-fast development and optimized builds

- **Tailwind CSS v4** - Utility-first CSS with simplified configuration## Expanding the ESLint configuration

- **shadcn/ui** - Beautiful, accessible components built on Radix UI

- **React Router** - Declarative routing for React applicationsIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **React Query** - Powerful data synchronization for React

- **Axios** - Promise-based HTTP client```js

- **Vitest** - Fast unit testing frameworkexport default tseslint.config([

- **@testing-library/react** - Simple and complete testing utilities globalIgnores(['dist']),

- **ESLint & Prettier** - Code linting and formatting {

- **TypeScript-first** - Fully typed development experience files: ['**/*.{ts,tsx}'],

  extends: [

## 📁 Project Structure // Other configs...

````// Remove tseslint.configs.recommended and replace with this

src/      ...tseslint.configs.recommendedTypeChecked,

├── components/      // Alternatively, use this for stricter rules

│   ├── ui/           # shadcn/ui components (Button, Card, Badge, etc.)      ...tseslint.configs.strictTypeChecked,

│   └── VerificationComponent.tsx  # Theme verification component      // Optionally, add this for stylistic rules

├── pages/      ...tseslint.configs.stylisticTypeChecked,

│   └── HomePage.tsx  # Main application page

├── test/      // Other configs...

│   ├── utils/        # Testing utilities and helpers    ],

│   ├── HomePage.test.tsx    languageOptions: {

│   └── VerificationComponent.test.tsx      parserOptions: {

├── App.tsx           # Main application component        project: ['./tsconfig.node.json', './tsconfig.app.json'],

├── main.tsx          # Application entry point        tsconfigRootDir: import.meta.dirname,

└── index.css         # Global styles and theme variables      },

```      // other options...

    },

## 🎨 Theming  },

])

The boilerplate includes a comprehensive theming system with:```



- Custom CSS variables for consistent themingYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

- shadcn/ui integration with theme-aware components

- Dark/light mode support (configured in CSS variables)```js

- Custom color palettes (primary, secondary, accent, warning, danger)// eslint.config.js

import reactX from 'eslint-plugin-react-x'

### Theme Colorsimport reactDom from 'eslint-plugin-react-dom'



```cssexport default tseslint.config([

/* Primary Colors (Blue) */  globalIgnores(['dist']),

--primary-50: #eff6ff;  {

--primary-500: #3b82f6;    files: ['**/*.{ts,tsx}'],

--primary-600: #2563eb;    extends: [

--primary-700: #1d4ed8;      // Other configs...

      // Enable lint rules for React

/* Secondary Colors (Emerald) */      reactX.configs['recommended-typescript'],

--secondary-50: #ecfdf5;      // Enable lint rules for React DOM

--secondary-500: #10b981;      reactDom.configs.recommended,

--secondary-600: #059669;    ],

    languageOptions: {

/* Additional theme colors available... */      parserOptions: {

```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

## 🧪 Testing      },

      // other options...

Comprehensive testing setup with:    },

  },

- **Vitest** - Fast, Vite-native testing framework])

- **@testing-library/react** - React component testing utilities```

- **jest-mock-extended** - Type-safe mocking (available but compatibility may vary)
- **jsdom** - DOM environment for testing
- Automatic test setup and cleanup

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI (requires @vitest/ui)
npm run test:ui
````

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check
```

## 🚦 Getting Started

1. **Clone or copy this boilerplate**

   ```bash
   cp -r react-boilerplate your-new-project
   cd your-new-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **View the application**
   Open [http://localhost:5173](http://localhost:5173) to see the app

5. **Verify theming**
   Navigate to `/verify` to see the theme verification component

## 📦 Adding New Components

### Adding shadcn/ui Components

```bash
# Install new shadcn/ui components as needed
# (Note: Some components may already be configured)
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
```

### Custom Components

1. Create in `src/components/YourComponent.tsx`
2. Export from component file
3. Add tests in `src/test/YourComponent.test.tsx`

## 🎯 Best Practices

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for props and data structures
- Leverage TypeScript's type inference

### Testing

- Write tests for components and utilities
- Use React Testing Library for component tests
- Mock external dependencies appropriately
- Test user interactions and accessibility

### Styling

- Use Tailwind utility classes for styling
- Leverage shadcn/ui components for consistent design
- Follow the established theming patterns
- Use CSS variables for dynamic theming

### Code Organization

- Keep components small and focused
- Use TypeScript interfaces for type definitions
- Separate business logic from UI components
- Follow consistent naming conventions

## 🔧 Configuration

### Tailwind CSS v4

Configured with custom theme colors and shadcn/ui integration. See `tailwind.config.js` for customization.

### Vite

Optimized for development speed with React Fast Refresh and TypeScript support.

### ESLint & Prettier

Pre-configured with React and TypeScript rules for consistent code quality.

### Vitest

Configured with React Testing Library and jsdom for comprehensive testing.

## 📋 Customization Checklist

When using this boilerplate for a new project:

- [ ] Update `package.json` name, description, and version
- [ ] Modify theme colors in `src/index.css` and `tailwind.config.js`
- [ ] Replace placeholder content in `HomePage.tsx`
- [ ] Update or remove the verification component
- [ ] Add your specific routes to the router
- [ ] Configure API endpoints and services
- [ ] Update README.md with project-specific information
- [ ] Set up CI/CD pipelines as needed

## 🤝 Contributing

1. Follow the established code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Use TypeScript for all new code
5. Ensure all tests pass before committing

## 📄 License

This boilerplate is available for use in your projects. Modify as needed for your specific requirements.

---

**Happy coding!** 🎉
