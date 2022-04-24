import { Component, OnInit, NgZone } from '@angular/core';
import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  nameSet = false;
  name = '';
  userMsg = '';
  users: any = [];
  mySocketId = '';
  messages: any = [];
  searchKey = '';

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    socket.on('userList', (data: any) => {
      this.zone.run(() => {
        this.users = data;
      })
    });
    socket.on('updateUsers', (data) => {
      this.zone.run(() => {
        this.users = data;
      })
    })
    socket.on('incomingMsg', (data) => {
      this.zone.run(() => {
        this.messages.push(data);
      })
    })
    socket.on('myId', (data) => {
      this.zone.run(() => {
        this.mySocketId = data.socketId;
      })
    })
  }

  getName(e: any) {
    if (e.keyCode === 13) { // Detect Enter key on the keyboard
      if (this.name.trim().length > 3) {
        this.nameSet = true;
        socket.emit('updateName', this.name.trim());
      }
    }
  }

  getMsg(e: any) {
    if (e.keyCode === 13) { // Detect Enter key on the keyboard
      if (this.userMsg.trim().length) {
        socket.emit('sendMessage', this.userMsg.trim());
        this.userMsg = '';
      }
    }
  }
}
