const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth API', () => {
  describe('POST /auth/sign_up', () => {
    it('should handle user registration', (done) => {
      chai.request(app)
        .post('/auth/sign_up')
        .send({ firstname: 'Mark', lastname: "Twain", email: "mark@gmail.com", password: 'testpassword' })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').equal('SUCCESS');
          }
          done();
        });
    });
  });

  
  describe('POST /auth/sign_in', () => {
    it('should handle sign_in', (done) => {
      chai.request(app)
        .post('/auth/sign_in')
        .send({ email: "mark@gmail.com", password: 'testpassword' })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('access_token');
            expect(res.body).to.have.property('refresh_token');
          }
          done();
        });
    });
  });

});

