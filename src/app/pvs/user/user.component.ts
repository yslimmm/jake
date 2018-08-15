import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, NgForm, FormGroupDirective, FormBuilder, FormGroup} from "@angular/forms";
import {ErrorStateMatcher, MatSnackBar} from "@angular/material";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // [formControl] 사용시 독립적으로 폼 유효성 확인 가능
  // ONE_ID
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  // SUBS_NO
  subsNoFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
  ]);

  // SUBS_TYPE
  subsTypeFormControl = new FormControl('',[
    Validators.required,
    Validators.maxLength(2),
    Validators.pattern('0[1-3]{1}'),    // 0X (X는 [1~3]숫자만 {1}자리 허용
  ]);


  public form: FormGroup;

  constructor(private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      oneId: new FormControl(null, [Validators.required,
                                    Validators.email]),
      subsNo: new FormControl(null, [Validators.required,
                                     Validators.maxLength(12)]), // 반드시 입력, 12자 이상 입력
      homeName: new FormControl(''),
      subsType: new FormControl(null,  [Validators.required,
                                        Validators.maxLength(2),
                                        Validators.pattern('0[1-3]{1}')]),
      custNo: new FormControl(''),
      svcCode: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  createSQL() {
    // this.form.controls['postcode'].setValue($('.postcodify_postcode5').val());
    // this.form.controls['address'].setValue($('.postcodify_address').val());

    /*if (!this.form.controls['isTerm'].value) {
      this.snackBar.open('이용약관에 동의하세요.', null, {duration: 2000});
      return;
    }
    if (!this.form.controls['isInfo'].value) {
      this.snackBar.open('개인정보이용에 동의하세요.', null, {duration: 2000});
      return;
    }*/
    if (!this.form.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요.', null, {duration: 2000});
      return;
    }

    // TODO : 스크립트 파일로 빼놓기.
    var iot_home      = "INSERT INTO IOT_HOME(HOME_CODE, HOME_MODE, PROD_CODE, HOME_NAME) VALUES('"+ this.form.controls['subsNo'].value +"', 0, 'LZP0000107', '" + $('#homeName').val() + "');";
    var iot_home_user = "INSERT INTO IOT_HOME_USER (ID, HOME_CODE, PROD_CODE, ONE_ID, ONE_ID_KEY, MASTER_YN) VALUES (IOT_HOME_USER_SEQ.NEXTVAL, '"+ this.form.controls['subsNo'].value +"', 'LZP0000107','"+ this.form.controls['oneId'].value +"', '"+ this.form.controls['subsNo'].value +"', 'Y');";
    var chs_subs_info = "INSERT INTO CHS_SUBS_INFO (SUBS_NO, PROD_CODE, STATUS_CODE, SUBS_CTN, ONE_ID, CREATE_TIME, UPDATE_TIME, DEL_YN, HOME_CODE, SUBS_TYPE, CUST_NO, SVC_CODE) " +
                        "VALUES ('"+ this.form.controls['subsNo'].value +"', 'LZP0000107', '03', '01000000001', '"+ this.form.controls['oneId'].value +"', SYSDATE, SYSDATE, 'N','"+ this.form.controls['subsNo'].value +"', '"+ this.form.controls['subsType'].value +"', '"+ this.form.controls['custNo'].value +"', '" + this.form.controls['svcCode'].value + "');";

    var textarea      = iot_home + "\n" + iot_home_user + "\n" + chs_subs_info;
    $('#textarea').val(textarea);
  }

}
