import { CourseService } from './../../services/course/course.service';
import { GraduateService } from './../../services/graduate.service';
import { YearService } from './../../services/year/year.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Graduate } from 'src/app/models/Graduate';
@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css'],
  providers: [DatePipe]
})
export class FilterPageComponent implements OnInit {
  date!: Date;
  latest_date!:string
   yearprov!:number
   getyearform!:FormGroup;
   getyearbetform!:FormGroup;
   getsexform!:FormGroup;
   getcourseform!:FormGroup;
   years:Array<string>=[]
   yearby!:string

  yearbet1!:string
  yearbet2!:string

   findyear=false
   betweenyear=false
   beforeyear=false
   afteryear=false
 
   startwith=false
   endwith=false
   containg=false;
   notcontaining=false



   changesize=false

   sex!:string
   course!:string
   displayedColumns: string[] = ['year', 'sex', 'type_course', 'no_graduates'];
   dataSource!:MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private datepipe: DatePipe,private formBuilder:FormBuilder,private router:Router,private YearService:YearService,
    private GraduateService:GraduateService,private CourseService:CourseService) {
    
    
   }

  ngOnInit() {
    this.date=new Date();
     this.latest_date =this.datepipe.transform(this.date, 'yyyy')!;
     this.yearprov= Number(this.latest_date)
     this.currentyears()
     this.getyearform=this.formBuilder.group({
      year:['',Validators.required],
    

     })
     this.getyearbetform=this.formBuilder.group({
      yearbet1:['',Validators.required],
      yearbet2:['',Validators.required],

     })
     this.getsexform=this.formBuilder.group({
      sex:['',Validators.required],
     

     })
     this.getcourseform=this.formBuilder.group({
      course:['',Validators.required],
     

     })
    
  }
  currentyears(){
   
    for(let i = this.yearprov; i > 1980; i--){
   
            this.years.push(i.toString())
             
    }

 }

  changefindyear(){

   if(this.findyear==false){
    this.findyear=true
    this.betweenyear=false
    this.beforeyear=false
    this.afteryear=false
      
   }else{
    this.findyear=false
   }


  }
  changebetweenyear(){

    if(this.betweenyear==false){
     this.betweenyear=true
     this.findyear=false
     this.beforeyear=false
     this.afteryear=false
        
    }else{
     this.betweenyear=false
    }
 
 
   }
   changebeforeyear(){

    if(this.beforeyear==false){
     this.beforeyear=true
     this.findyear=false
     this.betweenyear=false
     this.afteryear=false
        
    }else{
     this.beforeyear=false
    }
 
 
   }
   changeafteryear(){

    if(this.afteryear==false){
     this.afteryear=true
     this.findyear=false
     this.betweenyear=false
     this.beforeyear=false
       
    }else{
     this.afteryear=false
    
    }
 
 
   }
  changestart(){
    if(this.startwith==false){
      this.startwith=true
      this.endwith=false
      this.containg=false
      this.notcontaining=false
        
     }else{
      this.startwith=false
     
     }

  }
  changesend(){

    if(this.endwith==false){
      this.startwith=false
      this.endwith=true
      this.containg=false
      this.notcontaining=false
        
     }else{
      this.endwith=false
     
     }

  }
  changescontain(){

    if(this.containg==false){
      this.startwith=false
      this.endwith=false
      this.containg=true
      this.notcontaining=false
        
     }else{
      this.containg=false
     
     }


  }
  changesnotcontain(){


    if(this.notcontaining==false){
      this.startwith=false
      this.endwith=false
      this.containg=false
      this.notcontaining=true
        
     }else{
      this.notcontaining=false
     
     }



  }








   update(id:any){
    this.router.navigate(['/update',id])

  }

  

  GetByYear(year:string){
       this.changesize=true
       this.YearService.GetYear(year).subscribe((response:any)=>{

               this.dataSource = new MatTableDataSource<Graduate>(response.content);
               this.dataSource.paginator = this.paginator;
               

        
        
       

       })
  }
  GetBetweenYear(year1:string,year2:string){
    this.changesize=true
    this.YearService.GetBetweenYear(year1,year2).subscribe((response:any)=>{

            this.dataSource = new MatTableDataSource<Graduate>(response.content);
            this.dataSource.paginator = this.paginator;
            

     
     
    

    })

  }
  GetByBeforeYear(year:string){
    this.changesize=true
    this.YearService.GetBeforeYear(year).subscribe((response:any)=>{

            this.dataSource = new MatTableDataSource<Graduate>(response.content);
            this.dataSource.paginator = this.paginator;
            

     
     
    

    })
}
GetByAfterYear(year:string){
  this.changesize=true
  this.YearService.GetAfterYear(year).subscribe((response:any)=>{

          this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          

   
   
  

  })
}
GetBySex(sex:string){
  this.changesize=true
  this.GraduateService.getBySex(sex).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
  })



}
 
GetStart(word:string){
  this.changesize=true
  this.CourseService.courseStartWith(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
  })
}
GetEnd(word:string){
  this.changesize=true
  this.CourseService.courseEndsWith(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
  })

}
GetContaining(word:string){
  this.changesize=true
  this.CourseService.courseContaining(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
  })
}
GetNotContaining(word:string){
  this.changesize=true
  this.CourseService.courseNotContaining(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
  })
}





}
