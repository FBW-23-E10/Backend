const users = require('../data/users');

const getUser = (req, res, next) => {
    try {
        const {uid} = req.params;
        if(uid){
            const result = users.filter(u=> u.id == uid)
            res.json({result})
        }else{
            const err = new Error('there is no uid');
            err.status = 400;
            throw err;
        }
        
    } catch (error) {
        next(error)
    }
};


module.exports = {getUser}