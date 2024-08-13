import mongoose from "mongoose";

export function connectToDB() {
  mongoose.connect(process.env.DB_URI);

  mongoose.connection.on("connected", () => {
    console.log("db connection established");
    
  });
  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
}
