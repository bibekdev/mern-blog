import Joi, { ObjectSchema } from 'joi'

export const createBlogSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': 'Email must be of type string',
    'string.empty': 'Email is a required field',
  }),
  desc: Joi.string().required().min(4).max(200).messages({
    'string.base': 'Description must be of type string',
    'string.min': 'Description must be at least 4 characters',
    'string.max': 'Description must be at most 200 characters',
    'string.empty': 'Description is a required field',
  }),
  banner: Joi.string().required().messages({
    'string.base': 'Email must be of type string',
    'string.empty': 'Email is a required field',
  }),
  tags: Joi.array().items(Joi.string().required()).messages({
    'array.base': 'Must be an array of strings',
    'string.base': 'Each item must be a string',
    'any.required': 'Tags is required field',
  }),
  draft: Joi.boolean().messages({
    'boolean.base': 'Must be a boolean value',
  }),
  content: Joi.object().required().messages({
    'object.empty': 'Content is a required field',
  }),
})
