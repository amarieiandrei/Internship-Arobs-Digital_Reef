import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {
  AgGridEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { GridData } from '../../types/grid-data.interface';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
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

  // * Fields
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
    },
    {
      field: 'description',
      headerName: 'Description',
      suppressSizeToFit: false,
    },
    { field: 'date', headerName: 'Date Created', suppressSizeToFit: true },
    {
      field: 'status',
      headerName: 'Project Status',
      suppressSizeToFit: false,
      cellStyle: (params): any => {
        const status = params.node.data?.status;
        if (status?.localeCompare('AVAILABLE') === 0) {
          return { backgroundColor: 'lightgreen' };
        } else if (status?.localeCompare('DISABLED') === 0) {
          return { backgroundColor: 'lightgray' };
        } else if (status?.localeCompare('DELETE_PENDING') === 0) {
          return { backgroundColor: 'lightsalmon' };
        }
      },
    },
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  constructor(private _configService: ConfigService) {}

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
}
