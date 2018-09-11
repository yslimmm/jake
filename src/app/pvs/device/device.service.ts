import { Injectable } from '@angular/core';

export interface DeviceList {
  value: string;
  modelValue: string;
  typeValue: string;
  viewValue: string;
  pvsValue: string;
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

  hubDeviceGroups: DeviceGroup[] = [
    {
    name: 'CGS연동 허브 - ZW',
    deviceList: [
      {value: 'cgs_zw_01', modelValue: 'IHU50', typeValue: 'HUB', viewValue: '독립형허브(고급)', pvsValue: 'IG003'},
      {value: 'cgs_zw_02', modelValue: 'GIHG20', typeValue: 'SHUB', viewValue: '보급형허브', pvsValue: 'IG005'},
      {value: 'cgs_zw_03', modelValue: '000000010001', typeValue: 'DHUB', viewValue: '동글형허브1(구형)', pvsValue: 'IG001'},
      {value: 'cgs_zw_04', modelValue: '018B00020001', typeValue: 'DHUB', viewValue: '동글형허브2(신형)', pvsValue: 'IG002'},
      {value: 'cgs_zw_05', modelValue: '018B00020001', typeValue: 'LTEDHUB', viewValue: 'LTE동글형허브', pvsValue: 'IG002'},
      {value: 'cgs_zw_06', modelValue: 'LAP255U', typeValue: 'WHUB', viewValue: 'WOOFER', pvsValue: 'IG004'},
      {value: 'cgs_zw_07', modelValue: 'LGU-TVG-01', typeValue: 'TVG', viewValue: 'TVG', pvsValue: 'LGU-TVG-01'}
    ]
  },
  {
    name: 'OAS연동 허브 - WIFI',
    deviceList: [
      {
        value: 'oas_wifi_01',
        modelValue: 'CDP-1021DW',
        typeValue: 'WPADHUB',
        viewValue: '홈넷 월패드허브(코맥스)',
        pvsValue: 'IG010'
      },
      {
        value: 'oas_wifi_02',
        modelValue: 'DWHN_2000',
        typeValue: 'WPADHUB',
        viewValue: '홈넷 월패드허브(현대통신)',
        pvsValue: 'IG007'
      },
      {
        value: 'oas_wifi_03',
        modelValue: 'CSH-3130',
        typeValue: 'WPADHUB',
        viewValue: '홈넷 월패드허브(CVNet 3130)',
        pvsValue: 'IG008'
      },
      {
        value: 'oas_wifi_04',
        modelValue: 'CSH-3131',
        typeValue: 'WPADHUB',
        viewValue: '홈넷 월패드허브(CVNet 3131)',
        pvsValue: 'IG009'
      }
    ]
  },
  {
    name: 'OGS연동 허브 - WIFI',
    deviceList: [
      {value: 'ogs_wifi_01', modelValue: 'IRHG-01', typeValue: 'IRHUB', viewValue: 'IR허브(IRHG-01)', pvsValue: 'IG013'},
      {value: 'ogs_wifi_02', modelValue: 'IRHM-01', typeValue: 'IRHUB', viewValue: 'IR허브(IRHM-01)', pvsValue: 'IG014'},
      {value: 'ogs_wifi_03', modelValue: 'IRBD-01', typeValue: 'IRREMOCON', viewValue: 'IR리모컨(허브X)', pvsValue: 'ID082'}
    ]
  }];

