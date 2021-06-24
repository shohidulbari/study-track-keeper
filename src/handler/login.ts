import {getRepository} from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import {jwtSignToken} from './helper/jwt';
const createError = require('http-errors');

const login = async (req, res, next) => {
  try {
    const user = await getRepository(User).findOneOrFail({
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
