import { Component, OnInit, Input } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface TaskNode {
  name: string;
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

  constructor() {
  }

  hasChild = (_: number, node: TaskNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.dataSource.data = this.data;
  }


}
