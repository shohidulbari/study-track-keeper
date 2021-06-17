const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  // eslint-disable-next-line max-len
  email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
  password: Joi.string().min(6).required(),
});

const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    console.log('Error Found in Data format!!... Request canceled');
    return next(err);
  }
};

export default signUpValidator;
