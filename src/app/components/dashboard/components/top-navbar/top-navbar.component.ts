import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  // * Icons
  faHouseChimney = faHouseChimney;
  faUser = faUser;
  faCaretDown = faCaretDown;
  faQuestion = faQuestion;
  faCircleInfo = faCircleInfo;
  faRightFromBracket = faRightFromBracket;

  // * Fields
  username!: string;
  isDropdown: boolean = true;

  constructor(
    private router: Router,
    private _dataSharedService: DataSharedService
  ) {
    this.username = this._dataSharedService.username;
  }

  ngOnInit = (): void => {};

  navigateHome = (): void => {
    this.router.navigate(['/home']);
  };

  toogleDropdown = (): void => {
    this.isDropdown = !this.isDropdown;
  };

  logout = (): void => {
    this.router.navigate(['/home']);
  };
}
