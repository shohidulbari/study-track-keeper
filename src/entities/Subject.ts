/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.subjects)
  user: User;
};
