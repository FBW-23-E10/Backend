const express = require('express');
const { getUser } = require('../controllers/user.controller');
const router = express.Router();

// only execute for requests related to routes in this file
// router.use(()=>{console.log('middleware for user router')})

// path is /user/

router.route('/:uid')
    .get(getUser)
    .post()
    .put()
    .patch()
    .delete()

// path is /user/add
router.route('/add').get()


module.exports = router;