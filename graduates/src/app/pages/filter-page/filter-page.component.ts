import { CombineService } from './../../services/combine/combine.service';
import { NumberService } from './../../services/number/number.service';
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
   getnumberform!:FormGroup;

   getsexyearform!:FormGroup;
   getsexcourseform!:FormGroup;
   getsexnumberform!:FormGroup;
   getyearcourseform!:FormGroup;
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

   equals=false
   less=false
   greather=false

    sexyear=false
    sexcourse=false
    sexnumber=false
    yearcourse=false


   changesize=false


   setnodata=false

   sex!:string
   course!:string
   number!:number
   displayedColumns: string[] = ['year', 'sex', 'type_course', 'no_graduates'];
   dataSource!:MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private datepipe: DatePipe,private formBuilder:FormBuilder,private router:Router,private YearService:YearService,
    private GraduateService:GraduateService,private CourseService:CourseService,
    private NumberService:NumberService,private CombineService:CombineService) {
    
    
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
     this.getnumberform=this.formBuilder.group({
      number:['',Validators.required],
     

     })
     this.getsexyearform=this.formBuilder.group({
      sex:['',Validators.required],
      year:['',Validators.required],

     })
     this.getsexcourseform=this.formBuilder.group({
      sex:['',Validators.required],
      course:['',Validators.required],

     })
     this.getsexnumberform=this.formBuilder.group({
      sex:['',Validators.required],
      number:['',Validators.required],

     })
     this.getyearcourseform=this.formBuilder.group({
      year:['',Validators.required],
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
  changeequal(){
    if(this.equals==false){
      
      this.greather=false
      this.less=false
      this.equals=true
        
     }else{
      this.equals=false
     
     }


  }
  changeLess(){
    if(this.less==false){
      
      this.greather=false
      this.equals=false
      this.less=true
        
     }else{
      this.less=false
     
     }

  }
  changeGreather(){
    if(this.greather==false){
      
      this.greather=true
      this.equals=false
      this.less=false
        
     }else{
      this.greather=false
     
     }

  }
  changesexyear(){
    if(this.sexyear==false){
      
      this.sexyear=true
      this.sexcourse=false
      this.sexnumber=false
      this.yearcourse=false
        
     }else{
      this.sexyear=false
     
     }

  }
  changesexcourse(){
    if(this.sexcourse==false){
      
      this.sexyear=false
      this.sexcourse=true
      this.sexnumber=false
      this.yearcourse=false
        
     }else{
      this.sexcourse=false
     
     }
  }
  changesexnumber(){
    if(this.sexnumber==false){
      
      this.sexyear=false
      this.sexcourse=false
      this.sexnumber=true
      this.yearcourse=false
        
     }else{
      this.sexnumber=false
     
     }
  }
  changeyearcourse(){
    if(this.yearcourse==false){
      
      this.sexyear=false
      this.sexcourse=false
      this.sexnumber=false
      this.yearcourse=true
        
     }else{
      this.yearcourse=false
     
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
               console.log(this.dataSource.paginator)
              
               console.log(this.dataSource.data.length)
              if(this.dataSource.data.length==0){
                 this.setnodata=true
              }else{
                this.setnodata=false
              }
        
        
       

       })
  }
  GetBetweenYear(year1:string,year2:string){
    this.changesize=true
    this.YearService.GetBetweenYear(year1,year2).subscribe((response:any)=>{

            this.dataSource = new MatTableDataSource<Graduate>(response.content);
            this.dataSource.paginator = this.paginator;
            if(this.dataSource.data.length==0){
              this.setnodata=true
           }else{
             this.setnodata=false
           }

     
     
    

    })

  }
  GetByBeforeYear(year:string){
    this.changesize=true
    this.YearService.GetBeforeYear(year).subscribe((response:any)=>{

            this.dataSource = new MatTableDataSource<Graduate>(response.content);
            this.dataSource.paginator = this.paginator;
            if(this.dataSource.data.length==0){
              this.setnodata=true
           }else{
             this.setnodata=false
           }

     
     
    

    })
}
GetByAfterYear(year:string){
  this.changesize=true
  this.YearService.GetAfterYear(year).subscribe((response:any)=>{

          this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }

   
   
  

  })
}
GetBySex(sex:string){
  this.changesize=true
  this.GraduateService.getBySex(sex).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })



}
 
GetStart(word:string){
  this.changesize=true
  this.CourseService.courseStartWith(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })
}
GetEnd(word:string){
  this.changesize=true
  this.CourseService.courseEndsWith(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })

}
GetContaining(word:string){
  this.changesize=true
  this.CourseService.courseContaining(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })
}
GetNotContaining(word:string){
  this.changesize=true
  this.CourseService.courseNotContaining(word).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })
}
GetEqual(number:number){
  this.changesize=true
  this.NumberService.getNumber(number).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })

}
GetLess(number:number){
  this.changesize=true
  this.NumberService.getLess(number).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })
}
GetGreather(number:number){
  this.changesize=true
  this.NumberService.getGreather(number).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })
  
}
GetSexYear(sex:string,year:string){
  this.changesize=true
  this.CombineService.getSexYear(sex,year).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })

}
GetSexCourse(sex:string,course:string){
  this.changesize=true
  this.CombineService.getSexCourse(sex,course).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })


}

GetSexNumber(sex:string,number:number){
  this.changesize=true
  this.CombineService.getSexNumber(sex,number).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
  })

}

GetYearCourse(year:string,course:string){
  this.changesize=true
  this.CombineService.getYearCourse(year,course).subscribe((response:any)=>{

         this.dataSource = new MatTableDataSource<Graduate>(response.content);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data.length==0){
            this.setnodata=true
         }else{
           this.setnodata=false
         }
          
  })

}



}
