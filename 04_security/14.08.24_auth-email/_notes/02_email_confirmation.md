
# Confirmation Email

## Sending Confirmation Email Including Confirmation Link

- When creating a website or application that requires user registration, it is important to `confirm that the email address provided is valid and belongs to the user`. One way to do this is `by sending a confirmation email` with a confirmation link.
  

## What should I do to have confirmation email?
### Step 1: Create a Confirmation Email Template
- The first step in sending a confirmation email is to create a confirmation email template. The template should include the following elements:

  - A personalized greeting addressing the user by name
  - A message explaining the purpose of the email
  - A call-to-action button or link that the user can click to confirm their email address
  - A message thanking the user for their registration and confirming that their email address has been verified

Here is an example of a confirmation email template in Markdown:

```js
export const genEmailTemplate = (name, token, userid) => {
    const link = `https://localhost:5000/users/confirm/${token}/${userid}`
    return `
        Hi ${name}!<br/><br/>
        Thank you for joining us. Please click on the following link to confirm and activate your account: <br />
        <a href="${link}">${link}</a><br/><br/>

        good luck!
    `
}
```
<br>

### Step 2: Generate a verification Token and Store it in DB
The verification link in the verification email template should include a unique verification token that is generated for each user. This token should be a long, random string of characters that is difficult to guess. you can generate a verification token using crypto module in Node.js:

```js
//generate a random token and store it in db
    const token = crypto.randomBytes(16).toString("hex");
    await Verify.create({ token, userid: newuser._id });
```
You can use this function to generate a verification token when a user registers for your application, and then include the token in the verification email that you send to the user. When the user clicks on the verification link in the email, you can verify the token and confirm the user's email address.

**Note**: `It is important to remember to create a model in the database for storing verification tokens. You can specify fields such as 'userid' and 'token' for this model.`
<br>

### Step 3: Send Verification Email
For sending an email using `nodemailer` we need to do the following steps.
1. **Install the nodemailer module**
   `npm install nodemailer`
2. **Setup nodemailer transporter**
   Next, you'll need to set up a nodemailer Transporter.
   
   ```js
    // setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    ```

3. **Send an Email**
   With the nodemailer module installed and the transporter, you can now use the `sendMail()` method to send an email:
   ```js
   const info = await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: "Verify your account!",
      html: genEmailTemplate(fullname, token, newuser._id),
    });
    ```     

<br>

### Step 4: Handle verify request
#### Verification Route
- The verification route is responsible for verifying the user's email address by checking the verification token that was sent to their email address. Here's an example of how you can set up a verification route in your Node.js/Express app:
  
  ```js
    const express = require('express');
    const router = express.Router();
    const { handleVerifyLink } = require('../controllers/users.controller.js');

    router.route('/confirm/:token/:uid').get(handleVerifyLink);
    module.exports = router;
  ```

#### Verification Controller
The verification controller is responsible for handling the verification process and updating the user's status in the database. Here's an example of how you can set up a verification controller in your Node.js/Express app:

```js
export const handleVerifyLink = async (req, res, next) => {
  try {
    const token = req.params.token;
    const uid = req.params.uid;

    // looking for a userid and toke in database
    const token_record = await Verify.findOne({ token, userid: uid });

    // if there is no userid with that give token
    if (!token_record) {
      const err = new Error("verification link is not valid!");
      err.status = 404;
      throw err;
    }

    //if verification link is valid and clicked
    // activate user
    const user = await User.findByIdAndUpdate(uid, { isActivated: true });
    res.send("Thanks for verification!");
  } catch (error) {
    next(error);
  }
};
```