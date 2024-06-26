/* Task 3 - Creating middleware


Create a middleware function that checks the object contains values for the keys firstName, lastName, age, fbw and email

Create a middleware function that will check if the user is above 18 years old

If any of the middleware checks fail, you should send a response with an error message that says why the user is not valid

Example failure response

{
  "message": "We can not validate your user. They are  below 18 years of age"
}
 */

export const validateAge = (req, res, next) => {
    console.log('I have been called regardless');
    if (req.body.age >= 18) {
      next();
      return
    }else{
      res.send('you must be 18, sorry');
    }
    
  };

export const validateFields = (req, res, next) => {
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.age &&
    req.body.fbw &&
    req.body.email
  ) {
    next();
    return
  } else {
    res.send('missing fields');
  }
};

