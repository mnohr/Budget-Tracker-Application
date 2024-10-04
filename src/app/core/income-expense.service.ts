// src/app/core/income-expense.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IncomeExpense } from '../models/income-expense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  private dataKey = 'incomeExpenseData';
  private data: { [email: string]: IncomeExpense[] } = JSON.parse(
    localStorage.getItem(this.dataKey) || '{}'
  );
  private dataSubject = new BehaviorSubject<IncomeExpense[]>([]);

  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user) {
      // Emit the user's data
      this.dataSubject.next(this.data[user.email] || []);
    }
  }

  private saveData() {
    localStorage.setItem(this.dataKey, JSON.stringify(this.data));
  }

  // Returns an observable of the user's data
  getData() {
    return this.dataSubject.asObservable();
  }

  addEntry(item: IncomeExpense) {
    const user = this.authService.getCurrentUser();
    if (user) {
      if (!this.data[user.email]) {
        this.data[user.email] = [];
      }
      this.data[user.email].push(item);
      this.saveData();
      this.dataSubject.next(this.data[user.email]); // Emit the updated data
    }
  }

  removeEntry(id: string) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.data[user.email] = this.data[user.email].filter(
        (entry) => entry.id !== id
      );
      this.saveData();
      this.dataSubject.next(this.data[user.email]);
    }
  }

  updateEntry(updatedEntry: IncomeExpense) {
    const user = this.authService.getCurrentUser();
    if (user) {
      const index = this.data[user.email].findIndex(
        (entry) => entry.id === updatedEntry.id
      );
      if (index > -1) {
        this.data[user.email][index] = updatedEntry;
        this.saveData();
        this.dataSubject.next(this.data[user.email]);
      }
    }
  }
}
