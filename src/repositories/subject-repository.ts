/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Subject from '../entities/Subject';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  /**
   * @param {subject} Subject Instance
   * @returns {Promise} Typeorm
   */
  createSubject(subject) {
    return this.save(subject);
  }

  /**
   *
   * @param {subjectId} Subject Id
   * @param {userId} User Id
   * @returns {Promise} Typeorm
   */
  isUserAssociated(subjectId, userId) {
    return this.findOneOrFail({
      where: {
        id: subjectId,
        user: userId,
      },
    });
  }
}
