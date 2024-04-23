# ExpressJS API Test Project

## Introduction

This project contains a suite of tests written in Robot Framework for validating API endpoints of an Express.js application. The tests are designed to ensure that the API behaves as expected under various conditions.

## Structure

The project is structured as follows:

- `login_tests.robot`: This file contains tests for the login functionality of the application. It includes tests for scenarios such as invalid login attempts with wrong credentials.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies with `pip install robotframework robotframework-requests`.
4. Run the tests with `robot login_tests.robot`.

To run the tests with the output directory:
```
robot --outputdir report login_tests.robot
```

The tests will start running and you will see the results in the terminal.

## Goals

The goal of this project is to provide a comprehensive suite of tests for an Express.js application's API endpoints, ensuring that they function correctly under various conditions.

