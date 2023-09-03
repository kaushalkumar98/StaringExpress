const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next();
});
app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send( { 'key1': 'value' })
});
const server = http.createServer(app);
server.listen(3000, 'localhost', () => {
    console.log('server running at port:3000');
})