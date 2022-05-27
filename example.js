// server with express to handle routes for an API
const express = require('express');
const fs = require('fs');
// let Joi = require('joi');
const app = express();
var socket = require('socket.io');

const port = process.env.PORT || 3000;

let record = [
    {id: 1, user: 'user-1', msg: 'example'},
    {id: 2, user: 'user-2', msg: 'example'}
];
//express middleware
app.use(express.json());
app.use(express.static('public'));

app.get('/api/courses', (req, res) => {
    // when courses route 
    res.send(record);
});

app.get('/api/courses/:id', (req, res) => {
    // when specific courses route 
    let course = record.find(c => c.id === parseInt( req.params.id) );
    //if not found 
    if(! course) res.status(404).send('record not found!');
    else res.send(course);
});

app.post('/api/courses', (req, res) => {
    // when new post
    
    // validating 
    if(! req.body.user || req.body.user.length < 5){
        res.status(400);
        res.send('name need it to be more then 4 chars')
        return;
    }

    let course = {
        id: record.length + 1,
        user: req.body.user,
        msg: req.body.msg
    };
    record.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //when put request
    // validate

    //retrieve the right record from data
    let course = record.find( c => c.id === parseInt( req.params.id ) );

    // validating 
    if(req.body.id < 0 || req.body.id == 0){
        res.status(400);
        res.send('ID must be greater then 0')
        return;
    }

    //updating record
    course.msg = req.body.msg;
    // returning response back to client
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    //when delete request
    // validate

    //retrieve the right record from data
    let course = record.find( c => c.id === parseInt( req.params.id ) );
    // getting index
    let index = record.indexOf(course);
    // validating 
    if(req.body.id < 0 || req.body.id == 0){
        res.status(400);
        res.send('ID must be greater then 0');
        return;
    }
    //removing record from data collection
    record.splice(index, 1);
    // sending removed record
    res.send(course);
});

// serving static file
app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    //read file
    fs.readFile('index.html', (err, content) => {
    // if error occoured
        if(err){
        res.writeHead(404);    
        res.send('error: loading content');
    }
    // if everithing is goo then
    else{
        res.send(content);
    }
    res.end();
    });
    //end of reading file
});

let server = app.listen(port, ()=>{ console.log('Listening and acepting routes at port '+port) });

//setting up socket
var io = socket(server);

//setting events on socket
io.on('connection', (socket) =>{
    console.log(`new connection from ${socket.id}`);
    //handle socket
    socket.on('chat', (data) =>{
        // pushing new chat obj to array
        record.push({
            id: record.length + 1,
            user: data.user,
            msg: data.msg
        });
        io.sockets.emit('chat', data);
    })
});