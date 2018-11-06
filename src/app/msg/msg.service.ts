import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import "spring-boot/finn.proxy.config";
import {pinn} from "../../../spring-boot/finn.proxy.config";

/**
 * .json 객체
 *
 {
     "variables": [],
     "info": {
         "name": "JSON 파일 이름",
         "_postman_id": "8dee2976-656d-36e2-522e-14fd0bb23b22",
         "description": "Emul",
         "schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
     },
     "item": [
         {
             "name": "r2d2 테스트 1번",
             "request": {
                 "url": "{{http_schema}}://{{hostname}}:{{port}}/log/",
                 "method": "POST",
                 "header": [
                     {
                         "key": "SVC_ID",
                         "value": "ANYPAIRING",
                         "disabled": true
                     },
                     {
                         "key": "CASE_ID",
                         "value": "HIOT0001",
                         "disabled": true
                     }
                 ],
                 "body": {
                     "mode": "raw",
                     "raw": ""
                 },
                 "description": ""
             },
             "response": []
         },
   ]
         ...
 }
 */
export interface JsonGroup {
  variables?: string[];           // optional
  info?: InfoList;                // optional
  item: ItemList[];               // 이 안에 정보가 다 있음
}

export interface InfoList {
  name: string;
  postman_id: string;
  description: string;
  schema: string;
}

export interface ItemList {
  name: string;
  request: RequestInfo;
  response?: string[];            // optional
}

export interface RequestInfo {
  url: string;
  method: string;
  header: headerList[];
  body: string[];
  description?: string;           // optional
}

export interface headerList {
  key: string;
  value: string;
  disabled?: boolean;             // optional
}


@Injectable()
export class MsgService {

  private SERVER: string;
  private headers: HttpHeaders;
  private json: JsonGroup;
  private itemList: ItemList[] = [];

  private reqInfoArray: Array<RequestInfo> = [];

  constructor(private http: HttpClient) {
    this.SERVER = `${pinn.target}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getDirectoryList() {
    return this.http.get(this.SERVER + `/msg/server/list?info=dir`);
  }

  public getMessageList(serverInfo: String) {
    return this.http.get(this.SERVER + `/msg/server/list?info=${serverInfo}`);
  }

  public getMessage(serverInfo: String, fileName: String) {
    return this.http.get(this.SERVER + `/msg/server/json?info=${serverInfo}&filename=${fileName}`);
  }

  public getMessageBeautiful(message: any): Array<RequestInfo> {
    // message은 현재 Object 타입으로 넘어왔지만 any로 받아 JsonGroup으로 넘겨줌
    this.json = message;

    for (var i = 0; i < this.json.item.length; i++) {
      this.itemList[i] = this.json.item[i];
      this.reqInfoArray.push(this.itemList[i].request);
    }

    /*
     console.log("~~~~~ length : " + this.reqInfoArray.length);

     for(var j=0; j < this.reqInfoArray.length; j++) {
     console.log(this.reqInfoArray[j].url);
     }
     */
    return this.reqInfoArray;
  }
}
