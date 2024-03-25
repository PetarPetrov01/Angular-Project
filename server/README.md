# Furniture products REST API Documentation

This document serves as the API reference guide for the REST API. This API provides access to a collection of furniture product data, enabling developers to integrate furniture information and functionalities seamlessly into their applications.

## Running the server

To run the server successfully, ensure that MongoDB is installed on your machine. If you haven't installed MongoDB yet, you can download it from the official website.

Once MongoDB is installed, follow these steps to start the server:
Clone the repository (if you still haven't):

```bash
git clone https://github.com/PetarPetrov01/Angular-Project
```

Navigate to the `server` folder:

```bash
cd .\server\
```

Install all dependencies:

```powershell
npm install
```

Run the server with the following command:

```powershell
npm start
```

Following a successful startup, the server writes the message:
'Connected to database
Server started on 3030'

## Authentication

For security reasons, authentication is required to access endpoints that modify your account data (profile, wishlist, cart) or create content (posting products).

- When a user logs in to the API, credentials are provided (email and password).
- The server validates them against its user database. If valid, the server creates an authentication cookie.
- The server sends a response containing a Set-Cookie header in the HTTP response. This header instructs the browser to store the newly created authentication cookie.
- With each subsequent request to an endpoint requiring authentication, the browser automatically includes the authentication cookie in the request header.
- The server receives the request and retrieves the authentication cookie from the request header and validates the session ID.

## Authentication endpoints

### Register

To create a new user send a `POST` request to `/users/register` with email and password. Upon successfull request, the service returns the user object containing an unique ID.

#### Example regsiter request

```
POST /auth/register
Content-Type: application/json
```

Request body:

```ts
{
  email: string,
  username: string,
  password: string
}
```

#### Example regsiter response

```ts
{
    _id: string,
    email: string,
    username: string,
    wishlist: [
        string
    ]
}
```

### Login

To log in as an already created user send `POST` request to `/users/login`. The service authenticates the user and returns the same object as in the register response

#### Example login request

```
POST /auth/login
Content-Type: application/json
```

Request body:

```ts
{
  email: string,
  password: string
}
```

#### Example login response

The service responds with the object similar to what is found in the [registration](#example-request) process.

## Session

To keep the session of the user the server uses a middleware function which looks up for a cookie in the request headers and validates it. If the token in the cookie is valid, the user information is saved in the request, so controllers can access it. Otherwise, if the token is invalid the server responds with status code 401.

### Error Responses

In case of any issues processing the request, the API will clearly communicate the error using a specific status code and a detailed message JSON format.

Example error response:

```json
{
  "message": "Invalid auth token"
}
```

## Products service endpoints

The API utilizes the base URL `/products` to provide access to furniture product resources.

## Get all products

You can retrieve a list of all furniture products using a `GET` request to the `/products` endpoint. Here are the optional query parameters you can use to filter and control the response:

- search (string): Filter products by name. The search is case-insensitive and matches products that contain the provided term within their names.
- sort (string): Sort the list of products based on a specific property. Specify the property name followed by a colon (':') and the desired sort order: "asc" for ascending or "desc" for descending. (e.g., sort=price:asc sorts by price in ascending order)
- category (string): Filter products by category. Specify a valid category name (e.g., "Living room", "Bedroom") to retrieve products belonging to that category.
- limit (integer): Limit the number of products returned in the response.

Example request with all queries:

`GET localhost:3030/products?category=Living%20room&search=m&sort=createdAt:asc&limit=2`

Returns the oldest 2 products that are categeorized for the Living room, including "m" in the name, sorted by oldest.
The order in which the queries are passed does not matter (The sort always comes before the limit).

Example response:

```ts
[
  {
    _id: string,
    name: string,
    description: string,
    image: string,
    category: [string, string],
    style: string,
    dimensions: {
      height: number,
      width: number,
      depth: number,
    },
    material: [string, string],
    color: yellow,
    price: number,
    _ownerId: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
  },
];
```

## Get a single product

To get a single product send a GET request to `/products/{id}`, where id is the server generated ID of the property. The server responds with an object representing the requested product. The object returned by the server differs with the one in the previous section only with the "\_ownerId". In the case of a single product, the path is populated with the acutal user's data

```ts
_ownerId: {
        _id: string,
        email: string,
        username: string
    }
```

## Create a new product

To add a new product to the collection send a `POST` request to `/products`, passing the following object as the request body:

```ts
{
    name: string,
    description: string,
    image: string,
    category: [string],
    style: string,
    dimensions: {
      height: number,
      width: number,
      depth: number
    },
    material: [string],
    color: string,
    price: number,
    _ownerId: string,
  }
```

On successfull creation, the API responds with the created object appending the generated properties:
```ts
_id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
```

## Edit a product

Editing/updating the product can be only by the creator of the product. To do that, send a `PUT` request to `/products/{id}`, where is the server generated ID of the product. The data passed should match data as the one in the creation of a new product. The server response is also the same as the create response.

