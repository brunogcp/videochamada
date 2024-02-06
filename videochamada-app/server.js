const http = require('http');
const express = require('express');
const app = express();

const { ExpressPeerServer } = require('peer');

// use express static to deliver resources HTML, CSS, JS, etc)
// from the public folder
app.use(express.static('public'));

const server = http.createServer({}, app)

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
  perMessageDeflate: false,
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('call-user', (data) => {
        console.log(`call-user event from ${data.callerID} to ${data.userID}`);
        socket.to(data.userID).emit('call-made', {
            offer: data.offer,
            callerID: data.callerID
        });
    });

    socket.on('make-answer', data => {
        console.log(`make-answer event from ${data.calleeID} to ${data.callerID}`);
        socket.to(data.callerID).emit('answer-made', {
            answer: data.answer,
            calleeID: data.calleeID
        });
    });

    socket.on('reject-call', data => {
        console.log(`reject-call event from ${data.calleeID} to ${data.callerID}`);
        socket.to(data.callerID).emit('call-rejected', {
            calleeID: data.calleeID
        });
    });

    socket.on('user-connected', (userID) => {
        console.log(`user-connected event for ${userID}`);
        socket.broadcast.emit('user-connected', userID);
    });

    socket.on('user-disconnected', (userID) => {
        console.log(`user-disconnected event for ${userID}`);
        socket.broadcast.emit('user-disconnected', userID);
    });
});

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);
app.get('/', (req, res, next) => res.redirect('/index.html'));
server.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
