import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncomeExpense } from '../../models/income-expense.model';
import { IncomeExpenseService } from '../../core/income-expense.service';

@Component({
  selector: 'app-income-expense-form',
  templateUrl: './income-expense-form.component.html',
  styleUrl: './income-expense-form.component.scss',
})
export class IncomeExpenseFormComponent {
  incomeExpenseForm: FormGroup;
  isEditMode = false;
  submitText: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private dialogRef: MatDialogRef<IncomeExpenseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entry?: IncomeExpense } // Inject data
  ) {
    this.incomeExpenseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]],
      type: ['income', [Validators.required]],
      recurring: ['one time', [Validators.required]],
      id: [null],
    });

    if (data && data.entry) {
      this.isEditMode = true;
      this.incomeExpenseForm.patchValue(data.entry);
    }
    this.submitText = this.isEditMode ? 'Update' : 'Create';
  }

  saveEntry(): void {
    if (this.incomeExpenseForm.valid) {
      if (this.isEditMode) {
        this.incomeExpenseService.updateEntry(this.incomeExpenseForm.value); 
      } else {
        this.incomeExpenseService.addEntry(this.incomeExpenseForm.value); 
      }
      this.closeDialog();
    } else {
      alert('Please fill all fields correctly');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
