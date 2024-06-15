# Furniture products REST API Documentation

This document serves as the API reference guide for the REST API. This API provides access to a collection of furniture product data, enabling developers to integrate furniture information and functionalities seamlessly into their applications.

For the purpose of SoftUni's Angular course, this REST API is currently deployed on render - cloud application hosting. For the managment of the data, MongoDB Atlas is utilized as the database solution.

## Content table

| Content table                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Starting the server](#running-the-server-locally)                                                                                                                                                                                      |
| [Authentication](#authentication)                                                                                                                                                                                                       |
| [Authentication endpoints](#authentication-endpoints)                                                                                                                                                                                   |
| <ul><li>[Register](#register)</li><li>[Login](#login)</li></ul>                                                                                                                                                                         |
| [Session](#session)                                                                                                                                                                                                                     |
| [Route guards](#route-guards)                                                                                                                                                                                                           |
| [Error response](#error-responses)                                                                                                                                                                                                      |
| [Products endpoints](#products-service-endpoints)                                                                                                                                                                                       |
| <ul><li>[Get all](#get-all-products)</li><li>[Get a product](#get-a-single-product)</li><li>[Create a product](#create-a-new-product)</li><li>[Edit a product](#edit-a-product)</li><li>[Delete a product](#delete-a-product)</li></ul> |
| Profile                                                                                                                                                                                                                                 |
| <ul><li>[Get profile](#get-profile)</li><li>[Edit profile](#edit-profile)</li></ul>                                                                                                                                                     |
| Wishlist                                                                                                                                                                                                                                |
| <ul><li>[Get wishlist](#get-wishlist)</li><li>[Add to wishlist](#add-item-to-wishlist)</li></ul>                                                                                                                                        |

## Running the server locally

To run the server successfully, MongoDB must be installed on your machine. Once it's installed, follow these steps to start the server:
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

To log in as an already created user send `POST` request to `/auth/login`. The service authenticates the user and returns the same object as in the register response

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

## Route guards

To control the access to certain routes, some middlewares that serve as guards are implemented. These route guards serve to enforce specific access permissions based on the user's authentication status and ownership.

**isUser** - Allows access only to authenticated users. The following routes utilize this guard:

- [Get profile](#get-profile) - `GET /auth/profile`
- [Edit profile](#edit-profile) - `PATCH /auth/profile`
- [Create a product](#create-a-new-product) - `POST /products`
- [Get posted products](#get-posted-products) - `GET /auth/posts`
- [Get wishlist](#get-wishlist) - `GET /auth/wishlist`
- [Add to wishlist](#add-item-to-wishlist) - `POST /products/{productId}/wishlist`

**isGuest** - Allows access only to unauthenticated (guest) users. Routes utulizing the guard:

- [Register](#register) - `POST /auth/register`
- [Login](#login) - `POST /auth/login`

**isOwner** - Allows access to routes based on ownership criteria. In order for this guard to effectively determine ownership of a resource, additional middleware named 'preload' is used. This middleware is responsible for fetching relevant data from the database and setting it in the `res.locals` object. By doing so, the data is accessible in the guard itself. The following routes utilize the guard:

- [Edit product](#edit-a-product) - `PUT /products/{productId}`
- [Delete product](#delete-a-product) - `DELETE /products/{productId}`

### Error Responses

In case of any issues processing the request, the API will clearly communicate the error using a specific status code and a detailed message in JSON format.

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

To get a single product send a GET request to `/products/{id}`, where id is the server generated ID of the property. The server responds with an object representing the requested product. The object returned by the server differs with the one in the [previous section](#get-all-products) only with the "\_ownerId". In the case of a single product, the path is populated with the acutal user's data

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

Editing/updating the product can be only by the creator of the product. To do that, send a `PUT` request to `/products/{id}`, where `id` is the server generated ID of the product. The data passed should match data as the one in the creation of a new product. The server response is also the same as the create response.

## Delete a product

The owner of the product can delete it by sending an autorized `DELETE` request to `/products/{id}`. The server returns status code `204` - No Content status code. The attempt to parse the result as JSON, would result in error.

## Get profile

To get information for the user's profile send a `GET` request to `/auth/profile`. The server responds with an object that has the following data types:

```ts
{
    email: string,
    username: string,
    _id: string,
    wishlist: [string]
}
```

## Edit profile

To edit the profile information (email and username), send a `PATCH` request to `/auth/profile`, passing the new `email` and `username` in the request body. The server response is similar to the one with the GET request

## Get posted products

To get all products the current user has created, send a `GET` request to `/auth/posts`. The server returns an array containing all products in objects similar to [getting all products](#get-all-products).

## Get wishlist

To get the user's current wishlist, send a `GET` request to `/auth/wishlist`. The server responds with an array that holds populated products, where the \_ownerId is also populated (The same as getting a [single product](#get-a-single-product))

## Add item to wishlist

To add an item to the current user's wishlist send a `POST` request to `/products/{productId}/wishlist`, where `productId` is the product you want to add to the current user's wishlist.

## Create an order

To create an order send a `POST` request to `/orders/create`, providing an array of objects where each object represents a product (with its id) and its quantity (count). As seen below:

```ts
products: [
  {
    product: string,
    count: number,
  },
  {
    product: string,
    count: number,
  },
];
```

Information about the order is stored in the database and can be later fetched.

## Get all orders

To get all orders for the current user send `GET` request to `/orders`. The server responds with an array containing all orders which are populated with the corresponding objects:

```ts
[
  {
    _id: string,
    products: [
      {
        product: Product,
      },
    ],
    totalPrice: number,
    createdAt: string,
  },
];
```

Where `Product` corresponds to the object in [Get all products](#get-all-products)

## Get a single order

To get detailed information about an order send `GET` request to `/orders/{id}`, where `id` corresponds to the order Id. The server returns and object similar to the objects in the array of [getting all orders](#get-all-orders).

## Delete an order

To delete an order send a `DELETE` request to `/orders/{id}`, where `id` corresponds to the order Id. The server reponds with a message for a successful deletion. 
