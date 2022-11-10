import { Router } from '@angular/router';
import { GraduateService } from './../../services/graduate.service';
import { ConfirmMessageComponent } from './../../components/confirm-message/confirm-message.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Graduate } from 'src/app/models/Graduate';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
  providers: [DatePipe]
})
export class CreatePageComponent implements OnInit {
  createform!:FormGroup;
  Graduate!:Graduate
  date!: Date;
  latest_date!:string
   yearprov!:number
   years:Array<string>=[]
  constructor(private datepipe: DatePipe,private formBuilder:FormBuilder,private dialog:MatDialog
    ,private GraduateService:GraduateService,private route:Router) { 
    this.Graduate =   {} as Graduate
  }

  ngOnInit() {
    this.date=new Date();
     this.latest_date =this.datepipe.transform(this.date, 'yyyy')!;
     this.yearprov= Number(this.latest_date)
     this.currentyears()
     this.createform=this.formBuilder.group({
      year:['',Validators.required],
      sex:['',Validators.required],
      course:['',Validators.required],
      no_graduates:['',Validators.required]



     })
  }
  currentyears(){
   
    for(let i = this.yearprov; i > 1980; i--){
   
            this.years.push(i.toString())
             
    }

 }

 create(){

  const dialogRef = this.dialog.open(ConfirmMessageComponent, {
    width: '500px',
    data: {message: "¿Are you sure to create  ?",state:true},
  });
  dialogRef.afterClosed().subscribe(result => {
       
      if(result!=undefined){
        console.log('The dialog was closed');
        this.GraduateService.create(this.Graduate).subscribe((response:any)=>{
          this.route.navigate(['/home'])
        })

      }
      
   

  })



 }

 clean(){
  this.createform.reset()
 }
}
