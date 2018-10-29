import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PvsComponent} from './pvs/pvs.component';
import {UserComponent} from "./pvs/user/user.component";
import {DeleteComponent} from "./pvs/delete/delete.component";
import {DeviceComponent} from "./pvs/device/device.component";
import {UcubeComponent} from "./pvs/ucube/ucube.component";
import {AutoexeComponent} from "./pvs/autoexe/autoexe.component";
import {MsgComponent} from "./msg/msg.component";

// const [변수]: [타입] :: es6에서 나온 키워드지만 ts문법에 들어감, 지역변수의 개념이 있다.
// 리터널 객체로 바로 객체를 할당해준다.
// commonJs에서 남의 모듈을 가져오는 것을 require(=import)
// 내 모듈 배포는 export
export const routes: Routes = [
  // 사용자화면
  // 부모가 path a라면 children path와 연결이 된다. [ip:4200/a/jquery]
  // 만약 부모path가 공백이라면 부모path는 생략되어 [ip:4200/jquery] 가 된다.
  {path: '', component: HomeComponent, children: [
    // 청약
    {path: 'pvs', component: PvsComponent, children: [
      {path: 'user', component: UserComponent},           // 사용자 등록
      {path: 'device', component: DeviceComponent},       // 단말 등록
      {path: 'delete', component: DeleteComponent},       // 사용자&단말 삭제
      {path: 'ucube', component: UcubeComponent},         // 유큐브 청약
      {path: 'autoexe', component: AutoexeComponent},     // 자동실행 만들기
    ]},
    // 전문
    {
      path: 'msg', component: MsgComponent, children: [
      {path: 'ags', component: UserComponent},
      {path: 'pas', component: DeviceComponent},
      {path: 'eps', component: DeviceComponent},
      {path: 'iss', component: DeviceComponent},
    ]
    },
    /*{path: 'pvs/user', component: UserComponent},*/
  ]},
  // {path: 'pvs', component: PvsComponent}
];
