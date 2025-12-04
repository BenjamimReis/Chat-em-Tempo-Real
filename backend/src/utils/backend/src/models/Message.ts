import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: String,
  roomId: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);
