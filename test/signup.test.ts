/* eslint-disable no-invalid-this */

import {getRepository} from 'typeorm';
import User from '../src/entities/User';

/* eslint-disable eol-last */
require('should');
const request = require('node-fetch');
const cases = require('./cases/signup');
const config = require('./config');


describe('Sign Up Test', function() {
  this.timeout(10000);

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

  it('Should not register user : invalid name', async () => {
    const resp = await request(`${config.host}/api/v1/user`, {
      method: 'POST',
      body: JSON.stringify(cases.case_02.input),
      headers: {'Content-Type': 'application/json'},
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(400);
    // console.log(resp);
    const respJson = await resp.json();
    // console.log(respJson);
    respJson.should.be.an.Object();
    respJson.should.have.property('error');
    respJson.error.should.be.an.Object();
    respJson.error.should.have.property('name');
    respJson.error.name.should.be.eql('BadRequestError');
    respJson.error.should.have.property('statusCode');
    respJson.error.statusCode.should.be.eql(400);
  });

  it('Should not register user : invalid email', async () => {
    const resp = await request(`${config.host}/api/v1/user`, {
      method: 'POST',
      body: JSON.stringify(cases.case_03.input),
      headers: {'Content-Type': 'application/json'},
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(400);
    // console.log(resp);
    const respJson = await resp.json();
    // console.log(respJson);
    respJson.should.be.an.Object();
    respJson.should.have.property('error');
    respJson.error.should.be.an.Object();
    respJson.error.should.have.property('name');
    respJson.error.name.should.be.eql('BadRequestError');
    respJson.error.should.have.property('statusCode');
    respJson.error.statusCode.should.be.eql(400);
  });

  it('Should not register user : invalid password', async () => {
    const resp = await request(`${config.host}/api/v1/user`, {
      method: 'POST',
      body: JSON.stringify(cases.case_04.input),
      headers: {'Content-Type': 'application/json'},
    });
    resp.should.be.an.Object();
    resp.should.have.property('status');
    resp.status.should.be.eql(400);
    // console.log(resp);
    const respJson = await resp.json();
    // console.log(respJson);
    respJson.should.be.an.Object();
    respJson.should.have.property('error');
    respJson.error.should.be.an.Object();
    respJson.error.should.have.property('name');
    respJson.error.name.should.be.eql('BadRequestError');
    respJson.error.should.have.property('statusCode');
    respJson.error.statusCode.should.be.eql(400);
  });
});