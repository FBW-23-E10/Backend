# BE - Mongoose - Upate
## Recap
- Simple API with CRUD endpoints
- A look at schemas
- Subdocuments

## Agenda
- Handling errors
- Soft deletes
- CRUD: Update

## Handling errors review
- When you try to update a document that doesn't exist
- When you try to insert a duplicate email to a `unique` field.
- That's an error
- What was the technique in JavaScript to handle errors?
    - `try...catch`
- How do they work?
    - You create a block of code to try
    - If something inside `throws` an error
    - Your code will `catch` it and run the code in the `catch` block
    ```js
    try {
        await Product.deleteOne({ _id: "bananas" })
    } catch (error) {
        // Do something
    }
    ```
- _Do you remember the Global error handler?_
    - In endpoint functions you pass an error on by calling `next(err)`
    - At the end of your routes, you will have one final route to handle errors
    ```js
    app.delete("/users/:id", (req, res, next) =>{
        try {
            await User.deleteOne({ _id: req.params.id })
            res.json({ "message": "success" })
        } catch (err) {
            next(err)
        }
    })

    app.use((err, req, res, next) => {
        console.error("Error!", err)
        res.status(500).json({ "error": "Internal server error" })
    })
    ```

### Regular vs Soft delete

- When you delete something from the database, it's gone
- Accidental delete? TOO BAD!
- Instead of a delete like this, it's common to do a *soft delete*
- One way to do soft delete:
    - Add a Date field for called `deleted` that is null by default
    - DELETE will _actually_ just set the `deleted` to the current time
    - In your GET endpoints, only list/return items with `deleted == null`
    - 
- You can then even make a database cleaning automation
    - Run daily to delete items that have been soft deleted > 30 days

## Handling PUT and PATCH Requests
### Data from PUT or PATCH Requests
- **PUT Requests**: Replace the _entire_ document with new data.
- **PATCH Requests**: Update only _specific fields_ of the document.
- Use PUT for complete updates and PATCH for partial updates.

- **Code Example**:
  ```javascript
  await <model name>.findByIdAndUpdate(id, <data>);
  ```


## Getting Back the Updated Document
- Use the `new` option to return the updated document.
- **Code Example:**
    ```js
    await <model name>.findByIdAndUpdate(id, <data>, { new: true });
    ```
- This returns the updated document instead of the original.


## Ensuring Schema Validation
- Use the `runValidators` option to enforce schema rules during updates.
- Code Example:
    ```js
    await <model name>.findByIdAndUpdate(id, <data>, { runValidators: true });
    ```

- This ensures the updated data follows the schema rules.


## Wrap-up
- Handling errors
- Soft deletes
- PATCH and PUT updates
- Get Updated Document
- Apply Schema validation


## References
- [Update by Id](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate())
- [Validation](https://mongoosejs.com/docs/validation.html)

## Exercises
- [18_be-mongoose-animal-shelter](https://classroom.github.com/a/GCSVBO64)