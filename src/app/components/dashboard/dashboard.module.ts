import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { GridComponent } from './components/grid/grid.component';

import { ConfigService } from 'src/app/services/config.service';

@NgModule({
  declarations: [DashboardComponent, TopNavbarComponent, GridComponent],
  imports: [CommonModule, FontAwesomeModule, AgGridModule, FormsModule],
  providers: [ConfigService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
