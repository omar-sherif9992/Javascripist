# Topology App

### Installation of modules and Run
```
npm i
node .
```


### For testing environments
```
cd test
mocha topology.test.js --timeout 1000
```

### API Calls
1 - Create Topology POST /writetopology/ (setting fileName and newTopology)

2 - Read Topology GET /readtopology/ (setting fileName)

3 - Get Devices in Topology GET /getdevicesintopology/ (setting fileName)

4 - Get Devices given netlist GET /getdevicesinnode/ (setting fileName and netList)

5 - Delete Topology DELETE /deletetopology/ (setting fileName)
