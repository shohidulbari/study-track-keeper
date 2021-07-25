import {getCustomRepository} from 'typeorm';
import Target from '../entities/Target';
import {TargetRepository} from '../repositories/target-repository';
import {TopicRepository} from '../repositories/topic-repository';
const createError = require('http-errors');

export const addTarget = async (req, res, next) => {
  try {
    const {startDate, endDate, time, note, topic} = req.body;
    // check the association
    await getCustomRepository(TopicRepository)
        .isUserAssociated(topic, req.requesterUserId);
    // create new target
    const newTarget = new Target();
    newTarget.startDate = startDate;
    newTarget.endDate = endDate;
    newTarget.time = time;
    newTarget.note = note;
    newTarget.user = req.requesterUserId;
    newTarget.topic = topic;
    const created = await getCustomRepository(TargetRepository)
        .createTarget(newTarget);
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
