#!/usr/bin/python
# delete.component.html
# user & device delete Query

import sys

FILE_PATH = sys.argv[0]
modelNo = sys.argv[1]
typeCode = sys.argv[2]
mac = sys.argv[3]
sn = sys.argv[4]
homeCode = sys.argv[5]
uuid = sys.argv[6]

#modelNo = 'modelmodel'
#typeCode = 'codeCode'
#mac = 'MAC1234123MAC'
#sn = 'SNSNSNSNSNS11'
#homeCode = '4949493030'
#uuid = 'ABX-1233-dDDDF'

#print '#############################'
#print 'delete.component.py excute'
#print '#############################'
#print '>> MODEL_NO = ' + modelNo + ' TYPE_CODE = ' + typeCode + ' MAC = ' + mac + ' SN = ' + sn + ' HOME_CODE = ' + homeCode + ' UUID = ' + uuid


def make(modelNo, typeCode, mac, sn, homeCode, uuid):
	############
	# Query
	############
	delete_home_code_iot_home = 'DELETE FROM IOT_HOME WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_home_code_chs_subs_info = 'DELETE FROM CHS_SUBS_INFO WHERE SUBS_NO = ' + "'" + homeCode + "'" + ';'
	delete_home_code_iot_home_user = 'DELETE FROM IOT_HOME_USER WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_home_code_chs_device = 'DELETE FROM CHS_DEVICE WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	delete_home_code_iot_homemode_device = 'DELETE FROM IOT_HOMEMODE_DEVICE WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	iot_home_batchcontrol = 'DELETE FROM IOT_HOME_BATCHCONTROL WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	iot_device_hub_info = 'DELETE FROM IOT_DEVICE_HUB_INFO WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	iot_home_wifi_info = 'DELETE FROM IOT_WIFI_INFO WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	iot_home_autoexe = 'DELETE FROM IOT_HOME_AUTOEXE WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	iot_autoexe_trigger = 'DELETE FROM IOT_AUTOEXE_TRIGGER WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'
	iot_autoexe_action = 'DELETE FROM IOT_AUTOEXE_ACTION WHERE HOME_CODE = ' + "'" + homeCode + "'" + ';'

	####################
	# DB Data cleanup.
	####################
	delete_chs_device_conn_info = 'DELETE FROM CHS_DEVICE_CONN_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_device_noti_info = 'DELETE FROM IOT_DEVICE_NOTI_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_device_alim_info = 'DELETE FROM IOT_DEVICE_ALIM_INFO WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	
	delete_chs_device = 'DELETE FROM CHS_DEVICE WHERE ID = ' + "'" + uuid + "'" + ';'
	delete_iot_homemode_device = 'DELETE FROM IOT_HOMEMODE_DEVICE WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
	delete_iot_home_batchcontrol = 'DELETE FROM IOT_HOME_BATCHCONTROL WHERE DEVICE_ID = ' + "'" + uuid + "'" + ';'
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
	result = ('=======================' + '\n'
	+ 'User cleanup' + '\n'
	+ '=======================' + '\n'
	+ delete_home_code_iot_home + '\n' + delete_home_code_chs_subs_info + '\n' + delete_home_code_iot_home_user + '\n'
	+ delete_home_code_chs_device + '\n' + delete_home_code_iot_homemode_device + '\n' + iot_home_batchcontrol + '\n'
	+ iot_device_hub_info + '\n' + iot_home_wifi_info + '\n' + iot_home_autoexe + '\n'
	+ iot_autoexe_trigger + '\n' + iot_autoexe_action + '\n\n'
	+ '=======================' + '\n'
	+ 'device cleanup' + '\n'
	+ '=======================' + '\n'
	+ delete_chs_device_conn_info + '\n' + delete_iot_device_noti_info + '\n' + delete_iot_device_alim_info + '\n'
	+ delete_chs_device + '\n' + delete_iot_homemode_device + '\n' + delete_iot_home_batchcontrol + '\n'
	+ delete_iot_device_ext_timer_info + '\n' + delete_iot_home_autoexe1 + '\n' + delete_iot_autoexe_tigger1 + '\n'
	+ delete_iot_autoexe_action1 + '\n' + delete_iot_home_autoexe2 + '\n' + delete_iot_autoexe_tigger2 + '\n'
	+ delete_iot_autoexe_action2 + '\n' + delete_iot_dev_current_status + '\n' + delete_iot_device_event_hist + '\n'
	+ delete_iot_push_event_hist + '\n\n'
	+ '=======================' + '\n'
	+ 'device unpairing' + '\n'
	+ '=======================' + '\n'
	+ update_chs_device
	)
	
	return result

print(make(modelNo, typeCode, mac, sn, homeCode, uuid))
