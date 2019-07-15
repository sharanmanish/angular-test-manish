import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  menuList = ['Completed', 'Not Completed', 'Clear All'];
  marked= 0;

  constructor() { }

  ngOnInit() {
  }

  selectItems(index) {
    this.marked = index;
  }

}