  pvsDeviceGroups: DeviceGroup[] = [
    {
      name: '전략단말(CGS) - ZW',
      deviceList: [
        {value: 'cgs_zw_01', modelValue: '022E00010001', typeValue: 'DOORLOCK', viewValue: '삼성도어락', pvsValue: 'ID101'},
        {
          value: 'cgs_zw_02',
          modelValue: '021210001000',
          typeValue: 'DOORLOCK',
          viewValue: 'GM도어락(보조키)',
          pvsValue: 'ID103'
        },
        {
          value: 'cgs_zw_03',
          modelValue: '0212C6000004',
          typeValue: 'DOORLOCK',
          viewValue: 'GM도어락(주키)',
          pvsValue: 'ID105'
        },
        {
          value: 'cgs_zw_04',
          modelValue: '018C00420001',
          typeValue: 'PLUG',
          viewValue: '플러그1(신형/SPD-01A)',
          pvsValue: 'ID013'
        },
        {
          value: 'cgs_zw_05',
          modelValue: '018C00420003',
          typeValue: 'PLUG',
          viewValue: '플러그1(개선형/SPD-02A)',
          pvsValue: 'ID027'
        },
        {
          value: 'cgs_zw_06',
          modelValue: '018C00420002',
          typeValue: 'PLUG',
          viewValue: '플러그1(구형/SPD-01)',
          pvsValue: 'ID002'
        },
        {
          value: 'cgs_zw_07',
          modelValue: '024700420001',
          typeValue: 'PLUG',
          viewValue: '플러그2(이지세이버/SPES-02)',
          pvsValue: 'ID015'
        },
        {
          value: 'cgs_zw_08',
          modelValue: '024700420002',
          typeValue: 'PLUG',
          viewValue: '플러그2(개선형/SPES-02A)',
          pvsValue: 'ID026'
        },
        {value: 'cgs_zw_09', modelValue: 'ID003', typeValue: 'EMETER', viewValue: '에너지미터', pvsValue: 'ID003'},
        {value: 'cgs_zw_10', modelValue: '018B00400001', typeValue: 'GASVALVE', viewValue: '가스락', pvsValue: 'ID001'},
        {value: 'cgs_zw_11', modelValue: '022C00030001', typeValue: 'DOORSENSOR', viewValue: '열림센서', pvsValue: 'ID004'},
        {
          value: 'cgs_zw_12',
          modelValue: '027300030001',
          typeValue: 'DOORSENSOR',
          viewValue: '열림감지센서(LG이노텍)',
          pvsValue: 'ID016'
        },
        {
          value: 'cgs_zw_13',
          modelValue: '023300470001',
          typeValue: 'SWITCH',
          viewValue: '스위치47(구형)',
          pvsValue: 'ID006'
        },
        {
          value: 'cgs_zw_14',
          modelValue: '023300480001',
          typeValue: 'SWITCH',
          viewValue: '스위치48(구형)',
          pvsValue: 'ID007'
        },
        {
          value: 'cgs_zw_15',
          modelValue: '023300490001',
          typeValue: 'SWITCH',
          viewValue: '스위치49(구형)',
          pvsValue: 'ID008'
        },
        {
          value: 'cgs_zw_16',
          modelValue: '0233004A0001',
          typeValue: 'SWITCH',
          viewValue: '스위치4A(신형)',
          pvsValue: 'ID009'
        },
        {
          value: 'cgs_zw_17',
          modelValue: '0233004B0001',
          typeValue: 'SWITCH',
          viewValue: '스위치4B(신형)',
          pvsValue: 'ID010'
        },
        {
          value: 'cgs_zw_18',
          modelValue: '0233004C0001',
          typeValue: 'SWITCH',
          viewValue: '스위치4C(신형)',
          pvsValue: 'ID011'
        },
        {
          value: 'cgs_zw_19',
          modelValue: '0233004A0002',
          typeValue: 'SWITCH',
          viewValue: '스위치4A(개선형)',
          pvsValue: 'ID021'
        },
        {
          value: 'cgs_zw_20',
          modelValue: '0233004B0002',
          typeValue: 'SWITCH',
          viewValue: '스위치4B(개선형)',
          pvsValue: 'ID022'
        },
        {
          value: 'cgs_zw_21',
          modelValue: '0233004C0002',
          typeValue: 'SWITCH',
          viewValue: '스위치4C(개선형)',
          pvsValue: 'ID023'
        },
        {value: 'cgs_zw_22', modelValue: '', typeValue: 'SWITCH', viewValue: '대용량스위치 1구', pvsValue: ''},
        {value: 'cgs_zw_23', modelValue: '', typeValue: 'SWITCH', viewValue: '대용량스위치 2구', pvsValue: ''},
        {value: 'cgs_zw_24', modelValue: '', typeValue: 'SWITCH', viewValue: '대용량스위치 3구', pvsValue: ''},
        {value: 'cgs_zw_25', modelValue: '018C00520001', typeValue: 'MUPTITAP', viewValue: '멀티탭', pvsValue: 'ID025'},
        {
          value: 'cgs_zw_26',
          modelValue: '0257004D0001',
          typeValue: 'GASSAFER',
          viewValue: '주방소화장치(파라텍)',
          pvsValue: 'ID104'
        },
        {value: 'cgs_zw_27', modelValue: '023D00430001', typeValue: 'DOORCAM', viewValue: '도어캠', pvsValue: 'ID014'},
        {
          value: 'cgs_zw_28',
          modelValue: '022C004E0001',
          typeValue: 'SIREN',
          viewValue: '무선경보기(사이렌)',
          pvsValue: 'ID041'
        },
        {
          value: 'cgs_zw_29',
          modelValue: '004720191806',
          typeValue: 'CURTAINMOTOR',
          viewValue: '솜피커튼',
          pvsValue: 'ID107'
        },
        {
          value: 'cgs_zw_30',
          modelValue: '004720181805',
          typeValue: 'BLINDMOTOR',
          viewValue: '솜피블라인드',
          pvsValue: 'ID106'
        },
        {
          value: 'cgs_zw_31',
          modelValue: '027300530001',
          typeValue: 'MOTIONSENSOR',
          viewValue: '모션센서',
          pvsValue: 'ID039'
        },
        {value: 'cgs_zw_32', modelValue: '022C004E0001', typeValue: 'SIREN', viewValue: '움직임알리미', pvsValue: 'ID041'},
        {value: 'cgs_zw_33', modelValue: '014D00540001', typeValue: 'BUTTON', viewValue: 'IoT버튼', pvsValue: 'ID040'}
      ]
    },
    {
      name: '전략단말(CGS) - ZIGBEE',
      // disabled: true,
      deviceList: [
        {
          value: 'cgs_zigbee_01',
          modelValue: '453232302D4B52314E305A302D4841',
          typeValue: 'SWITCH',
          viewValue: '스마트 전등스위치(1접점)',
          pvsValue: ''
        },
        {
          value: 'cgs_zigbee_02',
          modelValue: '453232302D4B52324E305A302D4841',
          typeValue: 'SWITCH',
          viewValue: '스마트 전등스위치(2접점)',
          pvsValue: ''
        },
        {
          value: 'cgs_zigbee_03',
          modelValue: '453232302D4B52334E305A302D4841',
          typeValue: 'SWITCH',
          viewValue: '스마트 전등스위치(3접점)',
          pvsValue: ''
        },
        {
          value: 'cgs_zigbee_04',
          modelValue: '453231302D4B523231305A302D4841',
          typeValue: 'PLUG',
          viewValue: '스마트 콘센트(2구)',
          pvsValue: ''
        }
      ]
    },
    {
      name: '청약제휴단말(CGS) - WIFI',
      // disabled: true,
      deviceList: [
        {value: 'cgs_wifi_01', modelValue: '022E33000001', typeValue: 'FEEDER', viewValue: '펫스테이션', pvsValue: 'ID102'}
      ]
    },
    {
      name: '청약제휴단말(OGS) - WIFI',
      // disabled: true,
      deviceList: [
        {value: 'ogs_wifi_01', modelValue: 'SPTL-W01', typeValue: 'PLUG', viewValue: 'WIFI 플러그', pvsValue: 'ID032'},
        {value: 'ogs_wifi_02', modelValue: 'MTTL-W01', typeValue: 'MULTITAP', viewValue: 'WIFI 멀티탭', pvsValue: 'ID033'},
        {value: 'ogs_wifi_04', modelValue: 'ID018', typeValue: 'AIRSENSOR', viewValue: '실내기', pvsValue: 'ID018'},
        {
          value: 'ogs_wifi_05',
          modelValue: 'IAQ-LS100',
          typeValue: 'AIRSENSOR',
          viewValue: '보급형 실내기',
          pvsValue: 'ID034'
        },
        {value: 'ogs_wifi_06', modelValue: 'ID020', typeValue: 'AIRSENSOR', viewValue: '실외기', pvsValue: 'ID020'}
      ]
    }];

