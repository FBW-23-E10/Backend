# Authentication II
## Recap
- Send email with NodeMailer
- Email verification

## Agenda
- Create auth token using JWT
- Manage user's role


## JSON Web Token (JWTs)
- JWTs identify requests from authenticated users.
- They are used to ensure secure communication.


### JWT consists of three parts: 
1. **Header**: The header contains _metadata about the token_, such as the algorithm used for signing the token.
2. **Payload**: The payload contains the _actual data that is being transmitted_, such as user information or access permissions.
3. **Signature**: The signature is used to verify that the token has not been modified during transmission.


### Why Do I need jwt?
1. **Stateless:** Server is stateless
2. **Security:** JWTs are digitally signed, so the server can verify if token modified.
3. **Flexibility:** Designed to interoperable across different programming languages.
4. **Compatibility:** Compatible with verious authentication methods. (OAuth, OpenID Connect)


### Login response with JWT
- When a user logs in, the server responds with a signed token.
- This token is a JWT that confirms the user's identity.

### Creating token
- _1. Import required library_
- _2. Define Payload_
  - Create a payload with user data.
  - The payload may include the user's ID and roles.
- _3. Sign the Token_
  - Use the `jsonwebtoken` library to sign the token.
  - Provide the payload, a secret key, and an expiration time.
    ```js
    import jwt from 'jsonwebtoken';
    const payload = { userId: 123, role: 'admin'};
    const secret_key = 'your-secret-key';
    const token = jwt.sign(payload, secret_key, {expiresIn: '1h'});
    ```


### Storing the Token
- Save the token to `localStorage` for demonstration purposes.
- **Note:** This is not secure for production.

### Sending the Token with Requests
- Send the token in the request headers.
- This lets the server know who is making the request.



### Validating the Token
- The backend uses a custom middleware to validate the token.
- This ensures that the request is from a trusted user.


<br>

## Async Methods

### Create Tokens Asynchronously
To creates a token, we will be using the 

```js
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

async function createToken(payload, secret, options){
    
    const signAsync = promisify(jwt.sign);
    return await signAsync(payload, secret, options);
}
```  
<br>

- `jwt.sign()` is `asynchronous` by default, it uses a callback function to return the signed token.
  
- It also has a `synchronous version` that return the signed token directly. 
- It's recommended to use the `asynchronous` version of `jwt.sign()` because it's `non-blocking and won't hold up the event loop` while the token in being signed. this can be especially imporant in high-traffic applications where you want to avoid any unnecessary delays.
- Now we can create a token by calling the `createToken` function with the payload, secret, and options.

<br>

### Validating Tokens Asynchronously
To validate a JWT, we use the `jwt.verify()` method from the jsonwebtoken library. We can also create a wrapper function that uses Promises.

```js
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

//verify the given token
export async function verifyToken(token, secret) {
    const verifyAsync = promisify(jwt.verify);
    return await verifyAsync(token, secret);
}
```
Now we can validate a token by calling the `verifyToken()` function with the token and secret.

<br>

### Expecting Authentication headers
To validate the JWT on every request, we can create a `custom middleware function that checks for the Authorization header and validates the token`.

```js
import { verifyToken } from './utils/jwt.js'
//token verification
export function protect() {

    return async (req, res, next) => {
        try {
        
        //read authorization header from request object
        const authHeader = req.headers['authorization'];
        //extract token
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return createError(401, 'Token Not Found!');
        }
    
        /* ----------------------- verify token --------------------------- */
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        req.jwt = decoded;

        /* ------------ The user deleted after issue the token ------------ */
        const user = await User.findById(decoded.userid);
        if (!user) {
            throw createError(401, 'The user belongs to given token is deleted recently!');
        }

        /* ------------- password updated after issuing token ------------- */
        let update_in_ms = parseInt(user.updated_at.getTime()/1000)
        if (decoded.iat < update_in_ms) {
            throw createError(401, 'The user\'s password updated. Please sign in again!')
        }


        return next();
        
        } catch (error) {
            next(error)
        }
    }
}
```
---
<br>

## Authorization

### User Roles and Permissions
Role-based access control (RBAC) is a widely used approach to controlling access to resources in applications. It involves assigning roles to users and determining what actions earch role is allowed to perform.

### Implement Middleware
- Once you have defined your roles, you can implement middleware to check if `the user has the required role to access a particular resource`.

- This middleware can be added to the `route handlers for protected routes`. 

- The middleware can check the user's role agains the required role for the resource and either `grant or deny access`.

    ```js
    export const restrictTo = (...roles) => {
        return (req, res, next) => {
            //check if allowed roles includes role of my user
            if (!roles.includes(req.jwt.userrole)) {
                throw createError(403,"You do not have permission to perform this action!");
            }

            next();
        };
    };
    ```


### Apply Middleware to Routes
After defining the middleware, you can apply it to the routes that required role-based access control. For example, to protect the `POST /products` route for admin users, you can apply `restrictTo()` middleware like this:

```js
router.route('/products')
    .post(protect(), restrictTo('admin'), addNewProduct);
```

In this example the middleware `restrictTo()` is applied on the route and ensuring that only users with `admin` role can access this resource.


## Exercise
- [28_be-security-authorization](https://classroom.github.com/a/8rT-wEsC)
 
