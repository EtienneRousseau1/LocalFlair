# LocalFlair

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Video](#video)

## Introduction

LocalFlair is a platform designed to connect artisans and help them sell their products while fostering community connections. The application is built using modern web technologies including React for the frontend, Go for the backend, and Postgres for the database. It features user authentication via Google OAuth and provides capabilities for managing user profiles and product listings. The backend is containerized for easy deployment, and the frontend is styled using Tailwind CSS.

## Features

- User authentication via Google OAuth
- Profile management (edit and delete)
- Product listing management (create, edit, and delete)
- Shopping cart functionality
- Responsive design using Tailwind CSS
- Containerized backend for easy deployment

## Requirements

To run LocalFlair, you will need the following:

- Docker
- Docker Compose
- Node.js and NPM

## Installation

Follow these steps to set up the LocalFlair application:

1. **Clone the repository:**
```sh
    git clone https://github.com/EtienneRousseau1/LocalFlair
   cd LocalFlair
   cd Backend
   ```
2. Create a .env file:
   Create a .env file with your database connection details and API keys.

3. Build and run the Docker containers for the backend and database:
   ```sh
    docker-compose up --build
   ```
   
4. Navigate to the frontend directory:
   ```sh
    cd ..
   cd Frontend
   ```
   
5. Install Packages
   ```sh
   npm install
   ```

6. Set Up The API link in .env
   ```sh
   REACT_APP_BACKEND_URL = "http:localhost:8080"
   ```
   
7. Start the Application
```sh
   npm run start
   ```
## Usage

After completing the installation steps, you can start using the LocalFlair application:

1. **Access the frontend:**
   - Open your browser and navigate to `http://localhost:3000` to access the application.

2. **Access the backend:**
   - Ensure your Go backend is running and connected to your Postgres database.

## Maintainers

- **Etienne Rousseau**  
  3rd Year, UC Davis  
  Email: [erousseau@ucdavis.edu](mailto:erousseau@ucdavis.edu)
  GitHub: [EtienneRousseau1](https://github.com/EtienneRousseau1)

##  Video

Watch the demo video to see LocalFlair in action:

[![LocalFlair Demo](https://img.youtube.com/vi/-fTbP_buc-4/0.jpg)](https://youtu.be/-fTbP_buc-4)
