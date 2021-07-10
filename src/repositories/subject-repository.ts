/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Subject from '../entities/Subject';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  createSubject(subject) {
    return this.save(subject);
  }
}
