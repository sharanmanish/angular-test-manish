import { Component, OnInit } from '@angular/core';

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
            {name: 'Apple', done: true},
            {name: 'Banana', done: false},
            {name: 'Fruit loops', done: false},
            {name: 'Add New', done: true},
          ]
        },
        {
          name: 'List Title 1',
          children: [
            {name: 'Apple', done: false},
            {name: 'Banana', done: true},
            {name: 'Fruit loops', done: false},
            {name: 'Add New', done: true},
          ]
        }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      obj: [
        {
          name: 'List Title',
          children: [
            {name: 'Apple', done: true},
            {name: 'Banana', done: true},
            {name: 'Fruit loops', done: true},
            {name: 'Add New', done: true},
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
