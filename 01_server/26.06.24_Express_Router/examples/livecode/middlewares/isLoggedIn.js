export const isLoggedInMiddleware = (req, res, next) => {
    const loggedin = req.query.loggedin;
    if (loggedin === 'true') {
      next();
      return
    } else {
      res.send('sorry, you need to log in first');
    }
  };
  