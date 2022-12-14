import { ConfirmMessageComponent } from './../../components/confirm-message/confirm-message.component';

import { Graduate } from './../../models/Graduate';
import { GraduateService } from './../../services/graduate.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css'],
  providers: [DatePipe]
})
export class UpdatePageComponent implements OnInit {
   updateform!:FormGroup;
   date!: Date;
   latest_date!:string
   yearprov!:number
   years:Array<string>=[]
   Graduate!:Graduate
   GraduateUpdate!:Graduate
   graduateid!:number
   validyear =false
   validsex=false
   validcourse=false
   validno=false
   validateupdate=false
  constructor(private formBuilder:FormBuilder,private datepipe: DatePipe,private GraduateService:GraduateService,
    private route:ActivatedRoute,public dialog:MatDialog,private router:Router) { 

     this.Graduate =   {} as Graduate
     this.GraduateUpdate =   {} as Graduate
  }

  ngOnInit() {
     this.date=new Date();
     this.graduateid=parseInt(this.route.snapshot.paramMap.get('id')!);
     this.latest_date =this.datepipe.transform(this.date, 'yyyy')!;
     this.yearprov= Number(this.latest_date)
     console.log(this.yearprov)
     this.years.length
     this.currentyears()
     this.GetbyId(this.graduateid)
    this.updateform=this.formBuilder.group({
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
  GetbyId(id:number){
    this.GraduateService.getByID(id).subscribe((response:any)=>{
      this.Graduate=response
      console.log(this.Graduate)
    })
  }
  checkyear(){

    if(this.validyear==false){
        this.validyear=true
        this.checkvalidateupdate()
    }else{
      this.validyear=false
      this.checkvalidateupdate()

    }


  }
  checkvalidateupdate(){

           if(this.validyear==true||this.validsex==true||this.validcourse==true||this.validno==true){
            this.validateupdate=true
           }else{
            this.validateupdate=false
           }


  }
  validateinput(){

       if(this.validyear==true && this.updateform.controls['year'].invalid){
             return false
       }
       if(this.validsex==true && this.updateform.controls['sex'].invalid){
        return false
       }
       if(this.validcourse==true && this.updateform.controls['course'].invalid){
        return false
       }
       if(this.validno==true && this.updateform.controls['no_graduates'].invalid){
        return false
       }
       return true


  }
  checksex(){

    if(this.validsex==false){
      this.validsex=true
      this.checkvalidateupdate()

  }else{
    this.validsex=false
    this.checkvalidateupdate()

  }

  }
  checkcourse(){
    if(this.validcourse==false){
      this.validcourse=true
      this.checkvalidateupdate()

  }else{
    this.validcourse=false
    this.checkvalidateupdate()

  }
  }
  checknumber(){
    if(this.validno==false){
      this.validno=true
      this.checkvalidateupdate()

  }else{
    this.validno=false
    this.checkvalidateupdate()

  }
  }
  update(){
        
         const dialogRef = this.dialog.open(ConfirmMessageComponent, {
          width: '500px',
          data: {message: "?? Are you sure to update ?",state:true},
        });
        dialogRef.afterClosed().subscribe(result => {
  
          if(result!=undefined){
            console.log('The dialog was closed');
            if(this.validyear==false){
                  this.GraduateUpdate.year=this.Graduate.year
            }
            if(this.validsex==false){
              this.GraduateUpdate.sex=this.Graduate.sex
            }
            if(this.validcourse==false){
              this.GraduateUpdate.typeOfCourse=this.Graduate.typeOfCourse
            }
            if(this.validno==false){
              this.GraduateUpdate.noOfGraduates=this.Graduate.noOfGraduates
            }
            console.log(this.GraduateUpdate)
            console.log(this.graduateid)
            this.GraduateService.Update(this.graduateid, this.GraduateUpdate).subscribe((response:any)=>{
              this.router.navigate(['/home'])
            })
          }
        })
  }
  delete(){
    
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '500px',
      data: {message: "?? Are you sure to delete ?",state:true},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        console.log('The dialog was closed');
        this.GraduateService.Delete(this.graduateid,).subscribe((response:any)=>{
          this.router.navigate(['/home'])
        })
      }

    })
  }
  

}
