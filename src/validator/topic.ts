import Joi from 'joi';
const createError = require('http-errors');

const addTopicSchema = Joi.object({
  name: Joi.string().max(64).required(),
  description: Joi.string().max(1024).required(),
  subject: Joi.number().allow(null),
});


export const addTopicValidator = async (req, res, next) => {
  try {
    await addTopicSchema.validateAsync(req.body);
    return next();
  } catch (err) {
    return next(new createError.BadRequest(err.message));
  }
};
