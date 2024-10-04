import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  private timeoutDuration = 2 * 60 * 1000;
  private timeoutId: any;

  constructor(private authService: AuthService, private router: Router) {
    this.startTimeout();
    this.monitorUserActivity();
  }

  private startTimeout() {
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.logoutUser(); // Logs out user after inactivity
    }, this.timeoutDuration);
  }

  // Clears the timeout if user performs an action
  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  // Logs out the user and redirects to login page
  private logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('You have been logged out due to inactivity.');
  }

  // Monitors user activity (
  private monitorUserActivity() {
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach((event) => {
      window.addEventListener(event, () => this.startTimeout());
    });
  }
}
