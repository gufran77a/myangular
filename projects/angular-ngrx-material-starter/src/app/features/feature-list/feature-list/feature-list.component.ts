import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/index';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
//import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:3000/student';
  //baseUrl2: string = 'http://localhost:3000';

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getAll2(request): Observable<any> {
    const params = request;
    return this.http.get<any>(this.baseUrl, { params });
  }

  deletePost(id): Observable<any> {
    return this.http.delete('http://localhost:3000/student/' + id);
  }
}

/**
 * @title Table with selection
 */
@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
  //  ,  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'phonenumber',
    'vehicleroot',
    'createdDate',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageNumber = 1;
  pageSize = 6;
  index = 100;
  length: number;
  dataSource2: number;
  sortname: string = 'createdDate';
  sorttype: string = 'desc';
  filtervariable: string = '';

  getServerData(obj) {
    // this.index=obj.length;
    this.pageNumber = obj.pageIndex + 1;
    this.length = obj.length;
    this.loadAll(
      this.pageNumber,
      obj.pageSize,
      this.sortname,
      this.sorttype,
      this.filtervariable
    );
    //alert("ok")
  }
  ngOnInit() {
    this.loadAll(this.pageNumber, this.pageSize, '', '', '');
  }
  //active: "phonenumber", direction: "desc

  sortData(sort) {
    this.sortname = sort.active;
    this.sorttype = sort.direction;

    this.loadAll(
      this.pageNumber,
      this.pageSize,
      this.sortname,
      this.sorttype,
      this.filtervariable
    );
  }

  loadAll(pageNumber, pageSize, sortname, sorttype, filtertype) {
    this.apiService
      .getAll2({
        _page: pageNumber,
        _limit: pageSize,
        _sort: this.sortname,
        _order: this.sorttype,
        q: filtertype
      })
      .subscribe(data => {
        //var x=data['createdDate']
        //.toString("MMM dd"); // "Dec 20
        this.dataSource = new MatTableDataSource<any>(data);
      });
  }

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  /*  public doFilter = (value: string) => {
   this.dataSource.filter = value.trim().toLocaleLowerCase();

 };*/
  doFilter(filter: string) {
    this.filtervariable = filter;
    console.log(this.filtervariable);
    this.loadAll(
      this.pageNumber,
      this.pageSize,
      this.sortname,
      this.sorttype,
      this.filtervariable
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }
  myArray = [];
  myArrayNames = [];
  deleteItem() {
    for (let i = 0; i < this.selection.selected.length; i++) {
      this.myArray.push(this.selection.selected[i].id);
      this.myArrayNames.push(this.selection.selected[i].name);
    }
    console.log(this.myArray, this.myArrayNames);
    this.openDialog(this.myArray, this.myArrayNames);
    this.ngOnInit();
    this.selection = new SelectionModel<any>(true, []);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }

  id: string;

  openDialog(id2, id3): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      //  width: '350px',
      data: { id: id2, name: id3 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.id = result;
      //  alert(result)
    });
  }
}

interface DialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './feature-list2.component.html'
})
export class DialogOverviewExampleDialog {
  selection = new SelectionModel<any>(true, []);

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getAll().subscribe(data => {
      //    this.dataSource = data;
      //  this.dataSource2 = new MatTableDataSource<any>(data);
      //    this.dataSource2=this.dataSource;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    //alert('Cancel Selected Item');
    this.refresh();
  }
  onYesClick(id2): void {
    for (let i = 0; i < id2.length; i++) {
      this.apiService.deletePost(id2[i]).subscribe(data => {
        this.dialogRef.close();
        //this.router.navigateByUrl('/students');
      });
    }
    this.refresh();
  }
  refresh() {
    window.location.reload();
  }
}
