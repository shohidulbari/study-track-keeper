/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import Subject from './Subject';

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

  @OneToMany(() => Subject, (subject) => subject.user)
  subjects: Subject[];
};
