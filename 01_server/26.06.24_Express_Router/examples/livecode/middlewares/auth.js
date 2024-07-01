export const authMiddleware = (req, res, next) => {
  const admin = req.query.admin;
  if (admin === 'true') {
    next();
    return
  } else {
    res.send('sorry, you need to be an admin to perform this action');
  }
};
