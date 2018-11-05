import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChsDeviceModel} from "../models/chsDevoceModel.model";

import 'spring-boot/finn.proxy.config';
import {pinn} from "../../../spring-boot/finn.proxy.config";

@Injectable()
export class MsgService {

  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = `${pinn.target}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getDirectoryList() {
    return this.http.get<ChsDeviceModel>(this.SERVER + `/msg/server/list?info=dir`);
  }

  public getMessageList(serverInfo: String) {
    return this.http.get<ChsDeviceModel>(this.SERVER + `/msg/server/list?info=${serverInfo}`);
  }
}
