import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('users', userSchema);
