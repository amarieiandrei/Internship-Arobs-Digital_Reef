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
import { FormControl } from '@angular/forms';
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
  disableInputUsername: boolean = false;
  disableInputCurrentPassword: boolean = false;
  currentPswInDatabase: boolean = false;
  // * Disable Form Submit
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
    this.showPolicyRules = true;
  }

  // * Use Service To Do Logic Function to Verif Password Validation
  onKeyup(): void {
    // * 8 Characters
    this.isCharacters =
      this.changePasswordService.pwsCharactersValidation(this.newPsw) === false
        ? false
        : true;

    // * 1 Uppercase Letter
    this.isUppercase =
      this.changePasswordService.pswUppercaseValidation(this.newPsw) === true
        ? true
        : false;

    // * 2 Lowercase Letters
    this.isLowercase =
      this.changePasswordService.pswLowercaseValidation(this.newPsw) === true
        ? true
        : false;

    // * 2 Numbers
    this.isNumber =
      this.changePasswordService.pswNumberValidation(this.newPsw) === true
        ? true
        : false;

    // * 2 Symbols
    this.isSymbol =
      this.changePasswordService.pswSymbolValidation(this.newPsw) === true
        ? true
        : false;

    // * Toogle Save Button
    this.enableSaveBtn();
  }

  enableSaveBtn() {
    this.disabled =
      this.isCharacters &&
      this.isLowercase &&
      this.isNumber &&
      this.isSymbol &&
      this.isUppercase &&
      this.disableInputUsername &&
      this.disableInputCurrentPassword
        ? false
        : true;
  }

  // ! For the moment because we don't have Real Data.

  verifUsername(): void {
    if (this.username.length > 5) {
      this.disableInputUsername = true;
    }
    this.enableSaveBtn();
  }

  verifCurrentPassword(): void {
    if (this.currentPsw.length > 5) {
      this.disableInputCurrentPassword = true;
      this.currentPswInDatabase = true;
    }
    this.enableSaveBtn();
  }

  resetForm(): void {
    this.showCurrentPsw = false;
    this.typeCurrentPsw = false;
    this.showNewPsw = false;
    this.typeNewPsw = false;
    // * Form Validation
    this.username = '';
    this.currentPsw = '';
    this.newPsw = '';
    this.showPolicyRules = false;
    this.isCharacters = false;
    this.isUppercase = false;
    this.isLowercase = false;
    this.isNumber = false;
    this.isSymbol = false;
    // * Disable Form Inputs when Correct
    this.disableInputUsername = false;
    this.disableInputCurrentPassword = false;
    this.currentPswInDatabase = false;
    // * Disable Form Submit
    this.disabled = true;
  }
}
