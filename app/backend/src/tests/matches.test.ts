import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { allTeams, oneTeam } from './mocks/team';
import SequelizeMatch from '../database/models/SequelizeMatche';
import { allMatches, matchesEnded, matchesInProgress, oneMatch } from './mocks/matches';
import { IMatch } from '../Interfaces/IMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota de /matches', function () {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna todas as partidas', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allMatches);
  });

  it('Retorna todas as partidas em andamento', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches/?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesInProgress);
  });

  it('Retorna todas as partidas finalizadas', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesEnded as any);

    const { status, body } = await chai.request(app).get('/matches/?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesEnded);
  });
 
  it('Finaliza partida ao chamar endpoint matches/id/finish', async function () {
    sinon.stub(SequelizeMatch, 'update').resolves();
    sinon.stub(jwt, 'verify').returns({ role: 'admin'} as any)

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', 'validToken');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished' })
  })
})
