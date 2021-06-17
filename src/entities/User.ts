/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
// eslint-disable-next-line require-jsdoc
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
};
