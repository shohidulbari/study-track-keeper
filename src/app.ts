const express = require('express');
const app = express();
import signUpValidator from './validator/signup';
import signUp from './handler/signup';
import loginValidator from './validator/login';
import login from './handler/login';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/v1/user', signUpValidator, signUp);
app.post('/api/v1/user/login', loginValidator, login);

app.use((err, req, res, next) => {
  res.status(400).send({
    error: {
      status: 400,
      name: err.name,
      message: err.message,
    },
  });
});

export default app;
