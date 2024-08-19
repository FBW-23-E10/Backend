import Product from "../models/products.model.js";
import { verifyToken } from "../utils/jwt.js";

/* ----------- get list of porducts ----------- */
export const getProducts = async(req, res, next) => {
  try {
    const products = await Product.find();
    res.json({products});

  } catch (error) {
    next(error);
  }
};



/* -------------- add new product ------------- */
export const addProduct = async (req, res, next) => {
  try {
    
    const decoded_token = req.jwt_decoded;

    // add product to db
    const {title, price} = req.body;
    const newProduct = await Product.create({title, price});
    newProduct.__v = undefined;

    // send response
    res.json({ msg: "product added!", newProduct, decoded_token });

  } catch (error) {
    next(error);
  }
};
