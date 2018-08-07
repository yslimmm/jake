import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcubeComponent } from './ucube.component';

describe('UcubeComponent', () => {
  let component: UcubeComponent;
  let fixture: ComponentFixture<UcubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
