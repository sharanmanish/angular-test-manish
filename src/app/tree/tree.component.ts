import { Component, OnInit, Input, Inject } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { AppService } from '../app.service';
import { MainComponent } from '../main/main.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

interface TaskNode {
  name: string;
  _id: string;
  children?: TaskNode[];
}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  treeControl = new NestedTreeControl<TaskNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TaskNode>();

  panelOpenState = true;

  @Input() data;
  @Input() dataID;

  name: string;

  constructor(private appService: AppService, private mainComponent: MainComponent, public dialog: MatDialog,
    private dialogService: DialogService) {

  }

  hasChild = (_: number, node: TaskNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.check();
  }

  check() {
    for (let i = 0 ; i < this.data.length ; i++) {

      for (let j = 0 ; j < this.data[i].children.length ; j++ ) {
        if (this.data[i].children[j].done === false) {
          this.data[i].done = false;
          break;
        }
        if (this.data[i].children[j].done === true && j === (this.data[i].children.length - 1)) {
          this.data[i].done = true;
        }
      }

    }
    this.dataSource.data = this.data;
  }

  deleteTask(id) {
    this.appService.deleteTask(id, this.dataID);
    setTimeout(() => {
      this.dataSource.data = this.data;
    }, 300);
  }

  deleteSubTask(id) {
    this.appService.arr.forEach(element => {
        element.obj.forEach((x) => {
          x.children = x.children.filter(y => y._id !== id);
        })
    });
    setTimeout(() => {
      this.dataSource.data = null;
      this.treeControl = new NestedTreeControl<TaskNode>(node => node.children);
      this.dataSource = new MatTreeNestedDataSource();
      this.dataSource.data = this.data;
    }, 300);
  }

  addSubTaskPop(addTaskId): void {
    const dialogRef = this.dialog.open(TreeDialog, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      this.addSubtask(this.name, addTaskId);
      console.log('The dialog was closed');
    });
  }

  addSubtask( val, id ) {
    this.appService.arr.forEach(element => {
        element.obj.forEach((x) => {
          x.children.forEach((y) => {
            if(Object.values(y).includes(id)){
              let genid = Math.floor(1000 + Math.random() * 9000) + '';
              x.children.splice(x.children.length - 1, 0, {_id: genid, name: val, done: false});
            }
          });
        })
    });
    setTimeout(() => {
      this.dataSource.data = null;
      this.treeControl = new NestedTreeControl<TaskNode>(node => node.children);
      this.dataSource = new MatTreeNestedDataSource();
      this.dataSource.data = this.data;
    }, 300);
  }

edit(node, id) {
   this.dialogService.editSubtask(node).subscribe( res => {
     this.editSubTask(res, id);
   });
 }

editSubTask(res, id) {
  this.appService.arr.forEach(element => {
        element.obj.forEach((x) => {
          x.children.forEach((y) => {
            if(Object.values(y).includes(id)){
              y.done = res.done;
            }
          })
        });
    });
  setTimeout(() => {
      this.dataSource.data = null;
      this.treeControl = new NestedTreeControl<TaskNode>(node => node.children);
      this.dataSource = new MatTreeNestedDataSource();
      this.dataSource.data = this.data;
    }, 300);
}

}

@Component({
  selector: 'tree-dialog',
  templateUrl: 'tree-dialog.html',
})
export class TreeDialog {

  constructor(
    public dialogRef: MatDialogRef<TreeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
