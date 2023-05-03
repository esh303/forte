import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { remoteMethodApiUrl } from '../app.constant';

@Injectable()
export class LoggerService {
  apiUrl = environment.apiUrl;
  urlLogger = this.apiUrl + remoteMethodApiUrl.loggerUrl;
  constructor(private http: HttpClient) { }

  info(logger:any) {
    logger.level = 'info';
    const logMessage = {logMessage: logger};
    this.http.post(this.urlLogger, logMessage)
      .subscribe( res => {
      });

  }

  debug(logger:any) {
    logger.level = 'debug';
    const logMessage = {logMessage: logger};
    this.http.post(this.urlLogger, logMessage)
      .subscribe( res => {
      });
  }

  error(logger:any) {
    logger.level = 'error';
    const logMessage = {logMessage: logger};
     this.http.post(this.urlLogger, logMessage)
      .subscribe( res => {
       });
  }
}
