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

  /**
   * 사용자 등록
   * @param oneId
   * @param subsNo
   * @param homeName
   * @param subsType
   * @param custNo
   * @param svcCode
   */
  public getUserQuery(oneId, subsNo, homeName, subsType, custNo, svcCode) {
    return this.http.get(this.SERVER + `/pvs/query/user?oneId=${oneId}&subsNo=${subsNo}&homeName=${homeName}&subsType=${subsType}&custNo=${custNo}&svcCode=${svcCode}`);
  }

  /**
   * 단말 등록
   * @param modelNo
   * @param typeCode
   * @param mac
   * @param sn
   * @param homeCode
   * @param uuid
   * @param chsDeviceTypeLevel
   * @param deviceIdType
   */
  public getDeviceQuery(modelNo, typeCode, mac, sn, homeCode, uuid, chsDeviceTypeLevel, deviceIdType) {
    return this.http.get(this.SERVER + `/pvs/query/device?modelNo=${modelNo}&typeCode=${typeCode}&mac=${mac}&sn=${sn}&homeCode=${homeCode}&uuid=${uuid}&chsDeviceTypeLevel=${chsDeviceTypeLevel}&deviceIdType=${deviceIdType}`);
  }

  /**
   * 사용자&단말 초기화
   * @param homeCode
   * @param uuid
   */
  public getDeleteQuery(homeCode, uuid) {
    return this.http.get(this.SERVER + `/pvs/query/delete?homeCode=${homeCode}&uuid=${uuid}`);
  }
}
