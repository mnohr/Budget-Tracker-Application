# Budget Tracker Application

A simple budget tracker application built with **Angular** that allows users to manage their income and expenses. The application supports user registration, login, and personalized data storage. It implements SOLID principles and best design practices, utilizing **local storage** for data persistence.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Features
- User Registration and Login
- Track Income and Expenses
- CRUD Operations (Create, Read, Update, Delete)
- Data Pagination and Filtering (by amount, date, type)
- Data stored in LocalStorage (per user)
- Summary Dashboard with Total Income, Total Expenses, and Balance
- Auto Logout after session timeout
- Edit and Delete functionality for each entry
- Follows SOLID principles and best coding practices
- Responsive Design using Angular Material

## Technologies Used
- **Angular 16**
- **TypeScript**
- **Angular Material** (for UI components)
- **RxJS** (for reactive programming)
- **SCSS** (for styling)
- **LocalStorage** (for data persistence)
- **uuid** (for generating unique IDs)

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- **Node.js**: Install the latest version of Node.js from [here](https://nodejs.org/)
- **Angular CLI**: Install the Angular CLI globally on your system:
```bash
  npm install -g @angular/cli
```

### Installation
Clone the repository

```
https://github.com/mnohr/Budget-Tracker-Application.git

cd budget-tracker
```
Install dependencies

```
npm install
```

Run the application

```
ng serve
```
Open your browser and navigate to http://localhost:4200/.
```

### Folder Structure

src/
│
├── app/
│   ├── core/                       # Core services (Auth, IncomeExpense service)
│   ├── models/                     # Application models
│   ├── components/                 # Angular components (Dashboard, Forms)
│   └── shared/                     # Shared modules and utilities
│
├── assets/                         # Assets like images, fonts
│
├── environments/                   # Environment-specific configurations
│
├── styles.scss                     # Global styles
│
└── main.ts                         # Main application entry point

