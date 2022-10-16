import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CashSegmentComponent } from './cash-segment/cash-segment.component';
import { DerivativesSegmentComponent } from './derivatives-segment/derivatives-segment.component';
import { CashSegmentService } from './cash-segment/cash-segment.service';
import { FuturesSegmentComponent } from './futures-segment/futures-segment.component';
import { OptionsSegmentComponent } from './options-segment/options-segment.component';
import { FuturesSegmentService } from './futures-segment/futures-segment.service';
import { OptionsSegmentService } from './options-segment/options-segment.service';

@NgModule({
  declarations: [
    AppComponent,
    CashSegmentComponent,
    DerivativesSegmentComponent,
    FuturesSegmentComponent,
    OptionsSegmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CashSegmentService, FuturesSegmentService, OptionsSegmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
