const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const create_token = require('../src/tools/token')
const { env } = require('../config/config')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Employees API', () => {
  describe('GET /employees', () => {
    it('should get all employees ', (done) => {
      chai.request(app)
        .get('/employees?sort_by=firstname&page=1&limit=10')
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
          }
          done();
        });
    });
  });


  describe('POST /employees', () => {
    it('should create an employee', (done) => {
      const boss_id = 1
      const access_token = create_token(boss_id, env.access_key, env.access_time)
      
      chai.request(app)
        .post('/employees')
        .send({
          firstname: 'Max',
          lastname: 'Verner',
          email: 'max@gmail.com',
          position: 'CEO',
          BossId: boss_id
        })
        .set('Authorization', `Bearer ${access_token}`)
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').equal('SUCCESS');
          }
          done();
        });
    });
  });


  describe('GET /employees/:id', () => {
    it('should get the employee', (done) => {
      const id = 1
      chai.request(app)
        .get(`/employees/${id}`)
        .end((err, res) => {
          if (err) {
            expect([400, 404]).to.include(res.status);
            expect(res.body).to.have.property('message');
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
          }
          done();
        });
    });
  });


  describe('PUT /employees/:id', () => {
    it('should update the employee', (done) => {
      const boss_id = 1
      const id = 1
      const access_token = create_token(boss_id, env.access_key, env.access_time)

      chai.request(app)
        .put(`/employees/${id}`)
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          firstname: 'Tom',
          lastname: 'Garner',
          email: 'garner@gmail.com',
          position: 'Director',
          BossId: boss_id
        })
        .end((err, res) => {
          if (err) {
            expect([400, 404]).to.include(res.status);
            expect(res.body).to.be.an('object')
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('SUCCESS');
          }
          done();
        });
    });
  });


  describe('DELETE /employees', () => {
    it('should delete the employee', (done) => {
      const boss_id = 1
      const id = 1
      const access_token = create_token(boss_id, env.access_key, env.access_time)

      chai.request(app)
        .delete(`/employees/${id}`)
        .set('Authorization', `Bearer ${access_token}`)
        .end((err, res) => {
          if (err) {
            expect([400, 404]).to.include(res.status);
            expect(res.body).to.be.an('object')
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('SUCCESS');
          }
          done();
        });
    });
  });

});