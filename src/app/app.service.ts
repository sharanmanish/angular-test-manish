import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  click = false;
  status: BehaviorSubject<boolean>;
  constructor() {
    this.status  = new BehaviorSubject(this.click);
   }

   chnageStatus(value) {
     this.click = value;
     this.status.next(value);
   }
}
