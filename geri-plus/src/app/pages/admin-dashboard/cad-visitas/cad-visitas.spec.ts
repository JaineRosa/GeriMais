import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadVisitas } from './cad-visitas';

describe('CadVisitas', () => {
  let component: CadVisitas;
  let fixture: ComponentFixture<CadVisitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadVisitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadVisitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
