import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GridData } from '../components/dashboard/types/grid-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _url = 'https://devwork.ro/projects.json';
  private _localUrl = 'http://localhost:3000/projects';

  constructor(private _httpClient: HttpClient) {}

  // * Get Data From the Server Default Sorted by Project Name
  getData = (): Observable<GridData[]> => {
    return this._httpClient.get<GridData[]>(this._url).pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.name.localeCompare(b.name) > 0 ? 1 : -1;
        });
        return data;
      })
    );
  };

  // * Get Data From the Server Default Sorted by Project Name
  // * json-server --watch db.json
  getLocalData = (): Observable<GridData[]> => {
    return this._httpClient.get<GridData[]>(this._localUrl).pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.name.localeCompare(b.name) > 0 ? 1 : -1;
        });
        return data;
      })
    );
  };
}
