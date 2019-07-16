import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppService } from '../app.service';
import * as moment from 'moment';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  menuList = ['Completed', 'Not Completed', 'Clear All'];
  marked= 0;
  name: string;

  constructor(public dialog: MatDialog,private appService: AppService) { }

  ngOnInit() {
  }

  selectItems(index) {
    this.marked = index;
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTskDialog, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if(result != '' && result !== undefined) {
        this.addTaskNode(result);
        setTimeout(() => {
          this.appService.chnageStatus(false);
          this.appService.refStatus(true);
        },
        300 );
      }

    });
  }


  addTaskNode(result) {
    let reached = 0;

    for(let i = 0; i < this.appService.arr.length; i++) {
      if(moment(this.appService.arr[i].date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')) {
        reached++;
        let id = function() {
          return Math.floor(1000 + Math.random() * 9000) + '';
        }

        let obj = {
          _id: id(),
          name: result,
          children: [
            {_id: id(), name: 'Add Tasks', done: true},
          ]
        }

        this.appService.arr[i].obj.push(obj);
        break;
      }
    };

  if(reached === 0){

    let id = function() {
          return Math.floor(1000 + Math.random() * 9000) + '';
    };

    let obj = {
      _id: id(),
      date: new Date(),
      obj: [
        {
          _id: id(),
          name: 'List Title',
          children: [
            {_id: id(), name: 'Add Tasks', done: true},
          ]
        }
      ]
    };

    this.appService.arr.unshift(obj);
  }

}


}

@Component({
  selector: 'add-tsk-dialog',
  templateUrl: 'add-tsk-dialog.html',
})
export class AddTskDialog {

  constructor(
    public dialogRef: MatDialogRef<AddTskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
