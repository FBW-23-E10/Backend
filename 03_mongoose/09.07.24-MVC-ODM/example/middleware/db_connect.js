const mongoose = require('mongoose');

async function connectToDB () {
      try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connection established!");
      } catch (error) {
        console.log(error.message);
      }

      
}

module.exports = connectToDB;