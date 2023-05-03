// import { Injectable } from '@angular/core';

// @Injectable()
// export class WebSocketService {

//   constructor() { }

// }
import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class WebSocketService {

  private socket:any;

  constructor() { }

  connect(roomId:any): Rx.Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    // this.socket = io('http://52.52.76.24:3000');
console.log(roomId);
this.socket.emit('room', roomId);

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
        this.socket.on('message', (data:any) => {
          console.log("Received message from Websocket Server", data)
          observer.next(data);
        });
        
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer,observable);
  }
  disconnectSocket() {
    this.socket.disconnect();
    console.log(this.socket);

  }
}