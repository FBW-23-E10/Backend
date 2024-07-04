# Day9 - Backend - MongoDB Continued

## Recap

- MongoDB
- What is database?
- Concept: NoSQL
- Setup a local mongodb server
- Basic queries

## Agenda

- MongoDB Continued
  - Compass for connecting to MongoDB
  - `db.reviews.insertMany([{...}, {...}]);`
  - `db.reviews.find({ <field name>: { criteria } });`
  - `db.reviews.updateOne({ <criteria>, {$set: <values> });`
  - `db.reviews.deleteOne({ <criteria> })`

## Compass

- Compass is a free interactive tool for querying, optimizing, and analyzing your MongoDB data.

- [Compass Documentation and Download](https://www.mongodb.com/docs/compass/current/)

## Further Queries

### db.collection.insertMany()

- Inserts multiple documents into a collection.

- Returns:

  - A document containing:
    - An acknowledged boolean, set to true if the operation ran with write concern or false if write concern was disabled.
    - An insertedIds array, containing \_id values for each successfully inserted document

- Syntax:

```JS
  db.collection.insertMany(
  [ <document 1> , <document 2>, ... ],
  {
      writeConcern: <document>,
      ordered: <boolean>
  }
)
```

### db.collection.find()

- Selects documents in a collection or view and returns a cursor to the selected documents.

- Returns:

  - If no criteria provided, returns an array with all documents in the collection
  - If criteria is provided, reurns an array with the documents that match the criteria

- Syntax:
  - without criteria:

```JS
  db.collection.find()
```

- with criteria:

```JS
  db.collection.find({ _id: ObjectId('6686371476a00ac5e28d7789')})
```

### db.collection.findOne()

- Returns one document that satisfies the specified query criteria on the collection or view

- If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk. In capped collections, natural order is the same as insertion order. If no document satisfies the query, the method returns null.

- Syntax:

```JS
 db.collection.findOne({ title:'post2'})
```

### db.collection.updateOne()

- Use the db.collection.updateOne() method to update the first document that matches a specified filter.
- To update a document, MongoDB provides update operators, such as $set, to modify field values.
- Update operators, such as $set, create the field if the field does not exist.

- Syntax:

```JS
  db.collection.updateOne( { title: "post2" }, { $set: { title: 'post2.2' } } )
```

### db.collection.deleteOne()

- Removes a single document from a collection.
- To delete at most a single document that matches a specified filter (even though multiple documents may match the specified filter) use the db.collection.deleteOne() method.

- Returns:

  - A document containing:
    - A boolean acknowledged as true if the operation ran with write concern or false if write concern was disabled
    - deletedCount containing the number of deleted documents

- Syntax:

```JS
  db.collection.deleteOne( { title: 'post2.2' }  )
```

## References

- [Compass Documentation and Download](https://www.mongodb.com/docs/compass/current/)
- [MongoDB - DOCS - db.collection.insertMany()](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany)
- [MongoDB - DOCS - db.collection.find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find)
- [MongoDB - DOCS - db.collection.findOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/)
- [MongoDB - DOCS - db.collection.updateOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne)
- [MongoDB - DOCS - db.collection.deleteOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne)
- [W3Schools - MongoDB Tutorial](https://www.w3schools.com/mongodb/index.php)

## Exercises

[13_be-database-mongosh-crud](https://classroom.github.com/a/CCHgWU-L)
