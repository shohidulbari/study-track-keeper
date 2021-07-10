/* eslint-disable max-len */
/* eslint-disable new-cap */
import {Entity, Column, ManyToOne, OneToMany} from 'typeorm';
import BaseEntity from './BaseEntity';
import Subject from './Subject';
import Target from './Target';
import User from './User';

@Entity()
// eslint-disable-next-line require-jsdoc
export default class Topic extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Subject, (subject) => subject.topics, {onDelete: 'CASCADE'})
  subject: Subject;

  @ManyToOne(() => User, (user) => user.topics, {onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => Target, (target) => target.topic, {cascade: true})
  targets: Target[];
};
