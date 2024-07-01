import express from "express";
import blogRouter from "./routes/blogposts.js";

import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use("/blogs", blogRouter);

app.use("/products", productsRouter);
app.use("/users", usersRouter);

const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
