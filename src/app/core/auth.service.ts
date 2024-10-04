import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private currentUser: User | null = JSON.parse(
    localStorage.getItem('currentUser') || 'null'
  );
  private currentUserKey = 'loggedInUser';
  constructor() {
    this.loadUsersFromStorage();
  }

  private loadUsersFromStorage() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  private saveUsersToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  register(user: User): boolean {
    if (this.users.some((u) => u.email === user.email)) return false;

    this.users.push(user);
    this.saveUsersToStorage();
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUser = user;
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null; // If no user is logged in, return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
