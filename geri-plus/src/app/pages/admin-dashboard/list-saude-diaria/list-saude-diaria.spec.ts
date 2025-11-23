import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaudeDiaria } from './list-saude-diaria';

describe('ListSaudeDiaria', () => {
  let component: ListSaudeDiaria;
  let fixture: ComponentFixture<ListSaudeDiaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSaudeDiaria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSaudeDiaria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
