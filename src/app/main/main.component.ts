import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  filteredArray = [];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.status.subscribe( result => {
      if (result) {
        this.filteredArray =  this.appService.arr.filter( val => {
         return  moment(val.date).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY');
        }) ;
      } else {
        this.filteredArray = this.appService.arr;
      }
    });
  }

  deleteExp(index) {
    this.appService.arr = this.appService.arr.filter((x, y, z) => {
      return y !== index;
    });
    this.filteredArray = this.appService.arr;
  }

}
