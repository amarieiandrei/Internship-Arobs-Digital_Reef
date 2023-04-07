import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharedService {
  constructor() {}

  // * Getters
  private _username: string = 'No Data To Fetch...';
  public get username(): string {
    return this._username;
  }

  // * Setters
  public set username(username: string) {
    this._username = username;
  }
}
