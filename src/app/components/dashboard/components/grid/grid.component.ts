import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import {
  AgGridEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { GridData } from '../../types/grid-data.interface';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

import { ConfigService } from 'src/app/services/config.service';
import { GridService } from 'src/app/services/grid.service';
import * as moment from 'moment';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  // * Icons
  public faUser = faUser;
  public faArrowsRotate = faArrowsRotate;
  public faFilter = faFilter;
  public faWrench = faWrench;
  public faArrowsLeftRight = faArrowsLeftRight;

  // * Fields
  public newVar!: any;
  public statusAlert: boolean = false;
  public successAlert: boolean = false;
  public dangerAlert: boolean = false;
  public isSubmit: boolean = true;

  public nameField!: string;
  public idField!: string;
  public descriptionField!: string;
  public dateField!: any;
  public statusField!: string;

  public searchText!: string;
  public selectedRows: number = 0;
  private _gridApi!: GridApi<GridData>;
  public rowData$!: Observable<GridData[]>;

  columnDefs: ColDef<GridData>[] = [
    {
      field: 'name',
      headerName: 'Project Name',
      suppressSizeToFit: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'id',
      headerName: 'ID',
      suppressSizeToFit: true,
      maxWidth: 90,
      getQuickFilterText: () => {
        return '';
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      suppressSizeToFit: false,
    },
    {
      field: 'date',
      headerName: 'Date Created',
      suppressSizeToFit: true,
      getQuickFilterText: () => {
        return '';
      },
    },
    {
      field: 'status',
      headerName: 'Project Status',
      suppressSizeToFit: false,
      cellStyle: (params): any => {
        return this._gridService.cellStyle(params);
      },
    },
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  constructor(
    private _configService: ConfigService,
    private _gridService: GridService
  ) {}

  ngOnInit(): void {
    this.rowData$ = this._configService.getData();
  }

  onGridReady = (params: GridReadyEvent<GridData>) => {
    this._gridApi = params.api;
    this._gridApi.sizeColumnsToFit();
  };

  onCellClicked = (event: AgGridEvent): void => {};

  clearSelection = (): void => {
    this._gridApi.deselectAll();
  };

  onSelectionChanged = (event: AgGridEvent): void => {
    this.selectedRows = this._gridApi.getSelectedRows().length;
  };

  onFilterBoxChanged = (): void => {
    this._gridApi.setQuickFilter(this.searchText);
  };

  onSubmit(values: GridData): void {
    // console.log(values);

    // * FORMAT DATE BECAUSE OF DATEPICKER IN NGXBOOTSTRAP
    values.date = moment(values.date).format('DD/MM/YYYY');

    const data: GridData = values;
    let items = this._gridService.getItems(this._gridApi);
    items.push(data);
    this._gridApi.setRowData(items);
    this.successAlert = true;
    setTimeout(() => {
      this.successAlert = false;
    }, 2000);
    this.selectedRows = 0;
    this.nameField = '';
    this.idField = '';
    this.descriptionField = '';
    this.dateField = '';
    this.statusField = '';
    this.isSubmit = true;
  }

  verifNumber = (idField: string): void => {
    this.dangerAlert = !this._gridService.isNumber(idField);
  };

  verifStatus = (idStatus: string): void => {
    this.statusAlert = !this._gridService.isStatus(idStatus);
  };

  clearDateField = (): void => {
    this.dateField = '';
  };

  getValue = (f: FormControl): void => {
    // * Enable Submit Btn
    this.isSubmit =
      this.nameField &&
      this.idField &&
      this.descriptionField &&
      this.dateField &&
      this.statusField &&
      this._gridService.isNumber(this.idField) &&
      this._gridService.isStatus(this.statusField)
        ? false
        : true;
  };

  sizeColumnsToFit = (): void => {
    this._gridApi.sizeColumnsToFit();
  };

  reloadData = (): void => {
    this.rowData$ = this._configService.getData();
    this.selectedRows = 0;
  };

  filterByIdDesc = (): void => {
    let items: any[] = this._gridService.getItems(this._gridApi);
    items = this._gridService.sortByIdDesc(items);
    this._gridApi.setRowData(items);
    this.selectedRows = 0;
  };

  updateGridNewData = (): void => {
    this.rowData$ = this._configService.getLocalData();
    this.selectedRows = 0;
  };
}
