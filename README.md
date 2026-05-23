# GitHub Explorer

A  web application for exploring GitHub profiles and repositories. Search for users, view their detailed profiles, and browse their projects with ease.

## Features

- **User Search:** Find any GitHub user instantly.
- **Detailed Profiles:** View comprehensive user profiles, including stats like followers, following, and public repositories.
- **Repository Browser:** Explore a user's repositories with options to sort and filter.
- **Favourites:** Keep track of your favorite developers by adding them to your personal Favourites list.
- **Recent Searches:** Quickly access your recent search history.
- **Responsive Design:** A beautiful and functional interface that works on all screen sizes, from mobile to desktop.
- **Rate Limit Awareness:** The app smartly handles GitHub API rate limits, keeping you informed.

## Tech Stack

- **Frontend:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components:** Built with [Shadcn](https://ui.shadcn.com/) primitives for accessibility and [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons.
- **Routing:** [React Router](https://reactrouter.com/) for client-side navigation.
- **Linting:** [ESLint](https://eslint.org/) for code quality.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/github-explorer.git
    cd github-explorer
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

### Running the Development Server

To start the local development server, run the following command:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

### Building for Production

To create a production-ready build, run:

```sh
npm run build
```

This will create a `dist` folder with the optimized and minified files. You can preview the production build locally with `npm run preview`.

