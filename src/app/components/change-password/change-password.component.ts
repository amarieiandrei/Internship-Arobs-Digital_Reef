import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  // ! Modals
  modalRef?: BsModalRef;
  isOpen: boolean = true;

  // ! Icons
  faQuestion = faQuestion;
  faXmark = faXmark;
  faCheck = faCheck;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // ! Fields

  @ViewChild('template') template!: TemplateRef<any>;

  constructor(private modalService: BsModalService) {}

  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }

  openModalMOMENTAN(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.isOpen = false;
  }
}
