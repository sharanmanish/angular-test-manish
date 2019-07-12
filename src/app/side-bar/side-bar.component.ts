import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  list = ['All task', 'Today'];
  marked  = 0;
  constructor() { }

  ngOnInit() {
  }

  selected(index) {
    this.marked = index;
  }

}
