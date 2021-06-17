import {getRepository} from 'typeorm';
import User from '../entities/User';
import bcrypt from 'bcrypt';
import jwtSignToken from './helper/jwt';

const login = async (req, res, next) => {
  const user = await getRepository(User).findOneOrFail({
    email: req.body.email,
  });
  // console.log(user);
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return next(new Error('Invalid password!'));
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
};

export default login;
