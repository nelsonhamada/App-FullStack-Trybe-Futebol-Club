import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeams, oneTeam } from './mocks/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota get de /team', function () {
  afterEach(() => {
    sinon.restore();
  })
 
  it('Retorna todos os times', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allTeams);
  });

  it('Retorna time por Id', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(oneTeam as any);

    const { status, body } = await chai.request(app).get('/teams/4');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(oneTeam);
  });

  it('Retorna erro quando id não encontrado', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(404);
    expect(body.message).to.equal('Team not found')

  })
});