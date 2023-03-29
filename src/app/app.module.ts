import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './components/home/home.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

import { AppComponent } from './app.component';

import { DataSharedService } from './services/data-shared.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, DashboardModule],
  providers: [DataSharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
