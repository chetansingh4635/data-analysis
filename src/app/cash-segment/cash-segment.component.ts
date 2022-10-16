import { Component, OnInit } from '@angular/core';
import { CashSegmentService } from './cash-segment.service';
import url from '../configs/config.json';

@Component({
  selector: 'app-cash-segment',
  templateUrl: './cash-segment.component.html',
  styleUrls: ['./cash-segment.component.css']
})

export class CashSegmentComponent implements OnInit {

  public nifty_stocks_data: any;
  constructor(private service: CashSegmentService) {
    service.getNiftyStocksData().subscribe((data:any) => {
      this.nifty_stocks_data = data.data ? data : { data : []};
    });
  //   fetch(url.nifty_options_live_data_previous)
  // .then((response) => response.json())
  // .then((data) => console.log(data));
  }

  ngOnInit(): void {
  }

  public niftyData() {
  }

}
