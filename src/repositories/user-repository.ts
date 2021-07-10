/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(user) {
    return this.save(user);
  }
}
