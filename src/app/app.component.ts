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
  users: any = [];

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
  }

  getName(e: any) {
    console.log(e)
    if (e.keyCode === 13) {
      if (this.name.trim().length > 3) {
        this.nameSet = true;
        socket.emit('updateName', this.name.trim())
      }
    }
  }
}
