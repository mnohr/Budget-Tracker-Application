import { Component } from '@angular/core';
import { AutoLogoutService } from './core/autoLogout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'budget-tracker-app';

  constructor(private autoLogoutService: AutoLogoutService) {
    // AutoLogoutService automatically starts tracking user activity
  }
}
