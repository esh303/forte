// import { Injectable } from '@angular/core';

// @Injectable()
// export class ChatService {

//   constructor() { }

// }
import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable()

export class ChatService {
  
  messages:any = Subject;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebSocketService) {
    
   }
   getMessages(roomId:any) {
    // return this.messages = <Subject<any>>this.wsService
    // .connect(roomId)
    // .map((response: any): any => {
    //   return response;
    // });
   }
  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg:any) {
    this.messages.next(msg);
  }
  
}
