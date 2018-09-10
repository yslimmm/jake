import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Validators, FormControl, FormBuilder, FormGroup} from "@angular/forms";
import {DeviceService, DeviceGroup, DeviceList} from "../device/device.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {PvsService} from "../pvs.service";

@Component({
  selector: 'app-ucube',
  templateUrl: './ucube.component.html',
  styleUrls: ['./ucube.component.css']
})
export class UcubeComponent implements OnInit {

  hubDeviceGroups: DeviceGroup[] = this.deviceService.getHubList();
  pvsDeviceGroups: DeviceGroup[] = this.deviceService.getPvsList();

  ucubeForm: FormGroup;
  ucubeControl = new FormControl();

  constructor(private pvsService: PvsService,
              private http: HttpClient,
              private chRef: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private deviceService: DeviceService) {

    this.ucubeForm = this.fb.group({
      homeCode: new FormControl(null, [Validators.required]),
      custNo: new FormControl(null, [Validators.required]),
      svcCode: new FormControl(null, [Validators.required]),
      subsType: new FormControl(null, [Validators.required,
        Validators.maxLength(2),
        Validators.pattern('0[1-3]{1}')]),
      eventCode: new FormControl(null, [Validators.required,
        Validators.maxLength(2),
        Validators.pattern('[0-1][0-8]')]),
      oneId: new FormControl(null, [Validators.email]),
      deviceModelCode: new FormControl(''),
      deviceTypeCode: new FormControl(''),
      mac: new FormControl(null, [Validators.maxLength(15),
        Validators.pattern('^[a-z0-9]*$')]),
      sn: new FormControl(null, [Validators.maxLength(12),
        Validators.pattern('^[A-Z0-9]*$')])
    });
  }

  ngOnInit() {
  }

  selectChange(event) {
    //In my case $event come with a id value
    // this.selectDeviceModel = this.alldeviceList[$event];
    if (null != event) {
      // let obj: DeviceList = JSON.parse(event.toString()); 이미 json이기때문에 parse하지 않아도 된다.
      let obj: DeviceList = event;

      // TODO : select시 [(ngModel)]로 양방향 바인딩을 하고싶지만 한번의 셀렉트에 object안의 여러 value를 셋팅하는건 불가능한건가? ng-options를 사용이 가능한가? 자꾸 삽질하게된다..
      // this.selectDeviceModel.value = obj.value;
      // this.selectDeviceModel.modelValue = obj.modelValue;
      // this.selectDeviceModel.typeValue = obj.typeValue;
      $('#deviceModelCode').val(obj.modelValue);
      $('#deviceTypeCode').val(obj.typeValue);
    }
  }

  addPvs2SQL() {
    this.ucubeForm.controls['homeCode'].setValue($('.homeCode').val());
    this.ucubeForm.controls['custNo'].setValue($('.custNo').val());
    this.ucubeForm.controls['svcCode'].setValue($('.svcCode').val());
    this.ucubeForm.controls['subsType'].setValue($('.subsType').val());
    this.ucubeForm.controls['eventCode'].setValue($('.eventCode').val());
    this.ucubeForm.controls['deviceModelCode'].setValue($('.deviceModelCode').val());
    this.ucubeForm.controls['deviceTypeCode'].setValue($('.deviceTypeCode').val());

    if (!this.ucubeForm.valid) {
      this.snackBar.open('붉은색 부분을 확인하세요. 가입자 정보 없이 단말 추가도 불가능 합니다.', null, {duration: 2000});
      return;
    }

    var homeCode = $('#homeCode').val() + "";
    var custNo = $('#custNo').val() + "";
    var svcCode = $('#svcCode').val() + "";
    var subsType = $('#subsType').val() + "";
    var eventCode = $('#eventCode').val() + "";
    var oneId = $('#oneId').val() + "";
    var mac = $('#deviceModelCode').val() + "";
    var mac = $('#deviceTypeCode').val() + "";
    var mac = $('#mac').val() + "";
    var sn = $('#sn').val() + "";
  }
}
