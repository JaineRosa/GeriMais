import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Responsavel } from './responsavel';

describe('Responsavel', () => {
  let component: Responsavel;
  let fixture: ComponentFixture<Responsavel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Responsavel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Responsavel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
