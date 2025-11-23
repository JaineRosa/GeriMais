import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadSaudeDiaria } from './cad-saude-diaria';

describe('CadSaudeDiaria', () => {
  let component: CadSaudeDiaria;
  let fixture: ComponentFixture<CadSaudeDiaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadSaudeDiaria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadSaudeDiaria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
