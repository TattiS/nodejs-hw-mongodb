import Joi from 'joi';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits long',
      'string.empty': 'Phone number cannot be empty',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .trim()
    .default('personal')
    .required(),
  photo: Joi.string(),
});
export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base': 'Phone number must match format +380XXXXXXXXX',
      'string.empty': 'Phone number cannot be empty',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .trim()
    .default('personal')
    .messages({
      'any.only': '"contactType" must be one of [work, home, personal]',
    }),
  photo: Joi.string(),
});
