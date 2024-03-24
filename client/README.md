# DreamFurniture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Content table
Authentication


## Authentication
### Login and register

Upon login/register the following happens:

- The browser sets a cookie: “auth-cookie”, containing the authorization token, returned from the server
- The created user is emitted as new value to all subscribers of the user Observable.
- The created user is set in the local storage

### Session - authComponent

An authentication component wraps the whole application, and its purpose is to keep the session, after reloading, navigating or other renders that would make the user Observable empty again. By checking the local storage and the *auth-cookie,* the component itself does the following operations:

#### Case 1: Cookie and user intact

In the case where both the user in the storage and the *auth-cookie* are intact, the component calls the *setUserSubject* function from the service, emitting the user from the localStorage to the subscribers

#### Case 2: User is missing

If the user is missing from the local storage, but the *auth-cookie* is intact, the component checks the validity of the token saved in the cookie by sending an API Request.  

- Valid token: If the token is valid, the server returns the current user and the function that handles the request, sets the user in the local storage and emmits the new user to the observables.
- Invalid token: Otherwise, if the token is not valid, the server responds with status code 401 - Unauthorized. The interceptor handles this kind of response by clearing the whole session (cookie, user in the localStroage and BehaviourSubject)

#### Case 3: Cookie is missing

If neither the cookie nor the user in the storage are intact, the component clears the whole session as in the second case with the invalid token.

### Aspects of the approach

- **Single Source of Truth:** By relying on the server for user information.
- **Reduced Requests:**
Utilizing localStorage effectively reduces the number of requests to the server for checking user login status during renders and reloads.
- **Session Handling:** The *authComponent* handles session continuity across different scenarios, making the user experience smoother.


## Application overview
### Header

The header component servers as the main navigation of the application, providing quick access to features and pages. Depending on the client's authentication status the header includes the following navigation:

- Guest (not logged in)
  - Home - Directs to the home page.
  - Products - Clicking on the Products link allows users to explore the complete collection of products offered.
  - Login - Leads to the dedicated Login page.
  - Register - Link to a page, where guests can create an account to unlock more features.
 
![Header guest](./screenshots/header-guest.PNG)
- Users (logged in)
  - Home
  - Products
  - Profile (icon) - Clicking the button reveals a dropdown menu with profile page and wishlist links and an option to logout.
  - Cart (icon) - Directs to the user's cart. If the user has items in the cart, their total count is showed in the upper right corner
  
![Header user](./screenshots/header-user.PNG)

### Home page

The home page servers as the main landing page. It provides an interface to browse the oldest published furnitures with summarizzed information. Upon clicking on the item itself, the user is taken to the detailed page of the furniture. 

#### A view of the homepage:

---
![Home page](./screenshots/home-page.PNG)

### Products page

The Products page provides a complete list of all furniture items offered on the platform. The users can sort, filter and search the items based on the their preferences. Each product on the page includes brief display of the essential information and a detailed page of the product can be opened by clicking on the image. 

#### Filtering
Users can filter the products based on their categories (The type of room they are suitable for)
- All
- Living room
- Bedroom
- Dining room
- Home office
- Outdoor

#### Search functionality

The products page provides a search bar that enables users to find specific products efficiently by the product's name. The match is case-insensitive.

#### Sort functionality

Users can sort the products based on some of their properties:

- Alphabetically by name
- Time of creation (Oldest and Newest)
- Price (Ascending and descending)
  
#### URL state and reseting

The URL link in the app captures the current state of the page, including filters, sorting, and search. Sharing that link allows the user to easily collaborate and share specific information with others.

Additionaly the page has a RESET button, which resets all sorting and filtering.

#### A view of the products page:

---
![Products-page](./screenshots/catalog-page.PNG)
