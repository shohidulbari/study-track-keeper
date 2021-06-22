import {getRepository} from 'typeorm';
import Subject from '../entities/Subject';


const addSubject = async (req, res, next) => {
  const newSubject = new Subject();
  newSubject.name = req.body.name;
  newSubject.description = req.body.description;
  newSubject.user = req.requesterUserId;
  await getRepository(Subject).save(newSubject);
  res.status(201).send();
};

export default addSubject;
