import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.css']
})
export class ConfirmMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }
  denegate(){
   
    this.dialogRef.close();
    
  }

}
