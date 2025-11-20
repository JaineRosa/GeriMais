import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuidador } from './cuidador';

describe('Cuidador', () => {
  let component: Cuidador;
  let fixture: ComponentFixture<Cuidador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuidador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuidador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
