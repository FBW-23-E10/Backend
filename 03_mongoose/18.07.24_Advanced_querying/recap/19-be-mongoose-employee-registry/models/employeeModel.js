import mongoose, { Schema, model } from 'mongoose';
import { addressSchema } from './addressModel.js';

const employeeSchema = new Schema({
  name: { type: String },
  position: { type: String },
  email: { type: String, required: true, unique: true },
  contactAddress: addressSchema,
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

export const Employee = model('Employee', employeeSchema);
