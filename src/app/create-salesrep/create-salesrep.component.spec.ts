import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesrepComponent } from './create-salesrep.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { UseLocalStorage, SetAccessTokenLocal } from '../services/localStorage.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

class MockUser {
  logout = {};
  adminUserData = {'result': true};
  public createSalesRep() {
    return Observable.of(this.adminUserData);
  }
}

class Logger {
  public info() {
    const response = {'result': true};
    return response;
  }

}

class ToastrMessage {
  public success() {
    return 'Logged in successfully';
  }
}
describe('CreateSalesrepComponent', () => {
  let component: CreateSalesrepComponent;
  let fixture: ComponentFixture<CreateSalesrepComponent>;
  const userLocalStorage = {'salesRepName': 'Sales Representative',
    'mobileNumber': '123548256',
    'realm': '',
    'type': 'administrator',
    'username': '',
    'credentials': 'object',
    'challenges': 'object',
    'email': 'salesrep@forte.com',
    'emailVerified': false,
    'status': '',
    'created': '2017-11-11T00:00:00.000Z',
    'lastUpdated': '2017-11-11T00:00:00.000Z',
    'id': 3};
  const accessTokenLocalStorage = 'H4vzIE49vcS9dA5Pm6JU8rAm9APazBfWFuySEq0mW41vW5MjU4UicCQqDsfFPXsw';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSalesrepComponent ],
      imports: [HttpClientModule, HttpModule, RouterTestingModule, RouterModule, ReactiveFormsModule ],
      providers: [{provide: PricingInfoService, useClass: MockUser}, { provide: ToastrService, useClass: ToastrMessage},
        UseLocalStorage, SetAccessTokenLocal, { provide: LoggerService, useClass: Logger} ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalesrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = value;
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create token', () => {
    const service = TestBed.get(UseLocalStorage);
    service.setAccessToken('SalesRepName');
    localStorage.setItem('SalesRepName', JSON.stringify(userLocalStorage));
    expect(localStorage.getItem('SalesRepName')).toEqual(JSON.stringify(userLocalStorage));
  });

  it('should call save new admin user', () => {
    const spyFunction = spyOn((<any>component).router, 'navigate');
    const pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'createSalesRep').and.callThrough();
    const loggerService = TestBed.get(LoggerService);
    spyOn(loggerService, 'info').and.callThrough();
    const data = { salesRepName: 'Anthony', salesRepId: 'ANT', mobileNumber: '5687524545',
      email: 'Anthony@gmail.com', type: 'internalSalesRep', password: '1234567'};
    component.saveSalesRep(data);
    expect(component.response).toBeDefined();
    expect(spyFunction).toHaveBeenCalledWith(['/internal']);
  });
 /* it('should cancel method', () => {
    let spyFunction = spyOn((<any>component).router, 'navigate');
    component.cancel();
    expect(spyFunction).toHaveBeenCalledWith(['/internal']);

  });*/

 /* it('should call logout method',  ()=> {
    let service: SetAccessTokenLocal;
    service = TestBed.get(SetAccessTokenLocal);
    service.setAccessToken('accesstoken');
    localStorage.setItem('accesstoken', JSON.stringify(accessTokenLocalStorage));
    expect(localStorage.getItem('accesstoken')).toEqual(JSON.stringify(accessTokenLocalStorage));

    pricingInfoService = TestBed.get(PricingInfoService);
    spyOn(pricingInfoService, 'callsLogout').and.callThrough();
    // let spyFunction = spyOn((<any>component).router, 'navigate');
    // localStorage.removeItem('SalesRepName');
    component.logout();
    // expect(spyFunction).toHaveBeenCalledWith(['/internalsalesreplogin']);
  });*/
});
