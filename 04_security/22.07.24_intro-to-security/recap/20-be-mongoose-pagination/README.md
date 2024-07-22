# Paginating through Holiday Properties

In this exercise, you will work with pagination for this Airbnb backend clone. Some of the work has been done, it's your job to complete the missing endpoint!

## Tasks

First use the `.env.example` file to set up your `.env` file.

After that, make sure the server starts up and connects to MongoDB successfully.

When you run the server for the first time, it will populate the database with some sample holiday property data.

A [frontend](./index.html) has been included for testing the backend. Don't edit the frontend. You can use Live Server to view the frontend.

🐘

### Task 1

Create an endpoint to load all the property listings in [routes/listings.js](./routes/listings.js);

1. Create a **GET** endpoint that will handle the path `/`
2. Use the `Listing` model to return all the results to the user
3. Test your endpoint

### Task 2

Being able to limit our results is critical for any application which uses pagination.

Update the endpoint you created in task 1;

- Use the `limit(n)` query method to tell our query to limit its number of results
- Replace _n_ with an integer of your choice, try different values that make the frontend look good

### Task 3

We will now optimise the query so that the client can select a portion of the data.

Update the endpoint you created in task 1;

1. So that it can handle the `currentPage` query parameter in the URL

   - Example: `http://localhost:3001/app/listings?currentPage=3`

2. Use the `skip(n)` query method to skip the first _n_ number of the results the query returns
3. To calculate the value for _n_ you need;
   - the **query** parameter `currentPage`
   - the `limit` value you set in **Task 2**

> Important! `skip()` expects a number, but each property in our `query` object is a string. You should convert this into a number before using it

### Task 4

We want the user to be able to **sort** the results by **price**.

Update the endpoint you created in task 1;

1. So that it can handle a `sortDirection` query parameter in the URL. This should be 1 of 2 strings: `asc` (ascending) and `desc` (descending)

   - Example: `http://localhost:3001/app/listings?currentPage=3&sortDirection=asc`

2. Use the `sort({ field : criteria})` method to sort the results returned from your query, where `field` is the field you want to sort by and `criteria` is "asc", "desc", "ascending", "descending", 1, or -1.
3. Sort by the `price` field

### Task 5

We want the user to be able to choose to sort the results by **price** or number of **beds**.

Update the endpoint you created in task 1;

1. So that it can handle another query parameter `sortField`. This way the client can choose which field to sort by.

   - Example: `http://localhost:3001/app/listings?currentPage=3&sortDirection=asc&sortField=price`

2. Implement the ability to sort by "price"
3. Implement the ability to sort by "beds"
