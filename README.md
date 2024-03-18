# Dream Furniture repository
Dream furniture is a full-stack web application, built for the purpose of SoftUni's Angular course. This repository contains both the client side and server-side needed to run the application.
The application provides a user-friendly platform for customers to browse, discover, and purchase furniture items. It aims to simplify the furniture shopping experience by offering the following functionalities:

* Convenient Product Exploration: Users can browse a wide selection of furniture products categorized and searchable for easy navigation.
* Detailed Product Information: Each product offers comprehensive details like descriptions, specifications, and image, allowing users to make informed decisions.
* Wishlist and Cart Management: Users can create and manage wishlists for saving favorite products and shopping carts to collect intended purchases.
* Seamless User Accounts: Secure user accounts enable registration, login, and profile management.


The project consists of two main folders:
* Client: This folder contains the code for the user interface and functionalities accessible to the user. 
* Server: This folder contains the backend logic, including functionalities like user authentication, product management and database interaction.
  
### Client side
The client side is build with the Angular framework. For a better user-expereience the following libraries are used: 
* NgRx - Reactive state managment for Angular inspired by Redux. Used for the user's cart.
* ngrx-store-localstorage - Simple syncing between the NgRx store and local storage.
* Angular Material - Material Design components.
* ngx-cookie-service - Angular service to read, set and delete browser cookies. Used for the authentication.

### Server side
The server side is built on the Node.js runtime environemnt with the express framework. The database used in the application is MongoDB.

### Running the application
To successfully run the application simply clone the current repository locally and install the needed dependencies in the client and server side. For detailed information on running the application follow the instructions on the corresponding documentations (client side, and server side)