  partnerDeviceGroups: DeviceGroup[] = [
    {
      name: '직접연동(CGS) - WIFI',
      // disabled: true,
      deviceList: [
        {value: 'cgs_wifi_02', modelValue: 'KITURAMI', typeValue: 'KITURAMI', viewValue: '귀뚜라미', pvsValue: 'KITURAMI'},
        {value: 'cgs_wifi_03', modelValue: 'RINNAI', typeValue: 'RINNAI', viewValue: '린나이', pvsValue: 'RINNAI'}
      ]
    },
    {
      name: '미청약단말(OGS) - WIFI',
      // disabled: true,
      deviceList: [
        {
          value: 'ogs_wifi_07',
          modelValue: 'SC_SIDIZ_01',
          typeValue: 'SMARTCHAIR',
          viewValue: '스마트체어',
          pvsValue: 'ID019'
        },
      ]
    },
    {
      name: '미청약단말(OAS) - WIFI',
      // disabled: true,
      deviceList: [
        {
          value: 'ogs_wifi_08',
          modelValue: 'PAC_139301_KR',
          typeValue: 'AIRCONDITIONER',
          viewValue: 'LG 에어컨',
          pvsValue: ''
        },
        {
          value: 'ogs_wifi_09',
          modelValue: 'AIR_910604_KR',
          typeValue: 'AIRPURIFIER',
          viewValue: 'LG 공기청정기',
          pvsValue: ''
        },
        {value: 'ogs_wifi_10', modelValue: 'MA324PDW', typeValue: 'OVEN', viewValue: 'LG 오븐', pvsValue: ''},
        {value: 'ogs_wifi_11', modelValue: 'HITN', typeValue: 'ROBOTCLEANER', viewValue: 'LG 로봇청소기', pvsValue: ''},
        {value: 'ogs_wifi_12', modelValue: 'SC-TF', typeValue: 'REFRIGERATOR', viewValue: 'LG 냉장고', pvsValue: ''},
        {value: 'ogs_wifi_13', modelValue: 'FR41C8MDUPH_WD_KR', typeValue: 'WASHER', viewValue: 'LG 세탁기', pvsValue: ''},
        {value: 'ogs_wifi_14', modelValue: 'SS_AIRC01', typeValue: 'AIRCONDITIONER', viewValue: '삼성 에어컨', pvsValue: ''},
        {value: 'ogs_wifi_15', modelValue: 'SS_AIRP01', typeValue: 'AIRPURIFIER', viewValue: '삼성 공기청정기', pvsValue: ''},
        {value: 'ogs_wifi_16', modelValue: 'SS_OVEN01', typeValue: 'OVEN', viewValue: '삼성 오븐', pvsValue: ''},
        {value: 'ogs_wifi_17', modelValue: 'SS_ROBO01', typeValue: 'ROBOTCLEANER', viewValue: '삼성 로봇청소기', pvsValue: ''},
        {value: 'ogs_wifi_18', modelValue: 'SS_REFR01', typeValue: 'REFRIGERATOR', viewValue: '삼성 냉장고', pvsValue: ''},
        {value: 'ogs_wifi_19', modelValue: 'SS_WASH01', typeValue: 'WASHER', viewValue: '삼성 세탁기', pvsValue: ''},
      ]
    }];

