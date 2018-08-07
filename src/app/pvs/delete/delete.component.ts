import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
/*

  createSQL() {
    if (!this.form.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요.', null, {duration: 2000});
      return;
    }

    // 기등록 데이터 등록 전 삭제
    var delete_chs_device_conn_info = "DELETE FROM CHS_DEVICE_CONN_INFO WHERE DEVICE_ID = '" + $('#uuid').val() + "';";

    var delete_iot_device_noti_info = "DELETE FROM IOT_DEVICE_NOTI_INFO WHERE DEVICE_ID = '" + $('#uuid').val() + "';";
    var delete_iot_device_alim_info = "DELETE FROM IOT_DEVICE_ALIM_INFO WHERE DEVICE_ID = '" + $('#uuid').val() + "';";

    var delete_chs_device = "DELETE FROM CHS_DEVICE WHERE ID = '" + $('#uuid').val() + "';";
    var delete_iot_homemode_device = "DELETE FROM IOT_HOMEMODE_DEVICE WHERE DEVICE_ID = '" + $('#uuid').val() + "';";
    var delete_iot_home_batchcontrol = "DELETE FROM IOT_HOME_BATCHCONTROL WHERE DEVICE_ID = '" + $('#uuid').val() + "';";

    var delete_iot_device_ext_timer_info = "DELETE FROM IOT_DEVICE_EXT_TIMER_INFO WHERE DEVICE_ID = '" + $('#uuid').val() + "';";

    var delete_iot_home_autoexe1 ="DELETE FROM IOT_HOME_AUTOEXE WHERE ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID ='" + $('#uuid').val() + "');";
    var delete_iot_autoexe_tigger1 ="DELETE FROM IOT_AUTOEXE_TRIGGER WHERE AUTOEXE_ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID ='" + $('#uuid').val() + "');";
    var delete_iot_autoexe_action1 ="DELETE FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID ='" + $('#uuid').val() + "';";

    var delete_iot_home_autoexe2 ="DELETE FROM IOT_HOME_AUTOEXE WHERE ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_TRIGGER  WHERE DEVICE_ID ='" + $('#uuid').val() + "');";
    var delete_iot_autoexe_tigger2 ="DELETE FROM IOT_AUTOEXE_ACTION WHERE AUTOEXE_ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_TRIGGER  WHERE DEVICE_ID ='" + $('#uuid').val() + "');";
    var delete_iot_autoexe_action2 ="DELETE FROM IOT_AUTOEXE_TRIGGER WHERE DEVICE_ID ='" + $('#uuid').val() + "';";

    var delete_iot_dev_current_status = "DELETE FROM IOT_DEV_CURRENT_STATUS WHERE DEVICE_ID = '" + $('#uuid').val() + "';";
    var delete_iot_device_event_hist = "DELETE FROM IOT_DEVICE_EVENT_HIST WHERE DEVICE_ID = '" + $('#uuid').val() + "';";
    var delete_iot_push_event_hist = "DELETE FROM IOT_PUSH_EVENT_HIST WHERE DEVICE_ID = '" + $('#uuid').val() + "';";

    // 사용자 초기화
    var delete_home_code_iot_home = "DELETE FROM IOT_HOME WHERE HOME_CODE = '"+$('#homeCode').val()+"';";
    var delete_home_code_chs_subs_info = "DELETE FROM CHS_SUBS_INFO WHERE SUBS_NO = '"+$('#uuid').val()+"';";
    var delete_home_code_iot_home_user = "DELETE FROM IOT_HOME_USER WHERE HOME_CODE = '"+$('#uuid').val()+"';";
    var delete_home_code_chs_device = "DELETE FROM CHS_DEVICE WHERE HOME_CODE = '"+$('#uuid').val()+"';";
    var delete_home_code_iot_homemode_device = "DELETE FROM IOT_HOMEMODE_DEVICE WHERE HOME_CODE = '"+$('#uuid').val()+"';";
    // iot_home_batchcontrol
    // iot_device_hub_info
    // iot_home_wifi_info
    // iot_home_autoexe
    // iot_autoexe_trigger
    // iot_autoexe_action

    // 단말 언페어링
    var update_chs_device = "UPDATE CHS_DEVICE SET PARENT_DEVICE_ID = '"+$('#uuid').val()+"', CHS_SUBS_INFO_ONE_ID = null, REGISTER_TIME = null, DISP_NAME = null, LOCATION = null  WHERE ID= '"+$('#uuid').val()+"';";

    // 단말 등록
    var iot_home      = "INSERT INTO IOT_HOME(HOME_CODE, HOME_MODE, PROD_CODE, HOME_NAME) VALUES('"+ this.form.controls['subsNo'].value +"', 0, 'LZP0000107', '" + $('#homeName').val() + "');";
    var iot_home_user = "INSERT INTO IOT_HOME_USER (ID, HOME_CODE, PROD_CODE, ONE_ID, ONE_ID_KEY, MASTER_YN) VALUES (IOT_HOME_USER_SEQ.NEXTVAL, '"+ this.form.controls['subsNo'].value +"', 'LZP0000107','"+ this.form.controls['oneId'].value +"', '"+ this.form.controls['subsNo'].value +"', 'Y');";
    var chs_subs_info = "INSERT INTO CHS_SUBS_INFO (SUBS_NO, PROD_CODE, STATUS_CODE, SUBS_CTN, ONE_ID, CREATE_TIME, UPDATE_TIME, DEL_YN, HOME_CODE, SUBS_TYPE, CUST_NO, SVC_CODE) " +
      "VALUES ('"+ this.form.controls['subsNo'].value +"', 'LZP0000107', '03', '01000000001', '"+ this.form.controls['oneId'].value +"', SYSDATE, SYSDATE, 'N','"+ this.form.controls['subsNo'].value +"', '"+ this.form.controls['subsType'].value +"', '"+ this.form.controls['custNo'].value +"', '" + this.form.controls['svcCode'].value + "');";

    var textarea      = iot_home + "\n" + iot_home_user + "\n" + chs_subs_info;
    $('#textarea').val(textarea);
  }
*/

}
