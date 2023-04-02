import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GridData } from '../components/dashboard/types/grid-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _url = 'https://devwork.ro/projects.json';
  private _localUrl = 'http://localhost:3000/projects';

  constructor(private _httpClient: HttpClient) {}

  getData = (): Observable<GridData[]> => {
    return this._httpClient.get<GridData[]>(this._url);
  };

  // * json-server --watch db.json
  getLocalData = (): Observable<GridData[]> => {
    return this._httpClient.get<GridData[]>(this._localUrl);
  };
}
