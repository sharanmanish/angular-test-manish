import { Component, OnInit, Input } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { AppService } from '../app.service';
import { MainComponent } from '../main/main.component';

interface TaskNode {
  name: string;
  _id: string;
  children?: TaskNode[];
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

  constructor(private appService: AppService, private mainComponent: MainComponent) {

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
    console.log(this.data);
    console.log(this.dataSource);
  }
}
