# Day4 - Backend - Middlewares

## Recap
- **RESTful API** : Allows software applications to talk to each other over the web using standard HTTP methods.

- **CRUD Endpoints**
  - **Create**: Add new data (HTTP _POST_).
  - **Read**: Get data (HTTP _GET_).
  - **Update**: Change existing data (HTTP _PUT_ or _PATCH_).
  - **Delete**: Remove data (HTTP _DELETE_).

- **Best Practices**
  - Parsing requests data using `express.json()`
  - Access route parameters using `req.params`
  - Send JSON responses using `res.json({key: value})`

- **Postman**
  - A tool to test APIs.
  - Can send different types of requests (GET, POST, PUT, DELETE)
  - Set details of requests such as headers

## Agenda
- **Middleware**
  - What is middleware?
  - Built-in middlewares
  - Custom middlewares
  - Middleware function signature


## Understanding Middleware

### What is Middleware?
- Middleware is a _function_ that runs between the time a request is received and a response is sent back.
- Think of it as a _middleman_ that can _handle_, _modify_, or _log_ information during the request-response cycle.

  **Example: Request Logger Middleware**
  - Imagine we want to keep a record of every request method (like GET, POST) and the path (like /home, /about).
  - A request logger middleware helps us do this by logging these details for every request.

### Middleware Function Signature
- Middleware functions follow this structure: `(req, res, next) => { ... }`
  - `req`: The request object.
  - `res`: The response object.
  - `next`: A function to move to the next middleware or route handler.

### Applying Middleware to All Requests
- To apply middleware to all requests, use `app.use(<middleware>)`.
  ```javascript
  function logger_middleware(req, res, next){
    console.log(`${req.method} ${req.path}`);
    next();
  }

  app.use(logger_middleware);
  ```

### Applying Middleware to Specific Path
- To apply middleware to a specific path, use `app.use(<path>, <middleware>)`.
  **Example**
  ```js
  function logger_middleware(req, res, next){
    console.log(`User path accessed: ${req.method} ${req.path}`);
    next();
  }

  app.use('/user', logger_middleware);
  ```

### Applying Middleware to Specific Endpoint
- To apply middleware to a specific endpoint, use `app.get(<path>, <middleware>)`
  **Example**
  ```js
  function logger_middleware(req, res, next){
  console.log(`About page accessed: ${req.method} ${req.path}`);
  next();
  }

  app.get('/about', logger_middleware , (req, res) => {
    res.send('About Page');
  });
  ```

### Built-in Middlewares
- `express.static()` serves static assets such as HTML files, images, and so on.
- `express.json()` parses incoming requests with JSON payloads.
- `express.urlencoded()` parses incoming requests with URL-encoded payloads.
  
### Third-party Middlewares
- Use third-party middleware to add functionality to Express apps.
- Third-party middlewares need to be installed using `npm install <package_name>`
  **Example** : `npm install cors`
  ```js
  const express = require('express');
  const app = express();
  const cors = require('cors'); 

  // in server.js using middleware
  app.use(cors());
  ```

### Code Ordering with Endpoints and Middleware
- The _order of middleware_ and _route handlers_ in your code is _important_.
- Middleware should be _defined before the endpoints_ that need to use them.
  **Example**
  ```js
  app.use((req, res, next) => {
  console.log('This middleware runs first');
  next();
  });
  
  app.get('/example', (req, res) => {
    res.send('This is an example endpoint');
  });
  ```

## References
- [Middleware functions - Expressjs](https://expressjs.com/en/guide/writing-middleware.html)
- [Using middlewares - Expressjs](https://expressjs.com/en/guide/using-middleware.html)


## Exercises
- [05_be-server-middleware-logger](https://classroom.github.com/a/lXvEZggS)
- [06_be-server-middleware-validation-sanitization](https://classroom.github.com/a/nqZ4dW3h)