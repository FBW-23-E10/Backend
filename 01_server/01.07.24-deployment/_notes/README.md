# Day 7 - BE - Deployment

## Recap
> - **Router**
>   - **Organizing routes:** To manage resource endpoints
>   - **Chaining handlers:** Group multiple route handlers for the same resource path, improving code organization and readability
> 
> - **Error Handling**
>   - Middleware signature `(err, req, res, next)=>{...}`
>   - Change response status `res.status(<status-code>)`
>   - Passing errors to error handler `next(error)`
>   - Catch undefined routes with default route: `app.use(<func>)`

## Agenda
- **Deployment**
  - What are environment variables?
  - Examing `process.env`
  - Loading `.env` files

- **Secrets**
  - Keep secrets out of git
  - Setting up `.env.example` in git
  - Deploying a server on Render


## Environment vriables
Usually you need _different configuration_ for _development_ and _production_
- In production you might use different  _port_, _API keys_ , _logging_, ...

<br />

- _Example_
**Lets say we are building an eCommerce site to buy art**
   - _Deoployment_: Send product orders to a testing payment API URL
   - _Production_: Send product orders to the real Payment API URL

<br />

**Environment variables** are very popular for this configuration.
Environment variables in your system `$ env`

  - These variables are accessible to your node programs
  - You can start the same program with different environment variables
  - One common environment variable is `NODE_ENV`


**Set environment variable** for a single program start `$NODE_ENV=production node test.js` 
- This sets an environment variable for the current terminal session
- To set a permanent one, you would have to change config file

**Load environment variables**
- A common way is loading environment variables from a `.env` file
- The `dotenv` package is a popular Node.js module that loads environment variables from a `.env` file into `process.env`

## Secrets
- It's very common that an API does not allow anonymous access
- A popular strategy is that you are given an API key
- You must then provide this API key with every request
- Example API: [https://www.tomorrow.io/weather-api/](https://www.tomorrow.io/weather-api/)

#### Remember
- Production, Testing and Development might use different URLs
  - Developers might not have access to production secrets
  - In large companies this is common
- It's also very easy to get yourself blocked from an API
  - Accidentally make too many requests
  - Your API key is accidentally commited to Github and someone steals it.
  - **DO NOT COMMIT SECRETS LIKE API KEYS**
  - `.env` belongs in `.gitIgnore`
  - You could have `.env.example` in git to help developers set up though!


## References
- [Expressjs Env](https://expressjs.com/en/advanced/best-practice-performance.html#in-environment)
- [Environment variables](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

## Exercises
- [09_be-server-process-env](https://classroom.github.com/a/5OMNI_UO)
- [10_be-server-weather-cli](https://classroom.github.com/a/G4_RU3YS)
- [11_be-server-chatbot](https://classroom.github.com/a/MgmXyBdu)