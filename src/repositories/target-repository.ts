/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Target from '../entities/Target';

@EntityRepository(Target)
export class TargetRepository extends Repository<Target> {
  createTarget(target) {
    return this.save(target);
  }
}
