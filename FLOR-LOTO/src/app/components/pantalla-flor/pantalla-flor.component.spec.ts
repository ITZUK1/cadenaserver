import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaFlorComponent } from './pantalla-flor.component';

describe('PantallaFlorComponent', () => {
  let component: PantallaFlorComponent;
  let fixture: ComponentFixture<PantallaFlorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaFlorComponent]
    });
    fixture = TestBed.createComponent(PantallaFlorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
