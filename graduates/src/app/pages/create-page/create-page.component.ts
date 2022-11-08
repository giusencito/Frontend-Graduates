import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Graduate } from 'src/app/models/Graduate';
import { DatePipe } from '@angular/common';
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
  constructor(private datepipe: DatePipe,private formBuilder:FormBuilder) { 
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

 create(){}

 clean(){
  this.createform.reset()
 }
}
