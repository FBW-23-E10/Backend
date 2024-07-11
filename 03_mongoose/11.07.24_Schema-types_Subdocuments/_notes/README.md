# BE Day13 - Mongoose - Subdocuments, Schema - types

**Yesterday**


Mongoose and Express

- Creating a simple API that has endpoints to create, read and delete data
- Seeding a database with mock data
- `await Product.create(<document array>)` - examining Mongoose docs
- `await Product.insertMany(<document array>)` - examining Mongoose docs
- `await Product.deleteOne(...)` - examining Mongoose docs
- `await Product.deleteMany(...)` - examining Mongoose docs

**TODAY**

- A look at Schemas

  - Types `{ type: <field type> }` and `{ type: [<field type>] }`
  - Required: `{ type: <field type>, required: true }`
  - Unique: `{ type: <field type>, unique: true }`
  - Defaults: `{ type: <field type>, default: <value> }`
  - Timings: `{ timestamps: true }`
 

- Subdocuments
  - Documents embedded in other documents; Schemas nested in Schemas
  - Removing ids from subdocuments: `new Schema(<definitions>, { _id: false})`

## A look at Schemas

- What was the role of Schemas again?
    - They define the shape of documents in a collection
    - They generate the model for us

- Schemas take in an object with properties
    - Sometimes called fields
    - Each key defines a property that a document can have
    - What kind of fields do you remember?
        - String
        - Number
        - Boolean
        - Can set the field to be required with `required: true`

- Schemas can define lots of different types for our documents
    - https://mongoosejs.com/docs/schematypes.html


- Let's revisit the `userSchema`
    ```js
    const userSchema = new Schema({
        accountNumber: Number,
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true
        }
    })
    ```
    - The `Number` is the short form of `{ type: Number }`
    - The `required: true` is a Schema type option
        - It stops us from inserting documents without those fields
    - Like schema types, there are many schema type options
    - Two other important schema type options

    - `default` sets the default value 
    - `unique` makes the field values unique for the collection

    ```js
    const userSchema = new Schema({
        accountNumber: Number,
        email: {
            type: String,
            required: true,
            unique: true        // Don't allow many users with the same email
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,     //  New users are not verified by default
        },
        roles: {
            type: [String],     // A user can have many roles at once
            required: true,
            default: ["user"]
        }
    })
    ```

- You can even make Mongoose add timestamps for the create and update times
    - These are an option for the Schema

    ```js
    const userSchema = new Schema({
        ...
    }, { timestamps: true })
    ```

## Mongoose Terminology: validator

- In Mongoose `required` is an example of a validator
- Settings like that can specify rules for the data of a field
- What validators you can use depend on the `type`
    - For example, Numbers can have a `min` and `max` validators


## Subdocuments

- It's fairly common to want to organize your data in nested objects
    - What did this mean again?
- In Mongoose this is schemas nested in other schemas
- A classic example is addresses

```js
const addressSchema = new Schema({
    street: String,
    zip: String,
    city: String,
    country: String
}, { _id: false }) // This is a Schema option to not generate an _id

const userSchema = new Schema({
    ...
    address: [addressSchema] // A user can have multiple addresses
}, { timestamps: true })
```



## Wrap-up

- Schemas define the shape of data
- Schemas can validating data a bit
- Schemas have many types and options
- Subdocuments: nested documents usually with their own schema


## References
- [Mongoose quick start](https://mongoosejs.com/docs/index.html)
- [Mongoose Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose Schema - types](https://mongoosejs.com/docs/schematypes.html)


## Exercises
[17_be-mongoose-schemas](https://classroom.github.com/a/9I2HKZ-z)

## Upcoming

- Update
  - Handling errors: `try { ... } catch(e) { next(e); }`
  - Theory: regular vs soft delete
  - Data from PUT or PATCH request
  - Updating a document: `await <model name>.findByIdAndUpdate(id, <data>);`
  - Getting back the updated document: The `new` update option
  - Ensuring schema validation: The `runValidators` update option
