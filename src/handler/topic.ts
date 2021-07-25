import {getCustomRepository} from 'typeorm';
import Topic from '../entities/Topic';
import {SubjectRepository} from '../repositories/subject-repository';
import {TopicRepository} from '../repositories/topic-repository';
const createError = require('http-errors');

export const addTopic = async (req, res, next) => {
  try {
    const {name, description, subject} = req.body;
    // check association of user and subject
    if (subject) {
      await getCustomRepository(SubjectRepository)
          .isUserAssociated(subject, req.requesterUserId);
    }
    const newTopic = new Topic();
    newTopic.name = name;
    newTopic.description = description;
    newTopic.user = req.requesterUserId;
    newTopic.subject = subject ? subject : null;
    const created = await getCustomRepository(TopicRepository)
        .createTopic(newTopic);
    return res.status(201).send({
      data: created,
    });
  } catch (err) {
    if (err.name === 'EntityNotFound') {
      return next(new createError.BadRequest(err.message));
    }
    return next(new createError.InternalServerError(err.message));
  }
};
