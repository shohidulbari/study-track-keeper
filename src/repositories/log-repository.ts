/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Log from '../entities/Log';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
  createLog(log) {
    return this.save(log);
  }
}
