# Newsbot

Here you get the chance to combine ExpressJS with Mongoose, by building your own personal jobs API. It should automatically check advertisements from the Hackernews API and save them to a Mongoose database.

## Tasks

### Task 1

Create the file `db.js`. Inside this file;

1. Create an async function called `connect`
2. The `connect` function should connect to MongoDB database
3. Use `console.log` to log additional information to the console for the `error` and `connected` [events](https://mongoosejs.com/docs/connections.html#connection-events)
4. Export and call the `connect` function from `server.js`

> Hint: Use environment variables, and make sure not to commit them!

### Task 2

Read the file [data.js](./data.js) This file provides some code for pulling data from the Hacker news API.

1. Add helpful comments to the existing code
2. At the end of the `refresh()` function, save the `newData` object into Mongoose using the `Job` model
   - Note the difference between using `originalId` and `_id`
   - The API uses "id", which our code translates to "originalId"
   - Our MongoDB will use "\_id" for the ObjectID
   - In the database, it's a good idea to store both!

> Note: Don't skip this task! Part of the job of a developer is to read code other people have written, and improve on it

### Task 3

1. Create an endpoint in [server.js](./server.js) to delete a single job based on an `originalId` provided by user
2. Test your endpoint

### Task 4

- Create an endpoint in [server.js](./server.js) for deleting all jobs from the database
- Test your endpoint

## Bonus Task

- Hackernews also provides news articles from its API
- See https://github.com/HackerNews/API for documentation
- Just like saving a local copy of the jobs, save a copy of the news articles
- Add an endpoint for deleting all news articles from the database
