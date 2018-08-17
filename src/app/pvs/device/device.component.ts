import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import * as $ from 'jquery';
import 'node_modules/datatables.net';
import 'node_modules/datatables.net-bs4';

import {ChsDeviceModel} from "../../models/chsDevoceModel.model";
import {PvsService} from "../pvs.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material";


export interface DeviceList {
  value: string;
  modelValue: string;
  typeValue: string;
  viewValue: string;
}

export interface DeviceGroup {
  disabled?: boolean;           // optional
  name?: string;                // optional
  deviceList: DeviceList[];
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  chsDeviceModelList: Array<ChsDeviceModel>;
  dbName: String;

  selectDBOption: string;

  // TODO : 전부 설정파일로 빼놓기!!!!
  dbOptions: string[] = ['사내', '개발1', '개발3', '개발4'];

  hubs: string[] = [
    '독립형허브(고급)', '보급형허브', '동글형허브1(구형)', '동글형허브2(신형)', 'LTE동글형허브', 'WOOFER', 'TVG', '홈넷 월패드허브'
  ];

  deviceControl = new FormControl();

  test(hubinfo: any) {
    console.log(hubinfo);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  hubDeviceGroups: DeviceGroup[] = [{
    name: 'CGS연동 허브 - ZW',
    deviceList: [
      {value: 'cgs_zw_01', modelValue: 'IHU50',         typeValue: 'HUB',       viewValue: '독립형허브(고급)'},
      {value: 'cgs_zw_02', modelValue: 'GIHG20',        typeValue: 'SHUB',      viewValue: '보급형허브'},
      {value: 'cgs_zw_03', modelValue: '000000010001',  typeValue: 'DHUB',      viewValue: '동글형허브1(구형)'},
      {value: 'cgs_zw_04', modelValue: '018B00020001',  typeValue: 'DHUB',      viewValue: '동글형허브2(신형)'},
      {value: 'cgs_zw_05', modelValue: '018B00020001',  typeValue: 'LTEDHUB',   viewValue: 'LTE동글형허브'},
      {value: 'cgs_zw_06', modelValue: 'LAP255U',       typeValue: 'WHUB',      viewValue: 'WOOFER'},
      {value: 'cgs_zw_07', modelValue: 'LGU-TVG-01',    typeValue: 'TVG',       viewValue: 'TVG'}
    ]
  },
  {
    name: 'OAS연동 허브 - WIFI',
    deviceList: [
      {value: 'oas_wifi_01', modelValue: 'CDP-1021DW',  typeValue: 'WPADHUB', viewValue: '홈넷 월패드허브(코맥스)'},
      {value: 'oas_wifi_02', modelValue: 'DWHN_2000',   typeValue: 'WPADHUB', viewValue: '홈넷 월패드허브(현대통신)'},
      {value: 'oas_wifi_03', modelValue: 'CSH-3130',    typeValue: 'WPADHUB', viewValue: '홈넷 월패드허브(CVNet 3130)'},
      {value: 'oas_wifi_04', modelValue: 'CSH-3131',    typeValue: 'WPADHUB', viewValue: '홈넷 월패드허브(CVNet 3131)'}
    ]
  },
  {
    name: 'OGS연동 허브 - WIFI',
    deviceList: [
      {value: 'ogs_wifi_01', modelValue: 'IRHG-01', typeValue: 'IRHUB',     viewValue: 'IR허브(IRHG-01)'},
      {value: 'ogs_wifi_02', modelValue: 'IRHM-01', typeValue: 'IRHUB',     viewValue: 'IR허브(IRHM-01)'},
      {value: 'ogs_wifi_03', modelValue: '',        typeValue: 'IRREMOCON', viewValue: 'IR리모컨(허브X)'}
    ]
  }];

  pvsDeviceGroups: DeviceGroup[] = [
    {
      name: '전략단말(CGS) - ZW',
      deviceList: [
        {value: 'cgs_zw_01', modelValue: '', typeValue: '',viewValue: '삼성도어락'},
        {value: 'cgs_zw_02', modelValue: '', typeValue: '',viewValue: 'GM도어락(보조키)'},
        {value: 'cgs_zw_03', modelValue: '', typeValue: '',viewValue: 'GM도어락(주키)'},
        {value: 'cgs_zw_04', modelValue: '', typeValue: '',viewValue: '플러그1(신형/SPD-01A)'},
        {value: 'cgs_zw_05', modelValue: '', typeValue: '',viewValue: '플러그1(개선형/SPD-02A)'},
        {value: 'cgs_zw_06', modelValue: '', typeValue: '',viewValue: '플러그1(구형/SPD-01)'},
        {value: 'cgs_zw_07', modelValue: '', typeValue: '',viewValue: '플러그2(이지세이버/SPES-02)'},
        {value: 'cgs_zw_08', modelValue: '', typeValue: '',viewValue: '플러그2(개선형/SPES-02A)'},
        {value: 'cgs_zw_09', modelValue: '', typeValue: '',viewValue: '에너지미터'},
        {value: 'cgs_zw_10', modelValue: '', typeValue: '',viewValue: '가스락'},
        {value: 'cgs_zw_11', modelValue: '', typeValue: '',viewValue: '열림센서'},
        {value: 'cgs_zw_12', modelValue: '', typeValue: '',viewValue: '열림감지센서(LG이노텍)'},
        {value: 'cgs_zw_13', modelValue: '', typeValue: '',viewValue: '스위치47(구형)'},
        {value: 'cgs_zw_14', modelValue: '', typeValue: '',viewValue: '스위치48(구형)'},
        {value: 'cgs_zw_15', modelValue: '', typeValue: '',viewValue: '스위치49(구형)'},
        {value: 'cgs_zw_16', modelValue: '', typeValue: '',viewValue: '스위치4A(신형)'},
        {value: 'cgs_zw_17', modelValue: '', typeValue: '',viewValue: '스위치4B(신형)'},
        {value: 'cgs_zw_18', modelValue: '', typeValue: '',viewValue: '스위치4C(신형)'},
        {value: 'cgs_zw_19', modelValue: '', typeValue: '',viewValue: '스위치4A(개선형)'},
        {value: 'cgs_zw_20', modelValue: '', typeValue: '',viewValue: '스위치4B(개선형)'},
        {value: 'cgs_zw_21', modelValue: '', typeValue: '',viewValue: '스위치4C(개선형)'},
        {value: 'cgs_zw_22', modelValue: '', typeValue: '',viewValue: '대용량스위치 1구'},
        {value: 'cgs_zw_23', modelValue: '', typeValue: '',viewValue: '대용량스위치 2구'},
        {value: 'cgs_zw_24', modelValue: '', typeValue: '',viewValue: '대용량스위치 3구'},
        {value: 'cgs_zw_25', modelValue: '', typeValue: '',viewValue: '주방소화장치(파라텍)'},
        {value: 'cgs_zw_26', modelValue: '', typeValue: '',viewValue: '도어캠'},
        {value: 'cgs_zw_27', modelValue: '', typeValue: '',viewValue: '무선경보기(사이렌)'},
        {value: 'cgs_zw_28', modelValue: '', typeValue: '',viewValue: '솜피커튼'},
        {value: 'cgs_zw_29', modelValue: '', typeValue: '',viewValue: '솜피블라인드'},
        {value: 'cgs_zw_30', modelValue: '', typeValue: '',viewValue: '모션센서'},
        {value: 'cgs_zw_31', modelValue: '', typeValue: '',viewValue: '움직임알리미'},
        {value: 'cgs_zw_32', modelValue: '', typeValue: '',viewValue: 'IoT버튼'}
      ]
    },
    {
    name: '청약제휴단말(CGS) - WIFI',
    // disabled: true,
    deviceList: [
      {value: 'cgs_wifi_01', modelValue: '', typeValue: '',viewValue: '펫스테이션'}
    ]},
    {
    name: '청약제휴단말(OGS) - WIFI',
    // disabled: true,
    deviceList: [
      {value: 'ogs_wifi_01', modelValue: '',typeValue: '',viewValue: 'WIFI 플러그'},
      {value: 'ogs_wifi_02', modelValue: '',typeValue: '',viewValue: 'WIFI 멀티탭'},
      {value: 'ogs_wifi_03', modelValue: '',typeValue: '',viewValue: '멀티탭'},
      {value: 'ogs_wifi_04', modelValue: '',typeValue: '',viewValue: '실내기'},
      {value: 'ogs_wifi_05', modelValue: '',typeValue: '',viewValue: '보급형 실내기'},
      {value: 'ogs_wifi_06', modelValue: '',typeValue: '',viewValue: '실외기'}
    ]}
  ];

  homenetDeviceGroups: DeviceGroup[] = [
    {
      name: '코콤',
      deviceList: [
        {value: 'homenet_kocom_01', modelValue: '', typeValue: '',viewValue: '에어컨'},
        {value: 'homenet_kocom_02', modelValue: '', typeValue: '',viewValue: '온도조절기'},
        {value: 'homenet_kocom_03', modelValue: '', typeValue: '',viewValue: '가스밸브'},
        {value: 'homenet_kocom_04', modelValue: '', typeValue: '',viewValue: '관리비'},
        {value: 'homenet_kocom_05', modelValue: '', typeValue: '',viewValue: '방문자'},
        {value: 'homenet_kocom_06', modelValue: '', typeValue: '',viewValue: '주차관제'},
        {value: 'homenet_kocom_07', modelValue: '', typeValue: '',viewValue: '에너지'},
        {value: 'homenet_kocom_08', modelValue: '', typeValue: '',viewValue: '전열교환기'},
        {value: 'homenet_kocom_09', modelValue: '', typeValue: '',viewValue: '일괄소등스위치'},
        {value: 'homenet_kocom_10', modelValue: '', typeValue: '',viewValue: '지역정보'},
        {value: 'homenet_kocom_11', modelValue: '', typeValue: '',viewValue: '공지사항'},
        {value: 'homenet_kocom_12', modelValue: '', typeValue: '',viewValue: '무인택배'},
        {value: 'homenet_kocom_13', modelValue: '', typeValue: '',viewValue: '주차위치확인'},
        {value: 'homenet_kocom_14', modelValue: '', typeValue: '',viewValue: '주민투표'},
        {value: 'homenet_kocom_15', modelValue: '', typeValue: '',viewValue: '방범알림'},
        {value: 'homenet_kocom_16', modelValue: '', typeValue: '',viewValue: '대기전력차단'},
        {value: 'homenet_kocom_17', modelValue: '', typeValue: '',viewValue: '조명스위치'}
      ]
    },
    {
      name: '코콤동탄',
      deviceList: [
        {value: 'homenet_kocom_18', modelValue: '', typeValue: '',viewValue: '에어컨'},
        {value: 'homenet_kocom_19', modelValue: '', typeValue: '',viewValue: '온도조절기'},
        {value: 'homenet_kocom_20', modelValue: '', typeValue: '',viewValue: '가스밸브'},
        {value: 'homenet_kocom_21', modelValue: '', typeValue: '',viewValue: '관리비'},
        {value: 'homenet_kocom_22', modelValue: '', typeValue: '',viewValue: '방문자'},
        {value: 'homenet_kocom_23', modelValue: '', typeValue: '',viewValue: '주차관제'},
        {value: 'homenet_kocom_24', modelValue: '', typeValue: '',viewValue: '에너지'},
        {value: 'homenet_kocom_25', modelValue: '', typeValue: '',viewValue: '전열교환기'},
        {value: 'homenet_kocom_26', modelValue: '', typeValue: '',viewValue: '일괄소등스위치'},
        {value: 'homenet_kocom_27', modelValue: '', typeValue: '',viewValue: '공지사항'},
        {value: 'homenet_kocom_28', modelValue: '', typeValue: '',viewValue: '무인택배'},
        {value: 'homenet_kocom_29', modelValue: '', typeValue: '',viewValue: '주차위치확인'},
        {value: 'homenet_kocom_30', modelValue: '', typeValue: '',viewValue: '주민투표'},
        {value: 'homenet_kocom_31', modelValue: '', typeValue: '',viewValue: '방범알림'},
        {value: 'homenet_kocom_32', modelValue: '', typeValue: '',viewValue: '대기전력차단'},
        {value: 'homenet_kocom_33', modelValue: '', typeValue: '',viewValue: '조명스위치'}
      ]
    },
    {
      name: '코맥스',
      deviceList: [
        {value: 'homenet_comax_01', modelValue: '', typeValue: '',viewValue: '에어컨'},
        {value: 'homenet_comax_02', modelValue: '', typeValue: '',viewValue: '온도조절기'},
        {value: 'homenet_comax_03', modelValue: '', typeValue: '',viewValue: '가스밸브'},
        {value: 'homenet_comax_04', modelValue: '', typeValue: '',viewValue: '방문자'},
        {value: 'homenet_comax_05', modelValue: '', typeValue: '',viewValue: '에너지'},
        {value: 'homenet_comax_06', modelValue: '', typeValue: '',viewValue: '전열교환기'},
        {value: 'homenet_comax_07', modelValue: '', typeValue: '',viewValue: '일괄소등스위치'},
        {value: 'homenet_comax_08', modelValue: '', typeValue: '',viewValue: '지역정보'},
        {value: 'homenet_comax_09', modelValue: '', typeValue: '',viewValue: '공지사항'},
        {value: 'homenet_comax_10', modelValue: '', typeValue: '',viewValue: '무인택배'},
        {value: 'homenet_comax_11', modelValue: '', typeValue: '',viewValue: '주차위치확인'},
        {value: 'homenet_comax_12', modelValue: '', typeValue: '',viewValue: '주민투표'},
        {value: 'homenet_comax_13', modelValue: '', typeValue: '',viewValue: '방범알림'},
        {value: 'homenet_comax_14', modelValue: '', typeValue: '',viewValue: '대기전력차단'},
        {value: 'homenet_comax_15', modelValue: '', typeValue: '',viewValue: '조명스위치(조광)'},
        {value: 'homenet_comax_16', modelValue: '', typeValue: '',viewValue: '조명스위치'}
      ]
    },
    {
      name: '현대',
      disabled: true,
      deviceList: [
        {value: 'homenet_hyundai_01', modelValue: '', typeValue: '',viewValue: '에어컨'},
        {value: 'homenet_hyundai_02', modelValue: '', typeValue: '',viewValue: '온도조절기'},
        {value: 'homenet_hyundai_03', modelValue: '', typeValue: '',viewValue: '가스밸브'},
        {value: 'homenet_hyundai_04', modelValue: '', typeValue: '',viewValue: '관리비'},
        {value: 'homenet_hyundai_05', modelValue: '', typeValue: '',viewValue: '방문자'},
        {value: 'homenet_hyundai_06', modelValue: '', typeValue: '',viewValue: '주차관제'},
        {value: 'homenet_hyundai_07', modelValue: '', typeValue: '',viewValue: '에너지'},
        {value: 'homenet_hyundai_08', modelValue: '', typeValue: '',viewValue: '전열교환기'},
        {value: 'homenet_hyundai_09', modelValue: '', typeValue: '',viewValue: '일괄소등스위치'},
        {value: 'homenet_hyundai_10', modelValue: '', typeValue: '',viewValue: '지역정보'},
        {value: 'homenet_hyundai_11', modelValue: '', typeValue: '',viewValue: '공지사항'},
        {value: 'homenet_hyundai_12', modelValue: '', typeValue: '',viewValue: '무인택배'},
        {value: 'homenet_hyundai_13', modelValue: '', typeValue: '',viewValue: '주차위치확인'},
        {value: 'homenet_hyundai_14', modelValue: '', typeValue: '',viewValue: '주민투표'},
        {value: 'homenet_hyundai_15', modelValue: '', typeValue: '',viewValue: '방범알림'},
        {value: 'homenet_hyundai_16', modelValue: '', typeValue: '',viewValue: '대기전력차단'},
        {value: 'homenet_hyundai_17', modelValue: '', typeValue: '',viewValue: '조명스위치'}
      ]
    },
    {
      name: '이지빌',
      disabled: true,
      deviceList: [
        {value: 'homenet_esay_01', modelValue: '', typeValue: '',viewValue: '에어컨'},
        {value: 'homenet_esay_02', modelValue: '', typeValue: '',viewValue: '온도조절기'},
        {value: 'homenet_esay_03', modelValue: '', typeValue: '',viewValue: '가스밸브'},
        {value: 'homenet_esay_04', modelValue: '', typeValue: '',viewValue: '관리비'},
        {value: 'homenet_esay_05', modelValue: '', typeValue: '',viewValue: '방문자'},
        {value: 'homenet_esay_06', modelValue: '', typeValue: '',viewValue: '주차관제'},
        {value: 'homenet_esay_07', modelValue: '', typeValue: '',viewValue: '에너지'},
        {value: 'homenet_esay_08', modelValue: '', typeValue: '',viewValue: '전열교환기'},
        {value: 'homenet_esay_09', modelValue: '', typeValue: '',viewValue: '일괄소등스위치'},
        {value: 'homenet_esay_10', modelValue: '', typeValue: '',viewValue: '지역정보'},
        {value: 'homenet_esay_11', modelValue: '', typeValue: '',viewValue: '공지사항'},
        {value: 'homenet_esay_12', modelValue: '', typeValue: '',viewValue: '무인택배'},
        {value: 'homenet_esay_13', modelValue: '', typeValue: '',viewValue: '주차위치확인'},
        {value: 'homenet_esay_14', modelValue: '', typeValue: '',viewValue: '주민투표'},
        {value: 'homenet_esay_15', modelValue: '', typeValue: '',viewValue: '방범알림'},
        {value: 'homenet_esay_16', modelValue: '', typeValue: '',viewValue: '대기전력차단'},
        {value: 'homenet_esay_17', modelValue: '', typeValue: '',viewValue: '조명스위치'}
      ]
    },
    {
      name: 'CV-Net',
      disabled: true,
      deviceList: [
        {value: 'homenet_cvnet_01', modelValue: '', typeValue: '',viewValue: '에어컨'},
        {value: 'homenet_cvnet_02', modelValue: '', typeValue: '',viewValue: '온도조절기'},
        {value: 'homenet_cvnet_03', modelValue: '', typeValue: '',viewValue: '가스밸브'},
        {value: 'homenet_cvnet_04', modelValue: '', typeValue: '',viewValue: '관리비'},
        {value: 'homenet_cvnet_05', modelValue: '', typeValue: '',viewValue: '방문자'},
        {value: 'homenet_cvnet_06', modelValue: '', typeValue: '',viewValue: '주차관제'},
        {value: 'homenet_cvnet_07', modelValue: '', typeValue: '',viewValue: '에너지'},
        {value: 'homenet_cvnet_08', modelValue: '', typeValue: '',viewValue: '전열교환기'},
        {value: 'homenet_cvnet_09', modelValue: '', typeValue: '',viewValue: '일괄소등스위치'},
        {value: 'homenet_cvnet_10', modelValue: '', typeValue: '',viewValue: '지역정보'},
        {value: 'homenet_cvnet_11', modelValue: '', typeValue: '',viewValue: '공지사항'},
        {value: 'homenet_cvnet_12', modelValue: '', typeValue: '',viewValue: '무인택배'},
        {value: 'homenet_cvnet_13', modelValue: '', typeValue: '',viewValue: '주차위치확인'},
        {value: 'homenet_cvnet_14', modelValue: '', typeValue: '',viewValue: '주민투표'},
        {value: 'homenet_cvnet_15', modelValue: '', typeValue: '',viewValue: '방범알림'},
        {value: 'homenet_cvnet_16', modelValue: '', typeValue: '',viewValue: '대기전력차단'},
        {value: 'homenet_cvnet_17', modelValue: '', typeValue: '',viewValue: '조명스위치'}
      ]
    }
  ];

  public form: FormGroup;

  // [formControl] 사용시 독립적으로 폼 유효성 확인 가능
  // MAC
  deviceMacForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
  ]);
  // SN
  deviceSnForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
  ]);

  constructor(private pvsService: PvsService,
              private http: HttpClient,
              private chRef: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      chsDeviceModelTypeCode: new FormControl(null, [Validators.required]),
      mac: new FormControl(null, [Validators.required,
                                  Validators.maxLength(12),
                                  Validators.pattern('^[a-zA-Z0-9]*$')]),
      sn: new FormControl(null,  [Validators.required,
                                  Validators.maxLength(12),
                                  Validators.pattern('^[a-zA-Z0-9]*$')]),
      homeCode: new FormControl(null, [Validators.required])
      // uuid: new FormControl(''),
    });
  }

  ngOnInit() {
    /*
    input text 입력하면 소문자에서 대문자로 자동으로 바꿔주는 JQuery.
    하지만 무슨 이유인지... error TS2339: Property 'toUpperCase' does not exist on type 'string | number | string[]'. 에러 발생...ㅠㅠ
    input style로 대문자 치환 해결...
    $('#mac').bind("keyup", function() {
      $(this).val($(this).val().toUpperCase());
    });

    $('#sn').bind("keyup", function() {
      $(this).val($(this).val().toUpperCase());
    });
    */

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
    this.form.controls['name'].setValue($('.deviceName').val());
    this.form.controls['chsDeviceModelTypeCode'].setValue($('.deviceTypeCode').val());

    if (!this.form.valid) {
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
                          + "VALUES ('" + uuid + "', '0', '" + this.form.controls['name'].value + "', '" + this.form.controls['chsDeviceModelTypeCode'].value + "', '"
                          + chs_device_type_level + "', " + device_id_type + ", '" + uuid + "', '" + mac + "', '" + sn + "', '"
                          + this.form.controls['homeCode'].value + "', '" + this.form.controls['homeCode'].value + "', 'N', 'Y');";


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
