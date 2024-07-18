import { Router } from 'express';
import { Record } from '../models/recordModel.js';
import seedData from '../data/records.js';
const recordRouter = Router();

recordRouter
  .route('/')


  .post(async (req, res, next) => {
    const newRecord = req.body;
    await Record.create(newRecord);
    res.status(201).send(newRecord);
  });

recordRouter
  .route('/:id')
  .get(async (req, res, next) => {
    const singleRecord = await Record.findById(req.params.id);
    res.status(200).send(singleRecord);
  })
  .delete(async (req, res, next) => {
    const singleRecord = await Record.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ message: 'The following record was deleted', singleRecord });
  })
  .put(async (req, res, next) => {
    const singleRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const updatedRecord = await Record.findById(req.params.id);
    res
      .status(200)
      .send({ message: 'The following record was updated', updatedRecord });
  });

recordRouter.route('/seed').post(async (req, res, next) => {
  try {
    const records = seedData.map((record) => new Record(record));

    await Record.deleteMany();
    console.log('Data Deleted successfuly');

    await Record.insertMany(records);
    res.status(201).send(records);
  } catch (error) {
    next(error);
  }
});


/* .get(async (req, res, next) => {
  const records = await Record.find({}).where('price').gt(10).sort({price:'asc'}).exec();
  res.send(records);
}) */

export default recordRouter;
