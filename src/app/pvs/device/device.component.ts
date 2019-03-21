import {Component, OnInit, ChangeDetectorRef, Input, OnDestroy} from '@angular/core';

import * as $ from 'jquery';
import 'node_modules/datatables.net';
import 'node_modules/datatables.net-bs4';

import {ChsDeviceModel} from "../../models/chsDevoceModel.model";
import {PvsService} from "../pvs.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DeviceGroup, DeviceList, DeviceService} from "./device.service";
import {Md5} from "ts-md5/dist/md5";


// TODO : uuid 생성 수정하기, java util이랑 uuid생성이 미묘하게 다르다...
export class Uuid {
  static newUuid(deviceInfo: string): string {
    // return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
    //   return Md5.hashStr(deviceInfo), v = c == 'x' ? r : (r&0x3|0x8);
    // }).toUpperCase();

    var uuid = Md5.hashStr(deviceInfo).toString();
    var slice1 = uuid.slice(0, 8);
    var slice2 = uuid.slice(8, 12);
    var slice3 = uuid.slice(12, 16);
    var slice4 = uuid.slice(16, 20);
    var slice5 = uuid.slice(20);

    return (slice1 + "-" + slice2 + "-" + slice3 + "-" + slice4 + "-" + slice5).toUpperCase();
  }
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, OnDestroy {

  chsDeviceModelList: Array<ChsDeviceModel>;
  dbName: String;

  dbOptionGroups: string[] = this.deviceService.getDBOptionGroups();
  hubDeviceGroups: DeviceGroup[] = this.deviceService.getHubList();
  pvsDeviceGroups: DeviceGroup[] = this.deviceService.getPvsList();
  partnerDeviceGroups: DeviceGroup[] = this.deviceService.getPartnerList();
  homenetDeviceGroups: DeviceGroup[]= this.deviceService.getHomenetList();

  selectDeviceModel: DeviceList;
  radioDBOptionModel: string;

  deviceForm: FormGroup;
  deviceControl = new FormControl();

  constructor(private pvsService: PvsService,
              private http: HttpClient,
              private chRef: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private deviceService: DeviceService) {

    this.deviceForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      chsDeviceModelTypeCode: new FormControl(null, [Validators.required]),
      mac: new FormControl(null, [Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^[a-zA-Z0-9]*$')]),
      sn: new FormControl(null, [Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^[a-zA-Z0-9]*$')]),
      homeCode: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    // 조회된 CHS_DEVICE_MODEL 테이블의 row를 클릭시 Input에 넣기
    $('#chsDeviceModelTable tbody').on('click', 'tr', function () {
      var data = $('#chsDeviceModelTable').DataTable().row( this ).data();
      // alert( 'You clicked on '+data[1]+'\'s row' );
      $('.deviceName').val(data[2]);
      $('.deviceTypeCode').val(data[1]);
    });

    // this.dbUrlCheck("dev00");
  }

  ngOnDestroy() {
    this.chRef.detach(); // try this
    // for me I was detect changes inside "subscribe" so was enough for me to just unsubscribe;
    // this.authObserver.unsubscribe();
  }

  dbUrlCheck(dbOption): void {
    // console.log(dbOption);
    switch (dbOption) {
      case "사내" :
        this.dbName =  "dev00";
        break;
      case "개발1" :
        this.dbName = "";
        break;
      case "개발3" :
        this.dbName = "";
        break;
      case "개발4" :
        this.dbName = "";
        break;
    }
    this.printChsDeviceModel(this.dbName);
  }

  // 셀렉트박스를 이용하여 단말 정보를 인풋 박스에 셋팅.
  selectChange(event) {
    // this.selectDeviceModel = this.alldeviceList[$event];
    if(null != event) {
      // let obj: DeviceList = JSON.parse(event.toString()); 이미 json이기때문에 parse하지 않아도 된다.
      let obj: DeviceList = event;

      // TODO : (ngModelChange) 쓰지 않고 [(ngModel)]로 양방향 바인딩을 하고싶지만 한번 셀렉트 체인지에 Device Object안의 여러 value를 셋팅하는건 불가능한건가? ng-options를 사용이 가능한가? 자꾸 삽질하게된다..
      // this.selectDeviceModel.value = obj.value;
      // this.selectDeviceModel.modelValue = obj.modelValue;
      // this.selectDeviceModel.typeValue = obj.typeValue;
      $('#name').val(obj.modelValue);
      $('#chsDeviceModelTypeCode').val(obj.typeValue);
    }
  }

  printChsDeviceModel(dbName: String): void {
    if (dbName === "") {
      alert('이용 불가능');
    } else {
      this.pvsService.getChsDeviceModel(dbName)
        .subscribe((responseMap: Array<ChsDeviceModel>) => {
          // console.log(responseMap);
          this.chsDeviceModelList = responseMap;

          // You'll have to wait that changeDetection occurs and projects data into
          // the HTML template, you can ask Angular to that for you ;-)
          this.chRef.detectChanges();

          $('#chsDeviceModelTable').DataTable({
            "order": [[0, "asc"]],
            "scrollY": "500px",
            "scrollX": true,
            "scrollCollapse": true,
            "paging": false,
            // 테이블 데이터 변경 될 때 단일 초기화
            retrieve: true,
            destroy: true,
            searching: true,
            // searchBox
            language: {
              searchPlaceholder: "Search any records..."
            }
          });
        });
    }
  }

  createSQL() {
    // CHS_DEVICE_MODEL_NAME과 CHS_DEVICE_TYPE_CODE는 DB에 선택된 값을 셋팅해놓는데 form에 셋팅이 되지 않아서 다시 강제 셋팅...
    this.deviceForm.controls['name'].setValue($('.deviceName').val());
    this.deviceForm.controls['chsDeviceModelTypeCode'].setValue($('.deviceTypeCode').val());

    if (!this.deviceForm.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요.', null, {duration: 2000});
      return;
    }

    var name = $('#name').val() + "";
    var typeCode = $('#chsDeviceModelTypeCode').val() + "";
    var mac = $('#mac').val() + "";
    var sn = $('#sn').val() + "";

    // default.
    var chsDeviceTypeLevel = "2";
    var deviceIdType = "1";

    // EMETER, SPTL-W01(WIFI PLUG), MTTL-W01(WIFI PLUG)
    /*if (name.equals("ID003")) {
      chsDeviceTypeLevel = "1";
      deviceIdType = "1";
    } else if (name.equals("SPTL-W01") || name.equals("MTTL-W01")) {
      chsDeviceTypeLevel = "1";
      deviceIdType = "0";
    } else {
      chsDeviceTypeLevel = "2";
      deviceIdType = "1";
     }*/

    if (name === "ID003") {
      chsDeviceTypeLevel = "1";
      deviceIdType = "1";
    } else if ((name === "SPTL-W01") || (name === "MTTL-W01")) {
      chsDeviceTypeLevel = "1";
      deviceIdType = "0";
    } else {
      chsDeviceTypeLevel = "2";
      deviceIdType = "1";
    }
    var uuid = this.createUUID(name, typeCode, mac, sn, chsDeviceTypeLevel, deviceIdType);

    this.pvsService.getDeviceQuery(name, typeCode, mac, sn, $('#homeCode').val(), uuid, chsDeviceTypeLevel, deviceIdType).subscribe((responseMap: String) => {
      if (responseMap.length != 0) {
        $('#textarea').val(responseMap.toString());
      } else {
        $('#textarea').val('server error.');
      }
    });
  }

  /**
   *
   * CHS_DEVICE_TYPE_LEVEL : 1이면 허브를 타지 않는 디바이스, 2이면 허브를 타는 디바이스
   * DEVICE_ID_TYPE : 0은 MAC기준, 1은 SN기준
   *
   */
  createUUID(name: string, typeCode: string, mac: string, sn: string, chsDeviceTypeLevel: string, deviceIdType: string): string {

    var uuidType = "";

    if (deviceIdType === "0") {
      uuidType = mac;
    } else if (deviceIdType === "1") {
      uuidType = sn;
    } else {
      uuidType = sn;
    }

    var uuid = Uuid.newUuid(typeCode + name + uuidType);
    $('#uuid').val(uuid);

    return uuid;
  }


  // --------------------------------------------------- 워매.. 아까워라.... 공부용이니 냅두자...
  /*
   $.ajax({
   type: 'post',
   url: 'pvs/user.html',
   dataType : 'html',
   success: function(data) {
   $("#pvsOptionBox").html(data);
   }
   });
   */

  // table paged format.
  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }

}
