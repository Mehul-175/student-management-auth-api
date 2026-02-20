import Joi from "joi"

export const createStudentValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  course: Joi.string().required(),
})

export const updateStudentValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().optional(),
  course: Joi.string().optional(),
})
