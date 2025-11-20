import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacoesMedicas } from './recomendacoes-medicas';

describe('RecomendacoesMedicas', () => {
  let component: RecomendacoesMedicas;
  let fixture: ComponentFixture<RecomendacoesMedicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendacoesMedicas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendacoesMedicas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
