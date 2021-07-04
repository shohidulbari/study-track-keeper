import {getRepository} from 'typeorm';
import Topic from '../entities/Topic';
const createError = require('http-errors');

export const addTopic = async (req, res, next) => {
  try {
    const newTopic = new Topic();
    newTopic.name = req.body.name;
    newTopic.description = req.body.description;
    newTopic.user = req.requesterUserId;
    newTopic.subject = req.body.subject ? req.body.subject : null;
    const created = await getRepository(Topic).save(newTopic);
    return res.status(201).send({
      data: created,
    });
  } catch (err) {
    return next(new createError.InternalServerError(err.message));
  }
};
