import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  name: string;
  date?: Date;
  children?: FoodNode[];
}



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  arr = [
    {
      date: new Date(),
      obj: [
        {
          name: 'List Title',
          children: [
            {name: 'Apple', done: false},
            {name: 'Banana',done: false},
            {name: 'Fruit loops', done: false},
            {name: 'Add New', done: true},
          ]
        },
        {
          name: 'List Title 1',
          children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
            {name: 'Add New'},
          ]
        }
      ]
    },
    {
      date: new Date(),
      obj: [
        {
          name: 'List Title',
          children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
            {name: 'Add New'},
          ]
        }
      ]
    }
  ];


  constructor() {
  }

  ngOnInit() {
  }

}
