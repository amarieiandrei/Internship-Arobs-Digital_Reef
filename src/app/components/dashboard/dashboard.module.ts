import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { GridComponent } from './components/grid/grid.component';
import { EmailServerNotificationsComponent } from './components/email-server-notifications/email-server-notifications.component';

import { ConfigService } from 'src/app/services/config.service';
import { GridService } from 'src/app/services/grid.service';

@NgModule({
  declarations: [
    DashboardComponent,
    TopNavbarComponent,
    GridComponent,
    EmailServerNotificationsComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AgGridModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [ConfigService, GridService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
