import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuturesSegmentService } from './futures-segment.service';

@Component({
  selector: 'app-futures-segment',
  templateUrl: './futures-segment.component.html',
  styleUrls: ['./futures-segment.component.css']
})
export class FuturesSegmentComponent implements OnInit {

  public symbol: string | null;
  public nifty_futures_data: any;
    constructor(private route: ActivatedRoute, private service: FuturesSegmentService) {
      
      this.symbol = this.route.snapshot.paramMap.get('symbol');

        service.getNiftyFuturesData().subscribe((data:any) => {
          console.log('future data', data);
    
          this.nifty_futures_data = data.data ? data : { data : []};
          
        });  
     }
  
    ngOnInit(): void {
      console.log('ngonint called called');
  
    }
  

}
