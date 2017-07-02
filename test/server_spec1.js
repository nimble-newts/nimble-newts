var app = require('../server/index.js').app;
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Server',function(){
  var path = `/login`;
  
  it('GET to root page should be good', function(done){
    console.log(`Sending request to ${path}`);
    chai.request(app)
      .get('/')
      .set(`Content-type`, `application/json`)
      // .send({userId: '12312312312', token: '1231321312'})
      .end((err, res) => {
        console.log(`Err: ${err}, res: ${res}`);
        if (err) {
          throw err;
        } else {
          done();
        }
      });
  });

  it ('POST /login should return redirect object', done => {
    var userId = `185270765341213`;
    var token = `EAALZAun8eadoBABZAXTEtaq1kTY7o1LumYU5YZC6SUfEr5YL4I7XxmtRUagZAxneWlz1KoWCmPyGpzCXZB1eNHQVFIMvXALIkl1nXOckYkXj2VzTWOyE0quSzrygH7S911ED7OiRZC1OpOgZAZC6XvUY7Kps1ZBMYGESPQR7X9uJTdQBjhZAMZBnj43OVpyC2WvxowZD`;
    chai.request(app)
      .post(`/login`)
      .set(`Content-type`, `application/json`)
      .send(JSON.stringify({userId: userId, token: token}))
      .then(res => {
        console.log(`Res: ${res}`);
      });
      // .expect(200, done);
  //     .post('/users')
  //     .set('Content-Type','application/json')
  //     .write(JSON.stringify({ username: 'test', password: 'pass' }))
  //     .expect(200,done);
  });

});