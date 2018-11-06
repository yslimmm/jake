import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MsgService, RequestInfo} from "./msg.service";

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  msgList: Array<String>;
  selectMessageListModel: Array<String>;

  serverInfo: string;

  serverDirectoryList: Array<String>;
  serverList: Array<String>;

  jsonRequestResult: Array<RequestInfo>;


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

  getList(serverInfo: string): void {
    this.msgService.getMessageList(serverInfo).subscribe((responseMap: Array<String>) => {
      this.serverInfo = serverInfo;
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

  selectChange(fileName) {
    console.log("====selectChange()====");

    if (null != fileName) {
      // let obj: DeviceList = JSON.parse(filename.toString()); 이미 json이기때문에 parse하지 않아도 된다.
      console.log(fileName);

      this.msgService.getMessage(this.serverInfo, fileName).subscribe((responseMap: String) => {
        if (responseMap.length != 0) {
          console.log(responseMap);
          this.jsonRequestResult = this.msgService.getMessageBeautiful(responseMap);

          // $('#textarea').val('ttt');
        } else {
          $('#textarea').val('내용 없음');
        }
      });
    }
  }
}
