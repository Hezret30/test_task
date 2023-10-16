const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const create_token = require('../src/tools/token')
const { env } = require('../config/config')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Boss API', () => {
  describe('GET /bosses', () => {
    it('should get all bosses ', (done) => {
      chai.request(app)
        .get('/bosses')
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

  describe('GET /bosses/me', () => {
    it('should get the boss', (done) => {
      const id = 1
      const access_token = create_token(id, env.access_key, env.access_time)

      chai.request(app)
        .get('/bosses/me')
        .set('Authorization', `Bearer ${access_token}`)
        .end((err, res) => {
          if (err) {
            expect([400, 401, 403]).to.include(res.status);
            expect(res.body).to.have.property('message');
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
          }
          done();
        });
    });
  });


  describe('PUT /bosses', () => {
    it('should update the boss', (done) => {
      const id = 1
      const access_token = create_token(id, env.access_key, env.access_time)

      chai.request(app)
        .put('/bosses')
        .set('Authorization', `Bearer ${access_token}`)
        .send({ firstname: 'James', lastname: "Clear", email: "james@gmail.com" })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object')
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('SUCCESS');
          }
          done();
        });
    });
  });


  // describe('DELETE /bosses', () => {
  //   it('should delete the boss', (done) => {
  //     const id = 1
  //     const access_token = create_token(id, env.access_key, env.access_time)

  //     chai.request(app)
  //       .delete('/bosses')
  //       .set('Authorization', `Bearer ${access_token}`)
  //       .end((err, res) => {
  //         if (err) {
  //           expect(res).to.have.status(400);
  //           expect(res.body).to.be.an('object')
  //         } else {
  //           expect(res).to.have.status(200);
  //           expect(res.body).to.have.property('message').equal('SUCCESS');
  //         }
  //         done();
  //       });
  //   });
  // });

});