import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharedService {
  constructor() {}

  username: string = 'No Data To Fetch...';
}
