import mongoose, { Schema, model } from 'mongoose';

export const addressSchema = new Schema({
  streetName: { type: String },
  streetNumber: { type: String },
  city: { type: String },
  zipCode: { type: Number },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
});

export const Address = model('Address', addressSchema);
