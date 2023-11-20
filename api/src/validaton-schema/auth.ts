import Joi, { ObjectSchema } from 'joi'

export const loginSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is a required field',
  }),
  password: Joi.string().required().min(4).max(20).messages({
    'string.base': 'Email must be of type string',
    'string.min': 'Password must be at least 4 characters',
    'string.max': 'Password must be at most 20 characters',
    'string.empty': 'Password is a required field',
  }),
})

export const registerSchema: ObjectSchema = Joi.object().keys({
  fullname: Joi.string().required().min(4).max(32).messages({
    'string.base': 'Full Name must be of type string',
    'string.min': 'Full Name must be at least 4 characters',
    'string.max': 'Full Name must be at most 32 characters',
    'string.empty': 'Full Name is a required field',
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is a required field',
  }),
  password: Joi.string().required().min(4).max(20).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password must be at least 4 characters',
    'string.max': 'Password must be at most 20 characters',
    'string.empty': 'Password is a required field',
  }),
})
