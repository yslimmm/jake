import { Injectable } from '@angular/core';

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

@Injectable()
export class DeviceService {

  constructor() { }

  // TODO : 전부 설정파일로 빼놓기!!!!
  dbOptionGroups: string[] = ['사내', '개발1', '개발3', '개발4'];

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
        {value: 'cgs_zw_01', modelValue: '', typeValue: 'DOORLOCK',     viewValue: '삼성도어락'},
        {value: 'cgs_zw_02', modelValue: '', typeValue: 'DOORLOCK',     viewValue: 'GM도어락(보조키)'},
        {value: 'cgs_zw_03', modelValue: '', typeValue: 'DOORLOCK',     viewValue: 'GM도어락(주키)'},
        {value: 'cgs_zw_04', modelValue: '', typeValue: 'PLUG',         viewValue: '플러그1(신형/SPD-01A)'},
        {value: 'cgs_zw_05', modelValue: '', typeValue: 'PLUG',         viewValue: '플러그1(개선형/SPD-02A)'},
        {value: 'cgs_zw_06', modelValue: '', typeValue: 'PLUG',         viewValue: '플러그1(구형/SPD-01)'},
        {value: 'cgs_zw_07', modelValue: '', typeValue: 'PLUG',         viewValue: '플러그2(이지세이버/SPES-02)'},
        {value: 'cgs_zw_08', modelValue: '', typeValue: 'PLUG',         viewValue: '플러그2(개선형/SPES-02A)'},
        {value: 'cgs_zw_09', modelValue: '', typeValue: 'EMETER',       viewValue: '에너지미터'},
        {value: 'cgs_zw_10', modelValue: '', typeValue: 'GASVALVE',     viewValue: '가스락'},
        {value: 'cgs_zw_11', modelValue: '', typeValue: 'DOORSENSOR',   viewValue: '열림센서'},
        {value: 'cgs_zw_12', modelValue: '', typeValue: 'DOORSENSOR',   viewValue: '열림감지센서(LG이노텍)'},
        {value: 'cgs_zw_13', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치47(구형)'},
        {value: 'cgs_zw_14', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치48(구형)'},
        {value: 'cgs_zw_15', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치49(구형)'},
        {value: 'cgs_zw_16', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치4A(신형)'},
        {value: 'cgs_zw_17', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치4B(신형)'},
        {value: 'cgs_zw_18', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치4C(신형)'},
        {value: 'cgs_zw_19', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치4A(개선형)'},
        {value: 'cgs_zw_20', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치4B(개선형)'},
        {value: 'cgs_zw_21', modelValue: '', typeValue: 'SWITCH',       viewValue: '스위치4C(개선형)'},
        {value: 'cgs_zw_22', modelValue: '', typeValue: 'SWITCH',       viewValue: '대용량스위치 1구'},
        {value: 'cgs_zw_23', modelValue: '', typeValue: 'SWITCH',       viewValue: '대용량스위치 2구'},
        {value: 'cgs_zw_24', modelValue: '', typeValue: 'SWITCH',       viewValue: '대용량스위치 3구'},
        {value: 'cgs_zw_25', modelValue: '', typeValue: 'RLDJRDKSSKA',  viewValue: '주방소화장치(파라텍)'},
        {value: 'cgs_zw_26', modelValue: '', typeValue: 'DOORCAM',      viewValue: '도어캠'},
        {value: 'cgs_zw_27', modelValue: '', typeValue: 'SIREN',        viewValue: '무선경보기(사이렌)'},
        {value: 'cgs_zw_28', modelValue: '', typeValue: 'CURTAIN',      viewValue: '솜피커튼'},
        {value: 'cgs_zw_29', modelValue: '', typeValue: 'BLIND',        viewValue: '솜피블라인드'},
        {value: 'cgs_zw_30', modelValue: '', typeValue: 'MOTIONSENSOR', viewValue: '모션센서'},
        {value: 'cgs_zw_31', modelValue: '', typeValue: 'SIREN',        viewValue: '움직임알리미'},
        {value: 'cgs_zw_32', modelValue: '', typeValue: 'BUTTON',       viewValue: 'IoT버튼'}
      ]
    },
    {
      name: '청약제휴단말(CGS) - WIFI',
      // disabled: true,
      deviceList: [
        {value: 'cgs_wifi_01', modelValue: '', typeValue: 'PETFEEDER',  viewValue: '펫스테이션'}
      ]},
    {
      name: '청약제휴단말(OGS) - WIFI',
      // disabled: true,
      deviceList: [
        {value: 'ogs_wifi_01', modelValue: '',typeValue: 'PLUG',        viewValue: 'WIFI 플러그'},
        {value: 'ogs_wifi_02', modelValue: '',typeValue: 'MULTITAP',    viewValue: 'WIFI 멀티탭'},
        {value: 'ogs_wifi_03', modelValue: '',typeValue: 'MUPTITAP',    viewValue: '멀티탭'},
        {value: 'ogs_wifi_04', modelValue: '',typeValue: 'AIRSENSOR',   viewValue: '실내기'},
        {value: 'ogs_wifi_05', modelValue: '',typeValue: 'AIRSENSOR',   viewValue: '보급형 실내기'},
        {value: 'ogs_wifi_06', modelValue: '',typeValue: 'AIRSENSOR',   viewValue: '실외기'}
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

  public getDBOptionGroups() {
    return this.dbOptionGroups;
  }

  public getHubList() {
    return this.hubDeviceGroups;
  }

  public getPvsList() {
    return this.pvsDeviceGroups;
  }

  public getHomenetList() {
    return this.homenetDeviceGroups;
  }
}
