//import chai from 'chai';
//import chaiHttp from 'chai-http';
//import app from '../app';

let app = ('app')
//let assert = require('assert');
let chai = require('chai');
let should = require('chai').should();
let chaiHttp = require('chai-http');


chai.use(chaiHttp);
//chai.should();
describe("Guests", () => {
    describe("GET /guests", () => {
        // Test to get all guests record
        it("should get all guests record", (done) => {
            chai.request('http://localhost:8080').get('/guests')
             //.get('/guests')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
    });
});