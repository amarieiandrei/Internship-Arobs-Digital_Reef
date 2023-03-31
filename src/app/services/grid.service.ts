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

  private partition = (arr: any[], left: number, right: number): number => {
    let pivot: number = arr[right].id;
    let i: number = left - 1;

    for (let j = left; j < right; j += 1) {
      if (arr[j].id > pivot) {
        i += 1;

        let aux = arr[i];
        arr[i] = arr[j];
        arr[j] = aux;
      }
    }

    let aux = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = aux;

    return i + 1;
  };

  private quicksort = (arr: any[], left: number, right: number): any => {
    if (left >= right) {
      return;
    }
    let p = this.partition(arr, left, right);
    this.quicksort(arr, left, p - 1);
    this.quicksort(arr, p + 1, right);
  };

  public sortByIdDesc = (items: any): void => {
    this.quicksort(items, 0, items.length - 1);
  };
}
