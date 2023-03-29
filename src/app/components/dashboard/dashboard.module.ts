import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [DashboardComponent, TopNavbarComponent, GridComponent],
  imports: [CommonModule, FontAwesomeModule],
  providers: [],
  exports: [DashboardComponent],
})
export class DashboardModule {}
