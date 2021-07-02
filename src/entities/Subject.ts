/* eslint-disable max-len */
/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import Topic from './Topic';
import User from './User';

@Entity()
// eslint-disable-next-line require-jsdoc
export default class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Topic, (topics) => topics.subject, {cascade: true})
  topics: Topic[];

  @ManyToOne(() => User, (user) => user.subjects, {onDelete: 'CASCADE'})
  user: User;
};
