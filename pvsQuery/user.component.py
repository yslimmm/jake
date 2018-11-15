#!/usr/bin/python
# user.component.html
# user insert Query

import sys

FILE_PATH = sys.argv[0]
oneId = sys.argv[1]
subsNo = sys.argv[2]
homeName = sys.argv[3]
subsType = sys.argv[4]
custNo = sys.argv[5]
svcCode = sys.argv[6]


def make(oneId, subsNo, homeName, subsType, custNo, svcCode):
	############
	# Query
	############
	iot_home      = "INSERT INTO IOT_HOME(HOME_CODE, HOME_MODE, PROD_CODE, HOME_NAME) VALUES('"+ homeCode +"', 0, 'LZP0000107', '" + homeName + "');"
    iot_home_user = "INSERT INTO IOT_HOME_USER (ID, HOME_CODE, PROD_CODE, ONE_ID, ONE_ID_KEY, MASTER_YN) VALUES (IOT_HOME_USER_SEQ.NEXTVAL, '"+ homeCode +"', 'LZP0000107','"+ oneId +"', '"+ homeCode +"', 'Y');"
    chs_subs_info = ("INSERT INTO CHS_SUBS_INFO (SUBS_NO, PROD_CODE, STATUS_CODE, SUBS_CTN, ONE_ID, CREATE_TIME, UPDATE_TIME, DEL_YN, HOME_CODE, SUBS_TYPE, CUST_NO, SVC_CODE) " +
                        "VALUES ('"+ subsNo +"', 'LZP0000107', '03', '01000000001', '"+ oneId +"', SYSDATE, SYSDATE, 'N','"+ subsNo +"', '"+ subsType +"', '"+ custNo +"', '" + svcCode + "');")

	##########
	# output
	##########
	result = (
		iot_home + '\n'
		+ iot_home_user + '\n'
		+ chs_subs_info
	)

	return result

print(make(oneId, subsNo, homeName, subsType, custNo, svcCode))
