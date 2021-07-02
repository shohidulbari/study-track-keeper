/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import Subject from './Subject';
import Topic from './Topic';

@Entity()
// eslint-disable-next-line require-jsdoc
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Subject, (subject) => subject.user, {cascade: true})
  subjects: Subject[];

  @OneToMany(() => Topic, (topic) => topic.user, {cascade: true})
  topics: Topic[];
};
