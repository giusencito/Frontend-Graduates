import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  displayedColumns: string[] = ['year', 'sex', 'type_course', 'no_graduates'];
  dataSource!:MatTableDataSource<any>;
  constructor() { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
  }

}
