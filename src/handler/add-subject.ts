import {getRepository} from 'typeorm';
import Subject from '../entities/Subject';
const createError = require('http-errors');


const addSubject = async (req, res, next) => {
  try {
    const newSubject = new Subject();
    newSubject.name = req.body.name;
    newSubject.description = req.body.description;
    newSubject.user = req.requesterUserId;
    const created = await getRepository(Subject).save(newSubject);
    res.status(201).send({
      data: created,
    });
  } catch (err) {
    // eslint-disable-next-line new-cap
    return next(createError.InternalServerError(err.message));
  }
};

export default addSubject;
