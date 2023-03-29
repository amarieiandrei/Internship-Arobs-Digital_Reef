import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

import { ChangePasswordService } from 'src/app/services/change-password.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
  ],
  providers: [ChangePasswordService],
  exports: [HomeComponent],
})
export class HomeModule {}
