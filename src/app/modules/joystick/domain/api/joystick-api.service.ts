import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class JoystickApiService {

  constructor(
    private readonly socket: Socket
  ) {
  }

  sendMove(x: number, y: number): void {
    this.sendMessage('move', {x, y});
  }

  sendClick(): void {
    this.sendMessage('click');
  }

  sendClear(): void {
    this.sendMessage('clear');
  }

  sendText(text: string): void {
    this.sendMessage('text', text);
  }

  private sendMessage(messageName: string, messageData?: any): void {
    this.socket.emit(messageName, messageData);
  }
}
