import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerpasswordComponent } from './changerpassword.component';

describe('ChangerpasswordComponent', () => {
  let component: ChangerpasswordComponent;
  let fixture: ComponentFixture<ChangerpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
