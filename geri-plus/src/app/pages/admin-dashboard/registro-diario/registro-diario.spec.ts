import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDiario } from './registro-diario';

describe('RegistroDiario', () => {
  let component: RegistroDiario;
  let fixture: ComponentFixture<RegistroDiario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDiario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDiario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
