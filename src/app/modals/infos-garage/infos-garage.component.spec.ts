import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosGarageComponent } from './infos-garage.component';

describe('InfosGarageComponent', () => {
  let component: InfosGarageComponent;
  let fixture: ComponentFixture<InfosGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosGarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
