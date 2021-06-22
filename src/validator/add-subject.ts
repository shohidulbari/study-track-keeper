const Joi = require('joi');

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
    console.log('Error Found in Data format!!... Request canceled');
    return next(err);
  }
};

export default addSubjectValidator;
