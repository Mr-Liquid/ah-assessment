# Albert Heijn Front-End Assignment: SpaceX Launch Explorer

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project Locally](#running-the-project-locally)
  - [Building for Production](#building-for-production)
  - [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **SpaceX Launch Explorer** is a web-based application built with React and TypeScript. It displays a list of SpaceX launches fetched from the [SpaceX API](https://api.spacexdata.com/v4/launches). Users can view essential details about each launch, search for launches by mission name, filter them by launch year, and add launches to their favorites. Favorites persist across page reloads, enhancing the user experience.

## Features

- **Display Launches:** View a list of SpaceX launches with details such as mission name, launch year, patch image, and status.
- **Search Functionality:** Search for launches by mission name to quickly find specific missions.
- **Filter by Launch Year:** Filter launches based on the year they occurred.
- **Favorites Management:** Add or remove launches from favorites. Favorites are stored in `localStorage` to persist data across sessions.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A strongly typed programming language that builds on JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.
- **Vitest:** A blazing-fast unit test framework.
- **@testing-library/react:** For testing React components.
- **Prettier:** An opinionated code formatter.
- **ESLint:** A pluggable linting utility for JavaScript and JSX.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/)** (v18 or higher)
- **[npm](https://www.npmjs.com/)** (comes with Node.js)

### Installation

1.  **Clone the Repository:**

    ```bash
    https://github.com/AH-Human-Resources/frontend-stp-Ivan-Kauryshchanka.git
    ```

2.  **Navigate to the Project Directory:**

    ```bash
    cd spacex-launch-explorer
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

### Running the Project Locally

1.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
2.  **Open in Browser:**<br />
    Navigate to http://localhost:3000 in your web browser to view the application.
    ```bash
    npm run dev
    ```

### Building for Production

To create an optimized production build: <br />
<br />
**Run:**

```bash
npm run build
```

The build artifacts will be stored in the **_dist_** directory. <br />

To run production build locally run: <br />
<br />
**Run:**

```bash
npm run preview
```

NOTE: production build should be ready beforehand.

### Running Tests

The project uses Vitest and @testing-library/react for testing.

**Execute All Tests:**

```bash
npm run test
```

### Linting and Formatting

Maintain code quality with ESLint and Prettier.

1.  **Run Linting:**

    ```bash
    npm run lint
    ```

2.  **Format Code:**

    ```bash
    npm run format
    ```
