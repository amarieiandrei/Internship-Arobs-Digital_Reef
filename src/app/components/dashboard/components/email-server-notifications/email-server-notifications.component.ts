import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  faXmark,
  faQuestion,
  faTrashCan,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-email-server-notifications',
  templateUrl: './email-server-notifications.component.html',
  styleUrls: ['./email-server-notifications.component.scss'],
})
export class EmailServerNotificationsComponent implements AfterViewInit {
  // * Fields
  public disableUserId: boolean = true;
  public disablePassword: boolean = true;
  public disableDiscardChanges: boolean = true;
  public disableSave: boolean = true;

  public isHostAlert: boolean = true;
  public isHostPortAlert: boolean = true;
  public hostValue: string = 'localhost';
  public hostPortValue: string = '25';
  public isHostPortValue: boolean = false;
  public isHostValue: boolean = false;

  // * Icons
  public faXmark = faXmark;
  public faQuestion = faQuestion;
  public faTrashCan = faTrashCan;
  public faCircleExclamation = faCircleExclamation;

  // * Modal
  public modalRef?: BsModalRef;
  public isModalOpen: boolean = true;

  @ViewChild('modalEmailServerNotifications')
  modalEmailServerNotifications!: TemplateRef<any>;

  constructor(
    private _modalService: BsModalService,
    private _cd: ChangeDetectorRef
  ) {}

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

  public openModalMOMENTAN = (template: TemplateRef<any>) => {
    this.modalRef = this._modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
    });
    this.isModalOpen = false;
  };

  public getHostValue = (value: string): void => {
    value === ''
      ? ((this.isHostValue = true), (this.isHostAlert = true))
      : (this.isHostValue = false);
  };

  public getHostPortValue = (value: string): void => {
    value === ''
      ? ((this.isHostPortValue = true), (this.isHostPortAlert = true))
      : (this.isHostPortValue = false);
  };

  public exitHostAlert = (): void => {
    this.isHostAlert = false;
    this.isHostValue = false;
  };

  public exitHostPortAlert = (): void => {
    this.isHostPortAlert = false;
    this.isHostPortValue = false;
  };

  public handleDiscardChanges = (): void => {
    this.hostValue === '' || this.hostPortValue === ''
      ? (this.disableDiscardChanges = false)
      : (this.disableDiscardChanges = true);
  };

  public discardChanges = (): void => {
    this.hostValue = 'localhost';
    this.hostPortValue = '25';
    this.disableDiscardChanges = true;
    this.isHostAlert = true;
    this.isHostPortAlert = true;
    this.isHostPortValue = false;
    this.isHostValue = false;
  };

  public toogleCheck = (): void => {
    this.disableUserId = !this.disableUserId;
    this.disablePassword = !this.disablePassword;
  };
}
