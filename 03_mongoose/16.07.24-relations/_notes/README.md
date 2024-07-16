# BE - Mongoose - Relations
## Recap
- Handling errors
- Soft deletes
- PATCH and PUT updates
- Get Updated Document
- Apply Schema validation

## Agenda
- Data relations
- Populating related data

## Data relations
- Think of Facebook/Twitter/Instagram/...

- User has Posts
    - Post has Likes
    - Post has Comments
        - Comment has Likes
        - Comment has Comments
- User has Users that they follow
- User has favorite Posts

### Types of relation

- _One-to-many_ one record in a collection is related to many record in another collection
    - One `User` has many `Posts`
    - One `Post` belongs to one `User`
    - One `Post` has many `Likes`
    - One `Like` belongs to one `Post` and one `User`

- _Many-to-Many_ multiple records in a collection are realated to multiple records in another collection.
    - One `Book` has many `Authors` 
    - One `Author` written many `Books`

- _One-to-one_ one record in a collection is related to one record in another collection.
    - One `Person` has one `Passport`
    - One `Passport` belongs to one `Person`

<br />

## Implementing Relations in MongoDB
In MongoDB, we can use the `ref` schema option to create relationships between documents in different collections. 

#### 1. Creating a Reference:
- Use the `ref` field in your schema to reference another collection.
- This can be useful if you need to navigate the relationship from both sides. 

  **Example:**
  ```js
    const studentSchema = new mongoose.Schema({
    name: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
    });

    const courseSchema = new mongoose.Schema({
    title: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
    });
  ```


#### 2. Populating results
- After defining the references, you can use the `populate` method to _fetch the related documents_.
- Example:
  ```js
    // Assuming you have already created some students and courses
    const students = await Student.find().populate('courses').exec();
    const courses = await Course.find().populate('students').exec();
  ```
<!-- 

## Wrap-up

- One-to-many
- Many-to-many
- We can use `ref` to associate documents between collections
- We can `populate` fields with referenced values

## References
- []()
- []()

## Exercises
- []()
- []()
-->