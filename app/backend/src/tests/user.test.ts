import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { invalidEmail, invalidPassword, validAccess } from './mocks/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /user e derivadas.', function () {
  it('Retorna mensagem de erro ao tentar fazer login sem email e senha.', async function () {
    const { status, body } = await chai.request(app).post('/login').send({});

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled'});
  });

  it('Retorna erro ao tentar fazer login com email inválido.', async function () {

    const { status, body } = await chai.request(app).post('/login').send(invalidEmail);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password'});
  });

  it('Retorna erro ao tentar fazer login com senha inválida.', async function () {

    const { status, body } = await chai.request(app).post('/login').send(invalidPassword);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password'});
  });

  it('Retorna token de acesso ao informar email e senha corretos.', async function () {

    const { status, body } = await chai.request(app).post('/login').send(validAccess);

    expect(status).to.be.equal(200);
    expect(body).to.have.property('token');
  });

  it('Verifica token em /login/role.', async function () {
    const { status, body } = await chai.request(app).get('/login/role');

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' })

  });
})