import { Component, EventEmitter, ViewChild } from '@angular/core';
import { IncomeExpenseService } from '../../core/income-expense.service';
import { IncomeExpense } from '../../models/income-expense.model';
import { IncomeExpenseFormComponent } from '../income-expense-form/income-expense-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  entries: IncomeExpense[] = [];
  currentUserName: string = '';
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;
  displayedColumns: string[] = [
    'name',
    'amount',
    'date',
    'type',
    'reccuring',
    'actions',
  ];
  dataSource = new MatTableDataSource<IncomeExpense>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  length = 100;
  pageIndex = 0;
  pageSize = 5;
  searchReset = new EventEmitter();
  @ViewChild('budgetSearch') budgetSearch: any;

  filterValues = {
    name: '',
    amount: '',
    date: '',
    type: '',
    recurring: '',
  };

  constructor(
    private incomeExpenseService: IncomeExpenseService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getServerData();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserName = user.name;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getServerData(event?: PageEvent): void {
    debugger;
    const pageIndex = event ? event.pageIndex : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;

    this.incomeExpenseService.getData().subscribe((data: IncomeExpense[]) => {
      this.entries = data;
      this.calculateSummary();
      this.dataSource = new MatTableDataSource(this.entries);
    });
  }

  calculateSummary(): void {
    this.totalIncome = this.entries
      .filter((item) => item.type === 'income')
      .reduce((acc, item) => acc + item.amount, 0);
    this.totalExpense = this.entries
      .filter((item) => item.type === 'expense')
      .reduce((acc, item) => acc + item.amount, 0);
    this.balance = this.totalIncome - this.totalExpense;
  }

  openForm(): void {
    this.dialog.open(IncomeExpenseFormComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
    });
  }

  openEditForm(entry: IncomeExpense): void {
    const dialogRef = this.dialog.open(IncomeExpenseFormComponent, {
      width: '100%',
      height: '100%',
      panelClass: 'full-screen-dialog',
      data: { entry },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.incomeExpenseService.updateEntry(result);
      }
    });
  }

  onSearch(searchTerm: string): void {
    if (searchTerm === null) {
      return;
    }
    if (searchTerm) {
      this.dataSource.data = this.entries.filter((entry) =>
        Object.values(entry).some((value) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        })
      );
    } else {
      this.dataSource.data = this.entries;
    }

    this.recurringFilterValue = '';
    this.typeFilterValue = '';
    this.dateFilterValue = '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Define the filter values
  typeFilterValue = '';
  recurringFilterValue = '';
  dateFilterValue = '';
  // Reset the type filter when the recurring filter is changed
  applyFilterRecurring(event: any) {
    this.typeFilterValue = '';
    this.dateFilterValue = '';
    this.budgetSearch.resetSearch();
    this.applyFilter(event.value, 'recurring');
  }

  // Reset the recurring filter when the type filter is changed
  applyFilterType(event: any) {
    this.recurringFilterValue = '';
    this.dateFilterValue = '';
    this.budgetSearch.resetSearch();
    this.applyFilter(event.value, 'type');
  }

  // Apply filter to the table based on the criteria
  applyFilter(filterValue: any, filterField: keyof typeof this.filterValues) {
    const filteredEntries = this.entries.filter((entry) => {
      switch (filterField) {
        case 'recurring':
          return entry.recurring
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        case 'type':
          return entry.type.toLowerCase().includes(filterValue.toLowerCase());
        default:
          return true;
      }
    });

    this.dataSource.data = filteredEntries;
  }

  applyDateFilter(date: Date): void {
    this.recurringFilterValue = '';
    this.typeFilterValue = '';
    this.budgetSearch.resetSearch();

    if (date != null) {
      this.dataSource.data = this.entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.toLocaleDateString() === date.toLocaleDateString();
      });
    } else {
      this.getServerData();
    }
  }

  onPaginateChange(event: PageEvent): void {
    this.getServerData(event);
    this.typeFilterValue = '';
    this.dateFilterValue = '';
    this.recurringFilterValue = '';
    this.budgetSearch.resetSearch();
  }

  resetSearch() {
    this.searchReset.emit();
  }

  deleteEntry(entry: IncomeExpense): void {
    if (confirm(`Are you sure you want to delete the entry "${entry.name}"?`)) {
      this.incomeExpenseService.removeEntry(entry.id);
      this.getServerData();
    }
  }
}
