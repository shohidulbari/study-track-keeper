import {getRepository} from 'typeorm';
import Target from '../entities/Target';
const createError = require('http-errors');

export const addTarget = async (req, res, next) => {
  try {
    const {startDate, endDate, time, note, subject, topic} = req.body;
    if (!subject && !topic) {
      return next(new createError.BadRequest('Subject & Topic both are null'));
    }
    const newTarget = new Target();
    newTarget.startDate = startDate;
    newTarget.endDate = endDate;
    newTarget.time = time;
    newTarget.note = note;
    newTarget.user = req.requesterUserId;
    newTarget.topic = topic ? topic : null;
    const created = await getRepository(Target).save(newTarget);
    return res.status(201).send({
      data: created,
    });
  } catch (err) {
    return next(new createError.InternalServerError(err.message));
  }
};
