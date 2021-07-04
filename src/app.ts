/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const express = require('express');
const app = express();
const cookieParsar = require('cookie-parser');
import signUpValidator from './validator/signup';
import signUp from './handler/signup';
import loginValidator from './validator/login';
import {addSubjectValidator} from './validator/subject';
import login from './handler/login';
import {isAuthorized} from './handler/helper/jwt';
import {addSubject} from './handler/subject';
import errorResponse from './handler/helper/error-response';
import {addTopicValidator} from './validator/topic';
import {addTopic} from './handler/topic';
import {addTargetValidator} from './validator/target';
import {addTarget} from './handler/target';
import {addLogValidator} from './validator/log';
import {addLog} from './handler/log';

app.use(express.json());
app.use(cookieParsar());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/v1/user', signUpValidator, signUp);
app.post('/api/v1/user/login', loginValidator, login);
app.post('/api/v1/subject', isAuthorized, addSubjectValidator, addSubject);
app.post('/api/v1/topic', isAuthorized, addTopicValidator, addTopic);
app.post('/api/v1/target', isAuthorized, addTargetValidator, addTarget);
app.post('/api/v1/log', isAuthorized, addLogValidator, addLog);

app.use(errorResponse);

export default app;
