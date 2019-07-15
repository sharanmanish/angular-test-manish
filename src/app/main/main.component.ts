import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as moment from 'moment';

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
            {name: 'Add Tasks', done: true},
          ]
        },
        {
          name: 'List Title 1',
          children: [
            {name: 'Apple', done: false},
            {name: 'Banana', done: true},
            {name: 'Fruit loops', done: false},
            {name: 'Add Tasks', done: true},
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
            {name: 'Add Tasks', done: true},
          ]
        }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      obj: [
        {
          name: 'List Title',
          children: [
            {name: 'Apple', done: true},
            {name: 'Banana', done: true},
            {name: 'Fruit loops', done: true},
            {name: 'Add Tasks', done: true},
          ]
        }
      ]
    }
  ];

  filteredArray = [];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.status.subscribe( result => {
      if (result) {
        this.filteredArray =  this.arr.filter( val => {
         return  moment(val.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY');
        }) ;
        console.log(this.filteredArray);
      } else {
        this.filteredArray = this.arr;
      }
    });
  }

  deleteExp(index) {
    this.arr = this.arr.filter((x, y, z) => {
      return y !== index;
    });
    this.filteredArray = this.arr;
  }

}
