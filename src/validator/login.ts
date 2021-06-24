const Joi = require('joi');
const createError = require('http-errors');

const schema = Joi.object({
  // eslint-disable-next-line max-len
  email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
  password: Joi.string().min(6).required(),
});

const loginValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.BadRequest(err.message));
  }
};

export default loginValidator;
