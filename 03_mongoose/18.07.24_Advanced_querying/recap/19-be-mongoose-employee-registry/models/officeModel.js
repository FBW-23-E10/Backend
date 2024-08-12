import mongoose, { Schema, model } from 'mongoose';

const officeSchema = new Schema({
  streetName: { type: String },
  zipCode: { type: Number },
  city: { type: String },
  employees:[{type: Schema.Types.ObjectId,
    ref: 'Employee'}]
});

export const Office = model('Office', officeSchema);