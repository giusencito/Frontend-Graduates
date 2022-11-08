import { GraduateService } from './../../services/graduate.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Graduate } from 'src/app/models/Graduate';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit  {
  displayedColumns: string[] = ['year', 'sex', 'type_course', 'no_graduates'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private GraduateService:GraduateService ) { 
    
  }

  ngOnInit() {
    
    this.Getall();
  }
  Getall(){
    this.GraduateService.getall().subscribe((response:any)=>{
       
      this.dataSource = new MatTableDataSource<Graduate>(response.content);
       
       this.dataSource.paginator = this.paginator;
      
    })
  }

}
