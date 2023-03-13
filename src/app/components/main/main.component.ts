import { Component, TemplateRef } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  // ! Modals
  modalRef?: BsModalRef;

  // ! Icons
  faCheck = faCheck;
  faQuestion = faQuestion;
  faCircleExclamation = faCircleExclamation;
  faXmark = faXmark;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // ! Fields
  showPsw: boolean = false;
  changeType: boolean = false;
  disabled: boolean = true;
  username: string = '';
  password: string = '';
  isInvalid: boolean = true;
  editModalStayOpen: boolean = true;

  constructor(private modalService: BsModalService) {}

  tooglePsw(): void {
    this.showPsw = !this.showPsw;
    this.changeType = !this.changeType;
  }

  onSubmit(values: any): void {
    console.log(values);
  }

  onKey(): void {
    if (this.username && this.password) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  showAlert() {
    this.isInvalid = !this.isInvalid;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editModalStayOpen = false;
  }
}
