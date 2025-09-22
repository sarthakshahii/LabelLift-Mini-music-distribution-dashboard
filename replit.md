# Overview

LabelLift is a music track management platform designed for artists and record labels to upload, manage, and track their music releases. The application provides a comprehensive dashboard for monitoring track status, analytics, and earnings while supporting the full music distribution workflow from upload to release.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript and follows a component-based architecture:

- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and React Context for authentication
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a feature-based folder structure with shared components, pages, and utility functions. The UI supports both light and dark themes through next-themes integration.

## Backend Architecture

The backend follows a REST API architecture built with Express.js:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod for runtime type checking and validation
- **Storage**: In-memory storage implementation (IStorage interface) for development, designed to be easily replaceable with database implementations
- **Authentication**: Mock authentication system (ready for production auth integration)

The server implements a layered architecture with separate concerns for routing, storage, and business logic.

## Data Storage Solutions

The application uses PostgreSQL as the primary database:

- **Database**: PostgreSQL configured through Neon serverless
- **ORM**: Drizzle ORM with migrations support
- **Schema**: Defined in shared schema file for type consistency between frontend and backend
- **Tables**: Users and tracks with proper relationships and constraints

The storage layer uses an interface pattern allowing for easy swapping between different storage implementations.

## Authentication and Authorization

Currently implements a mock authentication system:

- **Mock Login**: Accepts any non-empty credentials for development
- **Session Management**: Client-side session storage using localStorage
- **Protected Routes**: React components check authentication status
- **Context API**: Authentication state managed through React Context

The authentication system is designed to be easily replaced with production-ready solutions like JWT, OAuth, or session-based authentication.

## Component Architecture

The UI follows atomic design principles:

- **UI Components**: Reusable components built on Radix UI primitives
- **Layout Components**: Sidebar, header, and navigation components
- **Feature Components**: Track management, statistics, and form components
- **Pages**: Route-level components that compose smaller components

All components are fully typed with TypeScript and use consistent styling through the design system.

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL serverless database hosting
- **Drizzle Kit**: Database migration and schema management tools

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **next-themes**: Theme management for light/dark mode support

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Autoprefixer

## React Ecosystem
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form validation and management
- **Wouter**: Lightweight routing library
- **React DOM**: React rendering library

## Validation and Forms
- **Zod**: Runtime schema validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Replit Integration
- **Replit Vite Plugins**: Development experience enhancements for Replit environment