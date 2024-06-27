# Day5 - Backend - express.Router

## Recap

- Router
  - Organizing routes: `express.Router()`, `app.use(<path>, <router>)`
  - Chaining handlers: `router.route(<path>).get(<func>).post(<func>)`
  - Project organization: The `routes` directory

## Agenda

- Error handling
  - Theory: HTTP Status codes 2xx, 4xx, 5xx
  - Error handling middleware signature: `(err, req, res, next) => { ... }`
  - Changing response status: `res.status()`
  - Using the error handler: `next(err)`
  - Catching 404s with a default route: `app.use(<func>)`

## HTTP Status codes

- What makes up a HTTP request

  - Method, URL, Headers, Body

- What makes up a HTTP response

  - Status line
  - Headers
  - Body

- The headers and body are basically the same as with requests
- The status line most importantly contains the HTTP Status code

- The status code indicates the status of the response

  - A few important enough examples that are a good idea to memorize:

    - 200 OK
    - 301 Moved permanently
    - 400 Bad request
    - 401 Unauthorized
    - 403 Forbidden
    - 404 Not found
    - 500 Internal server error

## Error handling in Express

- In a basic Node.js http server, when an exception is thrown without being handled, the server crushes and our service is down.
- Sometimes we do catch the error with a try catch block, but it’s hard to know what is causing it, and if or how we can handle it.

- Step 1 - Building a server

```JS
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("I'm a service being called");
  console.log("Now I am going to throw an error, because something went wrong");
  throw new Error();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
```

- Step 2. - Error handling & middlewares

  - Middlewares come in the middle of the request and response cycle of the Node.js execution. It also provides access to many functions like request and response objects with the Next function of the cycle.

  - If we run a server and an error is thrown but not handled by any function the server will crash.

- Step 3. - Creating an Error handling middleware

  - Create a new folder - middlewares, inside this folder create a new file called errorHandler.js.

```JS

  export const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message || "Internal Server Error" });
  };
```

- The first parameter is the error thrown, then the req and res objects, and next is the last one. The service catches the error and returns it as a response, or returns a default error message.

- The Error object
  - The most common properties: name and message. An error object can take a message, and it’s name can be set afterwards.

```JS
class Error {
  constructor(message) {
    this.message = message;
  }
  const error = new Error("this is the message");
  error.name = "errorName";

  console.log(error.name); //errorName
  console.log(error.message); //this is the message
}
```

Step 5. - Import the handler on the top of the server file, and use it below your routes

- Notice that the handler is placed at the end of the server routes, so when next(error) is called, it will be caught by this error handler.

```JS
import usersRouter from './routes/usersRouter.js';
import { errorHandler ,notFound} from './middlewares/errors.js';


const app = express();
const PORT = 5001;

app.use(express.json())
app.use('/users',usersRouter)
app.get('/', (req, res) => {
    res.send('homepage');
  });

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

```

- Step 6. - trigger the errorHandler

  - In our controllers or middlewares, we can trigger the errorHandler, by creating a new Error, attaching a status code to it, and passing this Error to the `next()` call

  ```JS
  export const addUser = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      const error = new Error('Sorry, credentials missing');
      error.status = 400;
      throw error;
    }

    users.push(req.body);
    res.status(201).send({ message: 'user added', users: users });
  } catch (error) {
    return next(error);
  }
  };
  ```

## Wrap-up

- There are many different statuses for HTTP responses
- You can pass errors to `next`
- You can have a global error handler responsible for sending nice errors
- You can have a middleware at the end that makes sure to send a 404 response

## References

- [HTTP-Status-codes - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Error-Handling - expressjs.com](https://expressjs.com/en/guide/error-handling.html)

## Exercises

- [08_be-server-car-api](https://classroom.github.com/a/5QQmu9Ma)

## Upcoming topics:

- Deployment

  - What are environment variables
  - Node: examining `process.env`
  - Node: loading `.env` files with `node --env-file=.env main.js`

- Secrets
  - Keep your .env out of git, keep secrets out of git
  - Setting up `.env.example` in git
  - Deploying a server on Render

```

```
