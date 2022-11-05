import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionsSegmentService } from './options-segment.service';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import newOptionData from '../data/options/2010.json';

@Component({
  selector: 'app-options-segment',
  templateUrl: './options-segment.component.html',
  styleUrls: ['./options-segment.component.css']
})

export class OptionsSegmentComponent implements OnInit, OnDestroy {

  public symbol: string | null;
  public nifty_options_data: any;
  public current_nifty_value: any = 0;
  public mostly_traded_strikes: number[] = [];
  public options_data: any = [];
  public selected_strike_data: any = { data: [] };
  public interval_instance: any;
  public isShow: boolean = false;
  public option_type = 'CE';

  public lineChartData1: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartData2: ChartConfiguration<'line'>['data'] = {
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
  constructor(private route: ActivatedRoute, private service: OptionsSegmentService) {

    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getMostActiveStrikesandSetData()
    // this.options_data = newOptionData as any;

  }

  ngOnInit(): void {
    console.log('wefwqf', newOptionData);

    this.interval_instance = setInterval(() => {
      this.getMostActiveStrikesandSetData();
    }, 1000 * 60);
  }

  public getMostActiveStrikesandSetData() {
    this.service.getmarketStatus().subscribe((data: any) => {
      if (localStorage.getItem('nifty_previous_value')) {
        this.current_nifty_value = Number(localStorage.getItem('nifty_previous_value'))
      } else {
        localStorage.setItem('nifty_previous_value', data.marketState[0].last)
        this.current_nifty_value = data.marketState[0].last;
      }
      this.service.getNiftyOptionsData().subscribe((data: any) => {
        const strike_prices: number[] = data?.filtered?.data.map((strike: any) => strike.strikePrice) || [];

        // Get Closest Strike Price
        const closestStrikePrice = strike_prices.reduce((prev: number, curr: number) => {
          return (Math.abs(curr - this.current_nifty_value) < Math.abs(prev - this.current_nifty_value) ? curr : prev);
        });
        const index = strike_prices.indexOf(closestStrikePrice);
        this.mostly_traded_strikes = [strike_prices[index], strike_prices[index - 1], strike_prices[index - 2], strike_prices[index - 3],
        strike_prices[index + 1], strike_prices[index + 2], strike_prices[index + 3]];

        this.nifty_options_data = data?.filtered?.data ? data.filtered.data.filter((strikes: any) => this.mostly_traded_strikes.includes(strikes.strikePrice)) : { data: [] };
        if (localStorage.getItem('options_data')) {
          this.options_data = JSON.parse(localStorage.getItem('options_data') || "[]");
          this.options_data.forEach((strike_data: any) => {
            let obj = this.nifty_options_data.find((data: any) => data.strikePrice == strike_data.strike);
            obj.time = new Date().toLocaleTimeString();
            strike_data.data = strike_data.data.concat([{ ...obj }]);
          })
          localStorage.setItem('options_data', JSON.stringify(this.options_data))
        } else {
          this.options_data = this.mostly_traded_strikes.map((strike: number) => ({ strike: strike }));
          this.options_data.forEach((strike_data: any) => {
            let obj = this.nifty_options_data.find((data: any) => data.strikePrice == strike_data.strike);
            obj.time = new Date().toLocaleTimeString();;
            strike_data.data = [{ ...obj }];
          })
          localStorage.setItem('options_data', JSON.stringify(this.options_data))
        }
        this.options_data = JSON.parse(localStorage.getItem('options_data') || "[]");
        if (this.selected_strike_data.strike)
          this.selectedStrikePrice(this.selected_strike_data.strike);
        console.log('options data', this.options_data);

      });
    });
  }

  selectedStrikePrice(strike: number) {
    this.selected_strike_data = this.options_data.filter((data: any) => data.strike === strike)[0];
    console.log(this.selected_strike_data.data.sort((a: any, b: any) => b.time - a.time));
    this.lineChartData1.labels = this.lineChartData2.labels = this.lineChartData3.labels = this.selected_strike_data?.data.map((data: any) => data.time);
    this.lineChartData1.datasets = [
      {
        data: this.selected_strike_data?.data.map((data: any) => data['CE'].lastPrice),
        label: 'CE Price',
        tension: 0.5,
        borderColor: 'green'
      }
    ]

    this.lineChartData2.datasets = [
      {
        data: this.selected_strike_data?.data.map((data: any) => data['CE'].impliedVolatility),
        label: 'CE IV',
        tension: 0.5,
        borderColor: 'blue'
      },
    ]
    this.lineChartData3.datasets = [
      {
        data: this.selected_strike_data?.data.map((data: any) => data['CE'].openInterest),
        label: 'CE OI',
        tension: 0.5,
        borderColor: 'yellow'
      },
    ]

    this.selected_strike_data.data.reverse();

    console.log('selected_strike_data', this.selected_strike_data);

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
