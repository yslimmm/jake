import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MsgService} from "./msg.service";

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  serverDirectoryList: Array<String>;
  serverList: Array<String>;

  constructor(private msgService: MsgService, private router: Router) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.msgService.getDirectoryList().subscribe((responseMap: Array<String>) => {
      console.log(responseMap);
      this.serverDirectoryList = responseMap;
      console.log(this.serverDirectoryList);
    });
  };

  getList(serverInfo): void {
    this.msgService.getMessageList(serverInfo).subscribe((responseMap: Array<String>) => {
      console.log(responseMap);
      this.serverList = responseMap;
      console.log(this.serverList);
    });
  }
}
