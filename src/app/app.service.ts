import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {

  base_url: string = "http://mybackend.com/api/";
  arr_endpoint = "arr1";
  filteredArray = [];

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
          done: true,
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
          done: true,
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


  constructor(private http: HttpClient) {
    this.status  = new BehaviorSubject(this.click);
    this.refresh = new BehaviorSubject(this.ref);
   }

   ngOnInit() {

   }

   getArr() {
    //  return this.http.get(this.base_url + this.arr_endpoint).subscribe(res => {
    //     this.arr = Object.assign([], res);
    //     console.log(this.arr);
    //     this.chnageStatus(false);
    //     this.refStatus(true);
    //   });
    this.chnageStatus(false);
    this.refStatus(true);
    return this.arr;
  };
   getArrwithoutSt() {
    //  return this.http.get(this.base_url + this.arr_endpoint).subscribe(res => {
    //     this.arr = Object.assign([], res);
    //     console.log(this.arr);
    //   });
  };

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
