import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashSegmentService } from './cash-segment.service';
import url from '../configs/config.json';

@Component({
  selector: 'app-cash-segment',
  templateUrl: './cash-segment.component.html',
  styleUrls: ['./cash-segment.component.css']
})

export class CashSegmentComponent implements OnInit, OnDestroy {

  public nifty_stocks_data: any;
  public advance_to_decline: any;
  public nifty_data: any;
  public interval_instance: any;

  constructor(private service: CashSegmentService) {
    service.getNiftyStocksData().subscribe((data: any) => {
      this.nifty_stocks_data = data.data ? data : { data: [] };
      this.advance_to_decline = data.advance ? data.advance : {};
      this.nifty_data = data.metadata ? data.metadata : {}
    });
  }

  ngOnInit(): void {
    this.interval_instance = setInterval(() => {
      this.updateNiftyDataOnInterval();
    }, 1000 * 60);
  }

  public updateNiftyDataOnInterval() {
    this.service.getNiftyStocksData().subscribe((data: any) => {
      this.nifty_stocks_data = data.data ? data : { data: [] };
      this.advance_to_decline = data.advance ? data.advance : {};
      this.nifty_data = data.metadata ? data.metadata : {}
    });
  }

  ngOnDestroy(): void {
    if (this.interval_instance) {
      clearInterval(this.interval_instance);
    }
  }

}
