import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './utils/db';
import { initChatSocket } from './sockets/chatSocket';

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDB();
initChatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Chat API running on port ${PORT}`));
