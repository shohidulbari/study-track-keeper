import {getCustomRepository} from 'typeorm';
import Log from '../entities/Log';
import {LogRepository} from '../repositories/log-repository';
import {TargetRepository} from '../repositories/target-repository';
const createError = require('http-errors');

export const addLog = async (req, res, next) => {
  try {
    const {studyTime, time, note, target} = req.body;
    // check assiociation
    await getCustomRepository(TargetRepository)
        .isUserAssociated(target, req.requesterUserId);
    // create new log
    const newLog = new Log();
    newLog.studyTime = studyTime;
    newLog.time = time;
    newLog.note = note;
    newLog.target = target;
    const created = await getCustomRepository(LogRepository).createLog(newLog);
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
