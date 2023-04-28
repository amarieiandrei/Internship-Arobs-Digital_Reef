import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { EmailServerNotificationsService } from 'src/app/services/email-server-notifications.service';
import { EmailAddress } from '../../types/email-address.interface';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss'],
})
export class EmailNotificationsComponent implements OnInit {
  // * @Output, EventEmitter
  @Output() emailAddressesEvent = new EventEmitter<any>();

  // * Fields
  @Input() disableTestAllEmail: boolean = true;

  @Input() emailAddresses: Array<EmailAddress> = [
    {
      isAlert: false,
      inputEmail: '',
      disableTestEmail: true,
      imposibleToDeleteAlert: false,
    },
  ];

  // * Icons
  public faCircleExclamation = faCircleExclamation;
  public faTrashCan = faTrashCan;
  public faXmark = faXmark;

  constructor(private _ESNService: EmailServerNotificationsService) {}

  ngOnInit(): void {}

  public verifEmail = (index: number): void => {
    const email = this.emailAddresses[index].inputEmail;
    this.emailAddresses[index].isAlert = !this._ESNService.testEmail(email);
  };

  public exitAlert = (index: number): void => {
    this.emailAddresses[index].isAlert = false;
  };

  public deleteEmailAddress = (index: number): void => {
    if (this.emailAddresses.length > 1) {
      this.emailAddresses.splice(index, 1);
    } else {
      this.emailAddresses[index].imposibleToDeleteAlert = true;
    }
  };

  public exitDeleteAlert = (index: number): void => {
    this.emailAddresses[index].imposibleToDeleteAlert = false;
  };

  public addNewEmailAddress = (index: number): void => {
    this.disableTestAllEmail = false;
    this.emailAddresses[index].disableTestEmail = false;

    if (index === this.emailAddresses.length - 1) {
      this.emailAddresses.push({
        isAlert: false,
        inputEmail: '',
        disableTestEmail: true,
        imposibleToDeleteAlert: false,
      });
    }
    // * Emit the 'emailAddresses' field
    this.emailAddressesEvent.emit(this.emailAddresses);
  };

  public onClick = (): void => {
    console.log('click');
  };
}
