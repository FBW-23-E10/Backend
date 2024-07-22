import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: String,
  summary: String,
  size: String,
  description: String,
  minimum_nights: String,
  maximum_nights: String,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  price: Number,
  security_deposit: Number,
  cleaning_fee: Number,
});

const Listing = mongoose.model("listing", listingSchema);

export default Listing;
