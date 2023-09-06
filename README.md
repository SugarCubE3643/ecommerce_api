# Ecommerce API

This is a Node.js API for managing product inventory in an ecommerce platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Prerequisites

- Node.js (version 20.3.0)
- MongoDB (version 6.0.3)
- npm (Node Package Manager)

## Installation
1. **Clone the repository:**
   ```shell
   git clone https://github.com/SugarCubE3643/ecommerce_api.git
   ```
2. **Navigate to the project directory:**
   ```shell
   cd your-project
   ```
3. **Install dependencies:**
   ```shell
   npm install
   ```
## Configuration

To run this project, you will need to add the following environment variables to your .env file

`PORT` = 8000

`MONGODB_URI` = mongodb://127.0.0.1:27017/ecommerce

- The values above are default or commonnly used values, change them depending on your local system.

## Usage
1. **Start the server:**
   ```shell
   npm start
   ```
- There should be two console messages
   - Server is running on port 8000
   - Connected to the database 
2. **API Endpoints:**

**Use Postman application or REST Client VS Code Extension for using the API**

**I have provided template for REST Client API usage in the .rest file**

- Create Product

   Endpoint: `POST http://127.0.0.1:PORT/products/create`
  
   Headers: `Content-Type: application/json`
   ```json
   {
        "name":"Example Product",
        "quantity":30
   }
   ```
- List Products

   Endpoint: `GET http://localhost:8000/products`
   
- Delete a Product

   Endpoint: `DELETE http://localhost:8000/products/:id`

   - Replace :id with a valid product id
   
- Update Quantity of a Product

   Endpoint: `PATCH http://localhost:8000/products/:id/update_quantity?number={Update_Quantity_By}`
  
   Headers: `Content-Type: application/json`

   - Replace :id with a valid product id
   - Replace {Update_Quantity_By} with the quantity you want to add or subtract from the existing quantity of the product
     - A positive value will add up to the current quantity
     - A negative value will be subtracted from the current quantity

## License
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)


