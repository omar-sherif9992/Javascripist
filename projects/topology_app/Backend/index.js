import app from './server.js'


const port = 8080;
const serverUrl="http://localhost"

app.listen(port, function () {
    console.log(`App listening at ${serverUrl}:${port}`);
});




