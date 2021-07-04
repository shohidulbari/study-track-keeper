import Joi from 'joi';
const createError = require('http-errors');

const addLogSchema = Joi.object({
  studyTime: Joi.string().required(),
  time: Joi.number().min(15).max(3600).required(),
  note: Joi.string().max(1024).allow('', null),
  subject: Joi.number().allow(null),
  topic: Joi.number().required(),
  target: Joi.number().allow(null),
});


export const addLogValidator = async (req, res, next) => {
  try {
    await addLogSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    return next(new createError.BadRequest(err.message));
  }
};
