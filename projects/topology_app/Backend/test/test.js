import chai from "chai"
import chaiHttp from "chai-http"
const expect = chai.expect;
const baseUrl = "localhost:8080"

const topology = {
    'id': 'top1',
    'components':[
        {
            "type":"resistor",
            "id":"res1",
            "resistance":{
                "default":"100",
                "min":"10",
                "max":"1000"
            },
            "netlist":{
                "t1":"vdd",
                "t2":"n1"
            }
        }
    ]
}

const fileName = `top1.json`;

chai.use(chaiHttp);
describe("Testing Topology RESTful API", function(){
    
    it('Create a new topology', function(done) {
        chai.request(baseUrl)
        .post('/writetopology/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({fileName: 'top1.json', newTopology: topology})
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify(topology));

            done();
        });
    });

    it('Read existing topology', function(done) {
        chai.request(baseUrl)
        .get(`/readtopology?fileName=${fileName}`)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify(topology));
            expect(res.body).to.have.property('id');
            expect(res.body.id).to.equal(topology.id);
            expect(res.body).to.have.property('components');
            expect(res.body.components).to.have.length(1);
            done();
        });
    });

    
    it('Get devices in topology', function(done) {
        chai.request(baseUrl)
        .get(`/getdevicesintopology?fileName=${fileName}`)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify(topology.components));
            expect(res.body).to.have.length(1);
            expect(res.body[0]).to.have.property('type');
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0].type).to.equal(topology.components[0].type);
            expect(res.body[0].id).to.equal(topology.components[0].id);            
            
            done();
        });
    });


    it('Get devices with netlist', function(done) {
        chai.request(baseUrl)
        .get(`/getdevicesinnode?fileName=${fileName}&netList=vdd`)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify(topology.components));
            expect(res.body).to.have.length(1);
            expect(res.body[0]).to.have.property('type');
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0].type).to.equal(topology.components[0].type);
            expect(res.body[0].id).to.equal(topology.components[0].id);            

            done();
        });
    });

    it('Delete a non-existing topology', function(done) {
        chai.request(baseUrl)
        .delete('/deletetopology')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({fileName: 'top2135341.json'})
        .end(function (err, res) {
            expect(res).to.have.status(404);
            done();
        });
    });

    it('Reading a non-existing topology', function(done) {
        chai.request(baseUrl)
        .get(`/readtopology?fileName=top2135341.json`)
        .end(function (err, res) {
            expect(res).to.have.status(404);
            done();
        });
    });

    it('Delete an existing topology', function(done) {
        chai.request(baseUrl)
        .delete('/deletetopology')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({fileName: 'top1.json'})
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });


});