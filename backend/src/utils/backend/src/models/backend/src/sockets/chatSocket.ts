import { Server, Socket } from 'socket.io';
import { Message } from '../models/Message';

export const initChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('sendMessage', async ({ roomId, senderId, content }) => {
      const msg = new Message({ roomId, senderId, content });
      await msg.save();
      io.to(roomId).emit('receiveMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
