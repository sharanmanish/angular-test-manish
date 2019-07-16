import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

node;

  status = [
   {value: true, viewValue: 'TRUE'},
   {value: false, viewValue: 'FALSE'},
 ];
 tempData;

 constructor(public dialogRef: MatDialogRef<EditComponent>) { }

 ngOnInit() {
   this.tempData = JSON.parse(JSON.stringify(this.node));
 }

 save() {
   this.dialogRef.close(this.tempData);
 }
}
