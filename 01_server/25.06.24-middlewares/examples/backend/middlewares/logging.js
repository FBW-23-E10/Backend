const fs = require('fs');

function logger (req, res, next) {
    console.log(`${new Date()} ${req.method} - ${req.url}`);

    next()
}

function log_to_file(req, res, next){
    fs.writeFileSync("loggs.txt", `${new Date()} ${req.method} - ${req.url}` );

    next()
}


module.exports = {logger, log_to_file};