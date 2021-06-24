const Joi = require('joi');
const createError = require('http-errors');

const schema = Joi.object({
  // eslint-disable-next-line max-len
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const addSubjectValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.BadRequest(err.message));
  }
};

export default addSubjectValidator;
