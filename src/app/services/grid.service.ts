import { Injectable } from '@angular/core';
import { CellClassParams, GridApi } from 'ag-grid-community';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  constructor() {}

  public getItems = (gridApi: GridApi): any => {
    const items: any[] = [];
    gridApi.forEachNode((node) => items.push(node.data));
    return items;
  };

  public isNumber = (input: string): boolean => {
    let inputSplit = input.split('');
    for (let i = 0; i < inputSplit.length; i += 1) {
      let charCode = inputSplit[i].charCodeAt(0);
      if (charCode < 48 || charCode > 57) {
        return false;
      }
    }
    return true;
  };

  public isStatus = (input: string): boolean => {
    if (
      input === 'AVAILABLE' ||
      input === 'DISABLED' ||
      input === 'DELETE_PENDING'
    ) {
      return true;
    }
    return false;
  };

  public cellStyle = (params: CellClassParams): any => {
    const status = params.node.data?.status;
    if (status?.localeCompare('AVAILABLE') === 0) {
      return { backgroundColor: 'lightgreen' };
    } else if (status?.localeCompare('DISABLED') === 0) {
      return { backgroundColor: 'lightgray' };
    } else if (status?.localeCompare('DELETE_PENDING') === 0) {
      return { backgroundColor: 'lightsalmon' };
    }
  };
}
