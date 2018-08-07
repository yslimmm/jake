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

  private userUrl = 'http://localhost:8080/';   // 요청할 API ip, port


  public getChsDeviceModel(jdbcUrl: String) {
    // return this.http.get<User]>(this.userUrl);
    return this.http.get<ChsDeviceModel>(this.userUrl + `/pinn?jdbc_url=${jdbcUrl}`);
    // return this.http.get(this.userUrl + `/pinn?jdbc_url=${jdbcUrl}`);
  }

}
