import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Idoso } from './idoso';

describe('Idoso', () => {
  let component: Idoso;
  let fixture: ComponentFixture<Idoso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Idoso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Idoso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
