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
  // * Disable Form Inputs when Correct
  disableUsername: boolean = false;
  disablePassword: boolean = false;
  // * Disable Form Submit
  disabled: boolean = true;
  // * Disable Input Form
  disableInputCurrentPassword: boolean = false;
  disableInputUsername: boolean = false;

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
    this.showPolicyRules = true;
  }

  // * Use Service To Do Logic Function to Verif Password Validation
  onKeyup(): void {
    // * Solved Litte bug when passwords don't match -> disable button
    this.enableSaveBtn();

    // * 8 Characters
    this.changePasswordService.pwsCharactersValidation(this.currentPsw) ===
    false
      ? (this.isCharacters = false)
      : (this.isCharacters = true);

    // * 1 Uppercase Letter
    this.changePasswordService.pswUppercaseValidation(this.currentPsw) === true
      ? (this.isUppercase = true)
      : (this.isUppercase = false);

    // * 2 Lowercase Letters
    this.changePasswordService.pswLowercaseValidation(this.currentPsw) === true
      ? (this.isLowercase = true)
      : (this.isLowercase = false);

    // * 2 Numbers
    this.changePasswordService.pswNumberValidation(this.currentPsw) === true
      ? (this.isNumber = true)
      : (this.isNumber = false);

    // * 2 Symbols
    this.changePasswordService.pswSymbolValidation(this.currentPsw) === true
      ? (this.isSymbol = true)
      : (this.isSymbol = false);
  }

  enableSaveBtn() {
    // * Solved Litte bug when passwords don't match -> disable button
    if (this.currentPsw.length === 0) {
      this.disabled = true;
      return;
    }
    if (
      this.isCharacters &&
      this.isLowercase &&
      this.isNumber &&
      this.isSymbol &&
      this.isUppercase
    ) {
      this.currentPsw === this.newPsw
        ? (this.disabled = false)
        : (this.disabled = true);
    }
  }

  verifCurrentPassword(): void {
    if (
      this.isCharacters &&
      this.isLowercase &&
      this.isNumber &&
      this.isSymbol &&
      this.isUppercase
    ) {
      this.disableInputCurrentPassword = true;
    }
  }
  verifUsername(): void {
    if (this.username.length > 5) {
      this.disableInputUsername = true;
    }
  }
}
