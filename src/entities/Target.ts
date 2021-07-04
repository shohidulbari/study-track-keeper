/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import Log from './Log';
import Subject from './Subject';
import Topic from './Topic';
import User from './User';
import BaseEntity from './BaseEntity';

@Entity()
export default class Target extends BaseEntity {
  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  time: number;

  @Column()
  note: string;

  @ManyToOne(() => User, (user) => user.targets, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.targets, {onDelete: 'CASCADE'})
  subject: Subject;

  @ManyToOne(() => Topic, (topic) => topic.targets, {onDelete: 'CASCADE'})
  topic: Topic;

  @OneToMany(() => Log, (log) => log.target, {cascade: true})
  logs: Log[];
}
