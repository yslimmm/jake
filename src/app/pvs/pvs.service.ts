import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ChsDeviceModel} from "../models/chsDevoceModel.model";

@Injectable()
export class PvsService {

  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private finnServerUrl = 'http://127.0.0.1:5554/';   // 요청할 API ip, port


  public getChsDeviceModel(dbName: String) {
    // return this.http.get<User]>(this.userUrl);
    return this.http.get<ChsDeviceModel>(this.finnServerUrl + `/pinn?db=${dbName}`);
  }

}
