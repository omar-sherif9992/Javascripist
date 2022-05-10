import express from 'express'
import TopologyReader from '../util/topologyReader.util.js'
const router = express.Router();


router.get('/', (req, res) => {
    return res.status(200).send('Welcome to Topology API');
});


router.get('/readtopology', (req, res) => {

    let file = req.query.fileName;

    if(!file) {
        return res.status(404).send('Error 404: Please Write Filename');
    }

    try {
        let topology = new TopologyReader(file);
        res.status(200).json(topology.readTopology());
    } catch(error){
        res.status(404).send({error});
    }
});

router.post('/writetopology', (req, res) => {
    let file = req.body.fileName;
    let newTopology;
    if(!file) return res.status(404).send('Error 404: Not found file');

    try {
        newTopology = req.body.newTopology;
    } catch(err){
        newTopology = {};
    }


    try {
        let topology = new TopologyReader(file, true);
        
        let currentTopology;
        currentTopology = newTopology;
        topology.writeTopology(currentTopology);

        return res.status(200).json(topology.readTopology());

    } catch(error){
        return res.status(404).send(error);
    }

});

router.get('/getdevicesintopology', (req, res) => {

    let file = req.query.fileName;

    if(!file) {
        return res.status(404).send('Error 404: Not found file');
    }

    try {
        let topology = new TopologyReader(file);
        return res.status(200).json(topology.getDevicesInTopology());
    } catch(error){
        return res.status(404).send(error);
    }
    

});

router.get('/getdevicesinnode', (req, res) => {
    let file = req.query.fileName;
    let netlist = req.query.netList;

    if(!netlist) return res.status(404).send('Error 404: Netlist not found');
    if(!file) return res.status(404).send('Error 404: Not found file');
    
    try {
        let topology = new TopologyReader(file);
        return res.status(200).json(topology.getDevicesInNetlist(netlist));
    } catch(error){
        return res.status(404).send(error);
    }
});


router.delete('/deletetopology', (req, res) => {

    let file = req.body.fileName;

    if(!file) return res.status(404).send('Error 404: Not found file');


    try {
        let topology = new TopologyReader(file);
        topology.deleteTopology();
        return res.sendStatus(200);
    } catch(error){
        return res.status(404).send(error);
    }

});


export default router;
