import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-budget-search',
  templateUrl: './budget-search.component.html',
  styleUrl: './budget-search.component.scss'
})
export class BudgetSearchComponent {
  searchControl = new FormControl();
  @Output() searchEvent = new EventEmitter<string>();
  searchFilterValue = '';

  constructor(){
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.searchEvent.emit(value));
  }

  resetSearch() {
    this.searchControl.reset();
  }

}
