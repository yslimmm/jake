import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChsDeviceModel} from "../models/chsDevoceModel.model";

import 'spring-boot/finn.proxy.config';
import {pinn} from "../../../spring-boot/finn.proxy.config";

@Injectable()
export class PvsService {

  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // this.SERVER = `${environment.HOST}`;
    this.SERVER = `${pinn.target}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getChsDeviceModel(dbName: String) {
    // return this.http.get<User]>(this.userUrl);
    return this.http.get<ChsDeviceModel>(this.SERVER + `/pvs/select_chs_device_model?db=${dbName}`);
  }

  public getQuery(operation, modelNo, typeCode, mac, sn, homeCode, uuid) {
    return this.http.get(this.SERVER + `/pvs/query/${operation}?modelNo=${modelNo}&typeCode=${typeCode}&mac=${mac}&sn=${sn}&homeCode=${homeCode}&uuid=${uuid}`);
  }
}
