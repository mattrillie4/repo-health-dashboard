# GitHub Repo Health Dashboard

A learning-focused Next.js application that inspects a public GitHub repository
and presents a simple repository health report.

The project is currently an early work in progress. Repository search and the
first GitHub API integration are in place, while the health score and several
repository checks are still being developed.

## Current features

- Search for a public repository by owner and repository name
- Fetch repository data through a Next.js Route Handler
- Display basic repository information, including:
  - Description
  - Primary language
  - Stars
  - Forks
  - Open issues
  - License presence
- Display loading and API error states

Some displayed health fields are currently placeholders and should not yet be
treated as complete repository analysis.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [GitHub REST API](https://docs.github.com/en/rest)

## How it works

The browser does not call GitHub directly. It calls a Route Handler provided by
the same Next.js application:

```text
Search form
    |
    v
GET /api/repos/{owner}/{repo}
    |
    v
GitHub REST API
    |
    v
Repository report displayed in the browser
```

The endpoint is implemented at:

```text
src/app/api/repos/[owner]/[repo]/route.ts
```

For example, requesting:

```text
/api/repos/facebook/react
```

retrieves information about the `facebook/react` repository.

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/mattrillie4/repo-health-dashboard.git
cd repo-health-dashboard
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You can also test the API endpoint directly:

```text
http://localhost:3000/api/repos/facebook/react
```

## Available scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run lint
```

Checks the project with ESLint.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build after `npm run build`.

## Project structure

```text
src/
├── app/
│   ├── api/repos/[owner]/[repo]/route.ts
│   ├── data/fakeRepoReports.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── RepoSummary.tsx
│   └── SearchForm.tsx
└── lib/
    └── types.ts
```

- `app/page.tsx` coordinates the search and report state.
- `components/SearchForm.tsx` handles repository input.
- `components/RepoSummary.tsx` renders the current report.
- `app/api/repos/[owner]/[repo]/route.ts` communicates with GitHub.
- `lib/types.ts` contains the application's repository report type.
- `app/data/fakeRepoReports.tsx` contains temporary development data and is
  expected to be removed once the live report is complete.

## Planned work

- Improve client-side and server-side input validation
- Add accurate loading, empty, and error states
- Remove the remaining fake report data
- Define types for the GitHub API data used by the application
- Detect README and CI workflow presence
- Retrieve open pull requests and language breakdowns
- Create transparent repository health checks
- Calculate a real health score from those checks
- Generate practical improvement recommendations
- Add automated tests for data mapping and scoring
- Improve responsive styling and accessibility

## GitHub API usage

The application currently accesses public GitHub data without authentication.
Unauthenticated GitHub API requests have a relatively low rate limit.

A future version can use a GitHub token stored in `.env.local`. Secrets should
only be read by server-side code and must never be exposed through a
`NEXT_PUBLIC_` environment variable.

## Project status

This project is being built incrementally as a way to learn Next.js, React,
TypeScript, API integration, validation, and application architecture.

It is not currently intended for production use.

## License

No license has been selected for this project yet.
