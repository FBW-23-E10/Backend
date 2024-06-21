# # BE - Server - Day 02: POST - Method \_ FS

## Recap

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

## Agenda

- POST handler: `app.post(<path>, <func>)`

- Express

  - Debugging: breaking and examining `req.body`
  - Make Express understand form data
  - Saving data into volatile runtime variables

- File I/O
  - Saving data into non-volatile text files with Node FS

## POST - Method

- Express.js is a lightweight framework for Node.js that simplifies the handling of HTTP requests. Here's an example of how to handle a POST request using Express.js.

```JS
    const express = require('express');
    const app = express();
    app.use(express.json());

    app.post('/', (req, res) => {
      console.log(req.body);
      res.send('POST request received');
    });

    app.listen(8080);
```

- Express.js automatically handles the 'data' and 'end' events, and the data is readily available in req.body.

## Express.json()

- The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, Express will execute the functions you passed to app.use() in order. For example, if you wanted to print the HTTP method and the URL of every request, you would do the following:

```js
const app = require('express')();

app.use((req, res, next) => {
  // For example, a GET request to `/test` will print "GET /test"
  console.log(`${req.method} ${req.url}`);
});
```

- Using express.json()

  - express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.

```JS
  const express = require('express');
  const app = express();

  app.use(express.json());

  app.post('/test', function(req,res) {
    // Without `express.json()`, `req.body` is undefined.
    console.log(`${req.body}`);
  });

  // Test the above app using Axios
  const server = await app.listen(3000);


```

## NodeJS - FS

- Reading files with Node.js
  - The simplest way to read a file in Node.js is to use the fs.readFile() method, passing it the file path, encoding and a callback function that will be called with the file data (and the error):

```js
const fs = require('node:fs');
fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

- You can also use the promise-based fsPromises.readFile() method offered by the fs/promises module:

```JS
  const fs = require('node:fs/promises');
      async function example() {
        try {
          const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
  example();
```

- All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in memory before returning the data.
  This means that big files are going to have a major impact on your memory consumption and speed of execution of the program.
  In this case, a better option is to read the file content using streams.

- Writing a file
  - The easiest way to write to files in Node.js is to use the fs.writeFile() API.

```JS
const fs = require('node:fs');
const content = 'Some content!';
fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
```

  - You can also use the promise-based fsPromises.writeFile() method offered by the fs/promises module:

  ```JS
  const fs = require('node:fs/promises');
  async function example() {
    try {
      const content = 'Some content!';
      await fs.writeFile('/Users/joe/test.txt', content);
    } catch (err) {
      console.log(err);
    }
  }
  example();
  ```
  - By default, this API will replace the contents of the file if it does 
  already exist.


## References


- [POST - Method](https://masteringjs.io/tutorials/express/post)
- [readFile - FS](https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs)
- [writeFile - FS](https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs)



## Exercises

[02_be-server-working-with-data](https://classroom.github.com/a/3t1wHK6o)
[03_BE-Server-CSV2JSON](https://classroom.github.com/a/Lk2w7-p4)

## Upcomings

- RESTful

  - Theory: What is an API? What is a REST API?
  - CRUD endpoints

- Express and JSON

  - Making Express understand JSON: `app.use(express.json())`

- Targeting data based on route params: `req.params`
- PUT handler : `app.put(<path>, <func>)`
- PATCH handler: `app.patch(<path>, <func>)`
- DELETE handler: `app.delete(<path>, <func>)`
- Responding with JSON

- Postman
  - Making requests with Postman, pay attention to headers
  - Debugging: breaking and examining `req.headers`
