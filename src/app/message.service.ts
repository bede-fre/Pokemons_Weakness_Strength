import { Injectable } from '@angular/core';

@Injectable(
    { providedIn: 'root' }
)

export class MessageService {
  messages:string[] = [];
  
  //Add Message to dislay
  addMessage(message: string) {
    this.messages.push(message);
  }

  //Delete all messages from message list
  clearAllMessages() {
    this.messages = [];
  }
}