import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { Socket, Server } from 'socket.io';
import { WebsocketsExceptionFilter } from './ws-exception.filter';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  sender: string; // Sender nickname or ID
  @IsNotEmpty()
  @IsString()
  recipient: string; // Recipient nickname or ID
  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway(3000,{
  cors: {
    origin: 'http://localhost:3000',
  },
})
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>(); // Map of nickname to socket.id

  // Handle client connection
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Handle client disconnection
  handleDisconnect(client: Socket) {
    const user = [...this.userSockets.entries()].find(
      ([, socketId]) => socketId === client.id,
    );
    if (user) {
      this.userSockets.delete(user[0]); // Remove user from the map
      console.log(`Client disconnected: ${user[0]} (${client.id})`);
    }
  }

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody('nickname') nickname: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.userSockets.set(nickname, client.id); // Store user's socket ID
    console.log(`User registered: ${nickname} (${client.id})`);
  }

  @SubscribeMessage('text-chat')
  @UsePipes(new ValidationPipe())
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const recipientSocketId = this.userSockets.get(message.recipient);

    if (!recipientSocketId) {
      client.emit('exception', {
        status: 'error',
        message: `Recipient ${message.recipient} is not available.`,
      });
      return;
    }

    // Send message to the recipient
    client.to(recipientSocketId).emit('text-chat', {
      sender: message.sender,
      message: message.message,
      time: new Date().toISOString(),
    });

    // Optionally send acknowledgment to the sender
    client.emit('text-chat-ack', {
      recipient: message.recipient,
      message: message.message,
      time: new Date().toISOString(),
    });
  }
}
