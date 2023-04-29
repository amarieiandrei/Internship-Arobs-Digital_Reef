import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  faXmark,
  faQuestion,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmailServerNotificationsService } from 'src/app/services/email-server-notifications.service';
import { EmailServer } from '../../types/email-server.interface';
import { EmailAddress } from './../../types/email-address.interface';

@Component({
  selector: 'app-email-server-notifications',
  templateUrl: './email-server-notifications.component.html',
  styleUrls: ['./email-server-notifications.component.scss'],
})
export class EmailServerNotificationsComponent
  implements AfterViewInit, OnInit
{
  // * Fields
  public emailAddresses: Array<EmailAddress> = [
    {
      isAlert: false,
      inputEmail: '',
      disableTestEmail: true,
      imposibleToDeleteAlert: false,
    },
  ];

  public pswType: boolean = false;

  public isPasswordAlert: boolean = false;
  public isUserIdAlert: boolean = false;
  public inputUserId!: string;
  public inputPassword: string = 'test';

  public disableCheckbox: boolean = false;
  public isChecked: boolean = false;

  public disableUserId: boolean = true;
  public disablePassword: boolean = true;
  public disableDiscardChanges: boolean = true;
  public disableSave: boolean = true;

  public isHostAlert: boolean = true;
  public isHostFormatAlert: boolean = false;
  public isHostPortAlert: boolean = true;
  public hostValue: string = 'localhost';
  public hostPortValue: string = '25';
  public isHostPortValue: boolean = false;
  public isHostValue: boolean = false;

  // * Icons
  public faEyeCustom = faEye;
  public faXmark = faXmark;
  public faQuestion = faQuestion;
  public faCircleExclamation = faCircleExclamation;

  // * Modal
  public modalRef?: BsModalRef;
  public isModalOpen: boolean = true;

  @ViewChild('modalEmailServerNotifications')
  modalEmailServerNotifications!: TemplateRef<any>;

  constructor(
    private _modalService: BsModalService,
    private _cd: ChangeDetectorRef,
    private _ESNService: EmailServerNotificationsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }

  public openModal = () => {
    this.modalRef = this._modalService.show(
      this.modalEmailServerNotifications,
      {
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
        keyboard: false,
      }
    );
  };

  // public openModalMOMENTAN = (template: TemplateRef<any>) => {
  //   this.modalRef = this._modalService.show(template, {
  //     class: 'modal-lg modal-dialog-centered',
  //     ignoreBackdropClick: true,
  //     keyboard: false,
  //   });
  //   this.isModalOpen = false;
  // };

  public getHostValue = (value: string): void => {
    this.isHostFormatAlert = this._ESNService.verifSmtpHost(value);

    if (this.isHostFormatAlert) {
      this.disableCheckbox = true;
    } else {
      this.disableCheckbox = false;
    }

    value === ''
      ? ((this.isHostValue = true),
        (this.isHostAlert = true),
        (this.disableCheckbox = true))
      : (this.isHostValue = false);
  };

  public getHostPortValue = (value: string): void => {
    // ! aici

    value === ''
      ? ((this.isHostPortValue = true),
        (this.isHostPortAlert = true),
        (this.disableCheckbox = true))
      : (this.isHostPortValue = false);

    if (this.hostPortValue === '') {
      this.disableCheckbox = true;
    } else if (this.hostValue !== '') {
      this.disableCheckbox = false;
    }
  };

  public exitHostAlert = (): void => {
    this.isHostAlert = false;
    this.isHostValue = false;
  };

  public exitHostFormatAlert = (): void => {
    this.isHostFormatAlert = false;
  };

  public exitHostPortAlert = (): void => {
    this.isHostPortAlert = false;
    this.isHostPortValue = false;
  };

  public exitUserIdAlert = (): void => {
    this.isUserIdAlert = false;
  };

  public exitPasswordAlert = (): void => {
    this.isPasswordAlert = false;
  };

  public handleSave = (): void => {
    this.disableSave = this._ESNService.verifSaveBtnLogic(
      this.hostValue,
      this.isHostFormatAlert,
      this.hostPortValue
    );
  };

  public onSaveSubmit = (): void => {
    const emailServerObj: EmailServer = {
      emailAddresses: this.emailAddresses,
      mailSmtpAuth: this.isChecked,
      mailUserId: this.inputUserId,
      mailUserPassword: this.inputPassword,
      smtpHostId: this.hostValue,
      smtpHostPort: this.hostPortValue,
    };
    console.log(emailServerObj);
  };

  public handleDiscardChanges = (): void => {
    this.hostValue === '' ||
    this.hostPortValue === '' ||
    this.hostValue.localeCompare('localhost') !== 0 ||
    this.hostPortValue.localeCompare('25') !== 0
      ? (this.disableDiscardChanges = false)
      : (this.disableDiscardChanges = true);
  };

  public onDiscardChanges = (): void => {
    this.hostValue = 'localhost';
    this.hostPortValue = '25';
    this.inputUserId = '';
    this.inputPassword = '1234';
    this.disableDiscardChanges = true;
    this.disableSave = true;
    this.isHostAlert = true;
    this.isHostPortAlert = true;
    this.isHostPortValue = false;
    this.isHostValue = false;
    this.isChecked = false;
    this.disableUserId = true;
    this.disablePassword = true;
    this.pswType = false;
    this.isHostFormatAlert = false;
    this.disableCheckbox = false;
    this.emailAddresses = [
      {
        isAlert: false,
        inputEmail: '',
        disableTestEmail: true,
        imposibleToDeleteAlert: false,
      },
    ];
  };

  public onCheck = (): void => {
    this.isChecked = !this.isChecked;
    if (this.isChecked === true) {
      this.disableSave = true;

      this.disableUserId = false;
      this.disablePassword = false;
    } else {
      this.disableSave = false;

      this.disableUserId = true;
      this.disablePassword = true;
    }
  };

  public getUserIdValue = (f: FormControl): void => {
    if (f.value !== undefined) {
      this.isUserIdAlert = false;
    }
    if (f.value === '') {
      this.isUserIdAlert = true;
    }
  };

  public handleUserIdAlert = (f: FormControl): void => {
    if (f.value === undefined || f.value === '') {
      this.isUserIdAlert = true;
    }
  };

  public getPasswordValue = (f: FormControl): void => {
    if (f.value !== undefined) {
      this.isPasswordAlert = false;
    }
    if (f.value === '') {
      this.isPasswordAlert = true;
    }
  };

  public handlePasswordAlert = (f: FormControl): void => {
    if (f.value === undefined || f.value === '') {
      this.isPasswordAlert = true;
    }
  };

  public tooglePassword = (): void => {
    this.faEyeCustom === faEye
      ? ((this.faEyeCustom = faEyeSlash), (this.pswType = true))
      : ((this.faEyeCustom = faEye), (this.pswType = false));
  };

  public enableSave = (): void => {
    if (this.inputUserId !== '' && this.inputPassword !== '') {
      this.disableSave = false;
    } else {
      this.disableSave = true;
    }
  };

  public recieveEmailAddresses = ($event: any): void => {
    this.emailAddresses = $event;
  };
}
