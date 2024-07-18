import mongoose, { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  name: { type: String, required: true },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
});

export const Role = model('Role', roleSchema);
