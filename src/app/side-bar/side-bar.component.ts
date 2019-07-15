import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  list = ['All task', 'Today'];
  marked  = 0;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  selected(index) {
    this.marked = index;
    if (index === 1) {
      this.appService.chnageStatus(true);
    } else {
      this.appService.chnageStatus(false);
    }
  }

}
