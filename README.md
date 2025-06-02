# ORM Cars Task

**ORM Cars Task** is a Node.js project that demonstrates my expertise in working with relational databases using Sequelize ORM and MySQL. It simulates a car dealership management system, including operations such as creating dealerships, managing users, assigning users to dealerships, managing cars, and allowing users to rate cars. The purpose of this project is to showcase structured ORM-based data modeling and querying in a clean and modular codebase.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dealership Management**
  - Create and view dealership records
  - Associate cars and users with dealerships

- **User Management**
  - Register users
  - Assign users to dealerships

- **Car Inventory**
  - Add cars to dealerships
  - View cars and their ratings

- **Rating System**
  - Users can rate cars
  - Average ratings can be retrieved per car

- **Data Queries**
  - Fetch dealerships with their cars and users
  - Retrieve all cars with ratings and creators
  - Query specific dealership information

---

## Technologies Used

- Node.js
- Express.js
- Sequelize
- MySQL
- sequelize-cli

---

## Installation and Setup

### Prerequisites

- Node.js and yarn installed
- MySQL installed and running
- Basic understanding of how to run SQL queries or use Sequelize CLI

### Steps

1. Clone the repository

   ```bash
   git clone https://github.com/AramArakelyan777/simply-orm-cars-task.git
   cd simply-orm-cars-task
   ```

2. Install dependencies

   ```bash
    yarn
   ```

3. Configure environment variables

   Create a `.env` file in the root directory:

   ```env
    PORT="server-port"
    DB_URL="mysql-db-url"
    DB_DIALECT="mysql"
   ```

4. Create the MySQL database

   Log into MySQL and run:

   ```sql
   CREATE DATABASE your_database_name;
   ```

5. Run migrations

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Seed initial data (optional)

   ```bash
   npx sequelize-cli db:seed:all
   ```

7. Start the server

   ```bash
   yarn dev
   ```

---

## Usage

Once the server is running at `http://localhost:5000`, you can use tools like Postman or curl to interact with the API.

### Sample Endpoints

#### Dealerships

- `GET /dealerships` – Retrieve all dealerships

- `POST /dealerships`

  ```json
  {
    "name": "AutoMall",
    "address": "Downtown"
  }
  ```

#### Users

- `POST /users`

  ```json
  {
    "name": "Alice",
    "email": "alice@example.com"
  }
  ```

#### Cars

- `POST /dealerships/:dealershipId/cars`

  ```json
  {
    "make": "Toyota",
    "model": "Camry",
    "year": 2022
  }
  ```

- `GET /cars` – List all cars

#### Ratings

- `POST /cars/:carId/rate`

  ```json
  {
    "userId": 1,
    "rating": 5
  }
  ```

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes

   ```bash
   git commit -m "Add feature"
   ```

4. Push to the branch

   ```bash
   git push origin feature-name
   ```

5. Open a pull request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
