import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routes} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {
  MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatSnackBarModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSidenavModule,
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { PvsComponent } from './pvs/pvs.component';
import { HomeComponent } from './home/home.component';

import {PvsService} from "./pvs/pvs.service";
import {DataTablesModule} from "angular-datatables";

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {PaginatorModule} from 'primeng/paginator';
import { UserComponent } from './pvs/user/user.component';
import { DeviceComponent } from './pvs/device/device.component';
import { DeleteComponent } from './pvs/delete/delete.component';
import { UcubeComponent } from './pvs/ucube/ucube.component';
import { AutoexeComponent } from './pvs/autoexe/autoexe.component';
import {SelectModule} from "ng-select";
import {DeviceService} from "./pvs/device/device.service";
import {MsgComponent} from './msg/msg.component';

@NgModule({
  declarations: [
    AppComponent,
    PvsComponent,
    HomeComponent,
    UserComponent,
    DeviceComponent,
    DeleteComponent,
    UcubeComponent,
    AutoexeComponent,
    MsgComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule, /*<mat-menu>*/
    MatIconModule, /*<mat-icon>*/
    MatToolbarModule, /*<mat-toolbar>컴포넌트를 사용할 수 있다.*/
    MatRadioModule, /*라디오버튼 사용할 수 있다.*/
    MatSelectModule, /*셀렉트박스를 사용할 수 있다.*/
    BrowserAnimationsModule, /*툴바 메뉴 클릭시 출력할 애니메이션*/
    MatButtonModule, /*버튼이 사각형으로 안보이고 뒷 버튼 배경이 투명하게*/
    FlexLayoutModule, /*툴바 메뉴를 flex할 수 있도록*/
    MatCardModule, /*jquery페이지에 카드형식모양으로 배열*/
    FormsModule,
    MatFormFieldModule, /* mat-form-field */
    MatInputModule,
    MatCheckboxModule, /*mat-checkbox*/
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    DataTablesModule,
    /*PrimeNG*/
    AccordionModule,
    PaginatorModule,    /*테이블 페이징*/
    SelectModule,
    MatSidenavModule,
  ],
  providers: [PvsService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
