# Car Rental API Documentation
Welcome to the Car Rental API! This API allows users to manage cars, customers, and rental transactions for a car rental service. Below you will find a comprehensive guide on how to use the API.

## Table of Contents
1. Getting Started
2. Authentication
3. Endpoints
- User APIs
- Car APIs
- Rental APIs
- Special APIs
4. Models
- Car
- Customer
- Rental
5. Error Handling
6. Rate Limiting
7. Changelog
8. Support
### Getting Started
To start using the Car Rental API, follow these steps:

Register an Account: Sign up for an API key by registering on our website.
Base URL: All API requests should be made to the following base URL: https://api.carrental.com/v1
### Authentication
All API requests require an API key. Pass your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

### Endpoints
User APIs
Signup
Create a new user account.

Endpoint: /users/signup
Method: POST

```
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "phone": "555-1234"
}
```

Sign in
Authenticate a user and obtain an API token.

Endpoint: /users/signin
Method: POST

```
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```
Get a Specific User
Retrieve details of a specific user by their ID.

Endpoint: /users/:id
Method: GET
```
GET /users/:id
```
Get All Users
Retrieve a list of all users.

Endpoint: /users
Method: GET
```
GET /users
```
Update User (Owner Only)
Update details of an existing user (only the owner can update).

Endpoint: /users/:id
Method: PATCH
```
PATCH /users/{id}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "phone": "555-5678"
}
```
Delete User (Owner Only)
Remove a user from the system (only the owner can delete).

Endpoint: /users/:id
Method: DELETE
```
DELETE /users/:id
```
Car APIs
Add Car
Add a new car to the fleet.

Endpoint: /cars
Method: POST
```
POST /cars
Content-Type: application/json

{
  "name": "Ferrari Enzo",
  "model": "Ferrari",
  "rentalStatus": "available"
}
```
Get a Specific Car
Retrieve details of a specific car by its ID.

Endpoint: /cars/:id
Method: GET
```
GET /cars/:id
```
Get All Cars
Retrieve a list of all cars.

Endpoint: /cars
Method: GET
```
GET /cars
```
Update Car
Update details of an existing car.

Endpoint: /cars/:id
Method: PATCH
```
PATCH /cars/:id
Content-Type: application/json

{
  "name": "Ferrari Laferrari",
  "model": "Ferrari",
  "rentalStatus": "available"
}
```
Delete Car
Remove a car from the fleet.

Endpoint: /cars/:id
Method: DELETE
```
DELETE /cars/:id
```
Rental APIs
Create Rental
Create a new rental transaction.

Endpoint: /rentals
Method: POST
```
POST /rentals
Content-Type: application/json

{
  "car": "1",
  "rental_date": "2024-07-01",
  "return_date": "2024-07-10"
}
```
Update Rental
Update details of an existing rental.

Endpoint: /rentals/:id
Method: PUT
```
PUT /rentals/:id
Content-Type: application/json

{
  "car": "2",
  "rental_date": "2024-06-01",
  "return_date": "202:-0-10"
}
```
Delete Rental
Delete a rental record.

Endpoint: /rentals/:id
Method: DELETE
```
DELETE /rentals/:id
```
Get All Rentals
Retrieve a list of all rentals.

Endpoint: /rentals
Method: GET
```
GET /rentals
```
Get a Specific Rental
Retrieve details of a specific rental by its ID.

Endpoint: /rentals/:id
Method: GET
```
GET /rentals/:id
```
Special APIs
Get Cars by Model (Honda and Toyota)
Retrieve a list of all cars whose model is either Honda or Toyota.

Endpoint: /cars
Method: GET
Query Params: model=Honda,Toyota
```
GET /cars?model=Honda,Toyota
```
Get Available Cars of a Specific Model
Retrieve a list of all available cars of a specific model.

Endpoint: /cars
Method: GET
Query Params: model=<model>&status=available
```
GET /cars?model=Corolla&status=available
```
Get Cars that are Either Rented or of a Specific Model
Retrieve a list of cars that are either rented or of a specific model.

Endpoint: /cars
Method: GET
Query Params: model=<model>&status=rented
```
GET /cars?model=Camry&status=rented
```
Get Available Cars of Specific Models or Rented Cars of a Specific Model
Retrieve a list of available cars of specific models or rented cars of a specific model.

Endpoint: /cars
Method: GET
Query Params: model=<model1>,<model2>&status=available,rented
```
GET /cars?model=Accord,Civic&status=available,rented
```
### Models
```
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    rentalStatus: {
      type: String,
      enum: ["available", "rented"],
      default: "available",
    },
  },
  { timestamps: true }
);

```
```
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phonenumber: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

```
```
const rentalSchema = new mongoose.Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    rentalDate: {
      type: Date,
      default: Date.now
    },
    returnDate: { type: Date },
  },
  { timestamps: true }
);

```

### Error Handling
The API uses standard HTTP status codes to indicate success or failure of requests:

- 200 OK: The request was successful.
- 201 Created: The resource was successfully created.
- 400 Bad Request: The request was invalid or cannot be otherwise served.
- 401 Unauthorized: Authentication failed or user does not have permissions.
- 404 Not Found: The requested resource could not be found.
- 500 Internal Server Error: An error occurred on the server.
### Rate Limiting
To ensure fair usage and prevent abuse, the API has rate limiting in place. Each API key is limited to 1000 requests per hour. Exceeding this limit will result in a 429 Too Many Requests response.

### Changelog
v1.0: Initial release with user, car, and rental management.
### Support
If you need assistance, please contact our support team at support@carrental.com.

Happy renting!