# Transaction Statistics Application

This application provides an interface to fetch, display, and analyze transaction data. It consists of a backend built with Express and Axios, and a frontend that displays the data in a user-friendly manner.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Configuration](#configuration)
- [Steps to Run](#steps-to-run)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features
- Fetches transaction data from a remote JSON file.
- Displays statistics on total sales, sold, and unsold items.
- Filters transactions by month.
- Provides data for bar and pie chart representations of transactions based on categories.

## Technologies Used
- **Backend**: Node.js, Express, Axios
- **Frontend**: HTML, CSS , React JS
- **Styling**: Custom CSS for responsive design

## Configuration
1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone the repository:
   ```bash
   git clone (https://github.com/Rakesh3117/mern-stack-project.git)
   cd MernStackCoadingChallenge

3. Navigate to Backend Folder to Run the Server
     ```bash
    cd Backend
    npm install
    npm start

- The server will run on http://localhost:5000.
   
5. Open Another Terminal to run the Application
     ```bash
     cd mern-stack-coading-challenge
     npm install
     npm start

4. The Application will run on http://localhost:3000.

## Usage
- **Home Page**: Displays all transactions.
- **Statistics Page**: Use the query parameters to filter transactions by month. You can retrieve:
     - Total sales and counts of sold and unsold items.
     - Filtered transactions for bar chart representation.
     - Category counts for pie chart representation.

## API Endpoints
- **GET /**: Fetches all transactions.
- **GET /statistics?month=MM**: Fetches sales statistics for the specified month.
- **GET /statistics/bar?month=MM**: Fetches transactions for the specified month for bar representation.
- **GET /statistics/pie?month=MM**: Fetches category counts for the specified month for pie representation.



