/* eslint-disable no-invalid-this */

import {getRepository} from 'typeorm';
import User from '../src/entities/User';

require('should');
const request = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;
const cases = require('./cases/signup');
const config = require('./config');

const sendRequest = async (url, data, authorization) => {
  const resp = await request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${authorization}`,
    },
  });
  return resp;
};


describe('Lifecycle Test', function() {
  this.timeout(10000);
  let authorization;
  let subject;
  let topic;
  let target;
  before(function() {
    require('../index');
  });

  after(async function() {
    await getRepository(User).delete({
      email: cases.case_01.input.email,
    });
  });

  it('Should register a new user - Sign UP', async () => {
    const resp = await request(`${config.host}/api/v1/user`, {
      method: 'POST',
      body: JSON.stringify(cases.case_01.input),
      headers: {'Content-Type': 'application/json'},
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(201);
  });

  it('Should login to the user - Login', async () => {
    const resp = await request(`${config.host}/api/v1/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'sbr@gmail.com',
        password: '123456',
      }),
      headers: {'Content-Type': 'application/json'},
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(200);
    const respJson = await resp.json();

    respJson.should.be.an.Object();
    respJson.should.have.property('data');
    respJson.data.should.be.an.Object();
    respJson.data.should.have.property('jwtToken');
    respJson.data.should.have.property('user');
    respJson.data.user.should.be.an.Object();
    authorization = respJson.data.jwtToken;
  });

  it('Should add a subject - Subject', async () => {
    const resp = await request(`${config.host}/api/v1/subject`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Subject',
        description: 'This subject is for test',
      }),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${authorization}`,
      },
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(201);
    const respJson = await resp.json();
    respJson.should.be.an.Object();
    respJson.should.have.property('data');
    subject = respJson.data.id;
  });

  it('Should add a new Topic - Topic', async () => {
    const url = `${config.host}/api/v1/topic`;
    const data = {
      name: 'Test Topic',
      description: 'This topic is for test',
      subject: subject,
    };
    const resp = await sendRequest(url, data, authorization);
    expect(resp).to.have.property('status');
    expect(resp.status).to.equal(201);
    const respJson = await resp.json();
    expect(respJson).to.be.an('object');
    expect(respJson).to.have.a.property('data');
    expect(respJson.data).to.be.an('object');
    expect(respJson.data).to.have.a.property('id');
    topic = respJson.data.id;
  });

  it('Should add a new Target - Target', async () => {
    const url = `${config.host}/api/v1/target`;
    const data = {
      startDate: '2021-07-25T06:47:50.580Z',
      endDate: '2021-07-27T06:47:50.580Z',
      time: 180,
      note: 'javascript language learning',
      topic: topic,
    };
    const resp = await sendRequest(url, data, authorization);
    expect(resp).to.have.property('status');
    expect(resp.status).to.equal(201);
    const respJson = await resp.json();
    expect(respJson).to.be.an('object');
    expect(respJson).to.have.a.property('data');
    expect(respJson.data).to.be.an('object');
    target = respJson.data.id;
  });

  it('Should add a new Log - Log', async () => {
    const url = `${config.host}/api/v1/log`;
    const data = {
      studyTime: 'MORNING',
      time: 180,
      note: 'morning study entry to test',
      target: target,
    };
    const resp = await sendRequest(url, data, authorization);
    expect(resp).to.have.property('status');
    expect(resp.status).to.equal(201);
    const respJson = await resp.json();
    expect(respJson).to.be.an('object');
    expect(respJson).to.have.a.property('data');
    expect(respJson.data).to.be.an('object');
  });
});
