import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppService } from '../app.service';
import * as moment from 'moment';
import { throwError } from 'rxjs';

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
  marked = null;
  name: string;

  searchString = '';

  constructor(public dialog: MatDialog,private appService: AppService) { }

  ngOnInit() {
  }

  selectItems(index) {
    this.marked = index;
    if (index === 0) {
      this.compSort();
    } else if (index === 1) {
      this.notCompSort();
    } else {
      this.resetSort();
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTskDialog, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {

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
          done: false,
          children: [
            {_id: id(), name: 'Add Tasks', done: true},
          ]
        }

        this.appService.arr[i].obj.unshift(obj);
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
          name: result,
          done: false,
          children: [
            {_id: id(), name: 'Add Tasks', done: true},
          ]
        }
      ]
    };

    this.appService.arr.unshift(obj);

    }
    console.log(this.appService.getArr());
    this.marked = null;
  }

  compSort() {
    this.appService.getArrwithoutSt();
    let clone = JSON.parse(JSON.stringify(this.appService.arr));
    clone.forEach((x, y, z) => {
      x.obj.forEach((j, k, l) => {
        if(j.done === false){
          if(k === l.length-1){
            clone = clone.filter((m, n, o) => {
              return n !== y;
            });
          } else {
            x.obj = x.obj.filter((p) => {
              return p.done !== false;
            });
          }
        } else {

        }
      });
    });
    this.appService.filteredArray = clone;
    console.log(this.appService.filteredArray);
  }

  notCompSort() {
    this.appService.getArrwithoutSt();
    let clone = JSON.parse(JSON.stringify(this.appService.arr));
    clone.forEach((x, y, z) => {
      x.obj.forEach((j, k, l) => {
        if(j.done === false){
          if(k === l.length-1){
            clone = clone.filter((m, n, o) => {
              return n === y;
            });
          } else {
            x.obj = x.obj.filter((p) => {
              return p.done === false;
            });
          }
        } else {

        }
      });
    });
    this.appService.filteredArray = clone;
    console.log(this.appService.filteredArray);
  }

  resetSort() {
    this.appService.getArr();
    console.log(this.appService.getArr());
  }

  refreshPage() {

  }

  searchInput() {
    if (this.searchString !== '') {
      this.appService.getArrwithoutSt();
      this.appService.arr.forEach((x, y, z) => {
      x.obj.forEach((j, k, l) => {
        if(!j.name.toLowerCase().toString().includes(this.searchString.toLowerCase().toString())){
          if(k === l.length-1){
            this.appService.arr = this.appService.arr.filter((m, n, o) => {
              return n === y;
            });
          } else {
            x.obj = x.obj.filter((p) => {
              return !p.name.toLowerCase().toString().includes(this.searchString.toLowerCase().toString());
            });
          }
        } else {
            console.log(j.name.toLowerCase().toString());
            x.obj = x.obj.filter((p) => {
              return p.name.toLowerCase().toString().includes(this.searchString.toLowerCase().toString());
            });
        }
      });
    });

      this.appService.filteredArray = this.appService.arr;
    }
    else {
      this.appService.getArr();
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
