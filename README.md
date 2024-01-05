# Airbnb Clone App

## Overview

This is a React Native and Expo TypeScript application that replicates the basic functionality and user interface of the Airbnb app. It allows users to browse and search for properties, view property details, and make reservations.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/airbnb-clone.git
cd airbnb-clone
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Start the Expo development server:

```bash
expo start
```

4. Follow the Expo CLI instructions to run the app on an emulator or a physical device.

## Usage

Once the app is running, you can use it to:

- Browse available properties
- View property details
- Make reservations

## Features

- Browse and search for properties
- View property details with images, descriptions, and amenities
- User authentication and profile management
- Reservation system with booking confirmation
- Interactive maps for property locations

## Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Folder Structure

The project follows a modular folder structure:

```
airbnb-clone/
|-- assets/
|-- src/
|   |-- components/
|   |-- screens/
|   |-- navigation/
|   |-- services/
|   |-- styles/
|-- App.tsx
|-- ...
```

- **assets:** Contains static assets such as images and fonts.
- **src:** Contains the source code of the application.
  - **components:** Reusable UI components.
  - **screens:** Individual screens or pages of the application.
  - **navigation:** Navigation-related configurations.
  - **services:** API services and utility functions.
  - **styles:** Global styles and theme configuration.

## Contributing

Contributions are welcome! Please check the [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the [MIT License](LICENSE).
