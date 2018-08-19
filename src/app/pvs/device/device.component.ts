import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import * as $ from 'jquery';
import 'node_modules/datatables.net';
import 'node_modules/datatables.net-bs4';

import {ChsDeviceModel} from "../../models/chsDevoceModel.model";
import {PvsService} from "../pvs.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DeviceGroup, DeviceService} from "./device.service";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  chsDeviceModelList: Array<ChsDeviceModel>;
  dbName: String;

  selectDBOption: string;
  deviceControl = new FormControl();

  dbOptionGroups: string[] = this.deviceService.getDBOptionGroups()
  hubDeviceGroups: DeviceGroup[] = this.deviceService.getHubList();
  pvsDeviceGroups: DeviceGroup[] = this.deviceService.getPvsList();
  homenetDeviceGroups: DeviceGroup[]= this.deviceService.getHomenetList();

  public deviceForm: FormGroup;

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
      sn: new FormControl(null,  [Validators.required,
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
  }

  dbUrlCheck2(dbOption): void {
    console.log(dbOption);

    switch (dbOption) {
      case "사내" :
        this.dbName =  "dev00";
        break;
      case "개발1" :
        this.dbName =  "dev01";
        break;
      case "개발3" :
        this.dbName =  "dev03";
        break;
      case "개발4" :
        this.dbName =  "dev04";
        break;
    }
    // TODO : multi DB연동 테스트 성공하면 아래 주석 풀기
    // this.printChsDeviceModel(this.dbName);
  }

  printChsDeviceModel(dbName: String): void {
    this.pvsService.getChsDeviceModel(dbName)
      .subscribe((responseMap: Array<ChsDeviceModel>) => {
        // console.log(responseMap);
        this.chsDeviceModelList = responseMap;

        // You'll have to wait that changeDetection occurs and projects data into
        // the HTML template, you can ask Angular to that for you ;-)
        this.chRef.detectChanges();

        $('#chsDeviceModelTable').DataTable({
          "order": [[ 0, "asc" ]],
          "scrollY":        "500px",
          "scrollCollapse": true,
          "paging":         false,
          // 테이블 데이터 변경 될 때 단일 초기화
          retrieve: true,
          destroy: true,
          searching: true
        });
      });
  }

  createSQL() {
    // CHS_DEVICE_MODEL_NAME과 CHS_DEVICE_TYPE_CODE는 DB에 선택된 값을 셋팅해놓는데 form에 셋팅이 되지 않아서 다시 강제 셋팅...
    this.deviceForm.controls['name'].setValue($('.deviceName').val());
    this.deviceForm.controls['chsDeviceModelTypeCode'].setValue($('.deviceTypeCode').val());

    if (!this.deviceForm.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요.', null, {duration: 2000});
      return;
    }

    var name = $('#name').val();
    var mac = $('#mac').val();
    var sn  = $('#sn').val();

    var chs_device_type_level = "2";
    var device_id_type = "1";

    var uuid = this.createUUID();

    // TODO : 스크립트 파일로 빼놓기.
    // 기등록 데이터 등록 전 삭제
    var delete_chs_device_conn_info   = "DELETE FROM CHS_DEVICE_CONN_INFO WHERE DEVICE_ID = '" + uuid + "';";

    var delete_iot_device_noti_info   = "DELETE FROM IOT_DEVICE_NOTI_INFO WHERE DEVICE_ID = '" + uuid + "';";
    var delete_iot_device_alim_info   = "DELETE FROM IOT_DEVICE_ALIM_INFO WHERE DEVICE_ID = '" + uuid + "';";

    var delete_chs_device             = "DELETE FROM CHS_DEVICE WHERE ID = '" + uuid + "';";
    var delete_iot_homemode_device    = "DELETE FROM IOT_HOMEMODE_DEVICE WHERE DEVICE_ID = '" + uuid + "';";
    var delete_iot_home_batchcontrol  = "DELETE FROM IOT_HOME_BATCHCONTROL WHERE DEVICE_ID = '" + uuid + "';";

    var delete_iot_device_ext_timer_info = "DELETE FROM IOT_DEVICE_EXT_TIMER_INFO WHERE DEVICE_ID = '" + uuid + "';";

    var delete_iot_home_autoexe1      ="DELETE FROM IOT_HOME_AUTOEXE WHERE ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID ='" + uuid + "');";
    var delete_iot_autoexe_tigger1    ="DELETE FROM IOT_AUTOEXE_TRIGGER WHERE AUTOEXE_ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID ='" + uuid + "');";
    var delete_iot_autoexe_action1    ="DELETE FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID ='" + uuid + "';";

    var delete_iot_home_autoexe2      ="DELETE FROM IOT_HOME_AUTOEXE WHERE ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_TRIGGER  WHERE DEVICE_ID ='" + uuid + "');";
    var delete_iot_autoexe_tigger2    ="DELETE FROM IOT_AUTOEXE_ACTION WHERE AUTOEXE_ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_TRIGGER  WHERE DEVICE_ID ='" + uuid + "');";
    var delete_iot_autoexe_action2    ="DELETE FROM IOT_AUTOEXE_TRIGGER WHERE DEVICE_ID ='" + uuid + "';";

    var delete_iot_dev_current_status = "DELETE FROM IOT_DEV_CURRENT_STATUS WHERE DEVICE_ID = '" + uuid + "';";
    var delete_iot_device_event_hist  = "DELETE FROM IOT_DEVICE_EVENT_HIST WHERE DEVICE_ID = '" + uuid + "';";
    var delete_iot_push_event_hist    = "DELETE FROM IOT_PUSH_EVENT_HIST WHERE DEVICE_ID = '" + uuid + "';";

    // EMETER, SPTL-W01(WIFI PLUG), MTTL-W01(WIFI PLUG)
   /* if(name.equals("ID003")) {
      chs_device_type_level = "1";
      device_id_type= "1";
    } else if (name.equals("SPTL-W01") || name.equals("MTTL-W01")) {
      chs_device_type_level = "1";
      device_id_type= "0";
    } else {
      chs_device_type_level = "2";
      device_id_type= "1";
    }*/

    // 단말 등록
    var insert_chs_device = "INSERT INTO CHS_DEVICE(ID, CHS_DEVICE_MODEL_ID, CHS_DEVICE_MODEL_NAME, CHS_DEVICE_TYPE_CODE, CHS_DEVICE_TYPE_LEVEL, DEVICE_ID_TYPE, PARENT_DEVICE_ID, MAC, SN, HOME_CODE, CHS_SUBS_INFO_SUBS_NO, DEL_YN, CONTROL_ENABLE) "
                          + "VALUES ('" + uuid + "', '0', '" + this.deviceForm.controls['name'].value + "', '" + this.deviceForm.controls['chsDeviceModelTypeCode'].value + "', '"
                          + chs_device_type_level + "', " + device_id_type + ", '" + uuid + "', '" + mac + "', '" + sn + "', '"
                          + this.deviceForm.controls['homeCode'].value + "', '" + this.deviceForm.controls['homeCode'].value + "', 'N', 'Y');";


    var textarea      = delete_chs_device_conn_info + "\n"
                      + delete_iot_device_noti_info + "\n"
                      + delete_iot_device_alim_info + "\n"
                      + delete_chs_device + "\n"
                      + delete_iot_homemode_device + "\n"
                      + delete_iot_home_batchcontrol + "\n"
                      + delete_iot_device_ext_timer_info + "\n"
                      + delete_iot_home_autoexe1 + "\n"
                      + delete_iot_autoexe_tigger1 + "\n"
                      + delete_iot_autoexe_action1 + "\n"
                      + delete_iot_home_autoexe2 + "\n"
                      + delete_iot_autoexe_tigger2 + "\n"
                      + delete_iot_autoexe_action2 + "\n"
                      + delete_iot_dev_current_status + "\n"
                      + delete_iot_device_event_hist + "\n"
                      + delete_iot_push_event_hist + "\n\n"
                      + insert_chs_device;
    $('#textarea').val(textarea);
  }

  // TODO : uuid 생성 수정하기
  createUUID(): String {
    $('#uuid').val("테스트라라라라");
    return "테스트라라라라";
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
