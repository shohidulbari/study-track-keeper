/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {EntityRepository, Repository} from 'typeorm';
import Topic from '../entities/Topic';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  createTopic(topic) {
    return this.save(topic);
  }
}
