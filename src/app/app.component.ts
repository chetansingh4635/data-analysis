import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'market-data';
  status: boolean = false;
  //Sidebar open
  clickEvent() {
    this.status = true;
  }
  //Sidebar close
  clickEvent2() {
    this.status = false;
  }
}
