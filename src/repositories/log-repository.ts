/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Log from '../entities/Log';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
  createTarget(log) {
    return this.save(log);
  }
}
