import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuturesSegmentService } from './futures-segment.service';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import newFuturesData from '../data/future/2010.json';

@Component({
  selector: 'app-futures-segment',
  templateUrl: './futures-segment.component.html',
  styleUrls: ['./futures-segment.component.css']
})
export class FuturesSegmentComponent implements OnInit {

  public symbol: string | null;
  public nifty_futures_data: any;
  public selected_expiry_data: any = { data: [] };
  public interval_instance: any;
  public isShow: boolean = false;

  public lineChartData1: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartData3: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  constructor(private route: ActivatedRoute, private service: FuturesSegmentService) {

    this.symbol = this.route.snapshot.paramMap.get('symbol');
    // this.getFutuesDataandSave()

    this.nifty_futures_data = JSON.parse(localStorage.getItem('futures_data') || "[]");
    // this.nifty_futures_data = newFuturesData as any;


  }

  getFutuesDataandSave() {
    this.service.getNiftyFuturesData().subscribe((data: any) => {
      console.log('future data', data);

      if (localStorage.getItem('futures_data')) {
        this.nifty_futures_data = JSON.parse(localStorage.getItem('futures_data') || "[]");
        this.nifty_futures_data.forEach((strike_data: any) => {
          let obj = data.data.find((obj: any) => obj.expiryDate == strike_data.expiryDate);
          obj.time = new Date().toLocaleTimeString();
          strike_data.data = strike_data.data.concat([{ ...obj }]);
        })
        localStorage.setItem('futures_data', JSON.stringify(this.nifty_futures_data))
      } else {
        this.nifty_futures_data = data.data.map((obj: any) => ({ expiryDate: obj.expiryDate }));
        this.nifty_futures_data.forEach((strike_data: any) => {
          let obj = data.data.find((obj: any) => obj.expiryDate == strike_data.expiryDate);
          obj.time = new Date().toLocaleTimeString();;
          strike_data.data = [{ ...obj }];
        })
        localStorage.setItem('futures_data', JSON.stringify(this.nifty_futures_data));
      }

      this.nifty_futures_data = JSON.parse(localStorage.getItem('futures_data') || "[]");
      if (this.selected_expiry_data.expiryDate)
        this.selectedStrikePrice(this.selected_expiry_data.expiryDate);
      console.log('options data', this.nifty_futures_data);

    });
  }

  selectedStrikePrice(expiryDate: string) {
    this.nifty_futures_data = JSON.parse(localStorage.getItem('futures_data') || "[]");
    this.selected_expiry_data = this.nifty_futures_data.filter((data: any) => data.expiryDate === expiryDate)[0];
    console.log(this.selected_expiry_data.data.sort((a: any, b: any) => b.time - a.time));
    this.lineChartData1.labels = this.lineChartData3.labels = this.selected_expiry_data?.data.map((data: any) => data.time);
    this.lineChartData1.datasets = [
      {
        data: this.selected_expiry_data?.data.map((data: any) => data.lastPrice),
        label: 'CE Price',
        tension: 0.5,
        borderColor: 'green'
      }
    ]
    this.lineChartData3.datasets = [
      {
        data: this.selected_expiry_data?.data.map((data: any) => data.openInterest),
        label: 'CE OI',
        tension: 0.5,
        borderColor: 'yellow'
      },
    ]
    this.selected_expiry_data.data.reverse();

    console.log('selected_expiry_data', this.selected_expiry_data);
  }

  ngOnInit(): void {
    this.interval_instance = setInterval(() => {
      this.getFutuesDataandSave();
    }, 1000 * 60);
  }

  toggleCharts() {
    this.isShow = !this.isShow;
    console.log('show', this.isShow);

  }

  ngOnDestroy(): void {
    if (this.interval_instance) {
      clearInterval(this.interval_instance);
    }
  }


}
