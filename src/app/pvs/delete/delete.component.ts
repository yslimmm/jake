import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public form: FormGroup;

  constructor(private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      homeCode: new FormControl(null, [Validators.maxLength(12)]),
      deviceId: new FormControl(null),
    });
  }

  ngOnInit() {
  }

  createSQL() {
    if (!this.form.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요.', null, {duration: 2000});
      return;
    }

    // TODO : 스크립트 파일로 빼놓기.
    // 사용자 초기화
    var delete_home_code_iot_home = "DELETE FROM IOT_HOME WHERE HOME_CODE = '"+$('#homeCode').val()+"';";
    var delete_home_code_chs_subs_info = "DELETE FROM CHS_SUBS_INFO WHERE SUBS_NO = '"+$('#homeCode').val()+"';";
    var delete_home_code_iot_home_user = "DELETE FROM IOT_HOME_USER WHERE HOME_CODE = '"+$('#homeCode').val()+"';";
    var delete_home_code_chs_device = "DELETE FROM CHS_DEVICE WHERE HOME_CODE = '"+$('#homeCode').val()+"';";
    var delete_home_code_iot_homemode_device = "DELETE FROM IOT_HOMEMODE_DEVICE WHERE HOME_CODE = '"+$('#homeCode').val()+"';";
    var iot_home_batchcontrol = "DELETE FROM IOT_HOME_BATCHCONTROL WHERE HOME_CODE = '" + $('#homeCode').val() + "';";
    var iot_device_hub_info = "DELETE FROM IOT_DEVICE_HUB_INFO WHERE HOME_CODE = '" + $('#homeCode').val() + "';";
    var iot_home_wifi_info = "DELETE FROM IOT_WIFI_INFO WHERE HOME_CODE = '" + $('#homeCode').val() + "';";
    var iot_home_autoexe = "DELETE FROM IOT_HOME_AUTOEXE WHERE HOME_CODE = '" + $('#homeCode').val() + "';";
    var iot_autoexe_trigger = "DELETE FROM IOT_AUTOEXE_TRIGGER WHERE HOME_CODE = '" + $('#homeCode').val() + "';";
    var iot_autoexe_action = "DELETE FROM IOT_AUTOEXE_ACTION WHERE HOME_CODE = '" + $('#homeCode').val() + "';";

    // 단말 초기화
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

    // 단말 언페어링
    var update_chs_device = "UPDATE CHS_DEVICE SET PARENT_DEVICE_ID = '"+$('#uuid').val()+"', CHS_SUBS_INFO_ONE_ID = null, REGISTER_TIME = null, DISP_NAME = null, LOCATION = null  WHERE ID= '"+$('#uuid').val()+"';";

    var textarea_user   = "=======================" + "\n"
                        + "사용자 초기화 쿼리" + "\n"
                        + "=======================" + "\n"
                        + delete_home_code_iot_home + "\n" + delete_home_code_chs_subs_info + "\n" + delete_home_code_iot_home_user + "\n"
                        + delete_home_code_chs_device + "\n" + delete_home_code_iot_homemode_device + "\n" + iot_home_batchcontrol + "\n"
                        + iot_device_hub_info + "\n" + iot_home_wifi_info + "\n" + iot_home_autoexe + "\n"
                        + iot_autoexe_trigger + "\n" + iot_autoexe_action + "\n\n";
    var textarea_device = "=======================" + "\n"
                        + "단말 초기화 쿼리" + "\n"
                        + "=======================" + "\n"
                        + delete_chs_device_conn_info + "\n" + delete_iot_device_noti_info + "\n" + delete_iot_device_alim_info + "\n"
                        + delete_chs_device + "\n" + delete_iot_homemode_device + "\n" + delete_iot_home_batchcontrol + "\n"
                        + delete_iot_device_ext_timer_info + "\n" + delete_iot_home_autoexe1 + "\n" + delete_iot_autoexe_tigger1 + "\n"
                        + delete_iot_autoexe_action1 + "\n" + delete_iot_home_autoexe2 + "\n" + delete_iot_autoexe_tigger2 + "\n"
                        + delete_iot_autoexe_action2 + "\n" + delete_iot_dev_current_status + "\n" + delete_iot_device_event_hist + "\n"
                        + delete_iot_push_event_hist + "\n\n"
                        + "=======================" + "\n"
                        + "단말 언페어링 쿼리" + "\n"
                        + "=======================" + "\n"
                        + update_chs_device;

    $('#textarea').val(textarea_user + textarea_device);
  }

}
