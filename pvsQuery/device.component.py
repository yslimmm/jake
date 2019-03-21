#!/usr/bin/python
# device.component.html
# device insert Query

import sys

FILE_PATH = sys.argv[0]
modelNo = sys.argv[1]
typeCode = sys.argv[2]
mac = sys.argv[3]
sn = sys.argv[4]
homeCode = sys.argv[5]
uuid = sys.argv[6]
chsDeviceTypeLevel = sys.argv[7]
deviceIdType = sys.argv[8]


def make(modelNo, typeCode, mac, sn, homeCode, uuid, chsDeviceTypeLevel, deviceIdType):
	############
	# Query
	############
	
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
	# insert device.
	####################
	insert_chs_device = ("INSERT INTO CHS_DEVICE(ID, CHS_DEVICE_MODEL_ID, CHS_DEVICE_MODEL_NAME, CHS_DEVICE_TYPE_CODE, chsDeviceTypeLevel, deviceIdType, PARENT_DEVICE_ID, MAC, SN, HOME_CODE, CHS_SUBS_INFO_SUBS_NO, DEL_YN, CONTROL_ENABLE) "
                          + "VALUES ('" + uuid + "', '0', '" + modelNo + "', '" + typeCode + "', '"
      					  + chsDeviceTypeLevel + "', " + deviceIdType + ", '" + uuid + "', '" + mac + "', '" + sn + "', '"
                          + homeCode + "', '" + homeCode + "', 'N', 'Y');")

	##########
	# output
	##########
	result = ('--=======================' + '\n'
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
		+ '--insert device' + '\n'
		+ '--=======================' + '\n'
		+ insert_chs_device
	)

	return result

print(make(modelNo, typeCode, mac, sn, homeCode, uuid, chsDeviceTypeLevel, deviceIdType))