  homenetDeviceGroups: DeviceGroup[] = [
    {
      name: '코콤',
      deviceList: [
        {value: 'homenet_kocom_01', modelValue: '', typeValue: '', viewValue: '에어컨', pvsValue: ''},
        {value: 'homenet_kocom_02', modelValue: '', typeValue: '', viewValue: '온도조절기', pvsValue: ''},
        {value: 'homenet_kocom_03', modelValue: '', typeValue: '', viewValue: '가스밸브', pvsValue: ''},
        {value: 'homenet_kocom_04', modelValue: '', typeValue: '', viewValue: '관리비', pvsValue: ''},
        {value: 'homenet_kocom_05', modelValue: '', typeValue: '', viewValue: '방문자', pvsValue: ''},
        {value: 'homenet_kocom_06', modelValue: '', typeValue: '', viewValue: '주차관제', pvsValue: ''},
        {value: 'homenet_kocom_07', modelValue: '', typeValue: '', viewValue: '에너지', pvsValue: ''},
        {value: 'homenet_kocom_08', modelValue: '', typeValue: '', viewValue: '전열교환기', pvsValue: ''},
        {value: 'homenet_kocom_09', modelValue: '', typeValue: '', viewValue: '일괄소등스위치', pvsValue: ''},
        {value: 'homenet_kocom_10', modelValue: '', typeValue: '', viewValue: '지역정보', pvsValue: ''},
        {value: 'homenet_kocom_11', modelValue: '', typeValue: '', viewValue: '공지사항', pvsValue: ''},
        {value: 'homenet_kocom_12', modelValue: '', typeValue: '', viewValue: '무인택배', pvsValue: ''},
        {value: 'homenet_kocom_13', modelValue: '', typeValue: '', viewValue: '주차위치확인', pvsValue: ''},
        {value: 'homenet_kocom_14', modelValue: '', typeValue: '', viewValue: '주민투표', pvsValue: ''},
        {value: 'homenet_kocom_15', modelValue: '', typeValue: '', viewValue: '방범알림', pvsValue: ''},
        {value: 'homenet_kocom_16', modelValue: '', typeValue: '', viewValue: '대기전력차단', pvsValue: ''},
        {value: 'homenet_kocom_17', modelValue: '', typeValue: '', viewValue: '조명스위치', pvsValue: ''}
      ]
    },
    {
      name: '코콤동탄',
      deviceList: [
        {value: 'homenet_kocom_18', modelValue: '', typeValue: '', viewValue: '에어컨', pvsValue: ''},
        {value: 'homenet_kocom_19', modelValue: '', typeValue: '', viewValue: '온도조절기', pvsValue: ''},
        {value: 'homenet_kocom_20', modelValue: '', typeValue: '', viewValue: '가스밸브', pvsValue: ''},
        {value: 'homenet_kocom_21', modelValue: '', typeValue: '', viewValue: '관리비', pvsValue: ''},
        {value: 'homenet_kocom_22', modelValue: '', typeValue: '', viewValue: '방문자', pvsValue: ''},
        {value: 'homenet_kocom_23', modelValue: '', typeValue: '', viewValue: '주차관제', pvsValue: ''},
        {value: 'homenet_kocom_24', modelValue: '', typeValue: '', viewValue: '에너지', pvsValue: ''},
        {value: 'homenet_kocom_25', modelValue: '', typeValue: '', viewValue: '전열교환기', pvsValue: ''},
        {value: 'homenet_kocom_26', modelValue: '', typeValue: '', viewValue: '일괄소등스위치', pvsValue: ''},
        {value: 'homenet_kocom_27', modelValue: '', typeValue: '', viewValue: '공지사항', pvsValue: ''},
        {value: 'homenet_kocom_28', modelValue: '', typeValue: '', viewValue: '무인택배', pvsValue: ''},
        {value: 'homenet_kocom_29', modelValue: '', typeValue: '', viewValue: '주차위치확인', pvsValue: ''},
        {value: 'homenet_kocom_30', modelValue: '', typeValue: '', viewValue: '주민투표', pvsValue: ''},
        {value: 'homenet_kocom_31', modelValue: '', typeValue: '', viewValue: '방범알림', pvsValue: ''},
        {value: 'homenet_kocom_32', modelValue: '', typeValue: '', viewValue: '대기전력차단', pvsValue: ''},
        {value: 'homenet_kocom_33', modelValue: '', typeValue: '', viewValue: '조명스위치', pvsValue: ''}
      ]
    },
    {
      name: '코맥스',
      deviceList: [
        {value: 'homenet_comax_01', modelValue: '', typeValue: '', viewValue: '에어컨', pvsValue: ''},
        {value: 'homenet_comax_02', modelValue: '', typeValue: '', viewValue: '온도조절기', pvsValue: ''},
        {value: 'homenet_comax_03', modelValue: '', typeValue: '', viewValue: '가스밸브', pvsValue: ''},
        {value: 'homenet_comax_04', modelValue: '', typeValue: '', viewValue: '방문자', pvsValue: ''},
        {value: 'homenet_comax_05', modelValue: '', typeValue: '', viewValue: '에너지', pvsValue: ''},
        {value: 'homenet_comax_06', modelValue: '', typeValue: '', viewValue: '전열교환기', pvsValue: ''},
        {value: 'homenet_comax_07', modelValue: '', typeValue: '', viewValue: '일괄소등스위치', pvsValue: ''},
        {value: 'homenet_comax_08', modelValue: '', typeValue: '', viewValue: '지역정보', pvsValue: ''},
        {value: 'homenet_comax_09', modelValue: '', typeValue: '', viewValue: '공지사항', pvsValue: ''},
        {value: 'homenet_comax_10', modelValue: '', typeValue: '', viewValue: '무인택배', pvsValue: ''},
        {value: 'homenet_comax_11', modelValue: '', typeValue: '', viewValue: '주차위치확인', pvsValue: ''},
        {value: 'homenet_comax_12', modelValue: '', typeValue: '', viewValue: '주민투표', pvsValue: ''},
        {value: 'homenet_comax_13', modelValue: '', typeValue: '', viewValue: '방범알림', pvsValue: ''},
        {value: 'homenet_comax_14', modelValue: '', typeValue: '', viewValue: '대기전력차단', pvsValue: ''},
        {value: 'homenet_comax_15', modelValue: '', typeValue: '', viewValue: '조명스위치(조광)', pvsValue: ''},
        {value: 'homenet_comax_16', modelValue: '', typeValue: '', viewValue: '조명스위치', pvsValue: ''}
      ]
    },
    {
      name: '현대',
      disabled: true,
      deviceList: [
        {value: 'homenet_hyundai_01', modelValue: '', typeValue: '', viewValue: '에어컨', pvsValue: ''},
        {value: 'homenet_hyundai_02', modelValue: '', typeValue: '', viewValue: '온도조절기', pvsValue: ''},
        {value: 'homenet_hyundai_03', modelValue: '', typeValue: '', viewValue: '가스밸브', pvsValue: ''},
        {value: 'homenet_hyundai_04', modelValue: '', typeValue: '', viewValue: '관리비', pvsValue: ''},
        {value: 'homenet_hyundai_05', modelValue: '', typeValue: '', viewValue: '방문자', pvsValue: ''},
        {value: 'homenet_hyundai_06', modelValue: '', typeValue: '', viewValue: '주차관제', pvsValue: ''},
        {value: 'homenet_hyundai_07', modelValue: '', typeValue: '', viewValue: '에너지', pvsValue: ''},
        {value: 'homenet_hyundai_08', modelValue: '', typeValue: '', viewValue: '전열교환기', pvsValue: ''},
        {value: 'homenet_hyundai_09', modelValue: '', typeValue: '', viewValue: '일괄소등스위치', pvsValue: ''},
        {value: 'homenet_hyundai_10', modelValue: '', typeValue: '', viewValue: '지역정보', pvsValue: ''},
        {value: 'homenet_hyundai_11', modelValue: '', typeValue: '', viewValue: '공지사항', pvsValue: ''},
        {value: 'homenet_hyundai_12', modelValue: '', typeValue: '', viewValue: '무인택배', pvsValue: ''},
        {value: 'homenet_hyundai_13', modelValue: '', typeValue: '', viewValue: '주차위치확인', pvsValue: ''},
        {value: 'homenet_hyundai_14', modelValue: '', typeValue: '', viewValue: '주민투표', pvsValue: ''},
        {value: 'homenet_hyundai_15', modelValue: '', typeValue: '', viewValue: '방범알림', pvsValue: ''},
        {value: 'homenet_hyundai_16', modelValue: '', typeValue: '', viewValue: '대기전력차단', pvsValue: ''},
        {value: 'homenet_hyundai_17', modelValue: '', typeValue: '', viewValue: '조명스위치', pvsValue: ''}
      ]
    },
    {
      name: '이지빌',
      disabled: true,
      deviceList: [
        {value: 'homenet_esay_01', modelValue: '', typeValue: '', viewValue: '에어컨', pvsValue: ''},
        {value: 'homenet_esay_02', modelValue: '', typeValue: '', viewValue: '온도조절기', pvsValue: ''},
        {value: 'homenet_esay_03', modelValue: '', typeValue: '', viewValue: '가스밸브', pvsValue: ''},
        {value: 'homenet_esay_04', modelValue: '', typeValue: '', viewValue: '관리비', pvsValue: ''},
        {value: 'homenet_esay_05', modelValue: '', typeValue: '', viewValue: '방문자', pvsValue: ''},
        {value: 'homenet_esay_06', modelValue: '', typeValue: '', viewValue: '주차관제', pvsValue: ''},
        {value: 'homenet_esay_07', modelValue: '', typeValue: '', viewValue: '에너지', pvsValue: ''},
        {value: 'homenet_esay_08', modelValue: '', typeValue: '', viewValue: '전열교환기', pvsValue: ''},
        {value: 'homenet_esay_09', modelValue: '', typeValue: '', viewValue: '일괄소등스위치', pvsValue: ''},
        {value: 'homenet_esay_10', modelValue: '', typeValue: '', viewValue: '지역정보', pvsValue: ''},
        {value: 'homenet_esay_11', modelValue: '', typeValue: '', viewValue: '공지사항', pvsValue: ''},
        {value: 'homenet_esay_12', modelValue: '', typeValue: '', viewValue: '무인택배', pvsValue: ''},
        {value: 'homenet_esay_13', modelValue: '', typeValue: '', viewValue: '주차위치확인', pvsValue: ''},
        {value: 'homenet_esay_14', modelValue: '', typeValue: '', viewValue: '주민투표', pvsValue: ''},
        {value: 'homenet_esay_15', modelValue: '', typeValue: '', viewValue: '방범알림', pvsValue: ''},
        {value: 'homenet_esay_16', modelValue: '', typeValue: '', viewValue: '대기전력차단', pvsValue: ''},
        {value: 'homenet_esay_17', modelValue: '', typeValue: '', viewValue: '조명스위치', pvsValue: ''}
      ]
    },
    {
      name: 'CV-Net',
      disabled: true,
      deviceList: [
        {value: 'homenet_cvnet_01', modelValue: '', typeValue: '', viewValue: '에어컨', pvsValue: ''},
        {value: 'homenet_cvnet_02', modelValue: '', typeValue: '', viewValue: '온도조절기', pvsValue: ''},
        {value: 'homenet_cvnet_03', modelValue: '', typeValue: '', viewValue: '가스밸브', pvsValue: ''},
        {value: 'homenet_cvnet_04', modelValue: '', typeValue: '', viewValue: '관리비', pvsValue: ''},
        {value: 'homenet_cvnet_05', modelValue: '', typeValue: '', viewValue: '방문자', pvsValue: ''},
        {value: 'homenet_cvnet_06', modelValue: '', typeValue: '', viewValue: '주차관제', pvsValue: ''},
        {value: 'homenet_cvnet_07', modelValue: '', typeValue: '', viewValue: '에너지', pvsValue: ''},
        {value: 'homenet_cvnet_08', modelValue: '', typeValue: '', viewValue: '전열교환기', pvsValue: ''},
        {value: 'homenet_cvnet_09', modelValue: '', typeValue: '', viewValue: '일괄소등스위치', pvsValue: ''},
        {value: 'homenet_cvnet_10', modelValue: '', typeValue: '', viewValue: '지역정보', pvsValue: ''},
        {value: 'homenet_cvnet_11', modelValue: '', typeValue: '', viewValue: '공지사항', pvsValue: ''},
        {value: 'homenet_cvnet_12', modelValue: '', typeValue: '', viewValue: '무인택배', pvsValue: ''},
        {value: 'homenet_cvnet_13', modelValue: '', typeValue: '', viewValue: '주차위치확인', pvsValue: ''},
        {value: 'homenet_cvnet_14', modelValue: '', typeValue: '', viewValue: '주민투표', pvsValue: ''},
        {value: 'homenet_cvnet_15', modelValue: '', typeValue: '', viewValue: '방범알림', pvsValue: ''},
        {value: 'homenet_cvnet_16', modelValue: '', typeValue: '', viewValue: '대기전력차단', pvsValue: ''},
        {value: 'homenet_cvnet_17', modelValue: '', typeValue: '', viewValue: '조명스위치', pvsValue: ''}
      ]
    }];

  public getDBOptionGroups() {
    return this.dbOptionGroups;
  }

  public getHubList() {
    return this.hubDeviceGroups;
  }

  public getPvsList() {
    return this.pvsDeviceGroups;
  }

  public getPartnerList() {
    return this.partnerDeviceGroups;
  }

  public getHomenetList() {
    return this.homenetDeviceGroups;
  }
}
