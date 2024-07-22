import express from 'express';
import Listing from '../models/Listing.js';
const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = (parseInt(req.query.currentPage) - 1) * limit || 0;
    const sortDirection = req.query.sortDirection || 'asc';
    const sortBy = req.query.sortBy;
    const listings = await Listing.find({})
      .limit(limit)
      .skip(currentPage)
      .sort({ [sortBy]: sortDirection });
    res.status(200).send(listings);
  } catch (error) {
    next(error);
  }
});

export default router;
