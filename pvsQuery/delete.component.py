#!/usr/bin/python
# delete.component.html
# user & device delete Query

import sys

FILE_PATH = sys.argv[0]
homeCode = sys.argv[1]
uuid = sys.argv[2]


def make(homeCode, uuid):
	############
	# Query
	############
	
	####################
	# DB Data cleanup.
	####################
	delete_iot_home = 'DELETE FROM IOT_HOME WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_chs_subs_info = 'DELETE FROM CHS_SUBS_INFO WHERE SUBS_NO = ' + "'" + homeCode + "'" + ';'
	delete_iot_home_user = 'DELETE FROM IOT_HOME_USER WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_chs_device_homeCode = 'DELETE FROM CHS_DEVICE WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_iot_homemode_device_homeCode = 'DELETE FROM IOT_HOMEMODE_DEVICE WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	
	delete_iot_home_batchcontrol_homeCode = 'DELETE FROM IOT_HOME_BATCHCONTROL WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_iot_device_hub_info = 'DELETE FROM IOT_DEVICE_HUB_INFO WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_iot_home_wifi_info = 'DELETE FROM IOT_WIFI_INFO WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	
	delete_iot_home_autoexe = 'DELETE FROM IOT_HOME_AUTOEXE WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_iot_autoexe_trigger = 'DELETE FROM IOT_AUTOEXE_TRIGGER WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_iot_autoexe_action = 'DELETE FROM IOT_AUTOEXE_ACTION WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'

	delete_chs_device_conn_info = 'DELETE FROM CHS_DEVICE_CONN_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_device_noti_info = 'DELETE FROM IOT_DEVICE_NOTI_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_device_alim_info = 'DELETE FROM IOT_DEVICE_ALIM_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	
	delete_chs_device_uuid = 'DELETE FROM CHS_DEVICE WHERE ID = ' + "'" + uuid + "'" + ';'
	delete_iot_homemode_device_uuid = 'DELETE FROM IOT_HOMEMODE_DEVICE WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_home_batchcontrol_uuid = 'DELETE FROM IOT_HOME_BATCHCONTROL WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_device_ext_timer_info = 'DELETE FROM IOT_DEVICE_EXT_TIMER_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'

	delete_iot_home_autoexe1 ='DELETE FROM IOT_HOME_AUTOEXE WHERE ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID = ' + "'" + uuid + "'" + ')' + ';'
	delete_iot_autoexe_tigger1 ='DELETE FROM IOT_AUTOEXE_TRIGGER WHERE AUTOEXE_ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID = ' + "'" + uuid + "'" +')' + ';'
	delete_iot_autoexe_action1 ='DELETE FROM IOT_AUTOEXE_ACTION  WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'

	delete_iot_home_autoexe2 ='DELETE FROM IOT_HOME_AUTOEXE WHERE ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_TRIGGER  WHERE DEVICE_ID = ' + "'" + uuid + "'" + ')' + ';'
	delete_iot_autoexe_tigger2 ='DELETE FROM IOT_AUTOEXE_ACTION WHERE AUTOEXE_ID IN (SELECT AUTOEXE_ID FROM IOT_AUTOEXE_TRIGGER  WHERE DEVICE_ID = ' + "'" + uuid + "'" + ')' + ';'
	delete_iot_autoexe_action2 ='DELETE FROM IOT_AUTOEXE_TRIGGER WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'

	delete_iot_dev_current_status = 'DELETE FROM IOT_DEV_CURRENT_STATUS WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_device_event_hist = 'DELETE FROM IOT_DEVICE_EVENT_HIST WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_push_event_hist = 'DELETE FROM IOT_PUSH_EVENT_HIST WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'

	####################
	# unpairing device.
	####################
	update_chs_device = 'UPDATE CHS_DEVICE SET PARENT_DEVICE_ID = ' + "'" + uuid + "', CHS_SUBS_INFO_ONE_ID = null, REGISTER_TIME = null, DISP_NAME = null, LOCATION = null  WHERE ID = " + "'" + uuid + "'" + ';'

	##########
	# output
	##########
	result = ('--=======================' + '\n'
		+ '--User cleanup' + '\n'
		+ '--=======================' + '\n'
		+ delete_iot_home + '\n'
		+ delete_chs_subs_info + '\n'
		+ delete_iot_home_user + '\n'
		+ delete_chs_device_homeCode + '\n'
		+ delete_iot_homemode_device_homeCode + '\n'
		+ delete_iot_home_batchcontrol_homeCode + '\n'
		+ delete_iot_device_hub_info + '\n'
		+ delete_iot_home_wifi_info + '\n'
		+ delete_iot_home_autoexe + '\n'
		+ delete_iot_autoexe_trigger + '\n'
		+ delete_iot_autoexe_action + '\n\n'
		+ '--=======================' + '\n'
		+ '--device cleanup' + '\n'
		+ '--=======================' + '\n'
		+ delete_chs_device_conn_info + '\n'
		+ delete_iot_device_noti_info + '\n'
		+ delete_iot_device_alim_info + '\n'
		+ delete_chs_device_uuid + '\n'
		+ delete_iot_homemode_device_uuid + '\n'
		+ delete_iot_home_batchcontrol_uuid + '\n'
		+ delete_iot_device_ext_timer_info + '\n'
		+ delete_iot_home_autoexe1 + '\n'
		+ delete_iot_autoexe_tigger1 + '\n'
		+ delete_iot_autoexe_action1 + '\n'
		+ delete_iot_home_autoexe2 + '\n'
		+ delete_iot_autoexe_tigger2 + '\n'
		+ delete_iot_autoexe_action2 + '\n'
		+ delete_iot_dev_current_status + '\n'
		+ delete_iot_device_event_hist + '\n'
		+ delete_iot_push_event_hist + '\n\n'
		+ '--=======================' + '\n'
		+ '--device unpairing' + '\n'
		+ '--=======================' + '\n'
		+ update_chs_device
	)

	return result

print(make(homeCode, uuid))
