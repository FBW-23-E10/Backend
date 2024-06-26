# Day5 - Backend - express.Router

## Recap

- **Middleware**
  - What is middleware?
  - Built-in middlewares
  - Custom middlewares
  - Middleware function signature

## Agenda

- Router
  - Organizing routes: `express.Router()`, `app.use(<path>, <router>)`
  - Chaining handlers: `router.route(<path>).get(<func>).post(<func>)`
  - Project organization: The `routes` directory

## Understanding express.Router()

- The express.Router() function creates a new router object. This function can create a new router object to handle requests.

```JS
express.Router();
```

## How to use express.Router()

```JS
const app = express();
const router = express.Router();

router.use(function (req, res, next) {
  console.log("Middleware run");
  next();
});

router.get("/", function (req, res) {
  res.send("Hello world!");
});
```

## Real-life example

- Original server.js

```JS
import express from "express";
const app = express();

import {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} from "../controllers/people";

app.get("/people", getPeople);

app.post("/people", createPerson);

app.put("/people/:id", updatePerson);

app.delete("/people/:id", deletePerson);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
```

- Step 1. - Create routes folder

```JS
|--nodeapp
|----routes
```

## Step 2. - Create route file

- Next, we create a people.js file to manage the routes related to the people object.

- We then import express and create a router object.

```JS
import {Router} from "express";
const peopleRouter = Router();
```

- We also need to export the people route.

```JS
export default peopleRouter;
```

- Step 3. - Copy related routes

  - Now, we will copy the people-related routes from the app.js file to the people.js file.

  - After that, we will replace the app with a router.

```JS
import {Router} from "express";
const peopleRouter = Router();

import {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} from "../controllers/people";

peopleRouter.get("/people", getPeople);
peopleRouter.post("/people", createPerson);
peopleRouter.put("/people/:id", updatePerson);
peopleRouter.delete("/people/:id", deletePerson);

export default peopleRouter;
```

- Step 4. - Delete route parameter
  - We then delete /people parameter of the routes. It’s because we already specified this as a route for the people, so we don’t need /people anymore.

```JS
import {Router} from "express";
const peopleRouter = Router();

import {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} from "../controllers/people";

peopleRouter.get("/", getPeople);
peopleRouter.post("/", createPerson);
peopleRouter.put("/:id", updatePerson);
peopleRouter.delete("/:id", deletePerson);

export default peopleRouter;
```

- We can shorten our router code as:

```JS
import {Router} from "express";
const peopleRouter = Router();

import {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} from "../controllers/people";

peopleRouter.route("/").get(getPeople).post(createPerson);
peopleRouter.route("/:id").put(updatePerson).delete(deletePerson);

export default peopleRouter;
```

- Step 5. - Update server.js
  - Back in our server.js, we require the people route.

```JS

import peopleRouter from "./routes/people";


//We then use app.use() to set up the based route.

import express from "express";
const app = express();

import peopleRouter from "./routes/people";

app.use("/people", people);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});


```

## References

- [Express Router - DevHandbook](https://www.devhandbook.com/nodejs/express/router/)

## Exercises

[07_be-server-basic-routes](https://classroom.github.com/a/a_3BDeSI)


## Upcoming topics:

Error handling
- Theory: HTTP Status codes 2xx, 4xx, 5xx
- Error handling middleware signature: `(err, req, res, next) => { ... }`
- Changing response status: `res.status()`
- Using the error handler: `next(err)`
- Catching 404s with a default route: `app.use(<func>)`
