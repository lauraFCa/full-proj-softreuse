import express from 'express';
import api_v1 from './controllers/api_v1.js';
import api_v2 from './controllers/api_v2.js';


var app = express();
app.use('/first', api_v1);
app.use('/second', api_v2);



app.get('/', function (req, res) {
    res.send('Hello from root route.')
});


if (app) {
    app.listen(3000);
    console.log('Express started on port 3000 - http://localhost:3000');
}