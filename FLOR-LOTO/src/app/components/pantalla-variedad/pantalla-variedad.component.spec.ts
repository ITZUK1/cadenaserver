import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaVariedadComponent } from './pantalla-variedad.component';

describe('PantallaVariedadComponent', () => {
  let component: PantallaVariedadComponent;
  let fixture: ComponentFixture<PantallaVariedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaVariedadComponent]
    });
    fixture = TestBed.createComponent(PantallaVariedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
