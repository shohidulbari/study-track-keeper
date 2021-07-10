/* eslint-disable max-len */
import {getCustomRepository} from 'typeorm';
import Subject from '../entities/Subject';
import {SubjectRepository} from '../repositories/subject-repository';
const createError = require('http-errors');


export const addSubject = async (req, res, next) => {
  try {
    const newSubject = new Subject();
    newSubject.name = req.body.name;
    newSubject.description = req.body.description;
    newSubject.user = req.requesterUserId;
    const created = await getCustomRepository(SubjectRepository).createSubject(newSubject);
    res.status(201).send({
      data: created,
    });
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.InternalServerError(err.message));
  }
};
