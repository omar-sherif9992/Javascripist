import fs from 'fs'

export default class TopologyReader {

    file = null;

    constructor(srcDest='', creatingNewFile=false){
        this.file = srcDest;
        return fs.readFile('./'+this.file, (err, data) => {
            
            if (err){
                if(creatingNewFile === true) return fs.writeFileSync('./'+this.file, JSON.stringify({}));
                return {};
            }
            
            try {
                data = JSON.parse(data);
            } catch(err){
                data = {};
            }

            return data;
        });
    }

    readTopology(){
        if(this.file === null) {
            return;
        }
        return JSON.parse(fs.readFileSync('./'+this.file));
    }

    writeTopology(newTopology){         
        let data = JSON.stringify(newTopology);
        fs.writeFileSync('./'+this.file, data);
    }

    queryTopology(topology){

    }

    deleteTopology(){
        fs.unlinkSync('./' + this.file);
    }

    getDevicesInTopology(){
        if(this.file === null) {
            return;
        }
        return this.readTopology()['components'];
    }

    getDevicesInNetlist(netlist){
        if(this.file === null){
            return;
        }

        let data = this.readTopology()['components'];
        let componentsWithNetlist = [];

        for(let row of data){
        
            for(let key in row.netlist){
                if(row.netlist[key] == netlist){
                    componentsWithNetlist.push(row);
                    break;
                }
            }
        
        }

        return componentsWithNetlist;
    }

}