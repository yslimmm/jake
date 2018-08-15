import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {PvsService} from "./pvs.service";

@Component({
  selector: 'app-pvs',
  templateUrl: './pvs.component.html',
  styleUrls: ['./pvs.component.scss']
})

export class PvsComponent implements OnInit {

  print: String;

  constructor(private pvsService: PvsService, private router: Router) { }

  ngOnInit() {
    // console.log("=====pvs.component.ts.ngOnInit()=====");
    this.print = "print test";

    this.initialize();

  } // end ngOnInit();

  initialize(): void {
    this.pvsOptionCheck(1);   // 초기는 사용자 등록 화면으로
  };

  // 메뉴 화면 셋팅
  pvsOptionCheck(btnVlue): void {
    // console.log("pvsOptionCheck :: " + $('input[name="pvsOptions"]:checked').attr('value'));
    // console.log("pvsOptionCehck :: " + btnVlue);

    switch (btnVlue) {
      case 1:
        this.router.navigateByUrl('pvs/user');
        break;
      case 2:
        this.router.navigateByUrl('pvs/device');
        break;
      case 3:
        this.router.navigateByUrl('pvs/delete');
        break;
      case 4:
        this.router.navigateByUrl('pvs/ucube');
        break;
      case 5:
        this.router.navigateByUrl('pvs/autoexe');
    }
  }
}
