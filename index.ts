const http = require('http');
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import User from './src/entities/User';
import app from './src/app';

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
      entities: [User],
      synchronize: true,
      logging: false,
    });
  }
)();

server.listen(3000, () => {
  console.log('server is listening at port 3000');
});
