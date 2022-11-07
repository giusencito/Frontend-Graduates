import { GraduateService } from './../../services/graduate.service';
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
  constructor(private GraduateService:GraduateService ) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
  }
  Getall(){
    this.GraduateService.getall().subscribe((response:any)=>{
       this.dataSource=response.content
       console.log(this.dataSource)
    })
  }

}
