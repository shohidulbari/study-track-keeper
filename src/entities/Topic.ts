/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import Subject from './Subject';
import User from './User';

@Entity()
// eslint-disable-next-line require-jsdoc
export default class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Subject, (subject) => subject.topics, {onDelete: 'CASCADE'})
  subject: Subject;

  @ManyToOne(() => User, (user) => user.topics, {onDelete: 'CASCADE'})
  user: User;
};
