import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  arr = [
    {
      _id: 'a',
      date: new Date(),
      obj: [
        {
          _id: 'v',
          name: 'List Title',
          done: false,
          children: [
            {_id: 'b', name: 'Apple', done: true},
            {_id: 'c', name: 'Banana', done: false},
            {_id: 'd', name: 'Fruit loops', done: false},
            {_id: 'e', name: 'Add Tasks', done: true},
          ]
        },
        {
          _id: 'u',
          name: 'List Title 1',
          done: false,
          children: [
            {_id: 'f', name: 'Apple', done: false},
            {_id: 'g', name: 'Banana', done: true},
            {_id: 'h', name: 'Fruit loops', done: false},
            {_id: 'i', name: 'Add Tasks', done: true},
          ]
        }
      ]
    },
    {
      _id: 't',
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      obj: [
        {
          _id: 's',
          name: 'List Title',
          done: false,
          children: [
            {_id: 'j', name: 'Apple', done: true},
            {_id: 'k', name: 'Banana', done: true},
            {_id: 'l', name: 'Fruit loops', done: true},
            {_id: 'm', name: 'Add Tasks', done: true},
          ]
        }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      obj: [
        {
          _id: 'n',
          name: 'List Title',
          done: false,
          children: [
            {_id: 'o', name: 'Apple', done: true},
            {_id: 'p', name: 'Banana', done: true},
            {_id: 'q', name: 'Fruit loops', done: true},
            {_id: 'r', name: 'Add Tasks', done: true},
          ]
        }
      ]
    }
  ];

  click = false;
  ref = false;
  status: BehaviorSubject<boolean>;
  refresh: BehaviorSubject<boolean>;


  constructor() {
    this.status  = new BehaviorSubject(this.click);
    this.refresh = new BehaviorSubject(this.ref);
   }

   refStatus(value) {
     this.ref = value;
     this.refresh.next(value);
   }

    chnageStatus(value) {
     this.click = value;
     this.status.next(value);
   }

   deleteTask(id, dataID) {
    this.arr.forEach(element => {
        element.obj = element.obj.filter(x => x._id !== id);
    });
  }
}
