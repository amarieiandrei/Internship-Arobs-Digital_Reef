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
} from '@fortawesome/free-solid-svg-icons';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-email-server-notifications',
  templateUrl: './email-server-notifications.component.html',
  styleUrls: ['./email-server-notifications.component.scss'],
})
export class EmailServerNotificationsComponent implements AfterViewInit {
  // * Icons
  public faXmark = faXmark;
  public faQuestion = faQuestion;
  public faTrashCan = faTrashCan;

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
    // * Little Bug.
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
}
