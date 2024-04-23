# Project Name

## Introduction

This is a simple Express.js application that provides authentication and sales routes. The application is designed to run on port 3000.

## Structure

The source project is inside `src` folder, and is structured as follows:

- `index.js`: This is the entry point of the application. It sets up the Express server, middleware, and routes.

### Controllers

- `authenticate.js`: This file contains the methods related to token authentication, such as token generation and validation.
- `sales.js`: This file contains the routes for handling sales-related requests.
- `login.js`: This file contains the routes for user login and signup

### Database

- `dbUsers`: This file contains methods with queries related to users on database
- `dbProduct`: This file contains methods with queries related to product on database
- `dbSales`: This file contains methods with queries related to sales table on database
- `dbBase`: This file contains base methods to be used in all other database files.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies with `npm install`.
4. Start the server with `npm start`.

The server will start running at `http://localhost:3000`.

## Goals

The goal of this project is to provide a simple, scalable template for an Express.js application with user authentication and sales functionality.
