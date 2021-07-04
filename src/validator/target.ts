import Joi from 'joi';
const createError = require('http-errors');

const addTargetSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  time: Joi.number().min(15).max(525600).required(),
  note: Joi.string().allow(null, ''),
  subject: Joi.number().allow(null),
  topic: Joi.number().allow(null),
});


export const addTargetValidator = async (req, res, next) => {
  try {
    await addTargetSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    return next(new createError.BadRequest(err.message));
  }
};
