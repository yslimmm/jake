import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MsgService, RequestInfo, headerList} from "./msg.service";

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
      this.jsonRequestResult = null;

      if (responseMap.length != 0) {
        this.msgList = responseMap;
        this.setList(this.msgList);
        console.log("=====getList()=====");
        console.log(this.msgList);
      } else {
        alert('json 파일 없음...');
      }
    });
  }

  setList(list: any): void {
    this.jsonRequestResult = null;
    this.msgList = list;
  }

  selectChange(fileName) {
    console.log("====selectChange()====");
    if (null != fileName) {
      // let obj: DeviceList = JSON.parse(filename.toString()); 이미 json이기때문에 parse하지 않아도 된다.

      this.msgService.getMessage(this.serverInfo, fileName.trim()).subscribe((responseMap: String) => {
        if (responseMap.length != 0) {
          console.log(responseMap);
          this.jsonRequestResult = null;
          this.jsonRequestResult = this.msgService.getMessageBeautiful(responseMap);

        } else {
          $('#textarea').val('내용 없음');
        }
      });
    }
  }

  downloadJsonFile(downloadFileName, content) {
    console.log("====downloadJsonFile()====");
    // TODO 윈도우환경에서 리눅스 ssh를 이용한 파일 다운로드는.... 어떻게...?
    if (null != downloadFileName) {

      // var link = document.createElement('a');
      // link.setAttribute('download', downloadFileName);
      // link.setAttribute('href', 'data:' + "application/txt"  +  ';charset=utf-8,' + encodeURIComponent(content));
      // link.click();

    } else {
      alert('다운로드할 파일 정보가 없음');
    }

  }
}
