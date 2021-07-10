import {getCustomRepository} from 'typeorm';
import bcrypt from 'bcrypt';
import {jwtSignToken} from './helper/jwt';
import {UserRepository} from '../repositories/user-repository';
const createError = require('http-errors');

const login = async (req, res, next) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneOrFail({
      email: req.body.email,
    });
    // console.log(user);
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      // eslint-disable-next-line new-cap
      return next(createError.BadRequest('wrong password'));
    } else {
      const token = await jwtSignToken({
        id: user.id,
      });
      // console.log(token);
      res.cookie('authorization', `Bearer ${token}`);
      res.status(200).send({
        data: {
          jwtToken: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      });
    };
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.InternalServerError(err.message));
  }
};

export default login;
