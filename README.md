# Project Overview

This is a Next.js task tracker application that uses Supabase for authentication and database storage. The application allows users to sign up, log in, and manage their tasks. The frontend is built with React and Tailwind CSS.

## About the Project

This project is a task tracker application built with the following technologies:

*   **Frontend:** Next.js, React, Tailwind CSS
*   **Backend & Authentication:** Supabase
*   **Deployment:** Vercel

**Live Demo:** [https://task-tracker-eosin-two.vercel.app/](https://task-tracker-eosin-two.vercel.app/)

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn/pnpm/bun)
*   A Supabase project with a `tasks` table.

### Installation

1.  Clone the repository.
2.  Install the dependencies:

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### Running the Development Server

First, run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building and Running (Production)

To build the application for production, use the following command:

```bash
npm run build
```

To run the application in production, use the following command:

```bash
npm run start
```

## Development Conventions

### Code Style

The project uses ESLint to enforce a consistent code style. To run the linter, use the following command:

```bash
npm run lint
```

### Supabase Schema

The `tasks` table in Supabase should have the following columns:

*   `id` (uuid, primary key)
*   `user_id` (uuid, foreign key to `auth.users`)
*   `title` (text)
*   `is_completed` (boolean)
*   `created_at` (timestamp with time zone)
*   `description` (text, optional)

### Authentication

The application uses Supabase for authentication. The `middleware.ts` file protects the `/dashboard` route from unauthenticated users and redirects logged-in users from the login page to the dashboard.