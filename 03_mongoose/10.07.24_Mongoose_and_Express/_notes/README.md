# BE Day12 - Mongoose - Mongoose-&-Express

**Yesterday**

- Theory: MVC, ODM/ORM
- Using MongoDB from Node with Mongoose

**TODAY**

Mongoose and Express

- Creating a simple API that has endpoints to create, read and delete data
- Seeding a database with mock data
- `await Product.create(<document array>)` - examining Mongoose docs
- `await Product.insertMany(<document array>)` - examining Mongoose docs
- `await Product.deleteOne(...)` - examining Mongoose docs
- `await Product.deleteMany(...)` - examining Mongoose docs

## Seeding with mock data

- It's common when working on an application that you need to seed data

  - Seed like is like the starting data for an environment
  - Cannot use production data in development!
  - It's a super common need to "reset" your dev data

- You might use real data as a sample
- You might use mock data = fake data

- Let's say you are developing an application requirement
  - **"Admin users can hide all posts from a user"**
  - You need
    - An admin user
    - A regular user
    - Some posts by the regular user
  - THEN you can actually update each post to make them hidden
  - It can be easier to reset the entire database than to undo the updates
  - A seeder script could clear the entire database and fill it with test data

## Further Model - methods

- Model.insertMany()

  - Shortcut for validating an array of documents and inserting them into MongoDB if they're all valid. This function is faster than .create() because it only sends one operation to the server, rather than one for each document.

  - Mongoose always validates each document before sending insertMany to MongoDB. So if one document has a validation error, no documents will be saved, unless you set the ordered option to false.

  - Example:

    ```JS
        const docs = await Movies.insertMany([
        { name: 'Star Wars' },
        { name: 'The Empire Strikes Back' }
        ]);
        docs[0].name; // 'Star Wars'

        // Return raw result from MongoDB
        const result = await Movies.insertMany([
        { name: 'Star Wars' },
        { name: 'The Empire Strikes Back' }
        ], { rawResult: true });
    ```

- Model.deleteMany()

  - Declare and/or execute this query as a deleteMany() operation. Works like remove, except it deletes every document that matches filter in the collection, regardless of the value of single.

  - Example:
    ```JS
        await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } });
    ```

- Model.deleteOne()

  - Declare and/or execute this query as a deleteOne() operation. Works like remove, except it deletes at most one document regardless of the single option.

  - Example:
    ```JS
       await Character.deleteOne({ name: 'Eddard Stark' });
    ```

## References

- [Mongoose - queries](https://mongoosejs.com/docs/api/query.html)
- [Mongoose - Model.insertMany()](<https://mongoosejs.com/docs/api/model.html#Model.insertMany()>)
- [Mongoose - Query.prototype.deleteMany()](<https://mongoosejs.com/docs/api/query.html#Query.prototype.deleteMany()>)
- [Mongoose - Query.prototype.deleteOne()](<https://mongoosejs.com/docs/api/query.html#Query.prototype.deleteOne()>)

## Exercises

[16_be-mongoose-newsbot](https://classroom.github.com/a/ypw8pnBe)

## Upcoming

- A look at Schemas

  - Types `{ type: <field type> }` and `{ type: [<field type>] }`
  - Required: `{ type: <field type>, required: true }`
  - Unique: `{ type: <field type>, unique: true }`
  - Defaults: `{ type: <field type>, default: <value> }`
  - Timings: `{ timestamps: true }`
  - Examine schema types at https://mongoosejs.com/docs/schematypes.html

- Subdocuments
  - Documents embedded in other documents; Schemas nested in Schemas
  - Removing ids from subdocuments: `new Schema(<definitions>, { _id: false})`
