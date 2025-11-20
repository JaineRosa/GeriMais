import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelIdoso } from './painel-idoso';

describe('PainelIdoso', () => {
  let component: PainelIdoso;
  let fixture: ComponentFixture<PainelIdoso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelIdoso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelIdoso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
