# Fullstack Challenge

## Project Structure

This project is set up as a monorepo using npm workspaces with the following structure:

```
fullstack-challenge/
├── apps/
│   ├── backend/                 # Express TypeScript backend
│   │   │── core                 # Core logic (this could be an independent package)
│   │   │   │──  domain
│   │   │   │──  infrastructure
│   │   │   └──  services
│   │   └── handlers             # Handlers for API endpoints
│   └── frontend/                # React TypeScript frontend
└── packages/
    └── eslint-config/           # Shared ESLint configuration
```

## Technologies Used

### Backend
- Node.js with Express
- TypeScript
- fp-ts (functional programming utilities)
- Zod for validation
- Vitest for testing

### Frontend
- React 19
- TypeScript
- Vite
- TanStack React Query
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

#### Backend

```bash
npm run backend
```

The backend will start in development mode and will automatically restart when changes are detected.
It will be served by default at `http://localhost:5000`.

#### Frontend

The environment variable `VITE_SONGS_API_URL` needs to be set to the URL of the backend API.
You can use the `.env.example` file as a template.

```bash
npm run frontend
```

The frontend development server will start and open in your default browser.

### Linting

```bash
npm run lint
```
