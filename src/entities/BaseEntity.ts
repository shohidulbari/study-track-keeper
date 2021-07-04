/* eslint-disable max-len */
/* eslint-disable new-cap */
import {CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

/* eslint-disable require-jsdoc */
export default abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
