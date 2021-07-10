/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {Column, Entity, ManyToOne} from 'typeorm';
import User from './User';
import {StudyTime} from './enum/StudyTime';
import Target from './Target';
import BaseEntity from './BaseEntity';

@Entity()
export default class Log extends BaseEntity {
  @Column({
    type: 'enum',
    enum: StudyTime,
    default: StudyTime.MORNING,
  })
  studyTime: StudyTime;

  @Column()
  time: number;

  @Column()
  note: string;

  @ManyToOne(() => User, (user) => user.logs, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Target, (target) => target.logs, {onDelete: 'CASCADE'})
  target: Target;
}
