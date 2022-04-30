import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

const socket = io();
console.log(socket)
ReactDOM.render(
  init(socket),
  document.getElementById('chat'),
);
