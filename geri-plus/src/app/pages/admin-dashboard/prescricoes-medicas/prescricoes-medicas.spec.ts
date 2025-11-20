import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricoesMedicas } from './prescricoes-medicas';

describe('PrescricoesMedicas', () => {
  let component: PrescricoesMedicas;
  let fixture: ComponentFixture<PrescricoesMedicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescricoesMedicas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescricoesMedicas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
