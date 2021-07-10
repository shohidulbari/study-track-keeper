import User from '../entities/User';
import {getCustomRepository} from 'typeorm';
import {UserRepository} from '../repositories/user-repository';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createError = require('http-errors');

const signUp = async (req, res, next) => {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = await bcrypt.hash(req.body.password, saltRounds);
    const userRepository = getCustomRepository(UserRepository);
    const created = await userRepository.createUser(newUser);
    res.status(201).send({
      data: {
        name: created.name,
        email: created.email,
        id: created.id,
      },
    });
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.InternalServerError(err.message));
  }
};

export default signUp;
