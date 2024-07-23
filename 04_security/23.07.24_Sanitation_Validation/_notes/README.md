# BE Day 18 - Server Security 

## 1. Data validation

- When it comes to working with data, it's important to ensure that it is `consistent` and `secure`. 

<br>

- ## Importance of server-side validation


  - It can help `prevent security vulnerabilities` such as **_SQL injection attacks_** and **_cross-site scripting attacks_**.

  - Additionally, it can ensure that the data being submitted is in the `correct format`, which can help `prevent errors` and ensure that the application runs smoothly.



- ## express-validator 

  - `This library provides a simple and easy-to-use interface for validating data in an Express.js application`. To add express-validator to your project, simply install it using npm:

  ```bash
  npm install express-validator
  ```

  - Validating fields:

  ```js
  check(<field name>).<matcher function>
  ```

  - To validate a field, you can use the `check()` function followed by a matcher function.

  - For example, `check('email').isEmail()` can be used to validate that the email field is a valid email address. The field here refers to the property names in the req.body and that refers to the "name" attribute of form inputs most of the times.

<br>

 ## Checking for errors
 -  After validating the data, it's important to check for errors to ensure that the data is in the correct format. This can be done using the `validationResult()` function provided by express-validator.

 ## Parsing the request

  - To parse the request and check for errors, you can use the `validationResult()` function. **_This function takes the req object as an argument and returns the Result object_**.

  ```js
  import { body, validationResult } from 'express-validator';

  app.post('/', body('email').isEmail(), (req, res, next) => {
    //parse the validation errors in request object
    const errors = validationResult(req);
  });
  ```

<br>

 ## Checking the result

  - To check if there are any errors, you can use the `isEmpty()` function provided by the Result object. This function returns true if there are no errors and false otherwise.

  ```js
  import { body, validationResult } from 'express-validator';

  app.post('/', body('email').isEmail(), (req, res, next) => {
    const errors = validationResult(req);

    //checking the result
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'validation errors',
        errors: errors.array(),
      });
    }
  });
  ```


  ## Adding custom messages:

  ```js
  check(<field name>)
    .<matcher function>
    .withMessage(<message>)
  ```

  - Finally, you can add custom error messages using the `withMessage()` function provided by express-validator. This function can be called after the matcher function and takes a string argument representing the custom error message.

  ```js
  const { check, validationResult } = require('express-validator');

  app.post(
    '/user',
    [
      check('username')
        .notEmpty()
        .withMessage('Username field is required.')
        .isLength({ min: 3 })
        .withMessage('Username min 3Char length'),
      check('email')
        .notEmpty()
        .withMessage('Email field is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
    ],

    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // ...rest of the code
    }
  );
  ```

---

<br>

## 2. Sanitize Data

- Sanitization is `the process of removing unwanted or harmful elements from data,` typically user input. Here are some techniques to consider for sanitizing your data:

<br>

 ## Importance of sanitization

  - Sanitization is crucial for `protecting against various security vulnerabilities` such as **cross-site scripting (XSS)** attacks, **SQL injection attacks**, and **command injection** attacks. By properly sanitizing user input, you can prevent these types of attacks and keep your application secure.

  ## 2.1 Escaping HTML

  - One way to sanitize user input is to escape any HTML characters that may be present.

  ```js
  check(<field name>).<matchers>.escape();
  ```

  - The `escape()` function can be used in conjunction with a validation library, such as express-validator, to automatically escape any HTML characters in user input.

  - For example:

  ```scss
  check('description').escape()
  ```

  - This will escape any HTML characters in the description field.

  <br>

  ## 2.2 Normalizing emails:

  - Another technique for sanitizing user input is to `normalize email addresses`.

  ```js
  check(<field name>).<matchers>.normalizeEmail()
  ```

  - Email addresses can be entered in a variety of formats, so normalizing them can help ensure consistency and prevent certain types of attacks.

  - The `normalizeEmail()` function can be used in conjunction with a validation library, such as express-validator, to automatically normalize email addresses.

  - For example:

  ```js
  check('email')
    .normalizeEmail() //sanitizer
    .escape() //sanitizer
    .isEmail()
    .withMessage('Invalid Email'); //validator
  ```

  - This will normalize the email field.

  ## 2.3 Trimming strings:

  - Trimming strings can be useful for removing any leading or trailing whitespace from user input.

  ```js
  check(<field name>).<matchers>.trim()
  ```

  - The `trim()` function can be used in conjunction with a validation library, such as express-validator, to automatically trim whitespace from user input.

  - For example:

  ```js
  check('username').trim();
  ```

  - This will trim any whitespace from the username field.



## 3. Format

- Properly formatting your code is important for readability, maintainability, and collaboration. Here are some techniques for formatting your validation code:



## References

- [Express-validator - docs](https://express-validator.github.io/docs/)

## Exercises

- [22_be-security-validation](https://classroom.github.com/a/UTNPE27D)
- 
## Upcoming

- Authentication fundamentals
  - Encryption vs Hashing
  - With hashing, a compromised database won't directly leak passwords
 

