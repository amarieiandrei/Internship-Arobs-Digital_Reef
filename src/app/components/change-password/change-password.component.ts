import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  faQuestion,
  faXmark,
  faCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ChangePasswordService } from 'src/app/services/change-password.service';
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
  faCircleExclamation = faCircleExclamation;

  // ! Fields
  showCurrentPsw: boolean = false;
  typeCurrentPsw: boolean = false;
  showNewPsw: boolean = false;
  typeNewPsw: boolean = false;
  // * Form Validation
  username: string = '';
  currentPsw: string = '';
  newPsw: string = '';
  showPolicyRules: boolean = false;
  isCharacters: boolean = false;
  isUppercase: boolean = false;
  isLowercase: boolean = false;
  isNumber: boolean = false;
  isSymbol: boolean = false;
  disabled: boolean = true;

  @ViewChild('template') template!: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private changePasswordService: ChangePasswordService
  ) {}

  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }

  openModalMOMENTAN(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.isOpen = false;
  }

  onSubmit(values: any): void {
    console.log(values);
  }

  toogleCurrentPsw(): void {
    this.showCurrentPsw = !this.showCurrentPsw;
    this.typeCurrentPsw = !this.typeCurrentPsw;
  }

  toogleNewPsw(): void {
    this.showNewPsw = !this.showNewPsw;
    this.typeNewPsw = !this.typeNewPsw;
  }

  onFocus(): void {
    this.showPolicyRules = !this.showPolicyRules;
  }

  onFocusOut(): void {
    this.showPolicyRules = !this.showPolicyRules;
  }

  // * Use Service To Do Logic Function to Verif Password Validation
  onKeyup(): void {
    // * 8 Characters
    if (
      this.changePasswordService.pwsCharactersValidation(this.currentPsw) ===
      false
    ) {
      this.isCharacters = false;
    } else {
      this.isCharacters = true;
    }

    // * 1 Uppercase Letter
    if (
      this.changePasswordService.pswUppercaseValidation(this.currentPsw) ===
      true
    ) {
      this.isUppercase = true;
    } else {
      this.isUppercase = false;
    }

    // * 2 Lowercase Letters

    if (
      this.changePasswordService.pswLowercaseValidation(this.currentPsw) ===
      true
    ) {
      this.isLowercase = true;
    } else {
      this.isLowercase = false;
    }

    // * 2 Numbers
    if (
      this.changePasswordService.pswNumberValidation(this.currentPsw) === true
    ) {
      this.isNumber = true;
    } else {
      this.isNumber = false;
    }

    // * 2 Symbols
    if (
      this.changePasswordService.pswSymbolValidation(this.currentPsw) === true
    ) {
      this.isSymbol = true;
    } else {
      this.isSymbol = false;
    }
  }

  enableSaveBtn() {
    if (this.currentPsw === this.newPsw) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
}
