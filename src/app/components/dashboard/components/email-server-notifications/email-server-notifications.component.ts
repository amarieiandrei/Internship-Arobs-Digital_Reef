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
  public isAlert: boolean = true;
  public hostValue: string = 'localhost';
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

  public getValue = (value: string): void => {
    value === ''
      ? ((this.isHostValue = true), (this.isAlert = true))
      : (this.isHostValue = false);
  };

  public exitAlert = (): void => {
    this.isAlert = false;
    this.isHostValue = false;
  };
}
