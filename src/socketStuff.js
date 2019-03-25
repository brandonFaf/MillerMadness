import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');
export const subscribeToEvents = (cb1, cb2) => {
  socket.on('connect', () => {
    console.log('connected to server');
  });
  socket.on('player1', () => cb1());
  socket.on('player2', () => cb2());
  socket.emit('subscribeToPlayer1');
};
