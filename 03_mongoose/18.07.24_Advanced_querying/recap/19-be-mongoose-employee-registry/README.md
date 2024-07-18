# Employee registry

This exercise is about practicing how to work with relations in a MongoDB database.

Your task is to create an employee registry API for an imaginary company. This exercise has many tasks, but keep pushing, you can do it! 🏋️

## Tasks

### Task 1

- Install Express and Mongoose
- Connect to MongoDB (use environment variables)
- Make sure to **not** to commit `node_modules` OR your database credentials

### Task 2

1. Create an `Employee` schema and model with the following fields:

   - Full name (String, required)
   - Position (String, required)
   - Email (String, required, unique)

### Task 3

1. Create an `Address` schema and model with the following fields:

   - Street name (String, required)
   - Steet number (String, required)
   - Area code (Number, required)
   - City (String, required)

2. Add the field `contactAddress` into the `Employee` schema that references the `Address` schema. It should be **required**.

   - An employee can have one `contactAddress`, a `contactAddress` can have one employee
   - What kind of relationship is this?

3. Research: Why would it be good to separate the address into multiple fields?

### Task 4

1. Create an `Office` schema and model with the following fields:

   - Street name and number (String, required)
   - Area code (String, required)
   - City (String, required)

2. Add a the field `Employee` called `office` that references `Office`. It should be **required**.

   - An employee can have one `office`, an `Office` can have multiple employees 🦐

### Task 5

1. Create a `Role` schema and model includi with the following fields:

   - Name (String, required)
   - Employees (array of ObjectIds)

2. Add an entry into `Employee` called `roles` that references `Role`. It should be **required**.

   - An employee can have multiple roles
   - A role can have multiple employees

### Task 6

- For testing, create a seeder script that inserts the following:

  - 5 roles: Developer, Manager, Marketing, HR, Management
  - 3 Offices
  - 15 employees, all in one office, with unique addresses and a mixture of roles

### Task 7

- Create and test a small API with only **GET** endpoints

  - `GET /employee` - return all employees (no reference data included)
  - `GET /employee?full=true` - return all employees including address, office and roles

  - `GET /role` - return all roles (no reference data included)
  - `GET /role?full=true` - return roles and include employees who have the roles
  - `GET /role/:id/employees` - return all employees that have the given role

  - `GET /office` - return all offices (no reference data included)
  - `GET /office/:id/employees` - return all employees that have the given office
