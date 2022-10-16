import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DerivativeSegmentService } from './derivative-segment.service';

@Component({
  selector: 'app-derivatives-segment',
  templateUrl: './derivatives-segment.component.html',
  styleUrls: ['./derivatives-segment.component.css']
})
export class DerivativesSegmentComponent implements OnInit {

public symbol: string | null;
public type: string | null;
public nifty_futures_data: any;
public nifty_options_data: any;
  constructor(private route: ActivatedRoute, private service: DerivativeSegmentService) {
    console.log('constructor called');
    
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.type = this.route.snapshot.paramMap.get('type');
    console.log('type', this.type);
    
    if(this.type == 'futures'){
      service.getNiftyFuturesData().subscribe((data:any) => {
        console.log('future data', data);
  
        this.nifty_futures_data = data.data ? data : { data : []};
        
      });
    } else {
      service.getNiftyOptionsData().subscribe((data:any) => {
        console.log('option data', data);
  
        this.nifty_options_data = data.data ? data : { data : []};
        
      });
    }
 

   }

  ngOnInit(): void {
    console.log('ngonint called called');

  }

}
