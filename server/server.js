var rpio = require('rpio');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

rpio.open(37, rpio.INPUT);
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
const allTheWork = socket => {
  while (true) {
    const val1 = rpio.read(37);
    if (val1 == 0) {
      console.log('scorePoints');
      socket.emit('player1');
    }
  }
};

io.on('connection', function(socket) {
  console.log('a user connected');
  // socket.on("player1", function(socket2) {
  //   console.log("here1");

  //   socket.emit("player1");
  // });
  allTheWork(socket);
  socket.on('player2', function(socket2) {
    console.log('here');
    socket.emit('player2');
  });
});

http.listen(3001, function() {
  console.log('listening on *:3001');
});
process.on('SIGINT', function() {
  //on ctrl+c
  rpio.close(37);
  process.exit(); //exit completely
});
