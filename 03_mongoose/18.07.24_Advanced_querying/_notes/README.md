# BE Day16 - Advanced querying

**Recap**

- Data relations
- Populating related data

**TODAY**

- Advanced querying
- Pagination concept
- Pagination: limiting results with `Query.prototype.limit(<number>)`
- Pagination: results offset with `Query.prototype.skip(<number>)`
- Sorting results: `Query.prototype.sort(...)`
- Filtering results `.where(...)`, `.equals(...)`, `.gt(...)`, `.lt(...)`


## Pagination

- Who knows what we are talking about here?

  - Database has 9001 users
  - Listing _all_ of them on a page is too much
  - Better to just list maybe 10 at a time
  - And have pages to browse the rest

- The way pagination is most commonly done is with `limit` and `skip`
- You first create a base query and add specifics to it

  ```js
  const query = User.find(); // prepare query
  query.limit(10); // limit to max 10 results from the database
  query.skip(0); // how many results to skip

  // If we are skipping the first 0 results, we are displaying 1 - 10
  // If we are skipping the first 10 results, we are displaying 10 - 20
  // If we are skipping the first 20 results, we are displaying 20 - 30
  // If we are skipping the first 40 results, we are displaying 30 - 40

  // Limit = how many per page
  // Skip = current page number * limit
  ```

## Sorting and Filtering

- As well as limit / skip for pagination, we can sort and filter our results

- Imagine the 9001 users
  - We need to list only admins
  - Show only users with age > 17
  - Sort oldest to newest

```js
const query = User.find(); // Prepare query
query.where('role').equals('admin'); // Only show admins
query.where('age').gt(17); // Only show age > 17 (gt: greater than)
query.sort({ createdAt: 'asc' }); // Sort by creation time, ascending

const users = await query.exec(); // Execute query
console.log(users);
```

- Queries are very flexible
- There are even different syntaxes, for example chaining and callback:

```js
User.find() // Prepare query
  .where('role')
  .equals('admin') // Only show admins
  .where('age')
  .gt(17) // Only show age > 17
  .sort({ createdAt: 'asc' }) // Sort by creation time, ascending
  .exec((err, users) => {
    // Execute query
    if (err) {
      return console.error(err);
    }
    console.log(users);
  });
```

- As you can imagine, queries can get very complex
  - Let's take 10 minutes for a mini exercise right now
  - Don't even run your code, just imagine the Model and Query
  - Look at this URL and imagine how you would implement it:
  - http://vinted.de/catalog?search_text=pferd&price_from=1&price_to=10&page=2

## References

- [Pagination - golinxcloud](https://www.golinuxcloud.com/paginate-with-mongoose-in-node-js/)
- [Pagination - Dev.to](https://dev.to/max_vynohradov/the-right-way-to-make-advanced-and-efficient-mongodb-pagination-16oa)
- [Pagination - Slingacademy](https://www.slingacademy.com/article/implement-pagination-mongoose/?utm_content=cmp-true)
- [Query - Mongoose-docs](<https://mongoosejs.com/docs/api/query.html#Query.prototype.gt()>)
- [Query - sort - Mongoose-docs](<https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()>)
- [Query - where - Mongoose-docs](<https://mongoosejs.com/docs/api/query.html#Query.prototype.where()>)
- [Query - lt - MongoDB-docs](<[<https://mongoosejs.com/docs/api/query.html#Query.prototype.where()>](https://www.mongodb.com/docs/manual/reference/operator/query/lt/)>)
- [Query - gt - MongoDB-docs](<[<https://mongoosejs.com/docs/api/query.html#Query.prototype.where()>](https://www.mongodb.com/docs/manual/reference/operator/query/gt/)>)

## Exercises

[20_be-mongoose-pagination](https://classroom.github.com/a/DW0nQG7u)

## Upcoming

- Security concepts
