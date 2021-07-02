/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const express = require('express');
const app = express();
const cookieParsar = require('cookie-parser');
import signUpValidator from './validator/signup';
import signUp from './handler/signup';
import loginValidator from './validator/login';
import addSubjectValidator from './validator/add-subject';
import login from './handler/login';
import {isAuthorized} from './handler/helper/jwt';
import addSubject from './handler/add-subject';
import errorResponse from './handler/helper/error-response';

app.use(express.json());
app.use(cookieParsar());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/v1/user', signUpValidator, signUp);
app.post('/api/v1/user/login', loginValidator, login);
app.post('/api/v1/subject', isAuthorized, addSubjectValidator, addSubject);

app.use(errorResponse);

export default app;
