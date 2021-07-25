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


describe('Topic Test', function() {
  this.timeout(10000);
  let authorization;
  let subject;
  before(function() {
    require('../index');
  });

  after(async function() {
    await getRepository(User).delete({
      email: cases.case_01.input.email,
    });
  });

  it('Should register a new user', async () => {
    const resp = await request(`${config.host}/api/v1/user`, {
      method: 'POST',
      body: JSON.stringify(cases.case_01.input),
      headers: {'Content-Type': 'application/json'},
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(201);
  });

  it('Should login to the user', async () => {
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

  it('Should add a subject', async () => {
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

  it('Should add a new Topic', async () => {
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
    expect(respJson.data).to.have.a.property('subject');
    expect(respJson.data.subject).to.equal(subject);
  });

  it('Should add a new Topic - without subject', async () => {
    const url = `${config.host}/api/v1/topic`;
    const data = {
      name: 'Test Topic',
      description: 'This topic is for test',
    };
    const resp = await sendRequest(url, data, authorization);
    expect(resp).to.have.property('status');
    expect(resp.status).to.equal(201);
  });

  it('Should not add a new topic - subject association is not matched',
      async () => {
        const url = `${config.host}/api/v1/topic`;
        const data = {
          name: 'Test Topic',
          description: 'This topic is for test',
          subject: 1000, // fake subject
        };
        const resp = await sendRequest(url, data, authorization);
        expect(resp).to.have.property('status');
        expect(resp.status).to.not.equal(201);
        const respJson = await resp.json();
        expect(respJson).to.be.an('object');
        expect(respJson).to.have.a.property('error');
        expect(respJson.error).to.be.an('object');
        expect(respJson.error).to.have.a.property('statusCode');
        expect(respJson.error.statusCode).to.equal(400);
      });
});
