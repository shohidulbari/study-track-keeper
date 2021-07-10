import {getRepository} from 'typeorm';
import Log from '../entities/Log';
const createError = require('http-errors');

export const addLog = async (req, res, next) => {
  try {
    const {studyTime, time, note, target} = req.body;
    const newLog = new Log();
    newLog.studyTime = studyTime;
    newLog.time = time;
    newLog.note = note;
    newLog.target = target ? target : null;
    const created = await getRepository(Log).save(newLog);
    return res.status(201).send({
      data: created,
    });
  } catch (err) {
    return next(new createError.InternalServerError(err.message));
  }
};
