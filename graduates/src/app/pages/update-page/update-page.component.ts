import { ConfirmDeleteComponent } from './../../components/confirm-delete/confirm-delete.component';
import { Graduate } from './../../models/Graduate';
import { GraduateService } from './../../services/graduate.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUpdateComponent } from 'src/app/components/confirm-update/confirm-update.component';
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
    private route:ActivatedRoute,public dialog:MatDialog) { 

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
        
         const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
          width: '500px',
          data: {graduate: this.Graduate},
        });
        dialogRef.afterClosed().subscribe(result => {
  
          if(result==true){
            console.log('The dialog was closed');
            if(this.validyear==false){
                  this.GraduateUpdate.year=this.Graduate.year
            }
            if(this.validsex==false){
              this.GraduateUpdate.sex=this.Graduate.sex
            }
            if(this.validcourse==false){
              this.GraduateUpdate.type_of_course=this.Graduate.type_of_course
            }
            if(this.validno==false){
              this.GraduateUpdate.no_of_graduates=this.Graduate.no_of_graduates
            }
            console.log(this.GraduateUpdate)
          }
        })
  }
  delete(){
    
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      data: {graduate: this.Graduate},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        console.log('The dialog was closed');
      }

    })
  }
  

}
