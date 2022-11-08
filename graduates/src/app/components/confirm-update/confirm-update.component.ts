import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Graduate } from 'src/app/models/Graduate';
@Component({
  selector: 'app-confirm-update',
  templateUrl: './confirm-update.component.html',
  styleUrls: ['./confirm-update.component.css']
})
export class ConfirmUpdateComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<ConfirmUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: boolean,) { }

  ngOnInit() {
    
    this.data=true
    console.log(this.data)
  }
  accept(){
    this.data=false
    this.dialogRef.close();
    
  }

}
