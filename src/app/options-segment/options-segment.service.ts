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
export class OptionsSegmentService {


  constructor(private http: HttpClient) { }

  public getNiftyOptionsData() {
    return this.http.get(url.nifty_options_live_data_previous).pipe(delay(1000), this.handleRetryError(2000));
  }

  public getmarketStatus() {
    return this.http.get(url.market_status).pipe(delay(1000), this.handleRetryError(2000));
  }
    
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
