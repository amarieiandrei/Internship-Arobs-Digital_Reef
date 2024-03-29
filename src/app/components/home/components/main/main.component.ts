import { Component } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  // ! Icons
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

  constructor(
    private _dataSharedService: DataSharedService,
    private _router: Router
  ) { }

  tooglePsw(): void {
    this.showPsw = !this.showPsw;
    this.changeType = !this.changeType;
  }

  onSubmit(values: any): void {
    console.log(values);
    this._dataSharedService.username = values.uname;
    this._router.navigate(['/dashboard']);
  }

  onKey(): void {
    // * this.disabled = this.username && this.password ? false : true;
    if (this.username && this.password) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  toogleAlert() {
    this.isInvalid = false;
  }

  // ! For test the properties of NgModel Form
  getValue(f: FormControl): void {
    // ! Show ngModel Form Object Properties
    console.log(f);
    if (f.value === '') {
      this.isInvalid = true;
    }
  }
}
