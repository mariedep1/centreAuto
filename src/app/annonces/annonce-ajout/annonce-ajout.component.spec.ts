import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceAjoutComponent } from './annonce-ajout.component';

describe('AnnonceAjoutComponent', () => {
  let component: AnnonceAjoutComponent;
  let fixture: ComponentFixture<AnnonceAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceAjoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
