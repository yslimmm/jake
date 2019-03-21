import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, NgForm, FormGroupDirective, FormBuilder, FormGroup} from "@angular/forms";
import {ErrorStateMatcher, MatSnackBar} from "@angular/material";
import {PvsService} from "../pvs.service";

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

  constructor(private pvsService: PvsService,
              private snackBar: MatSnackBar,
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

    this.pvsService.getUserQuery(this.form.controls['oneId'].value, this.form.controls['subsNo'].value, $('#homeName').val(), this.form.controls['subsType'].value, this.form.controls['custNo'].value, this.form.controls['svcCode'].value).subscribe((responseMap: String) => {
      if (responseMap.length != 0) {
        $('#textarea').val(responseMap.toString());
      } else {
        $('#textarea').val('server error.');
      }
    });
  }

}
