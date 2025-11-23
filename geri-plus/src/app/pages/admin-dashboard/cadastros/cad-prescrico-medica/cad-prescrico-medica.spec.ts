import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPrescricoMedica } from './cad-prescrico-medica';

describe('CadPrescricoMedica', () => {
  let component: CadPrescricoMedica;
  let fixture: ComponentFixture<CadPrescricoMedica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadPrescricoMedica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadPrescricoMedica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
