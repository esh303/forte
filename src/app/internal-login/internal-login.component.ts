import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InternalScreeningService } from '../services/internal-screening.service';
import { LoggerService } from '../services/logger.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-internal-login',
  templateUrl: './internal-login.component.html',
  styleUrls: ['./internal-login.component.css']
})
export class InternalLoginComponent implements OnInit {

  internalLogInForm: FormGroup = new FormGroup({});
  public response:any;
  public salesRepDetails:any;
  public accessToken:any;
  public salesRepName:any;
  public logger:any;
  public salesStorageValue:any;
  public errorMessage = false;
  public accountBlockedMessage = false;
  public invalidEmailMessage = false;
  public retryMessage = false;
  public showLoader = false;
  public useUsernameMessage = false;
  public inactiveUserMessage = false;

  constructor( private internalScreeningService: InternalScreeningService,
              private router: Router, 
              private toastr: ToastrService, 
              private formBuilder: FormBuilder,
              private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.internalLogInForm = this.formBuilder.group({
      email: ['Bbuchanan'],
      password: ['hRG7bcc']
      // email: [''],
      // password: ['']
    });
  }
// this method has to call the service api in order to validate the user credentials:
  validationCheck(login:any) {
    this.showLoader = true;
    this.errorMessage = false;
    this.invalidEmailMessage = false;
    this.retryMessage = false;
    this.accountBlockedMessage = false;
    this.useUsernameMessage = false;
    this.inactiveUserMessage = false;
    this.accessToken = '';
      this.internalScreeningService.fetchValidUser(login).subscribe( data => {
        this.response = data;
        this.showLoader = false;
        if (this.response.result === 'Invalid Email') {
          this.invalidEmailMessage = true;
          this.useUsernameMessage = false;
          this.retryMessage = false;
          this.accountBlockedMessage = false;
          this.inactiveUserMessage = false;
          setTimeout(() => {    // <<<---    using ()=> syntax
            this.invalidEmailMessage = false;
          }, 5000);
        } else if (this.response.result === 'Retry') {
          this.retryMessage = true;
          this.useUsernameMessage = false;
          this.invalidEmailMessage = false;
          this.accountBlockedMessage = false;
          this.inactiveUserMessage = false;
        } else if (this.response.result === 'Your account is blocked') {
          this.accountBlockedMessage = true;
          this.useUsernameMessage = false;
          this.retryMessage = false;
          this.invalidEmailMessage = false;
          this.inactiveUserMessage = false;
        } else if (this.response.result === 'Please Use UserName') {
          this.useUsernameMessage = true;
          this.accountBlockedMessage = false;
          this.retryMessage = false;
          this.invalidEmailMessage = false;
          this.inactiveUserMessage = false;
        }else if (this.response.result === false) {
          this.errorMessage = true;
          this.useUsernameMessage = false;
          this.accountBlockedMessage = false;
          this.retryMessage = false;
          this.invalidEmailMessage = false;
          this.inactiveUserMessage = false;
        } else if (this.response.result === 'Inactive User') {
          this.inactiveUserMessage = true;
          this.errorMessage = false;
          this.useUsernameMessage = false;
          this.accountBlockedMessage = false;
          this.retryMessage = false;
          this.invalidEmailMessage = false;
        }else {
          this.logger = { 'method': 'fetchValidUser', 'message': 'Internal salesrep login',
            'salesRepName': login.email };
          this.loggerService.info(this.logger);
          if (this.response.result.id) {
            this.accessToken = this.response.result.id;
            localStorage.setItem('accessToken', this.accessToken);
              localStorage.setItem('customerType', this.response.result.type);
            this.internalScreeningService.getSalesRepName(this.response.result.userId, this.accessToken, this.response.result.type).subscribe( loginDetails => {
              this.salesRepDetails = loginDetails;
              if (this.response.result.type === 'externalCustomer') {
                this.salesRepName = this.salesRepDetails[0];
                this.internalScreeningService.getSalesRepDetails(this.accessToken, this.salesRepName.salesRepId).subscribe((response:any) => {
                  this.salesRepName.salesRepName = response[0].salesRepName;
                  this.salesRepName.salesRepEmail = response[0].email;
                });
                localStorage.setItem('SalesRepName', JSON.stringify(this.salesRepName));
                this.router.navigate(['/dashboard']);
              } else {
                this.salesRepName = this.salesRepDetails[0];
                localStorage.setItem('SalesRepName', JSON.stringify(this.salesRepName));
                this.router.navigate(['/internal']);
              }// here we got the salesrepname for the corresponding userid   
              this.toastr.success('Logged in successfully', '', {
                timeOut:1000
              });
              this.logger = { 'method': 'getSalesRepName', 'message': 'Retrieving salesrep details',
                'salesrepId': this.response.result.userId };
              this.loggerService.info(this.logger);
            }, err => {
              this.errorMessage = true;
              this.toastr.error('Invalid credentials');
            });
          }
        }
      }, err => {
        this.errorMessage = true;
        this.logger = { 'method': 'fetchValidUser',
          'message': 'Internal salesrep login invalid credentials'};
        this.loggerService.debug(this.logger);
      });
    
  }
}
