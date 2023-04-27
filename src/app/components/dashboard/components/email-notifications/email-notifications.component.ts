import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { EmailServerNotificationsService } from 'src/app/services/email-server-notifications.service';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss'],
})
export class EmailNotificationsComponent {
  // * Fields
  public emailAddresses: Array<string> = ['1'];

  public isAlert: boolean = false;

  public inputEmail!: string;

  // * Icons
  public faCircleExclamation = faCircleExclamation;
  public faTrashCan = faTrashCan;
  public faXmark = faXmark;

  constructor(private _ESNService: EmailServerNotificationsService) {}

  public verifEmail = (email: string): void => {
    this.isAlert = !this._ESNService.testEmail(email);
  };

  public exitAlert = (): void => {
    this.isAlert = false;
  };
}
