require('dotenv').config();
const http = require('http');
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import User from './src/entities/User';
import app from './src/app';
import Subject from './src/entities/Subject';
import Topic from './src/entities/Topic';
import Target from './src/entities/Target';
import Log from './src/entities/Log';

const server = http.createServer(app);

(
  async function() {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'stkdev',
      password: 'stkdev',
      database: 'stkdb',
      entities: [User, Subject, Topic, Target, Log],
      synchronize: true,
      logging: false,
    });
  }
)();

server.listen(3000, () => {
  console.log('server is listening at port 3000');
});

module.exports = server;
