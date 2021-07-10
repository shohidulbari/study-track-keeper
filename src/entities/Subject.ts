/* eslint-disable max-len */
/* eslint-disable new-cap */
import {Entity, Column, ManyToOne, OneToMany} from 'typeorm';
import BaseEntity from './BaseEntity';
import Topic from './Topic';
import User from './User';

@Entity()
// eslint-disable-next-line require-jsdoc
export default class Subject extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.subjects, {onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => Topic, (topics) => topics.subject, {cascade: true})
  topics: Topic[];
};
