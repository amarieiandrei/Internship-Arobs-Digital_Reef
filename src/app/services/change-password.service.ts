import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor() {}

  pwsCharactersValidation(password: string): boolean {
    if (password.length < 8) {
      return false;
    }
    return true;
  }

  pswUppercaseValidation(password: string): boolean {
    let pswSplit = password.split('');
    for (let i = 0; i < pswSplit.length; i += 1) {
      let charCode = pswSplit[i].charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        return true;
      }
    }
    return false;
  }

  pswLowercaseValidation(password: string): boolean {
    let count = 0;
    let pswSplit = password.split('');
    for (let i = 0; i < pswSplit.length; i += 1) {
      let charCode = pswSplit[i].charCodeAt(0);
      if (charCode >= 97 && charCode <= 122) {
        count += 1;
      }
      if (count >= 2) {
        return true;
      }
    }
    return false;
  }

  pswNumberValidation(password: string) {
    let count = 0;
    let pswSplit = password.split('');
    for (let i = 0; i < pswSplit.length; i += 1) {
      let charCode = pswSplit[i].charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        count += 1;
      }
      if (count >= 2) {
        return true;
      }
    }
    return false;
  }

  pswSymbolValidation(password: string) {
    const specialChars = '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]\\';
    let count = 0;
    let pswSplit = password.split('');
    for (let i = 0; i < pswSplit.length; i += 1) {
      if (specialChars.indexOf(pswSplit[i]) !== -1) {
        count += 1;
      }
      if (count >= 2) {
        return true;
      }
    }
    return false;
  }
}
