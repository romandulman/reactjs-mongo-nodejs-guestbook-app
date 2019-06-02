let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
chai.should();
describe("Guests", () => {
    describe("GET /guests", () => {
        it("should get all Guests record", (done) => {
            // chai.request('http://localhost:8080').get('/guests')
            chai.request(server).get('/guests')
                .end((err, res) => {
                  //  res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
        it("should get a single Guest record", (done) => {
            const name = 'Aron';
            // chai.request('http://localhost:8080').get(`/guests/${name}`)
            chai.request(server)
                .get(`/guests/${name}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not get a single Guest record", (done) => {
            const name = 'Aron11';
            // chai.request('http://localhost:8080').get(`/guests/${name}`)
            chai.request(server)
                .get(`/guests/${name}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});