import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {PvsService} from "../pvs.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public form: FormGroup;

  constructor(private pvsService: PvsService,
              private snackBar: MatSnackBar,
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

    this.pvsService.getQuery("delete", "", "", "", "", $('#homeCode').val(), $('#uuid').val()).subscribe((responseMap: String) => {
      if (responseMap.length != 0) {
        $('#textarea').val(responseMap.toString());
      } else {
        $('#textarea').val('server error.');
      }
    });
  }

}
