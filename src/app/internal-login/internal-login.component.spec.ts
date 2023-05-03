import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalLoginComponent } from './internal-login.component';

import { InternalScreeningService } from '../services/internal-screening.service';
import { LoggerService } from '../services/logger.service';

import { HttpModule } from '@angular/http';

import { DebugElement } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../services/interceptor.class';

import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

class ToastrMessage {
  public success() {
    return 'Logged in successfully';
  }
}

class Logger {
  public info() {
    const response = {'result': true };
    return response;
  }

  public debug() {
    const response = {'result': true};
    return response;
  }
}
class MockUser {
  public dummyData = {'result': {'id': 'kHSNj4AYPWw8PTIHzS9mPGgUqdcHYxGlPkKswYVhS3gTyayDS8p4MQUS5qp3LViG', 'ttl': 1209600,
    'created': '2018-03-08T06:44:21.048Z', 'userId': 19}};
  public dummySalesRepData = [
    {
      'id': 19,
      'salesRepId': '',
      'salesRepName': 'bruce',
      'mobileNumber': '123456780',
      'type': 'administrator',
      'invalidLoginAttempt': 0,
      'realm': '',
      'username': 'bruce',
      'credentials': 'object',
      'challenges': 'object',
      'email': 'bruce@fortetlc.com',
      'emailVerified': false,
      'status': '',
      'created': '2018-02-13T10:47:13.000Z',
      'lastUpdated': '2018-02-13T10:47:13.000Z'
    }];


  public fetchValidUser() {
    return Observable.of(this.dummyData);
  }

  public getSalesRepName() {
    return Observable.of(this.dummySalesRepData);
  }
}

describe('InternalLoginComponent', () => {
  let component: InternalLoginComponent;
  let fixture: ComponentFixture<InternalLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalLoginComponent ],
      imports: [ ReactiveFormsModule, HttpModule, RouterModule, RouterTestingModule, HttpClientModule ],
      providers: [ {provide: InternalScreeningService, useClass: MockUser }, { provide: ToastrService, useClass: ToastrMessage},
        { provide: LoggerService, useClass: Logger} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check validation', () => {

    const internalScreeningService = TestBed.get(InternalScreeningService);
    spyOn(internalScreeningService, 'fetchValidUser').and.callThrough();
    const value = { userName: 'bruce@fortetlc.com', password: 'bruce@fortetlc.com'};
    const data = {value: value};
    component.validationCheck(data);
    expect(component.response).toBeDefined();


  });

  /*it('should get salesrep details', () => {
    const spyFunction = spyOn((<any>component).router, 'navigate');
    const internalScreeningService = TestBed.get(InternalScreeningService);
    const toastr = TestBed.get(ToastrService);
    const loggerService = TestBed.get(LoggerService);
    spyOn(internalScreeningService, 'getSalesRepName').and.callThrough();
    spyOn(toastr, 'success');
    spyOn(loggerService, 'info').and.callThrough();
    expect(component.salesRepDetails).toBeDefined();
    expect(spyFunction).toHaveBeenCalledWith(['/internal']);
  });*/

  /*it('should check for empty', () => {
    const loggerService = TestBed.get(LoggerService);
    spyOn(loggerService, 'debug').and.callThrough();
    const error = component.errorMessage;
    const value = { userName: '', password: '' };
    const data = {value: value};
    component.validationCheck(data);
    expect(component.errorMessage).toBe(true);
  });*/
});
