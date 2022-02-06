import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://127.0.0.1:4000');

Vue.use(new VueSocketIO({
    connection: SocketInstance,
}), SocketInstance)