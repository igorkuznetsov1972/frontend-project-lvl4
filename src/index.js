import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

const app = async () => {
  const socket = io();
  const vdom = await init(socket);
  ReactDOM.render(
    vdom,
    document.getElementById('chat'),
  );
};
app();
