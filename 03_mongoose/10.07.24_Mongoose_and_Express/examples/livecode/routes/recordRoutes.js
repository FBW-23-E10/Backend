import { Router } from 'express';
import { Record } from '../models/recordModel.js';
import records from '../data/records.js';
export const recordsRouter = Router();

recordsRouter
  .route('/')
  .get(async (req, res) => {
    const allRecords = await Record.find({});
    res.send(allRecords);
  })
  .post(async (req, res) => {
    const newRecord = req.body;
    await Record.create(newRecord);
    res.status(200).send({ message: `the record was saved` });
  })
  .delete(async (req, res) => {
    await Record.deleteMany();
    res.status(200).send({ message: `All records were deleted` });
  })
recordsRouter
  .route('/u')
  .put(async (req, res) => {
    const matches=await Record.find({})
    console.log(matches)
    const recordsToUpdate = await Record.updateMany({artist:'Radiohead'},{$set:{amount:0}});
    console.log(recordsToUpdate)
    res.send(recordsToUpdate);
  })

  

recordsRouter
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const singleRecord = await Record.findOne({ _id: id });
    //const singleRecord = await Record.findById(id );
    res
      .status(200)
      .send({
        message: `Found this record with the provided ID:`,
        singleRecord,
      });
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const recordToUpdate=await Record.findOneAndUpdate({ _id: id },req.body);
    //const recordToUpdate=await Record.findByIdAndUpdate( id ,req.body);
    const updatedRecord=await Record.findById(id);
    res.status(200).send({message:'The following record was updated', updatedRecord})


  })

  .delete(async (req, res) => {
    const id = req.params.id;
    const recordToDelete=await Record.findOneAndDelete({ _id: id },req.body);
    //const recordToDelete=await Record.findByIdAndDelete( id ,req.body);
    
    res.status(200).send({message:'The following record was deleted', recordToDelete})

  });

recordsRouter.route('/seed').post(async (req, res) => {
  try {
    const recordsToAdd = records.map((record) => new Record(record));
    //await Record.deleteMany()
    await Record.insertMany(recordsToAdd);

    res.status(201).send(recordsToAdd);
  } catch (error) {
    console.log(error.message);
  }
});
