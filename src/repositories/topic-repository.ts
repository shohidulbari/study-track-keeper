/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Topic from '../entities/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  /**
   *
   * @param {topic} Topic Instance
   * @returns {Promise} Typeorm
   */
  createTopic(topic) {
    return this.save(topic);
  }

  /**
   *
   * @param {topicId} Subject Id
   * @param {userId} User Id
   * @returns {Promise} Typeorm
   */
  isUserAssociated(topicId, userId) {
    return this.findOneOrFail({
      where: {
        id: topicId,
        user: userId,
      },
    });
  }
}
