import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MsgService} from "./msg.service";

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  msgList: Array<String>;
  selectMessageListModel: Array<String>;

  serverDirectoryList: Array<String>;
  serverList: Array<String>;

  constructor(private msgService: MsgService, private router: Router) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.msgService.getDirectoryList().subscribe((responseMap: Array<String>) => {
      if (responseMap.length != 0) {
        this.serverDirectoryList = responseMap;
        console.log("=====initialize()=====");
        console.log(this.serverDirectoryList);
      }
    });
  };

  getList(serverInfo): void {
    this.msgService.getMessageList(serverInfo).subscribe((responseMap: Array<String>) => {
      this.msgList = null;
      if (responseMap.length != 0) {
        this.msgList = responseMap;
        this.setList(this.msgList);
        console.log("=====getList()=====");
        console.log(this.msgList);
      }
    });
  }

  setList(list: any): void {
    this.msgList = list;
  }

  selectChange(event) {
    console.log("====selectChange====");

    if (null != event) {
      // let obj: DeviceList = JSON.parse(event.toString()); 이미 json이기때문에 parse하지 않아도 된다.
      let obj: string = event;
      console.log(event);

      $('#textarea').val(event);

    }
  }
}
