import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseFormComponent } from './income-expense-form.component';

describe('IncomeExpenseFormComponent', () => {
  let component: IncomeExpenseFormComponent;
  let fixture: ComponentFixture<IncomeExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeExpenseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
