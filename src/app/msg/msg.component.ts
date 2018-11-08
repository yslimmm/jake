import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MsgService, RequestInfo, headerList, JsonGroup} from "./msg.service";

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

  jsonGroup: JsonGroup;
  jsonRequestResult: Array<RequestInfo>;

  downloadJsonModel: Array<RequestInfo>;
  downloadJsonFileName: string;

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

  /**
   * 서버 버튼을 누르면 각 경로에 업로드 되어있는 json 파일 리스트를 selectBox에 바인딩
   *
   * @param list
   */
  setList(list: any): void {
    this.jsonRequestResult = null;
    this.msgList = list;
  }

  /**
   * selectBox에서 셀렉팅한 json파일의 전문을 모델 변수에 바인딩
   *
   * @param fileName
   */
  selectChange(fileName) {
    console.log("====selectChange()====");

    if (null != fileName) {
      // let obj: DeviceList = JSON.parse(filename.toString()); 이미 json이기때문에 parse하지 않아도 된다.
      this.msgService.getMessage(this.serverInfo, fileName.trim()).subscribe((responseMap: String) => {
        if (responseMap.length != 0) {
          console.log(responseMap);
          this.jsonRequestResult = null;
          this.jsonRequestResult = this.msgService.getMessageBeautiful(responseMap);
          this.jsonGroup = this.msgService.getJsonGroup(responseMap);

          this.downloadJsonModel = this.jsonRequestResult;  // 전문 내용을 다운받을 수 있도록 download모델 변수에 미리 바인딩
          this.downloadJsonFileName = fileName;
        } else {
          this.downloadJsonModel = null;
          this.downloadJsonFileName = null;
          $('#textarea').val('내용 없음');
        }
      });
    } else {
      this.downloadJsonModel = null;
      this.downloadJsonFileName = null;
    }
  }

  /**
   * Blob 기법을 이용해 텍스트를 저장.
   */
  downloadJsonFile() {
    console.log("====downloadJsonFile()====");

    // TODO 윈도우환경에서 리눅스 ssh를 이용한 파일 다운로드는.... 어떻게...?
    if (null != this.downloadJsonModel) {

      var textFile = null,
        // text to create file.
        makeTextFile = function (text) {
          var data = new Blob([text], {type: 'application/json'});      // .txt : {type: 'text/plain'}

          // If we are replacing a previously generated file we need to
          // manually revoke the object URL to avoid memory leaks.
          if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
          }

          textFile = window.URL.createObjectURL(data);

          return textFile;
        };

      var link = document.createElement('a');                             // a태그 생성
      link.setAttribute('download', this.downloadJsonFileName);           // 저장할 파일 이름
      link.href = makeTextFile(JSON.stringify(this.jsonGroup));           // 저장할 콘텐츠 입력
      document.body.appendChild(link);

      // wait for the link to be added to the document
      window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
      });

    } else {
      alert('다운로드할 파일 정보가 없음');
    }
  }

  /**
   * Not use.
   * Blob 및 URL.createObjectURL 사용하여 브라우저에서 파일을 만들 수 있음.
   * 사용자가 만든 파일을 직접 저장할 수는 없기 때문에 보안 문제는 심각하지만 사용자를위한 다운로드 링크로 제공.
   * @type {Blob}
   */
  download(text: string) {
    var data = new Blob([JSON.stringify(this.downloadJsonModel)], {type: 'text/plain'});
    var textFile = null;

    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    console.log(textFile);
  }
}
