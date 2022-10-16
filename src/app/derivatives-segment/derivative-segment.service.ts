import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import url from '../configs/config.json';
import {
  catchError,
  concatMap,
  delay,
  map,
  of,
  retryWhen,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DerivativeSegmentService {

  constructor(private http: HttpClient) { }

  // ===================== Futues APIs Starts =============================================

  public getNiftyFuturesData() {
    return this.http.get(url.nifty_future_live_data).pipe(delay(1000), this.handleRetryError(2000));
  }

  // ===================== Futures APIs Ends ===============================================

    // ===================== Options APIs Starts =============================================

    public getNiftyOptionsData() {
      return this.http.get(url.bank_nifty_options_live_data_previous).pipe(delay(1000), this.handleRetryError(2000));
    }
  
    // ===================== Options APIs Ends ===============================================
    
  handleRetryError(delayTime: number) {
    let retries = 0;
    let exceedAttemptLimit = 3;
    return retryWhen((error) => {
      return error.pipe(
        delay(delayTime),
        concatMap((err) => {
          retries = retries + 1;
          if (retries < exceedAttemptLimit) {
            return of(err);
          } else {
            throw err;
          }
        })
      );
    });
  }
}

