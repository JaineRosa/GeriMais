import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrescricaoMedica } from './list-prescricao-medica';

describe('ListPrescricaoMedica', () => {
  let component: ListPrescricaoMedica;
  let fixture: ComponentFixture<ListPrescricaoMedica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPrescricaoMedica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrescricaoMedica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
