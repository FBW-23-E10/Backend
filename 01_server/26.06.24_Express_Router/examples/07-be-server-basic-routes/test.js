import { assert, log } from "console";

// Helper function
async function get(url) {
  const res = await fetch("http://localhost:9000" + url);
  return await res.json();
}

// Tests calls to the API
const users = await get("/user");
const user = await get("/user/1");

const products = await get("/product");
const product = await get("/product/1");

const blogs = await get("/blog");
const blog = await get("/blog/1");

// Tests to check if the API is working as expected
assert(users.length === 3, "GET /user failed: Unexpected number of users.");
assert(user.name === "John Doe", "GET /user/1 failed: Unexpected user name.");
assert(
  products.length === 3,
  "GET /product failed: Unexpected number of products."
);
assert(
  product.name === "Product 1",
  "GET /product/1 failed: Unexpected product name."
);
assert(
  blogs.length === 2,
  "GET /blog failed: Unexpected number of blog posts."
);
assert(
  blog.title === "A blog post",
  "GET /blog/1 failed: Unexpected blog post title."
);

// Final message
log("All tests passed if no messages were printed before this line.");
