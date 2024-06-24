# # BE - Server - Day 01: Intro to server

## Recap

- Route Parameters
- Creating dynamic route paths with route params: the `/:<param>` notation
- Route props: Accessing route params with the `useParams`

## Agenda

Introduction

- The server as a program
- The request-response cycle
- The role of the backend in real life apps & use case
- Let's make sure we use Node ^20.11 (20.11 or newer)
- Examining the process: `console.log(process)`
- Exiting a program: `process.exit()`

- VERY basic HTTP server with Express
- Testing with a request from the browser
- Review of ports

## Introduction to the Backend & Servers

- When the fronted makes a request

  - This could be writing an address in your browser
  - This could be making a `fetch()` request

  - The backend is the server that takes in a request and sends back a response
  - The server can refer to
    - A computer that runs server software
    - A specific software that handles requests/connections

- Server software commonly don't have any user interface

  - It starts and then sits there and waits for requests

  - Some servers start automatically and run in the background
  - Your computer actually has a bunch of services running all the time
  - Some servers you run just like any other programs
    - `node server.js`

- The role of a server is to handle things the frontend can't

  - Data storage
  - Authenticating the user

- And sometimes even if a frontend could do something it's too slow!
  - A product search COULD have all products as an array of objects
  - Then searching that array is just `products.filter(...)`
  - But if that array is maybe thousands or millions of products?
  - The frontend also can't check if a password is correct or not
  - It would have to check using data it already has
  - It's _not_ effective to try to hide the correct password in frontend JS
  - If source has `if (user=="admin" && pass=="Supr_Seekrit2020"){}`
    - It's trivial to just view source and see the correct password

## Looking at Node applications

- Each application that runs on your computer is a `process`

  - Each process has some information related to it
  - Try`ps -e`
  - You can use the process to exiting a program

  ```js
  if (Math.random() > 0.5) {
    process.exit();
  }
  console.log('Hi!');
  ```

## ExpressJS

- Let's actually make a server and test it
- We will use a tool called Express to help us make a server
- Express makes it very easy to

  - 1. Listen for requests
  - 2. Process requests
  - 3. Respond to the request

- Steps:

  - `npm i express`
  - Examine the package.json
  - Add "type":"module" to be able to use JS other than CommonJS
  - Then:     

  ```js
  import express from 'express';

  // Initialize our server
  const app = express();

  // This function that will process ALL incoming requests
  app.use(function (req, res) {
    debugger;
    console.log('Ooh, a request');
    res.send('Hello! This is a response!');
  });

  // Start listening to requests on port 3000
  // This prevents our script from stopping
  // We can also have MANY servers running in different ports!
  app.listen(3000);
  ```

## Wrap-up

- Server programs start up and wait for requests
- Express helps us make a simple server program
- Debugging helps us make sense of variables and what our programs do
- Our server will listen for requests on a specific port
- Once a request comes in, our code needs to send a response back

## References

- [NodeJS](https://nodejs.org/en)
- [ExpressJs](https://expressjs.com/)
- [Process.env.PORT](https://developerport.medium.com/understanding-process-env-port-in-node-js-e09aef80384c)
- [HTTP - GET](https://reqbin.com/Article/HttpGet)
- [CORS - NPM](https://www.npmjs.com/package/cors)

## Exercises

[01_be-server-simple-express-server](https://classroom.github.com/a/8XJ4l2HK)

## Upcomings

- POST handler: `app.post(<path>, <func>)`

- Express
  - Debugging: breaking and examining `req.body`
  - Make Express understand form data
  - Saving data into volatile runtime variables

- File I/O
  - Saving data into non-volatile text files with Node FS
    