import User from '../entities/User';
import {getRepository} from 'typeorm';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createError = require('http-errors');

const signUp = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = await bcrypt.hash(req.body.password, saltRounds);
    await getRepository(User).save(newUser);
    res.status(201).send();
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.InternalServerError(err.message));
  }
};

export default signUp;
