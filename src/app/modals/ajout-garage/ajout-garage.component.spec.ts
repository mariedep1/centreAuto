import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutGarageComponent } from './ajout-garage.component';

describe('AjoutGarageComponent', () => {
  let component: AjoutGarageComponent;
  let fixture: ComponentFixture<AjoutGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutGarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
