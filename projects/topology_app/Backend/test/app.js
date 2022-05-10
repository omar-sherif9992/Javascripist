import chai from "chai"
import chaiHttp from "chai-http"
const expect = chai.expect;
const baseUrl = "localhost:8080"

chai.use(chaiHttp);
describe("Checking Server", function(){
    it('Server is UP', function(done) {
        chai.request(baseUrl)
        .get('/')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.text).to.equal("Welcome to Topology API");
            done();
        });
    });
});