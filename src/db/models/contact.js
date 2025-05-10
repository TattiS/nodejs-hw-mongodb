import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
    },
    isFavourite: {
      type: Boolean,
      require: false,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      require: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const ContactsCollection = model('contacts', contactSchema);
