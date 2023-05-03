import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { InvoiceService } from '../services/invoice.service';
import { PAGER_CONTROL_VALUE_ACCESSOR } from 'ngx-bootstrap/pagination/pager.component';
declare var $: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  customerForm: FormGroup = new FormGroup({});
  // customerUpdateForm: FormGroup;
  public salesRep: any;
  public salesRepValues: any;
  public salesRepId: any;
  public customer: any;
  public val: any;
  public customerData: any;
  public accessToken: any;
  public assessorialArray:any = [];
  consigneeTemplatesPresent:any;
  public arrayValues:any = [];
  public customerDetails = [];
  public showCustomers = false;
  public showAddCustomer = true;
  public showDialog = false;
  public showRatingNotes = false;
  public showTableDetail = false;
  public showAssessorials = false;
  public showEditDialog = false;
  public showEdit = false;
  public showFieldsFrom = false;
  public showFieldsTo = false;
  public showFakValues = false;
  public showRulesDetail = false;
  public showFAKTable = false;
  public salesRepArray: any;
  public chooseSalesRepId: any;
  public fakArray:any = [];
  public finalFakArray:any = [];
  public finalFakClass:any = [];
  public fakArrayValues = [];
  public finalArray:any = [];
  public finalAssessorial:any = [];
  public resultArray:any = [];
  public getZipcodeValues: any;
  public filterValues = [];
  public liftgate: any;
  public residential:any;
  public limitedAccess:any;
  public notify:any;
  public insideDelivery:any;
  public businessRules:any;
  public count:any;
  public businessData:any;
  public enableFakAdd = false;
  public enableAssessorialAdd = false;
  public showCustomerTable = false;
  public showBusinessRules = false;
  public showFak = false;
  public showErrorMessage = false;
  public showEmailExistMsg = false;
  public customerResponse:any;
  public showErrorMessageToRange = false;
  public showErrorMessageOnAddRules = false;
  public enableSaveButton = false;
  public enableSaveNewRule = false;
  public editMode = false;
  public showErrorMessageOnSameRule = false;
  public showErrorMessageRuleAlreadyExist = false;
  public flag:any;
  public responseData:any;
  public fakData:any;
  public logger:any;
  public reddawayState:any;
  public reddawayCity:any;
  public contactNumber:any;
  public salesRepType:any;
  public active = false;
  public finalDirections:any = [];
  public array = [];
  public specificStateFrom:any = [];
  public specificStateTo:any = [];
  public specificCityFrom:any = [];
  public specificCityTo:any = [];
  public addNewRuleMode = false;
  public showUseZipCodes = false;
  public showStateFrom = false;
  public showStateTo = false;
  public showDetailTable = false;
  public HideDetailsForEdit = false;
  public showErrorMessageSpecificStateFrom = false;
  public showErrorMessageSpecificStateTo = false;
  public showDiscountErrorMessage = false;
  public showMsgReddaway = false;
  public showForExternalCustomer = false;
  public accessDeniedMsg = false;
  public passwordErrorMsg = false;
  public zipcodeResponse: any;
  public errorMessageForReddaway = '';
  public fedexCredentials:any;
  public saveUserCredentials = false;
  public showFedexCredentials = false;
  public fedexSubscribe = false;
  public typeOfAccountSubscribe = '';
  public showForCostPlus = false;
  public costPlusArray:any = [];
  public showTableForCostPlus = false;
  public costPlusArrayIndex:any;
  public costPlusCarrierError = false;
  public showForAddingCostPlus = true;
  public costPlusFlag = false;
  public workbookCompanyDetails:any;
  // public showBusinessRules = false;
  public carrierArray = ['YRC', 'FEDEX ECONOMY', 'FEDEX PRIORITY', 'REDDAWAY'];
  public classArray = [50, 55, 60, 65, 70, 77, 85, 92, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
  public westStates = ['AZ', 'CA', 'CO', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY', 'EI', 'WI'];
  public eastStates = ['AL', 'AR', 'CT', 'DC', 'DE', 'FL', 'GA', 'IA', 'IL', 'IN', 'KY', 'KS',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'NC', 'ND', 'NE',
    'NJ', 'NY', 'OH', 'OK', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'VA', 'VT', 'WI', 'WV'];
  public states = ['AZ', 'CA', 'CO', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY', 'EI', 'WI', 'AL',
    'AR', 'CT', 'DC', 'DE', 'FL', 'GA', 'IA', 'IL', 'IN', 'KY', 'KS',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'NC', 'ND', 'NE',
    'NJ', 'NY', 'NM', 'NH', 'OH', 'OK', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'VA', 'VT', 'WI', 'WV'];
  public reddawayRuleStates = ['AZ', 'CA', 'CO', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY'];
  public assessorialNames = ['LiftGate Service', 'Residential Delivery', 'Limited Access Delivery',
    'Notify', 'Inside Delivery', 'Single Shipment', 'Delivery Appointment Required','Hazmat'];

  public directionsArray = ['REGIONAL', 'INTER REGIONAL', 'INTERSTATE', 'INTRASTATE', 'SPECIAL RULES', 'REGIONAL DIRECT INTRASTATE', 'REGIONAL DIRECT INTERSTATE', 'REGIONAL INDIRECT'];
  enablePricingDetails:any = false;
  accountSpecificPricingArray = [];
  showTableForAccountSpecific: any = false;
  specificPricingList:any = [];
  existData: any;
  showErrorPricing: any= false;
  pricingListArrayIndex: any;
  showForAddingAccountPricing = true;
  showTableZip = false;
  originZipArray:any = [];
  selectedIndex = 0;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private pricingInfoService: PricingInfoService,
    private toastr: ToastrService, private router: Router,
    private loggerService: LoggerService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService) {

  }

  ngOnInit() {
    this.buildForm();
    this.accessToken = localStorage.getItem('accessToken');

    this.getSalesRepDetails();
    if (this.salesRepType === 'administrator' || this.salesRepType === 'customerServiceRep') {
      this.getSalesRepData();
    } else {
      this.getInternalSalesRepData();
    }
    this.flag = this.pricingInfoService.getFlag();
    this.populateData();
    this.getDetailsWorkbook();
  }

  buildForm() {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      companyName: ['', Validators.required],
      referenceId: ['', Validators.required],
      ratingNotes: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      category: ['', Validators.required],
      carrierType: ['', Validators.required],
      directions: ['', Validators.required],
      discount: ['', Validators.required],
      minimumCharge: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
      assessorialName: ['', Validators.required],
      charge: ['', Validators.required],
      presentFakValue: ['No', Validators.required],
      specificPricing: ['false'],
      fakRangeFrom: ['', Validators.required],
      fakRangeTo: ['', Validators.required],
      fakValue: ['', Validators.required],
      specialRule: ['', Validators.required],
      fromCityState: ['', Validators.required],
      toCityState: ['', Validators.required],
      salesRepId: ['', Validators.required],
      specificZipFlag: ['false', Validators.required],
      stateFrom: [''],
      stateTo: ['', Validators.required],
      type: ['', Validators.required],
      premiumFactor: [''],
      fedexSubscription: ['false'],
      accountSubscription: ['false'],
      fedexKey: [''],
      fedexPassword: [''],
      fedexAccNumber: [''],
      fedexMeterNumber: [''],
      costPlus: ['false'],
      factor: [''],
      carrierTypeForCostplus: [''],
      carrierTypeForAccountPricing: [''],
      wmsFactor: ['false'],
      bolUpload: ['false'],
      deliveryUpload: ['false'],
      invoiceUpload:['false'],
      weightUpload:['false'],
      byOrder: ['false'] 
    });
    // this.customerUpdateForm = this.fb.group({
    //   password: ['', Validators.required]
    // });
  }
  getDetailsWorkbook() {
    this.workbookCompanyDetails = this.invoiceService.getCompanyInformation();
    if (this.workbookCompanyDetails!== null && this.workbookCompanyDetails!== undefined) {
      this.customerForm.patchValue({
        companyName: this.workbookCompanyDetails.companyName,
        salesRepId: this.workbookCompanyDetails.salesRepId

      })
    }
    // this.invoiceService.customerInfo.subscribe(
    //   response => {
    //     this.workbookCompanyDetails = response;
    //     console.log('this.workbookCompanyDetails', this.workbookCompanyDetails);
    //   }
    // );
  }
  getSalesRepDetails() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.salesRepType = this.salesRepValues.type;
  }

  getSalesRepData() {
    this.pricingInfoService.getSalesDetail(this.accessToken).subscribe((names:any) => {
      this.salesRepArray = names;
      console.log('this.salesRepArray', this.salesRepArray);
      this.logger = {
        'method': 'getSalesDetail',
        'message': 'Retrieving salesrep details',
        'salesRepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }

  getInternalSalesRepData() {
    this.pricingInfoService.getInternalSalesRep(this.salesRepId, this.accessToken).subscribe((names:any) => {
      this.salesRepArray = names;
      console.log('this.salesRepArray', this.salesRepArray);
      this.logger = {
        'method': 'getSalesDetail',
        'message': 'Retrieving salesrep details',
        'salesRepId': this.salesRepId
      };
      this.loggerService.info(this.logger);
    });
  }
  populateData() {
    if (this.workbookCompanyDetails!== null && this.workbookCompanyDetails!== '' && this.workbookCompanyDetails!== undefined) {

    } else {
    if (this.flag === true || this.flag === undefined) {
      this.customerData = {};
      this.businessData = {};
    } else {
      this.customerData = {};
      this.businessData = {};
      this.customerData = this.pricingInfoService.getEditCustomer();
      this.businessData = this.pricingInfoService.getEditBusiness();
      this.costPlusFlag = this.pricingInfoService.getCostPlusFlag();
      this.HideDetailsForEdit = true;
      console.log('this.customerData', this.customerData);
      console.log('this.customerData', this.businessData);

      if (this.customerData !== {} as any && Object.keys(this.businessData).length === 0 || this.businessData === '') {
        this.editMode = false;
        this.active = true;
        if (this.customerData.fedexSubscription === true) {
          this.showFedexCredentials = true;
          this.fedexSubscribe = true;
          let fedexSubscriptionValue = 'true';
          if (this.customerData.subscriptionType !== '' && this.customerData.subscriptionType !== null && this.customerData.subscriptionType !== undefined) {
            if (this.customerData.subscriptionType === 'fedex') {
              this.typeOfAccountSubscribe = 'fedex';
              this.customerForm.patchValue({
                accountSubscription: 'true',
                fedexSubscription: fedexSubscriptionValue
              })
            } else {
              this.typeOfAccountSubscribe = 'forte';
              this.customerForm.patchValue({
                accountSubscription: 'false',
                fedexSubscription: fedexSubscriptionValue
              })
            }
          }

          console.log('this.customerData.fedexCredentials', this.customerData.fedexCredentials);
          // if (this.customerData.fedexCredentials !== null) {
          //   if (this.customerData.fedexCredentials !== {} && Object.keys(this.customerData.fedexCredentials).length !== 0) {
          //     let fedexSubscriptionValue = 'true';
          //     this.customerForm.patchValue({
          //       fedexKey: this.customerData.fedexCredentials.key,
          //       fedexPassword: this.customerData.fedexCredentials.password,
          //       fedexAccNumber: this.customerData.fedexCredentials.accountNumber,
          //       fedexMeterNumber: this.customerData.fedexCredentials.meterNumber,
          //       fedexSubscription: fedexSubscriptionValue
          //     })
          //   }
          // }
        } else {
          this.showFedexCredentials = false;
          this.fedexSubscribe = false;
          let fedexSubscriptionValue = 'false';
          this.typeOfAccountSubscribe = '';
          this.customerForm.patchValue({
            fedexSubscription: fedexSubscriptionValue
          });
        }
        if (this.customerData.costPlus === true) {
          if (this.customerData.costPlusFactor.length > 0) {
            this.costPlusArray = this.customerData.costPlusFactor;
            this.showTableForCostPlus = true;
            this.showForCostPlus = true;
          } else {
            this.showTableForCostPlus = false;
            this.showForCostPlus = false;
          }
          this.customerForm.patchValue({
            costPlus: 'true'
          });
        } else {
          this.customerForm.patchValue({
            costPlus: 'false'
          });
        }
        console.log('this.active', this.active);
        this.addNewRuleMode = true;
        if (this.customerData.city === null) {
          this.customerData.city = '';
          this.customerData.state = '';
        }
        if (this.customerData.type === 'others') {
          this.showForExternalCustomer = false;
        } else {
          this.showForExternalCustomer = true;
        }
        if (this.customerData.contactNumber !== '') {
          this.contactNumber = this.customerData.contactNumber;
          this.customerData.contactNumber = this.formatPhoneNumber(this.customerData.contactNumber);
        } else {
          this.contactNumber = this.customerData.contactNumber;
          this.customerData.contactNumber = '';
        }
        console.log('this.customerData.type', this.customerData.type, this.showForExternalCustomer, this.customerData);
        if (this.customerData.bolUpload !== null) {
          this.customerForm.patchValue({
            bolUpload: this.customerData.bolUpload
          });
        } else {
          this.customerForm.patchValue({
            bolUpload: true
          });
        }
        if (this.customerData.deliveryUpload !== null) {
          this.customerForm.patchValue({
            deliveryUpload: this.customerData.deliveryUpload
          });
        } else {
          this.customerForm.patchValue({
            deliveryUpload: true
          });
        }
        if (this.customerData.weightUpload !== null) {
          this.customerForm.patchValue({
            weightUpload: this.customerData.weightUpload
          });
        } else {
          this.customerForm.patchValue({
            weightUpload: true
          });
        }

        if (this.customerData.invoiceUpload !== null) {
          this.customerForm.patchValue({
            invoiceUpload: this.customerData.invoiceUpload
          });
        } else {
          this.customerForm.patchValue({
            invoiceUpload: true
          });
        }
        if (this.customerData.byOrder !== null) {
          this.customerForm.patchValue({
            byOrder: this.customerData.byOrder
          });
        } else {
          this.customerForm.patchValue({
            byOrder: true
          });
        }
        this.customerForm.patchValue({
          companyName: this.customerData.companyName,
          referenceId: this.customerData.referenceId,
          ratingNotes: this.customerData.ratingNotes,
          address: this.customerData.address,
          city: this.customerData.city,
          zip: this.customerData.zip,
          state: this.customerData.state,
          salesRepId: this.customerData.salesRepId,
          premiumFactor: this.customerData.premiumFactor
          // deliveryUpload: this.customerData.deliveryUpload,
          // weightUpload: this.customerData.weightUpload,
          // invoiceUpload: this.customerData.invoiceUpload,
          // byOrder: this.customerData.byOrder
        });
        if (this.customerData.specificPricing === true) {
          if (this.customerData.specificPricingList.length > 0) {
            this.specificPricingList = this.customerData.specificPricingList;
            this.showTableForAccountSpecific = true;
            this.enablePricingDetails = true;
          } else {
            this.showTableForAccountSpecific = false;
            this.enablePricingDetails = false;
          }
          this.customerForm.patchValue({
            specificPricing: 'true'
          });
        } else {
          this.customerForm.patchValue({
            specificPricing: 'false'
          });
        }
        this.logger = {
          'method': 'populateData',
          'message': 'Retrieving customer information for adding new rule',
          'customerId': this.customerData.id
        };
        this.loggerService.debug(this.logger);
      } else {
        if (this.customerData !== undefined || this.customerData !== {} as any) {
          this.editMode = true;
          this.addNewRuleMode = false;
          if (this.customerData.contactNumber !== '') {
            this.contactNumber = this.customerData.contactNumber;
            this.customerData.contactNumber = this.formatPhoneNumber(this.customerData.contactNumber);
          } else {
            this.contactNumber = this.customerData.contactNumber;
            this.customerData.contactNumber = '';
          }
          if (this.customerData.city === null) {
            this.customerData.city = '';
            this.customerData.state = '';
          }
          if (this.customerData.type === 'others') {
            this.showForExternalCustomer = false;
          } else {
            this.showForExternalCustomer = true;
          }
          if (this.customerData.costPlus === true) {
            if (this.customerData.costPlusFactor.length > 0) {
              this.costPlusArray = this.customerData.costPlusFactor;
              this.showTableForCostPlus = true;
              this.showForCostPlus = true;
            } else {
              this.showTableForCostPlus = false;
              this.showForCostPlus = false;
            }
            this.customerForm.patchValue({
              costPlus: 'true'
            });
          } else {
            this.customerForm.patchValue({
              costPlus: 'false'
            });
          }
          if (this.customerData.specificPricing === true) {
            if (this.customerData.specificPricingList.length > 0) {
              this.specificPricingList = this.customerData.specificPricingList;
              this.showTableForAccountSpecific = true;
              this.enablePricingDetails = true;
            } else {
              this.showTableForAccountSpecific = false;
              this.enablePricingDetails = false;
            }
            this.customerForm.patchValue({
              specificPricing: 'true'
            });
          } else {
            this.customerForm.patchValue({
              specificPricing: 'false'
            });
          }
          if (this.customerData.fedexSubscription === true) {
            console.log('2');
            this.showFedexCredentials = true;
            this.fedexSubscribe = true;
            let fedexSubscriptionValue = 'true';
            if (this.customerData.subscriptionType !== '' && this.customerData.subscriptionType !== null && this.customerData.subscriptionType !== undefined) {
              if (this.customerData.subscriptionType === 'fedex') {
                this.typeOfAccountSubscribe = 'fedex';
                this.customerForm.patchValue({
                  accountSubscription: 'true',
                  fedexSubscription: fedexSubscriptionValue
                })
              } else {
                this.typeOfAccountSubscribe = 'forte';
                this.customerForm.patchValue({
                  accountSubscription: 'false',
                  fedexSubscription: fedexSubscriptionValue
                })
              }
            }
            // if (this.customerData.fedexCredentials !== null) {
            //   if (this.customerData.fedexCredentials !== {} && Object.keys(this.customerData.fedexCredentials).length !== 0) {
            //     let fedexSubscriptionValue = 'true';
            //     this.customerForm.patchValue({
            //       fedexKey: this.customerData.fedexCredentials.key,
            //       fedexPassword: this.customerData.fedexCredentials.password,
            //       fedexAccNumber: this.customerData.fedexCredentials.accountNumber,
            //       fedexMeterNumber: this.customerData.fedexCredentials.meterNumber,
            //       fedexSubscription: fedexSubscriptionValue
            //     })
            //   }
            // }
          } else {
            console.log('21');
            this.showFedexCredentials = false;
            this.fedexSubscribe = false;
            let fedexSubscriptionValue = 'false';
            this.typeOfAccountSubscribe = '';
            this.customerForm.patchValue({
              fedexSubscription: fedexSubscriptionValue
            })
          }
          console.log('this.customerData.type', this.customerData.type, this.showForExternalCustomer, 'this.customerData', this.customerData);
          if (this.customerData.bolUpload !== null) {
            this.customerForm.patchValue({
              bolUpload: this.customerData.bolUpload
            });
          } else {
            this.customerForm.patchValue({
              bolUpload: true
            });
          }
          if (this.customerData.deliveryUpload !== null) {
            this.customerForm.patchValue({
              deliveryUpload: this.customerData.deliveryUpload
            });
          } else {
            this.customerForm.patchValue({
              deliveryUpload: true
            });
          }
          if (this.customerData.weightUpload !== null) {
            this.customerForm.patchValue({
              weightUpload: this.customerData.weightUpload
            });
          } else {
            this.customerForm.patchValue({
              weightUpload: true
            });
          }
  
          if (this.customerData.invoiceUpload !== null) {
            this.customerForm.patchValue({
              invoiceUpload: this.customerData.invoiceUpload
            });
          } else {
            this.customerForm.patchValue({
              invoiceUpload: true
            });
          }
          if (this.customerData.byOrder !== null) {
            this.customerForm.patchValue({
              byOrder: this.customerData.byOrder
            });
          } else {
            this.customerForm.patchValue({
              byOrder: true
            }); 
          }
          this.customerForm.patchValue({
            companyName: this.customerData.companyName,
            referenceId: this.customerData.referenceId,
            ratingNotes: this.customerData.ratingNotes,
            address: this.customerData.address,
            city: this.customerData.city,
            zip: this.customerData.zip,
            state: this.customerData.state,
            salesRepId: this.customerData.salesRepId,
            premiumFactor: this.customerData.premiumFactor,
          //   bolUpload: this.customerData.bolUpload,
          // deliveryUpload: this.customerData.deliveryUpload,
          // weightUpload: this.customerData.weightUpload,
          // invoiceUpload: this.customerData.invoiceUpload,
          // byOrder: this.customerData.byOrder
          });
          if (this.customerData.specificPricing === true) {
            if (this.customerData.specificPricingList.length > 0) {
              this.specificPricingList = this.customerData.specificPricingList;
              this.showTableForAccountSpecific = true;
              this.enablePricingDetails = true;
            } else {
              this.showTableForAccountSpecific = false;
              this.enablePricingDetails = false;
            }
            this.customerForm.patchValue({
              specificPricing: 'true'
            });
          } else {
            this.customerForm.patchValue({
              specificPricing: 'false'
            });
          }
          if(this.customerData.wms === true) {
            this.customerForm.patchValue({
              wmsFactor: 'true'
            });
          } else {
            this.customerForm.patchValue({
              wmsFactor: 'false'
            });
          }
          if(this.customerData.byOrder === true) {
            this.customerForm.patchValue({
              byOrder: 'true'
            });
          } else {
            this.customerForm.patchValue({
              byOrder: 'false'
            });
          }
          this.logger = {
            'method': 'populateData',
            'message': 'Retrieving customer information editing a rule',
            'customerId': this.customerData.id
          };
          this.loggerService.debug(this.logger);
        }
        if (this.businessData === 'editCustomer') {
        } else {
          if (this.businessData !== undefined || this.businessData !== {} as any || this.businessData !== null) {
            this.editMode = true;
            // this.showBusinessRules = true;
            if (this.businessData.directions !== '') {
              this.finalDirections.push(this.businessData.directions);
            } else {
              this.finalDirections = [];
            }
            if (this.businessData.specificStateFlag === 'true' && this.businessData.directions === 'SPECIAL RULES') {
              this.showFieldsFrom = true;
              this.showFieldsTo = true;
              this.specificStateFrom = this.businessData.specificStateList1;
              this.specificStateTo = this.businessData.specificStateList2;
              this.specificCityFrom = this.businessData.specificCityList1;
              this.specificCityTo = this.businessData.specificCityList2;
            } else if (this.businessData.specificStateFlag === 'true' && this.businessData.directions === 'INTRASTATE' || this.businessData.directions === 'REGIONAL DIRECT INTRASTATE') {
              console.log('date0');
              this.showFieldsFrom = true;
              this.showFieldsTo = false;
              console.log('this.businessData.specificStateList1', this.businessData.specificStateList1);
              this.specificStateFrom = this.businessData.specificStateList1;
              this.specificStateTo = this.businessData.specificStateList2;
              this.specificCityFrom = this.businessData.specificCityList1;
              this.specificCityTo = this.businessData.specificCityList2;
            }
            if (this.businessData.specificZipFlag === 'true') {
              this.showUseZipCodes = true;
            } else {
              this.showUseZipCodes = false;
            }
            if (this.businessData.type === 'YRC') {
              this.directionsArray = ['INTERSTATE', 'INTRASTATE', 'SPECIAL RULES'];
            } else if (this.businessData.type === 'REDDAWAY') {
              this.directionsArray = ['REGIONAL DIRECT INTRASTATE', 'REGIONAL DIRECT INTERSTATE', 'REGIONAL INDIRECT', 'SPECIAL RULES'];
            } else {
              this.directionsArray = ['REGIONAL', 'INTER REGIONAL', 'INTRASTATE', 'SPECIAL RULES'];
            }
            if (this.customerData.fedexSubscription === true) {
              console.log('3');
              this.showFedexCredentials = true;
              this.fedexSubscribe = true;
              let fedexSubscriptionValue = 'true';
              if (this.customerData.subscriptionType !== '' && this.customerData.subscriptionType !== null && this.customerData.subscriptionType !== undefined) {
                if (this.customerData.subscriptionType === 'fedex') {
                  this.typeOfAccountSubscribe = 'fedex';
                  this.customerForm.patchValue({
                    accountSubscription: 'true',
                    fedexSubscription: fedexSubscriptionValue
                  })
                } else {
                  this.typeOfAccountSubscribe = 'forte';
                  this.customerForm.patchValue({
                    accountSubscription: 'false',
                    fedexSubscription: fedexSubscriptionValue
                  })
                }
              }

              // if (this.customerData.fedexCredentials !== null) {
              //   if (this.customerData.fedexCredentials !== {} && Object.keys(this.customerData.fedexCredentials).length !== 0) {
              //     this.customerForm.patchValue({
              //       fedexKey: this.customerData.fedexCredentials.key,
              //       fedexPassword: this.customerData.fedexCredentials.password,
              //       fedexAccNumber: this.customerData.fedexCredentials.accountNumber,
              //       fedexMeterNumber: this.customerData.fedexCredentials.meterNumber,
              //       fedexSubscription: fedexSubscriptionValue
              //     })
              //   }
              // }
              // this.fedexSubscriptionMethod(this.customerData.fedexSubscription);

            } else {
              console.log('31');
              this.showFedexCredentials = false;
              this.fedexSubscribe = false;
              let fedexSubscriptionValue = 'false';
              this.typeOfAccountSubscribe = '';
              this.customerForm.patchValue({
                fedexSubscription: fedexSubscriptionValue
              })
            }
            if (this.customerData.costPlus === true) {
              if (this.customerData.costPlusFactor.length > 0) {
                this.costPlusArray = this.customerData.costPlusFactor;
                this.showTableForCostPlus = true;
                this.showForCostPlus = true;
              } else {
                this.showTableForCostPlus = false;
                this.showForCostPlus = false;
              }
              this.customerForm.patchValue({
                costPlus: 'true'
              });
            } else {
              this.customerForm.patchValue({
                costPlus: 'false'
              });
            }

            if (this.customerData.specificPricing === true) {
              if (this.customerData.specificPricingList.length > 0) {
                this.specificPricingList = this.customerData.specificPricingList;
                this.showTableForAccountSpecific = true;
                this.enablePricingDetails = true;
              } else {
                this.showTableForAccountSpecific = false;
                this.enablePricingDetails = false;
              }
              this.customerForm.patchValue({
                specificPricing: 'true'
              });
            } else {
              this.customerForm.patchValue({
                specificPricing: 'false'
              });
            }

            let directionMapping;
            if (this.finalDirections.length > 0) {
              directionMapping = this.finalDirections[0];
            } else {
              directionMapping = '';
            }
            this.customerForm.patchValue({
              category: this.businessData.category,
              carrierType: this.businessData.type,
              directions: directionMapping,
              discount: this.businessData.discount,
              minimumCharge: this.businessData.minCharge,
              customerId: this.businessData.customerId,
              assessorialName: [''],
              charge: [''],
              fakRangeFrom: [''],
              fakRangeTo: [''],
              fakValue: [''],
              specialRule: this.businessData.specificStateFlag,
              specificZipFlag: this.businessData.specificZipFlag,
              fromCityState: this.specificStateFrom.length > 0 ? this.specificStateFrom : this.specificCityFrom,
              toCityState: this.specificStateTo.length > 0 ? this.specificStateTo : this.specificCityTo,
              createdOn: this.businessData.createdOn
            });
            if (this.costPlusFlag === true) {
              this.customerForm.patchValue({
                category: '',
                carrierType: ''
              });
            }
            this.logger = {
              'method': 'populateData',
              'message': 'Retrieving customer information  and business rules editing a rule',
              'businessRuleId': this.businessData.id
            };
            this.loggerService.debug(this.logger);
            this.assessorialArray = [];
            this.fakArray = [];
            const fakRange = JSON.parse(this.businessData.fakRange);
            const fak = JSON.parse(this.businessData.fak);
            if (fakRange.length === 0 || fak.length === 0) {
              this.fakArray = [];
              this.showFAKTable = false;
              this.customerForm.patchValue({ presentFakValue: 'No' });
            } else {
              for (let f = 0; f < fakRange.length; f++) {
                const data = fakRange[f].split('-');
                const data1 = data[0];
                const data2 = data[1];
                const fakData = fak[f];
                const fakValue = { fakRangeFrom: data1, fakRangeTo: data2, fakValue: fakData };
                this.customerForm.patchValue({ presentFakValue: 'Yes' });
                this.fakArray.push(fakValue);
                this.showFAKTable = true;
                this.showFakValues = true;
              }
            }
            const assessorials = { assessorialName: 'LiftGate Service', charge: this.businessData.liftGate };
            const assessorials1 = { assessorialName: 'Residential Delivery', charge: this.businessData.residential };
            const assessorials2 = { assessorialName: 'Inside Delivery', charge: this.businessData.insideDelivery };
            const assessorials3 = { assessorialName: 'Notify', charge: this.businessData.notify };
            const assessorials4 = { assessorialName: 'Limited Access Delivery', charge: this.businessData.limitedAccessDelivery };
            const assessorials5 = { assessorialName: 'Single Shipment', charge: this.businessData.singleShipment };
            const assessorials6 = { assessorialName: 'Delivery Appointment Required', charge: this.businessData.deliveryAppointmentRequired};
            const assessorials7 = { assessorialName: 'Hazmat', charge: this.businessData.hazmat};
            if (assessorials.charge === '' && assessorials1.charge === '' &&
              assessorials2.charge === '' && assessorials3.charge === '' && assessorials4.charge === '' && (assessorials5.charge === '' || assessorials5.charge === null) && (assessorials6.charge === '' || assessorials6.charge === null) && (assessorials7.charge === '' || assessorials7.charge === null)) {
              this.showAssessorials = false;
            } else {
              this.assessorialArray.push(assessorials, assessorials1, assessorials2, assessorials3, assessorials4, assessorials5,assessorials6,assessorials7);
              console.log(this.assessorialArray);
              this.showAssessorials = true;
            }
            console.log('console.log(this.assessorialArray);', this.assessorialArray);
            this.showAddCustomer = true;
            this.showCustomerTable = false;
          }
        }
      }
    }
  }
  }
  customerType(type:any) {
    this.HideDetailsForEdit = false;
    if (type === 'externalCustomer') {
      this.HideDetailsForEdit = false;
    } else {
      this.HideDetailsForEdit = true;
      this.customerForm.patchValue({ email: '', password: '', userName: '' });
    }
  }
  checkForZipcode(zipcode:any) {
    this.showTableZip = false;
    if (zipcode.length === 5) {
    this.pricingInfoService.getCityState(zipcode).subscribe((response:any) => {
      this.zipcodeResponse = response;
      let CityArray = response[0].yrcCity;
      let cityAndState = this.zipcodeResponse;
      console.log(CityArray);
      // getArrayValues.yrcCity;
      if (cityAndState && cityAndState.length > 0) {
        if (CityArray.length > 1) {
          this.showTableZip = true;
          CityArray.forEach((ele:any) => {
            this.originZipArray.push({'cityName': ele, 'state':cityAndState[0].state})
          })
          setTimeout(() => {
            var id = $("tr:focus").attr("0");
            id++;
            if (id > 6) {
              id = 0;
            }
            $("#consigneeTableId tr[tabindex=0]").focus();
          },500);
            this.selectedIndex = 0;
        } else {
          // cityAndState[0].city;
          this.customerForm.patchValue({ city: this.zipcodeResponse[0].city, state: this.zipcodeResponse[0].state });
        }
      }
      if (this.zipcodeResponse.length > 0) {
      } else {

      }
    });
  }
  }

  getCityNameValue(value:any) {
    console.log(value);
    this.customerForm.patchValue({ city: value.cityName, state: value.state });
this.showTableZip = false;
this.originZipArray = [];

  }
  scroll(event: KeyboardEvent, id:any,type:any) {
    //up 38 down 40
    // event.preventDefault();
    console.log(event);
    if (event.keyCode === 40) {
      var id = $("tr:focus").attr("tabindex");
      id++;
      if (id > this.originZipArray.length) {
        id = 0;
      }
      $("#consigneeTableId tr[tabindex=" + id + "]").focus();
      this.selectedIndex++;
    } else if (event.keyCode === 38) {
      var id = $("tr:focus").attr("tabindex");
      id--;
      if (id > 6) {
        id = 0;
      }
      $("#consigneeTableId tr[tabindex=" + id + "]").focus();
      this.selectedIndex--;
    } else if (event.key === 'Enter') {
      console.log(this.selectedIndex-1);
      this.getCityNameValue(this.originZipArray[this.selectedIndex-1])
    }
    console.log(this.selectedIndex);
  }
  formatPhoneNumber(s:any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }
  checkContactNumber(value:any) {
    console.log(value);
    if (value !== '' || value !== null) {
      this.contactNumber = value;
      let contactNumberFormat = this.formatPhoneNumber(value);
      console.log(this.contactNumber);
      console.log(contactNumberFormat);
      this.customerForm.patchValue({ contactNumber: contactNumberFormat });
    } else {
      this.contactNumber = '';
      console.log(this.contactNumber);
    }
  }

  cancel() {
    if (this.addNewRuleMode === true || this.editMode === true) {
      this.pricingInfoService.addCustomersFlag('add');
    } else {
      this.pricingInfoService.addCustomersFlag('addingNew');
    }
    this.router.navigate(['/companySummary']);
  }

  checkForAssessorials(name:any, charge:any) {
    if (name !== '' && charge !== '') {
      this.enableAssessorialAdd = true;
    } else {
      this.enableAssessorialAdd = false;
    }
  }

  addAssessorials(customerForm:any) {
    const value = customerForm;
    const assessorials = { assessorialName: value.assessorialName, charge: value.charge };
    this.assessorialArray.push(assessorials);
    console.log('this.add ', this.assessorialArray);
    this.showAssessorials = true;
    this.customerForm.patchValue({ assessorialName: '', charge: '' });
  }

  deleteAssessorial(assessorial:any, index:any) {
    this.assessorialArray.splice(index, 1);
    if (this.assessorialArray.length > 0) {
      this.showAssessorials = true;
    } else {
      this.showAssessorials = false;
      this.enableAssessorialAdd = false;
    }
  }

  editAssessorials(assessorial:any, index:any) {
    this.customerForm.patchValue({ assessorialName: assessorial.assessorialName, charge: assessorial.charge });
    this.assessorialArray.splice(index, 1);
  }

  checkForCarrier(type:any) {
    this.directionsArray = [];
    if (type === 'YRC') {
      this.directionsArray = ['INTERSTATE', 'INTRASTATE', 'SPECIAL RULES'];
    } else if (type === 'REDDAWAY') {
      this.directionsArray = ['REGIONAL DIRECT INTRASTATE', 'REGIONAL DIRECT INTERSTATE', 'REGIONAL INDIRECT', 'SPECIAL RULES'];
    } else {
      this.directionsArray = ['REGIONAL', 'INTER REGIONAL', 'INTRASTATE', 'SPECIAL RULES'];
    }
  }

  chooseDirections(direction:any, form:any) {
    console.log('directions', direction, form);
    // this.finalDirections = [];
    if (direction === 'SPECIAL RULES') {
      this.finalDirections.push(direction);
      this.showFieldsFrom = true;
      this.showFieldsTo = true;
      this.showUseZipCodes = false;
      this.customerForm.patchValue({ specialRule: 'true' });
      this.customerForm.patchValue({ specificZipFlag: 'false' });
    } else if (direction === 'INTRASTATE') {
      this.finalDirections.push(direction);
      this.showFieldsFrom = true;
      this.showFieldsTo = false;
      this.showStateFrom = false;
      this.showUseZipCodes = false;
      this.customerForm.patchValue({ specialRule: 'true' });
      this.customerForm.patchValue({ specificZipFlag: 'true' });
    } else if (form.carrierType === 'REDDAWAY' && direction === 'REGIONAL DIRECT INTRASTATE') {
      console.log('form1');
      this.finalDirections.push(direction);
      this.showUseZipCodes = true;
      this.customerForm.patchValue({ specialRule: 'false' });
    } else if (form.carrierType === 'REDDAWAY' && direction === 'REGIONAL DIRECT INTERSTATE') {
      console.log('form2');
      this.finalDirections.push(direction);
      this.showUseZipCodes = true;
      this.customerForm.patchValue({ specialRule: 'false' });
    } else {
      this.finalDirections.push(direction);
      console.log('directions', this.finalDirections);
      this.showFieldsFrom = false;
      this.showFieldsTo = false;
      this.showUseZipCodes = false;
      this.customerForm.patchValue({ specialRule: 'false' });
      this.customerForm.patchValue({ specificZipFlag: 'false' });
    }
  }

  checkUseZipCodes(flag:any, form:any) {
    console.log('1223', flag, form);
    if (flag === 'true' && form.directions === 'REGIONAL DIRECT INTRASTATE') {
      console.log('122345');
      this.showFieldsFrom = true;
      this.showFieldsTo = false;
    } else if (flag === 'true' && form.directions === 'REGIONAL DIRECT INTERSTATE') {
      console.log('1223456');
      this.showFieldsFrom = true;
      this.showFieldsTo = true;
    } else {
      console.log('1223456 else');
      this.showFieldsFrom = false;
      this.showFieldsTo = false;
    }
  }

  checkDiscount(discount:any) {
    if (discount > 100) {
      this.showDiscountErrorMessage = true;
      this.customerForm.patchValue({ discount: '' });
    } else {
      this.showDiscountErrorMessage = false;
    }
  }

  checkFak(fakValues:any) {
    if (fakValues.value === 'Yes') {
      this.enableFakAdd = false;
      this.showFakValues = true;
      this.showErrorMessage = false;
      this.showErrorMessageToRange = false;
    } else if (fakValues.value === 'No') {
      this.showFakValues = false;
    } else {
      this.showFakValues = false;
      this.showFak = false;
    }
  }
  checkPricing(pricingvalues:any) {
    if(pricingvalues.value === 'true') {
      this.enablePricingDetails = true;
    } else if(pricingvalues.value === 'false') {
      this.enablePricingDetails = false;
    }
  }

  getFromCity(from:any, rules:any, form:any) {
    console.log('from', from, rules, form);
    if (from !== '') {
      from = from.toUpperCase();
      if (rules === 'SPECIAL RULES') {
        const variableOne = from.charAt(0);
        const newOne = /^[0-9]+$/i.test(variableOne);
        if (newOne === false) {
          if (form.carrierType === 'REDDAWAY' && form.directions === 'SPECIAL RULES') {
            if (from === 'ALL WEST') {
              from = from;
              this.showErrorMessageSpecificStateFrom = false;
              this.specificStateFrom.push(from);
              this.specificCityFrom = [];
              console.log('this.specificStateFrom', this.specificStateFrom);
            } else {
              if (this.reddawayRuleStates.length > 0) {
                for (let e = 0; e < this.reddawayRuleStates.length; e++) {
                  if (from === this.reddawayRuleStates[e]) {
                    from = from;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificStateFrom.push(from);
                    this.specificCityFrom = [];
                    console.log('this.specificStateFrom', this.specificStateFrom);
                    break;
                  } else {
                    this.showErrorMessageSpecificStateFrom = true;
                  }
                }
              }
            }
          } else if (form.carrierType === 'YRC' && form.directions === 'SPECIAL RULES') {
            from.toUpperCase();
            if (from === 'ALL') {
              from = from;
              this.showErrorMessageSpecificStateFrom = false;
              this.specificStateFrom.push(from);
              this.specificCityFrom = [];
              console.log('this.specificStateFrom', this.specificStateFrom);
            } else {
              if (this.states.length > 0) {
                for (let e = 0; e < this.states.length; e++) {
                  if (from === this.states[e]) {
                    from = from;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificStateFrom.push(from);
                    this.specificCityFrom = [];
                    break;
                  }
                  else {
                    this.showErrorMessageSpecificStateFrom = true;
                    this.specificStateFrom = [];
                    this.specificCityFrom = [];
                  }
                }
              }
            }
          } else if (form.carrierType === 'FEDEX PRIORITY' ||
            form.carrierType === 'FEDEX ECONOMY' && form.directions === 'SPECIAL RULES') {
            from.toUpperCase();
            if (from === 'ALL') {
              from = from;
              this.showErrorMessageSpecificStateFrom = false;
              this.specificStateFrom.push(from);
              this.specificCityFrom = [];
              console.log('this.specificStateFrom', this.specificStateFrom);
            } else {
              if (this.states.length > 0) {
                for (let e = 0; e < this.states.length; e++) {
                  if (from === this.states[e]) {
                    from = from;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificStateFrom.push(from);
                    this.specificCityFrom = [];
                    break;
                  }
                  else {
                    this.showErrorMessageSpecificStateFrom = true;
                    this.specificStateFrom = [];
                    this.specificCityFrom = [];
                  }
                }
              }
            }
          } else if (form.carrierType === 'REDDAWAY' && rules === 'REGIONAL DIRECT INTRASTATE') {
            if (from === 'SCA') {
              this.showErrorMessageSpecificStateFrom = false;
              this.specificStateFrom.push(from.toUpperCase().slice(1, 3));
              this.specificStateTo.push(from.toUpperCase().slice(1, 3));
              let cityFrom = '900-935';
              this.specificCityFrom.push(cityFrom);
              this.specificCityTo.push(cityFrom);
              this.customerForm.patchValue({
                specificZipFlag: 'true', specialRule: 'false'
              });
            } else {
              from.toUpperCase();
              if (this.reddawayRuleStates.length > 0) {
                for (let e = 0; e < this.reddawayRuleStates.length; e++) {
                  if (from === this.reddawayRuleStates[e]) {
                    from = from;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificStateFrom.push(from);
                    this.specificStateTo.push(from);
                    this.specificCityFrom = [];
                    this.specificCityTo = [];
                    console.log('this.specificStateFrom 12325', this.specificStateFrom);
                    this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'false' });
                    break;
                  } else {
                    this.showErrorMessageSpecificStateFrom = true;
                  }
                }
              }
            }
          } else if (form.carrierType === 'REDDAWAY' && rules === 'REGIONAL DIRECT INTERSTATE') {
            console.log('910');
            if (from === 'SCA') {
              this.showErrorMessageSpecificStateFrom = false;
              this.specificStateFrom.push(from.toUpperCase().slice(1, 3));
              let cityFrom = '900-935';
              this.specificCityFrom.push(cityFrom);
              // this.specificStateTo.push(from.toUpperCase().slice(1, 3));
              // let cityFrom = '900-935';
              // this.specificCityFrom.push(cityFrom);
              // this.specificCityTo.push(cityFrom);
              this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'true' });
            } else {
              from.toUpperCase();
              if (this.reddawayRuleStates.length > 0) {
                for (let e = 0; e < this.reddawayRuleStates.length; e++) {
                  if (from === this.reddawayRuleStates[e]) {
                    from = from;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificStateFrom.push(from);
                    //   this.specificStateTo.push(from);     
                    // this.specificCityFrom = [];
                    // this.specificCityTo = [];
                    console.log('this.specificStateFrom 1232', this.specificStateFrom);
                    this.customerForm.patchValue({ specialRule: 'true', specificZipFlag: 'false' });
                    break;
                  } else {
                    this.showErrorMessageSpecificStateFrom = true;
                  }
                }
              }
            }
          } else {
            if (this.states.length > 0) {
              for (let e = 0; e < this.states.length; e++) {
                if (from === this.states[e]) {
                  from = from;
                  this.showErrorMessageSpecificStateFrom = false;
                  this.specificStateFrom.push(from);
                  this.specificCityFrom = [];
                  break;
                }
                else {
                  this.showErrorMessageSpecificStateFrom = true;
                  this.specificStateFrom = [];
                  this.specificCityFrom = [];
                }
              }
            }
          }
        } else {
          this.pricingInfoService.getCityState(from).subscribe(getArrayValues => {
            this.getZipcodeValues = getArrayValues;
            if (this.getZipcodeValues.length > 0) {
              for (let t = 0; t < this.getZipcodeValues.length; t++) {
                if (from === this.getZipcodeValues[t].zipCode) {
                  from = this.getZipcodeValues[t].zipCode;
                  this.reddawayState = this.getZipcodeValues[t].state;
                  this.showErrorMessageSpecificStateFrom = false;
                  this.specificCityFrom.push(from);
                  this.specificStateFrom = [];
                } else {
                  this.showErrorMessageSpecificStateFrom = true;
                  this.specificCityFrom = [];
                  this.specificStateFrom = [];
                }
              }
            } else {
              this.showErrorMessageSpecificStateFrom = true;
              this.specificCityFrom = [];
              this.specificStateFrom = [];
            }
          });
        }
      } else if (rules === 'INTRASTATE') {
        this.specificCityTo = [];
        this.specificStateTo = [];
        const variableOne = from.charAt(0);
        const newOne = /^[0-9]+$/i.test(variableOne);
        if (newOne === false) {
          if (this.states.length > 0) {
            for (let e = 0; e < this.states.length; e++) {
              if (from === this.states[e]) {
                from = this.states[e];
                this.showErrorMessageSpecificStateFrom = false;
                this.specificStateFrom.push(from);
                this.specificStateTo.push(from);
                this.specificCityFrom = [];
                break;
              } else {
                this.showErrorMessageSpecificStateFrom = true;
                this.specificStateFrom = [];
                this.specificCityFrom = [];
              }
            }
          }
        } else {
          this.pricingInfoService.getCityState(from).subscribe(getArrayValues => {
            this.getZipcodeValues = getArrayValues;
            if (this.getZipcodeValues.length > 0) {
              for (let t = 0; t < this.getZipcodeValues.length; t++) {
                if (from === this.getZipcodeValues[t].zipCode) {
                  if (rules === 'REGIONAL DIRECT INTRASTATE') {
                    from = this.getZipcodeValues[t].zipCode;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificCityFrom.push(from);
                    this.specificCityTo.push(from);
                    this.specificStateFrom = [];
                    this.specificStateTo = [];
                    this.customerForm.patchValue({
                      specialRule: 'false', specificZipFlag: 'false'
                    });
                  } else {
                    from = this.getZipcodeValues[t].zipCode;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificCityFrom.push(from);
                    this.specificCityTo.push(from);
                    this.specificStateFrom = [];
                  }
                } else {
                  this.showErrorMessageSpecificStateFrom = true;
                  this.specificCityFrom = [];
                  this.specificStateFrom = [];
                }
              }
            } else {
              this.showErrorMessageSpecificStateFrom = true;
              this.specificCityFrom = [];
              this.specificStateFrom = [];
            }
          });
        }
      }
      else if (rules === 'REGIONAL DIRECT INTRASTATE') {
        console.log('from', from);
        from.toUpperCase();
        const variableOne = from.charAt(0);
        const newOne = /^[0-9]+$/i.test(variableOne);
        if (newOne === false) {
          if (from === 'SCA') {
            this.showErrorMessageSpecificStateFrom = false;
            this.specificStateFrom.push(from.toUpperCase().slice(1, 3));
            this.specificStateTo.push(from.toUpperCase().slice(1, 3));
            let cityFrom = '900-935';
            this.specificCityFrom.push(cityFrom);
            this.specificCityTo.push(cityFrom);
          } else {
            if (this.reddawayRuleStates.length > 0) {
              console.log('from1', from);
              for (let e = 0; e < this.reddawayRuleStates.length; e++) {
                if (from === this.reddawayRuleStates[e]) {
                  console.log('from');
                  from = this.reddawayRuleStates[e];
                  this.showErrorMessageSpecificStateFrom = false;
                  this.specificStateFrom.push(from);
                  this.specificStateTo.push(from);
                  this.specificCityFrom = [];
                  this.specificCityTo = [];
                  this.customerForm.patchValue({ specialRule: 'true', specificZipFlag: 'false' });
                  break;
                }

              }
            }

            // else {
            //   this.showErrorMessageSpecificStateFrom = true;
            //   this.specificStateFrom = [];
            //   this.specificCityFrom = [];
            // }
          }
        } else {
          console.log('from2', from);
          this.pricingInfoService.getCityState(from).subscribe(getArrayValues => {
            this.getZipcodeValues = getArrayValues;
            if (this.getZipcodeValues.length > 0) {
              for (let t = 0; t < this.getZipcodeValues.length; t++) {
                if (from === this.getZipcodeValues[t].zipCode) {
                  if (rules === 'REGIONAL DIRECT INTRASTATE') {
                    from = this.getZipcodeValues[t].zipCode;
                    this.specificCityFrom = [];
                    this.specificCityTo = [];
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificCityFrom.push(from);
                    this.specificCityTo.push(from);
                    this.specificStateFrom = [];
                    this.specificStateTo = [];
                    this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'false' });
                  } else {
                    from = this.getZipcodeValues[t].zipCode;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificCityFrom.push(from);
                    this.specificCityTo.push(from);
                    this.specificStateFrom = [];
                    this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'false' });
                  }
                } else {
                  this.showErrorMessageSpecificStateFrom = true;
                  this.specificCityFrom = [];
                  this.specificStateFrom = [];
                }
              }
            } else {
              this.showErrorMessageSpecificStateFrom = true;
              this.specificCityFrom = [];
              this.specificStateFrom = [];
            }
          });


          // } else {
          //   console.log('1122222');
          //   this.specificStateFrom = [];
          //   this.specificStateTo = [];
          //   this.specificCityFrom = [];
          //   this.specificCityTo = [];
          // }
        }
      }
      else if (rules === 'REGIONAL DIRECT INTERSTATE') {
        console.log('from Inter SCA 1122');
        if (from !== "") {
          const variableOne = from.charAt(0);
          const newOne = /^[0-9]+$/i.test(variableOne);
          if (newOne === false) {

            if (this.reddawayRuleStates.length > 0) {
              console.log('from1', from);


              if (from === 'SCA') {
                this.showErrorMessageSpecificStateFrom = false;
                this.specificStateFrom.push(from.toUpperCase().slice(1, 3));
                let cityFrom = '900-935';
                this.specificCityFrom.push(cityFrom);
                this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'true' });
              } else {
                for (let e = 0; e < this.reddawayRuleStates.length; e++) {
                  if (from === this.reddawayRuleStates[e]) {
                    from = this.reddawayRuleStates[e];
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificStateFrom.push(from);
                    // this.specificStateTo.push(from);
                    // this.specificCityFrom = [];
                    this.customerForm.patchValue({ specialRule: 'true', specificZipFlag: 'false' });
                    break;
                  }
                }
              }
              // } else{
              //   if (from === 'SCA') {
              //     this.showErrorMessageSpecificStateFrom = false;
              //     this.specificStateFrom.push(from.toUpperCase().slice(1, 3));
              //     let cityFrom = '900-935';
              //     this.specificCityFrom.push(cityFrom);
              //     this.customerForm.patchValue({specialRule: 'false', specificZipFlag: 'true'});
              //   } else {
              //     this.specificStateFrom = [];
              //     //   this.specificCityFrom = [];

              //   }
            }


            // else {
            //   this.specificStateFrom = [];
            //   this.specificCityFrom = [];
            // }
          }
          else {
            console.log('from2', from);
            this.pricingInfoService.getCityState(from).subscribe(getArrayValues => {
              this.getZipcodeValues = getArrayValues;
              if (this.getZipcodeValues.length > 0) {
                for (let t = 0; t < this.getZipcodeValues.length; t++) {
                  if (from === this.getZipcodeValues[t].zipCode) {
                    from = this.getZipcodeValues[t].zipCode;
                    this.showErrorMessageSpecificStateFrom = false;
                    this.specificCityFrom.push(from);
                    // this.specificCityTo.push(from);
                    this.specificStateFrom = [];
                    this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'false' });
                  } else {
                    this.showErrorMessageSpecificStateFrom = true;
                    this.specificCityFrom = [];
                    this.specificStateFrom = [];
                  }
                }
              } else {
                this.showErrorMessageSpecificStateFrom = true;
                this.specificCityFrom = [];
                this.specificStateFrom = [];
              }
            });
          }
        }
        else {
          this.specificCityFrom = [];
          this.specificStateFrom = [];
        }
      }
      console.log('this.specificStateFrom', this.specificStateFrom);
    } else {
      this.specificCityFrom = [];
      this.specificStateFrom = [];
    }
  }

  getToCity(to:any, rules:any, form:any) {
    console.log('to', to, rules, form);
    if (to !== '') {
      to = to.toUpperCase();
      if (rules === 'SPECIAL RULES') {
        const variableOne = to.charAt(0);
        const newOne = /^[0-9]+$/i.test(variableOne);
        if (newOne === false) {
          if (form.carrierType === 'YRC' && form.directions === 'SPECIAL RULES') {
            to.toUpperCase();
            if (to === 'ALL') {
              to = to;
              if (this.specificCityFrom.length > 0) {
                this.specificCityTo.push(to);
                this.specificStateTo = [];
              } else {
                this.specificStateTo.push(to);
                this.specificCityTo = [];
              }
              this.showErrorMessageSpecificStateTo = false;
            } else {
              if (this.states.length > 0) {
                for (let e = 0; e < this.states.length; e++) {
                  if (to === this.states[e]) {
                    to = to;
                    this.showErrorMessageSpecificStateTo = false;
                    this.specificStateTo.push(to);
                    this.specificCityTo = [];
                    break;
                  }
                  else {
                    this.showErrorMessageSpecificStateTo = true;
                    this.specificStateTo = [];
                    this.specificCityTo = [];
                  }
                }
              }
            }

            console.log('this.specificStateTo', this.specificStateTo);
            console.log('this.specificCityTo', this.specificCityTo);
          } else if (form.carrierType === 'REDDAWAY' && form.directions === 'SPECIAL RULES') {
            if (to === 'ALL WEST') {
              to = to;
              this.specificStateTo.push(to);
              this.specificCityTo = [];
              //  if (this.specificCityFrom.length > 0) {
              //    this.specificStateTo.push(to);
              //    this.specificCityTo = [];
              //  } else {
              //    this.specificStateTo.push(to);
              //    this.specificCityTo = [];
              //  }
              this.showErrorMessageSpecificStateTo = false;
            } else {
              if (this.states.length > 0) {
                for (let e = 0; e < this.states.length; e++) {
                  if (to === this.states[e]) {
                    to = to;
                    this.showErrorMessageSpecificStateTo = false;
                    this.specificStateTo.push(to);
                    this.specificCityTo = [];
                    break;
                  }
                  else {
                    this.showErrorMessageSpecificStateTo = true;
                    this.specificStateTo = [];
                    this.specificCityTo = [];
                  }
                }
              }
            }
          } else if (form.carrierType === 'FEDEX ECONOMY' || form.carrierType === 'FEDEX PRIORITY' && form.directions === 'SPECIAL RULES') {
            if (to === 'ALL') {
              to = to;
              if (this.specificCityFrom.length > 0) {
                this.specificCityTo.push(to);
                this.specificStateTo = [];
              } else {
                this.specificStateTo.push(to);
                this.specificCityTo = [];
              }
              this.showErrorMessageSpecificStateTo = false;
            } else {
              if (this.states.length > 0) {
                for (let e = 0; e < this.states.length; e++) {
                  if (to === this.states[e]) {
                    to = to;
                    this.showErrorMessageSpecificStateTo = false;
                    this.specificStateTo.push(to);
                    this.specificCityTo = [];
                    break;
                  }
                  else {
                    this.showErrorMessageSpecificStateTo = true;
                    this.specificStateTo = [];
                    this.specificCityTo = [];
                  }
                }
              }
            }
          } else {
            console.log('this.specificStateTo', this.specificStateTo);
            if (this.states.length > 0) {
              for (let e = 0; e < this.states.length; e++) {
                if (to === this.states[e]) {
                  to = to;
                  this.specificStateTo.push(to);
                  this.specificCityTo = [];
                  this.showErrorMessageSpecificStateTo = false;
                  break;
                } else {
                  this.showErrorMessageSpecificStateTo = true;
                  this.specificStateTo = [];
                  this.specificCityTo = [];
                }
              }
            }
          }
        } else {
          console.log('to1');
          this.pricingInfoService.getCityState(to).subscribe(getArrayValues => {
            this.getZipcodeValues = getArrayValues;
            if (this.getZipcodeValues.length > 0) {
              for (let t = 0; t < this.getZipcodeValues.length; t++) {
                if (to === this.getZipcodeValues[t].zipCode) {
                  to = this.getZipcodeValues[t].zipCode;
                  this.showErrorMessageSpecificStateTo = false;
                  this.specificCityTo.push(to);
                  this.specificStateTo = [];
                } else {
                  this.showErrorMessageSpecificStateTo = true;
                  this.specificStateTo = [];
                  this.specificCityTo = [];
                }
              }
            } else {
              this.showErrorMessageSpecificStateTo = true;
              this.specificStateTo = [];
              this.specificCityTo = [];
              // to = to;
              // this.showErrorMessageSpecificStateTo = false;
              // this.specificCityTo.push(to);
              // this.specificStateTo = [];
            }
          });
        }
      }
      else if (rules === 'REGIONAL DIRECT INTERSTATE') {
        console.log('rules Inter 1342');
        if (to !== "") {
          console.log('rules Inter1');
          if (to !== "") {
            const variableOne = to.charAt(0);
            const newOne = /^[0-9]+$/i.test(variableOne);
            if (newOne === false) {
              if (to === 'SCA') {
                this.showErrorMessageSpecificStateTo = false;
                this.specificStateTo.push(to.toUpperCase().slice(1, 3));
                let cityFrom = '900-935';
                this.specificCityTo.push(cityFrom);
                this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'true' });
              } else
                if (this.reddawayRuleStates.length > 0) {
                  console.log('to1', to);
                  for (let e = 0; e < this.reddawayRuleStates.length; e++) {
                    if (to === this.reddawayRuleStates[e]) {

                      to = this.reddawayRuleStates[e];
                      this.showErrorMessageSpecificStateTo = false;
                      this.specificStateTo.push(to);
                      // this.specificStateTo.push(from);
                      // this.specificCityFrom = [];
                      this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'false' });
                    }
                  }
                }
              // else {
              //   this.specificStateFrom = [];
              //   this.specificCityFrom = [];
              // }
            }
            else {
              console.log('to2', to);
              this.pricingInfoService.getCityState(to).subscribe(getArrayValues => {
                this.getZipcodeValues = getArrayValues;
                if (this.getZipcodeValues.length > 0) {
                  for (let t = 0; t < this.getZipcodeValues.length; t++) {
                    if (to === this.getZipcodeValues[t].zipCode) {

                      to = this.getZipcodeValues[t].zipCode;
                      this.showErrorMessageSpecificStateTo = false;
                      this.specificCityTo.push(to);
                      // this.specificCityTo.push(from);
                      // this.specificStateFrom = [];
                      this.customerForm.patchValue({ specialRule: 'false', specificZipFlag: 'false' });
                    } else {
                      this.showErrorMessageSpecificStateTo = true;
                      this.specificCityFrom = [];
                      this.specificStateFrom = [];
                    }
                  }
                } else {
                  this.showErrorMessageSpecificStateTo = true;
                  this.specificCityFrom = [];
                  this.specificStateFrom = [];
                }
              });
            }
          }
        }
        // } else {
        //   this.specificStateFrom = [];
        //   this.specificCityFrom = [];
        // }
      }
    } else {
      this.specificStateTo = [];
      this.specificCityTo = [];
    }
  }

  fakAdd(customerForm:any) {
    const value = customerForm;
    this.fakData = { fakRangeFrom: value.fakRangeFrom, fakRangeTo: value.fakRangeTo, fakValue: value.fakValue };
    this.fakArray.push(this.fakData);
    if (this.fakArray.length > 0) {
      this.showFAKTable = true;
      this.enableFakAdd = false;
    } else {
      this.showFAKTable = false;
    }
    this.resultArray = [];
    this.customerForm.patchValue({ fakRangeFrom: '', fakRangeTo: '', fakValue: '' });
  }

  checkFakValues(from:any, to:any, value:any) {
    if (from !== '' && to === '' && value !== '') {
      this.enableFakAdd = true;
    } else if (from !== '' && value !== '' && to === '') {
      this.enableFakAdd = true;
    } else if (from === '' && to === '' && value === '') {
      this.enableFakAdd = false;
    } else if (from === '' && to === '' && value !== '') {
      this.enableFakAdd = false;
    } else if (from !== '' && to !== '' && value !== '') {
      this.enableFakAdd = true;
    } else {
      this.enableFakAdd = false;
    }
  }

  checkFakRangeFrom(fromRange:any) {
    this.resultArray = [];
    if (this.fakArray.length > 0) {
      for (let f = 0; f < this.fakArray.length; f++) {
        if (this.fakArray[f].fakRangeTo !== '') {
          if (Number(fromRange) >= Number(this.fakArray[f].fakRangeFrom) && Number(fromRange) <= Number(this.fakArray[f].fakRangeTo)) {
            this.showErrorMessage = true;
            break;
          } else {
            this.showErrorMessage = false;
          }
        } if (this.fakArray[f].fakRangeTo === '') {
          if (fromRange >= this.fakArray[f].fakRangeFrom) {
            this.showErrorMessage = true;
          } else {
            this.showErrorMessage = false;
          }
        }
      }
    }
    this.resultArray = this.classArray.filter(array => array > fromRange);
  }

  checkFakRangeTo(toRange:any) {
    if (this.fakArray.length > 0) {
      for (let f = 0; f < this.fakArray.length; f++) {
        if (this.fakArray[f].fakRangeTo !== '') {
          if (Number(toRange) === Number(this.fakArray[f].fakRangeFrom) &&
            Number(toRange) === Number(this.fakArray[f].fakRangeTo)) {
            this.showErrorMessageToRange = true;
            break;
          } else {
            this.showErrorMessageToRange = false;
          }
          if (Number(toRange) >= Number(this.fakArray[f].fakRangeFrom) &&
            Number(toRange) <= Number(this.fakArray[f].fakRangeTo)) {
            this.showErrorMessageToRange = true;
            break;
          } else {
            this.showErrorMessageToRange = false;
          }
        } if (this.fakArray[f].fakRangeTo === '') {
          if (Number(toRange) === Number(this.fakArray[f].fakRangeFrom)) {
            this.showErrorMessageToRange = true;
          } else {
            this.showErrorMessageToRange = false;
          }
        }
      }
    }
  }
  deleteFakValue(fakArray:any, index:any) {
    this.fakArray.splice(index, 1);
    if (this.fakArray.length === 0) {
      this.showFakValues = false;
      this.showFAKTable = false;
      this.customerForm.patchValue({ presentFakValue: 'No' });
      this.showErrorMessage = true;
    } else {
      this.showFAKTable = true;
    }
  }


  add(customerForm:any) {
    console.log('customerForm', customerForm, this.finalDirections);
    let fromTo;
    let fakClass;
    if (customerForm.value.category === '' && customerForm.value.carrierType === '' &&
      customerForm.value.directions === '' && customerForm.value.discount === '' &&
      customerForm.value.minimumCharge === '') {
      this.showErrorMessageOnAddRules = true;
      this.arrayValues = [];
    } else {
      if (customerForm.value.category === '' || customerForm.value.carrierType === '' ||
        customerForm.value.directions === '' || customerForm.value.discount === '' ||
        customerForm.value.minimumCharge === '') {
        this.showErrorMessageOnAddRules = true;
        this.enableSaveButton = false;
      } else {
        this.showErrorMessageOnAddRules = true;
        if (this.fakArray.length > 0) {
          this.showFak = true;
          for (let i = 0; i < this.fakArray.length; i++) {
            if (this.fakArray[i].fakRangeTo !== '') {
              fromTo = this.fakArray[i].fakRangeFrom + '-' + this.fakArray[i].fakRangeTo;
              fakClass = this.fakArray[i].fakValue;
              this.finalFakArray.push(fromTo);
              this.finalFakClass.push(fakClass);
            } else if (this.fakArray[i].fakRangeTo === '') {
              fromTo = this.fakArray[i].fakRangeFrom;
              fakClass = this.fakArray[i].fakValue;
              this.finalFakArray.push(fromTo);
              this.finalFakClass.push(fakClass);
            } else {

            }
          }
        } else {
          this.showFak = false;
        }
        const assessorialValues = { liftGate: '', residential: '', limitedAccess: '', notify: '', insideDelivery: '', singleShipment: '' , deliveryAppointmentRequired: '', hazmat: ''};
        if (this.assessorialArray.length > 0) {
          for (let a = 0; a < this.assessorialArray.length; a++) {
            if (this.assessorialArray[a].assessorialName === 'LiftGate Service') {
              assessorialValues.liftGate = this.assessorialArray[a].charge;
            } else if (this.assessorialArray[a].assessorialName === 'Residential Delivery') {
              assessorialValues.residential = this.assessorialArray[a].charge;
            } else if (this.assessorialArray[a].assessorialName === 'Limited Access Delivery') {
              assessorialValues.limitedAccess = this.assessorialArray[a].charge;
            } else if (this.assessorialArray[a].assessorialName === 'Notify') {
              assessorialValues.notify = this.assessorialArray[a].charge;
            } else if (this.assessorialArray[a].assessorialName === 'Single Shipment') {
              assessorialValues.singleShipment = this.assessorialArray[a].charge;
            }else if (this.assessorialArray[a].assessorialName === 'Delivery Appointment Required') {
              assessorialValues.deliveryAppointmentRequired = this.assessorialArray[a].charge;
            } else if (this.assessorialArray[a].assessorialName === 'Hazmat') {
              assessorialValues.hazmat = this.assessorialArray[a].charge;
            } else {
              assessorialValues.insideDelivery = this.assessorialArray[a].charge;
            }
          }
          this.finalAssessorial.push(assessorialValues);
        }
        const data = {
          type: customerForm.value.carrierType,
          category: customerForm.value.category,
          directions: customerForm.value.directions,
          discount: customerForm.value.discount,
          minCharge: customerForm.value.minimumCharge,
          liftGate: assessorialValues.liftGate ? assessorialValues.liftGate : '',
          residential: assessorialValues.residential ? assessorialValues.residential : '',
          limitedAccessDelivery: assessorialValues.limitedAccess ? assessorialValues.limitedAccess : '',
          insideDelivery: assessorialValues.insideDelivery ? assessorialValues.insideDelivery : '',
          notify: assessorialValues.notify ? assessorialValues.notify : '',
          singleShipment: assessorialValues.singleShipment ? assessorialValues.singleShipment : '',
          deliveryAppointmentRequired: assessorialValues.deliveryAppointmentRequired ? assessorialValues.deliveryAppointmentRequired : '',
          hazmat: assessorialValues.hazmat ? assessorialValues.hazmat : '',
          charge: customerForm.value.charge,
          presentFakValue: customerForm.value.presentFakValue,
          fakRange: this.finalFakArray.length > 0 ? this.finalFakArray : [],
          fakValue: this.finalFakClass.length > 0 ? this.finalFakClass : [],
          specialRule: customerForm.value.specialRule,
          specificZipFlag: customerForm.value.specificZipFlag,
          stateFrom: this.specificStateFrom.length > 0 ? this.specificStateFrom : [],
          stateTo: this.specificStateTo.length > 0 ? this.specificStateTo : [],
          cityFrom: this.specificCityFrom.length > 0 ? this.specificCityFrom : [],
          cityTo: this.specificCityTo.length > 0 ? this.specificCityTo : []
        };
        if (this.arrayValues.length > 0) {
          const sameRules = this.arrayValues.filter(function (obj:any) {
            return obj.type === data.type && obj.category === data.category &&
              obj.directions === data.directions && obj.discount === data.discount &&
              obj.minCharge === data.minCharge;
          });
          if (sameRules.length > 0) {
            this.showErrorMessageOnSameRule = true;
            this.enableSaveButton = false;
          } else {
            this.arrayValues.push(data);
            console.log('this.arrayValues', this.arrayValues);
            this.showTableDetail = true;
            this.showErrorMessageOnAddRules = false;
            this.enableSaveButton = true;
          }
        } else {
          this.arrayValues.push(data);
          console.log('this.arrayValues Else', this.arrayValues);
          this.showTableDetail = true;
          this.showErrorMessageOnAddRules = false;
          this.enableSaveButton = true;
        }
        console.log('this.arrayValues New', this.arrayValues);
        this.customerForm.patchValue({
          category: '',
          carrierType: '',
          directions: '',
          discount: '',
          minimumCharge: '',
          assessorialName: '',
          charge: '',
          presentFakValue: 'No',
          fakRange: '',
          fakValue: '',
          specialRule: '',
          fromCityState: '',
          toCityState: ''
        });
        this.assessorialArray = [];
        this.finalFakArray = [];
        this.finalFakClass = [];
        this.fakArray = [];
        this.showFakValues = false;
        this.showFAKTable = false;
        this.showAssessorials = false;
      }
    }
  }
  saveCustomerDetail(customerForm:any) {
    console.log('customerForm', customerForm);
    console.log('this.finalDirections', customerForm, this.finalDirections);
    let finalData;
    this.showEmailExistMsg = false;
    this.accessDeniedMsg = false;
    console.log('this.arrayValues', this.arrayValues);
    if (this.arrayValues.length > 0) {
      for (let s = 0; s < this.arrayValues.length; s++) {
        finalData = {
          directions: this.arrayValues[s].directions,
          fakRange: JSON.stringify(this.arrayValues[s].fakRange.length > 0 ? this.arrayValues[s].fakRange : []),
          fak: JSON.stringify(this.arrayValues[s].fakValue.length > 0 ? this.arrayValues[s].fakValue : []),
          classRange: '',
          customerId: 0,
          category: this.arrayValues[s].category,
          type: this.arrayValues[s].type,
          classification: [],
          specificStateList1: JSON.stringify(this.arrayValues[s].stateFrom.length > 0 ? this.arrayValues[s].stateFrom : []),
          specificStateList2: JSON.stringify(this.arrayValues[s].stateTo.length > 0 ? this.arrayValues[s].stateTo : []),
          specificCityList1: JSON.stringify(this.arrayValues[s].cityFrom.length > 0 ? this.arrayValues[s].cityFrom : []),
          specificCityList2: JSON.stringify(this.arrayValues[s].cityTo.length > 0 ? this.arrayValues[s].cityTo : []),
          specificStateFlag: this.arrayValues[s].specialRule,
          specificZipFlag: this.arrayValues[s].specificZipFlag,
          liftGate: this.arrayValues[s].liftGate,
          residential: this.arrayValues[s].residential,
          limitedAccessDelivery: this.arrayValues[s].limitedAccessDelivery,
          insideDelivery: this.arrayValues[s].insideDelivery,
          notify: this.arrayValues[s].notify,
          singleShipment: this.arrayValues[s].singleShipment,
          deliveryAppointmentRequired: this.arrayValues[s].deliveryAppointmentRequired,
          hazmat: this.arrayValues[s].hazmat,
          discount: this.arrayValues[s].discount,
          minCharge: this.arrayValues[s].minCharge,
          createdOn: ''
        };
        this.finalArray.push(finalData);
      }
    } else {
      this.finalArray = [];
    }
    console.log('customerForm', customerForm.value);
    let city, state;
    if (customerForm.value.city !== '' || customerForm.value.city !== null && customerForm.value.state !== '' || customerForm.value.state !== null) {
      city = customerForm.value.city.toUpperCase();
      state = customerForm.value.state.toUpperCase();
    } else {
      city = customerForm.value.city;
      state = customerForm.value.state;
    }
    let companyName = customerForm.value.companyName.trim();
    const data = {
      'companyName': companyName.toUpperCase(),
      'referenceId': customerForm.value.referenceId,
      'salesRepId': customerForm.value.salesRepId,
      'ratingNotes': customerForm.value.ratingNotes,
      'city': city,
      'state': state,
      'zip': customerForm.value.zip,
      'address': customerForm.value.address,
      'fedexCredentials': this.fedexCredentials,
      'premiumFactor': customerForm.value.premiumFactor,
      'fedexSubscription': this.fedexSubscribe,
      'subscriptionType': this.typeOfAccountSubscribe,
      'costPlus': this.showTableForCostPlus,
      'costPlusFactor': this.costPlusArray,
      'specificPricing': customerForm.value.specificPricing,
      'specificPricingList': this.specificPricingList,
      'status': 'active'
    };
    console.log('this.finalArray data create', data);
    if (data.salesRepId !== '' && data.companyName !== '' && this.saveUserCredentials === false) {
      this.showErrorMessageOnAddRules = false;
      console.log('this.finalArray', this.finalArray, data, this.accessToken);
      this.customerService.setNewCompany(this.finalArray, data, 'createNewCustomer', this.accessToken).subscribe((response:any) => {
        this.customerResponse = response;
        if (this.customerResponse.result === 'Email already exists') {
          this.showEmailExistMsg = true;
        } else if (this.customerResponse.result === 'Email and username already exists') {
          this.showEmailExistMsg = true;
        } else if (this.customerResponse.result === 'username already exists') {
          this.showEmailExistMsg = true;
        } else if (this.customerResponse.result === 'company name already exists') {
          this.showEmailExistMsg = true;
        } else {
          this.showEmailExistMsg = false;
          this.toastr.success('New company has been added successfully');
          let currentPage = '';
          this.pricingInfoService.setCurrentPageFlag(currentPage);
          let customerId = '';
          this.pricingInfoService.setCustomerId(customerId);
          this.pricingInfoService.addCustomersFlag('add');
          this.router.navigate(['/companySummary']);
          this.logger = {
            'method': 'saveCustomerData',
            'message': 'Adding Customer detail',
            'customer accountNumber': customerForm.value.accountNumber
          };
          this.loggerService.info(this.logger);

        }
      }, (err:any) => {
        this.accessDeniedMsg = true;

      });
    } else {
      this.showErrorMessageOnAddRules = true;
    }
  }
  checkPassword(pwd:any) {
    console.log('pass', pwd);
  }

  editSave(customerForm:any) {
    this.arrayValues = [];
    let fromTo;
    let fakClass;
    if (this.fakArray.length > 0) {
      for (let i = 0; i < this.fakArray.length; i++) {
        fromTo = this.fakArray[i].fakRangeFrom + '-' + this.fakArray[i].fakRangeTo;
        fakClass = this.fakArray[i].fakValue;
        this.finalFakArray.push(fromTo);
        this.finalFakClass.push(fakClass);
      }
    }
    console.log('this.assessorialArrayEdit', this.assessorialArray);
    const assessorialValues = { liftGate: '', residential: '', limitedAccess: '', notify: '', insideDelivery: '', singleShipment: '' , deliveryAppointmentRequired: '', hazmat: ''};
    if (this.assessorialArray.length > 0) {
      for (let a = 0; a < this.assessorialArray.length; a++) {
        if (this.assessorialArray[a].assessorialName === 'LiftGate Service') {
          assessorialValues.liftGate = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Residential Delivery') {
          assessorialValues.residential = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Limited Access Delivery') {
          assessorialValues.limitedAccess = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Notify') {
          assessorialValues.notify = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Single Shipment') {
          assessorialValues.singleShipment = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Delivery Appointment Required') {
          assessorialValues.deliveryAppointmentRequired = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Hazmat') {
          assessorialValues.hazmat = this.assessorialArray[a].charge;
        } else {
          assessorialValues.insideDelivery = this.assessorialArray[a].charge;
        }
      }
      this.finalAssessorial.push(assessorialValues);
    }
    console.log('this.finalAssessorial', this.finalAssessorial);
    const editedData = {
      type: customerForm.value.carrierType,
      category: customerForm.value.category,
      directions: customerForm.value.directions,
      discount: customerForm.value.discount,
      minCharge: customerForm.value.minimumCharge,
      liftGate: assessorialValues.liftGate ? assessorialValues.liftGate : '',
      residential: assessorialValues.residential ? assessorialValues.residential : '',
      limitedAccessDelivery: assessorialValues.limitedAccess ? assessorialValues.limitedAccess : '',
      insideDelivery: assessorialValues.insideDelivery ? assessorialValues.insideDelivery : '',
      deliveryAppointmentRequired: assessorialValues.deliveryAppointmentRequired ? assessorialValues.deliveryAppointmentRequired : '',
      notify: assessorialValues.notify ? assessorialValues.notify : '',
      singleShipment: assessorialValues.singleShipment ? assessorialValues.singleShipment : '',
      hazmat: assessorialValues.hazmat ? assessorialValues.hazmat : '',
      charge: customerForm.value.charge,
      specificZipFlag: customerForm.value.specificZipFlag,
      presentFakValue: customerForm.value.presentFakValue,
      fakRange: this.finalFakArray.length > 0 ? this.finalFakArray : [],
      fakValue: this.finalFakClass.length > 0 ? this.finalFakClass : [],
      specialRule: customerForm.value.specialRule,
      stateFrom: this.specificStateFrom.length > 0 ? this.specificStateFrom : [],
      stateTo: this.specificStateTo.length > 0 ? this.specificStateTo : [],
      cityFrom: this.specificCityFrom.length > 0 ? this.specificCityFrom : [],
      cityTo: this.specificCityTo.length > 0 ? this.specificCityTo : []
    };
    if (this.arrayValues.length > 0) {
      const sameRules = this.arrayValues.filter(function (obj:any) {
        return obj.type === editedData.type && obj.category === editedData.category &&
          obj.directions === editedData.directions;
      });
      if (sameRules.length > 0) {
        this.showErrorMessageOnSameRule = true;
        this.showTableDetail = false;
        this.enableSaveButton = false;
      } else {
        this.arrayValues.push(editedData);
        this.showTableDetail = true;
        this.showErrorMessageOnAddRules = false;
        this.enableSaveButton = true;
      }
    } else {
      if (editedData.type === '' && editedData.category === '' &&
        editedData.directions === '' && editedData.discount === '' && editedData.minCharge === '') {
        this.arrayValues = [];
        this.showTableDetail = false;
      } else {
        this.arrayValues.push(editedData);
        this.showTableDetail = true;
        this.showErrorMessageOnAddRules = false;
        this.enableSaveButton = true;
      }
    }
    console.log('this.arrayValues Edit', this.arrayValues)
    this.assessorialArray = [];
    this.finalFakArray = [];
    this.finalFakClass = [];
    this.fakArray = [];
    this.showFakValues = false;
    this.showFAKTable = false;
    this.showAssessorials = false;
    this.update(customerForm);
  }

  update(customerForm:any) {
    console.log('customerFOrm', customerForm);
    console.log('customerFOrm User Name', customerForm.value.userName, this.arrayValues);
    let finalData:any;
    this.finalArray = [];
    this.accessDeniedMsg = false;
    if (this.arrayValues.length > 0) {
      for (let s = 0; s < this.arrayValues.length; s++) {
        finalData = {
          directions: this.finalDirections[s],
          fakRange: JSON.stringify(this.arrayValues[s].fakRange.length > 0 ? this.arrayValues[s].fakRange : []),
          fak: JSON.stringify(this.arrayValues[s].fakValue.length > 0 ? this.arrayValues[s].fakValue : []),
          classRange: '',
          customerId: 0,
          category: this.arrayValues[s].category,
          type: this.arrayValues[s].type,
          classification: [],
          specificStateList1: JSON.stringify(this.arrayValues[s].stateFrom.length > 0 ? this.arrayValues[s].stateFrom : []),
          specificStateList2: JSON.stringify(this.arrayValues[s].stateTo.length > 0 ? this.arrayValues[s].stateTo : []),
          specificCityList1: JSON.stringify(this.arrayValues[s].cityFrom.length > 0 ? this.arrayValues[s].cityFrom : []),
          specificCityList2: JSON.stringify(this.arrayValues[s].cityTo.length > 0 ? this.arrayValues[s].cityTo : []),
          specificStateFlag: this.arrayValues[s].specialRule,
          specificZipFlag: this.arrayValues[s].specificZipFlag,
          liftGate: this.arrayValues[s].liftGate,
          residential: this.arrayValues[s].residential,
          limitedAccessDelivery: this.arrayValues[s].limitedAccessDelivery,
          insideDelivery: this.arrayValues[s].insideDelivery,
          notify: this.arrayValues[s].notify,
          singleShipment: this.arrayValues[s].singleShipment,
          deliveryAppointmentRequired: this.arrayValues[s].deliveryAppointmentRequired,
          hazmat: this.arrayValues[s].hazmat,
          discount: this.arrayValues[s].discount,
          minCharge: this.arrayValues[s].minCharge,
          id: this.businessData.id,
          createdOn: this.businessData.createdOn,
          updatedOn: new Date()
        };
        this.finalArray.push(finalData);
      }
      console.log('customerForm', customerForm.value);
      let city, state;
      if (customerForm.value.city !== '' || customerForm.value.city !== null && customerForm.value.state !== '' || customerForm.value.state !== null) {
        city = customerForm.value.city.toUpperCase();
        state = customerForm.value.state.toUpperCase();
      } else {
        city = customerForm.value.city;
        state = customerForm.value.state;
      }
      let updateData:any;
      if (this.customerData.type === 'others' && customerForm.type === 'externalCustomer') {
        updateData = {
          'id': this.customerData.id,
          'companyName': customerForm.value.companyName.toUpperCase(),
          'ratingNotes': customerForm.value.ratingNotes,
          'address': customerForm.value.address,
          'createdOn': this.customerData.createdOn,
          'city': city,
          'state': state,
          'zip': customerForm.value.zip,
          'referenceId': customerForm.value.referenceId,
          'salesRepId': customerForm.value.salesRepId,
          'updatedOn': new Date(),
          'fedexCredentials': this.fedexCredentials,
          'premiumFactor': customerForm.value.premiumFactor,
          'fedexSubscription': this.fedexSubscribe,
          'subscriptionType': this.typeOfAccountSubscribe,
          'costPlus': this.showTableForCostPlus,
          'costPlusFactor': this.costPlusArray,
          'specificPricing': customerForm.value.specificPricing,
          'specificPricingList': this.specificPricingList,
          'status': 'active',
          'bolUpload': customerForm.value.bolUpload,
          'deliveryUpload': customerForm.value.deliveryUpload,
          'invoiceUpload': customerForm.value.invoiceUpload,
          'weightUpload': customerForm.value.weightUpload,
          'byOrder': customerForm.value.byOrder

        };
        console.log('finalData Object 1', updateData);
      } else {
        updateData = {
          'id': this.customerData.id,
          'companyName': customerForm.value.companyName.toUpperCase(),
          'contactNumber': this.contactNumber,
          'ratingNotes': customerForm.value.ratingNotes,
          'address': customerForm.value.address,
          'createdOn': this.customerData.createdOn,
          'city': city,
          'state': state,
          'zip': customerForm.value.zip,
          'referenceId': customerForm.value.referenceId,
          'salesRepId': customerForm.value.salesRepId,
          'updatedOn': new Date(),
          'fedexCredentials': this.fedexCredentials,
          'premiumFactor': customerForm.value.premiumFactor,
          'fedexSubscription': this.fedexSubscribe,
          'subscriptionType': this.typeOfAccountSubscribe,
          'costPlus': this.showTableForCostPlus,
          'costPlusFactor': this.costPlusArray,
          'specificPricing': customerForm.value.specificPricing,
      'specificPricingList': this.specificPricingList,
          'status': 'active',
          'wms': customerForm.value.wmsFactor,
          'bolUpload': customerForm.value.bolUpload,
          'deliveryUpload': customerForm.value.deliveryUpload,
          'invoiceUpload': customerForm.value.invoiceUpload,
          'weightUpload': customerForm.value.weightUpload,
          'byOrder': customerForm.value.byOrder
        };
        console.log('finalData Object 2', updateData);
      }
      console.log('finalData', finalData, updateData);
      localStorage.setItem('customerId', updateData.id);
      if (this.finalArray.length > 0) {
        this.pricingInfoService.getBusinessRulesEdit(this.accessToken, updateData.id, this.finalArray[0].category,
          this.finalArray[0].directions, this.finalArray[0].type, this.finalArray[0].discount,
          this.finalArray[0].minCharge).subscribe((data:any) => {
            this.responseData = data;
            this.logger = {
              'method': 'getBusinessRules1', 'message': 'Retrieving existing Customer detail',
              'customerId': updateData.id, 'businessId': finalData.id
            };
            this.loggerService.info(this.logger);
            if (this.responseData.length > 0 || this.responseData.length === [] as any) {
              if (this.finalArray[0].fakRange !== null || this.assessorialArray.length > 0) {
                this.customerService.setNewCompany(finalData, updateData, 'editData', this.accessToken).subscribe((response:any) => {
                  this.router.navigate(['/companySummary']);
                  this.showErrorMessageRuleAlreadyExist = false;
                  this.logger = {
                    'method': 'saveCustomerData', 'message': 'Modifying existing Customer detail',
                    'customerId': updateData.id
                  };
                  this.loggerService.info(this.logger);
                }, (err:any) => {
                  this.accessDeniedMsg = true;
                });
              } else {
                this.showErrorMessageRuleAlreadyExist = true;
                this.arrayValues = [];
                this.showTableDetail = false;
              }
            } else {
              console.log('finalData else', finalData, updateData);
              this.customerService.setNewCompany(finalData, updateData, 'editData', this.accessToken).subscribe((response:any) => {
                this.customerResponse = response;
                if (this.customerResponse.result === 'Email already exists') {
                  this.showEmailExistMsg = true;
                } else {
                  this.showEmailExistMsg = false;
                  this.pricingInfoService.setCustomerId(this.customerData.id);
                  this.router.navigate(['/companySummary']);
                  this.showErrorMessageRuleAlreadyExist = false;
                  this.logger = {
                    'method': 'saveCustomerData', 'message': 'Modifying existing Customer detail',
                    'customerId': updateData.id
                  };
                  this.loggerService.info(this.logger);
                }
              }, (err:any) => {
                this.accessDeniedMsg = true;
              });
            }
          }, (err:any) => {
            this.accessDeniedMsg = true;
          });

      } else {
      }
    } else {
      console.log('customerForm', customerForm.value);
      console.log('customerForm', customerForm.value.city, customerForm.value.state);
      let city, state;
      if (customerForm.value.city !== '' || customerForm.value.city !== null && customerForm.value.state !== '' || customerForm.value.state !== null) {
        city = customerForm.value.city.toUpperCase();
        state = customerForm.value.state.toUpperCase();
      } else {
        city = customerForm.value.city;
        state = customerForm.value.state;
      }
      let updateData:any;
      if (this.customerData.type === 'others' && customerForm.value.type === 'externalCustomer') {
        updateData = {
          'id': this.customerData.id,
          'companyName': customerForm.value.companyName.toUpperCase(),
          'ratingNotes': customerForm.value.ratingNotes,
          'address': customerForm.value.address,
          'createdOn': this.customerData.createdOn,
          'city': city,
          'state': state,
          'zip': customerForm.value.zip,
          'referenceId': customerForm.value.referenceId,
          'salesRepId': customerForm.value.salesRepId,
          'updatedOn': new Date(),
          'fedexCredentials': this.fedexCredentials,
          'premiumFactor': customerForm.value.premiumFactor,
          'fedexSubscription': this.fedexSubscribe,
          'subscriptionType': this.typeOfAccountSubscribe,
          'costPlus': this.showTableForCostPlus,
          'costPlusFactor': this.costPlusArray,
          'specificPricing': customerForm.value.specificPricing,
      'specificPricingList': this.specificPricingList,
          'status': 'active'
        };
        console.log('finalData Object 3', updateData);
      } else {
        updateData = {
          'id': this.customerData.id,
          'companyName': customerForm.value.companyName.toUpperCase(),
          'ratingNotes': customerForm.value.ratingNotes,
          'address': customerForm.value.address,
          'createdOn': this.customerData.createdOn,
          'updatedOn': new Date(),
          'city': city,
          'state': state,
          'zip': customerForm.value.zip,
          'referenceId': customerForm.value.referenceId,
          'salesRepId': customerForm.value.salesRepId,
          'fedexCredentials': this.fedexCredentials,
          'premiumFactor': customerForm.value.premiumFactor,
          'fedexSubscription': this.fedexSubscribe,
          'subscriptionType': this.typeOfAccountSubscribe,
          'costPlus': this.showTableForCostPlus,
          'costPlusFactor': this.costPlusArray,
          'specificPricing': customerForm.value.specificPricing,
      'specificPricingList': this.specificPricingList,
          'status': 'active'
        };
        console.log('finalData Object 4', updateData);
      }
      console.log('updateData', updateData);
      let finalData = {};
      this.customerService.setNewCompany(finalData, updateData, 'editData', this.accessToken).subscribe((response:any) => {
        this.customerResponse = response;
        if (this.customerResponse.result === 'Email already exists') {
          this.showEmailExistMsg = true;
        } else {
          this.showEmailExistMsg = false;
          this.router.navigate(['/companySummary']);
          this.showErrorMessageRuleAlreadyExist = false;
          this.logger = {
            'method': 'saveCustomerData', 'message': 'Modifying existing Customer detail',
            'customerId': updateData.id
          };
          this.loggerService.info(this.logger);
        }
      }, (err:any) => {
        this.accessDeniedMsg = true;
      });

    }
  }


  saveNewRules(customerForm:any) {
    let fromTo;
    let fakClass;
    this.showErrorMessageRuleAlreadyExist = false;
    if (this.fakArray.length > 0) {
      for (let i = 0; i < this.fakArray.length; i++) {
        fromTo = this.fakArray[i].fakRangeFrom + '-' + this.fakArray[i].fakRangeTo;
        fakClass = this.fakArray[i].fakValue;
        this.finalFakArray.push(fromTo);
        this.finalFakClass.push(fakClass);
      }
    }
    console.log('this.assessorialArray', this.assessorialArray);
    const assessorialValues = { liftGate: '', residential: '', limitedAccess: '', notify: '', insideDelivery: '', singleShipment: '', deliveryAppointmentRequired: '', hazmat: '' };
    if (this.assessorialArray.length > 0) {
      for (let a = 0; a < this.assessorialArray.length; a++) {
        if (this.assessorialArray[a].assessorialName === 'LiftGate Service') {
          assessorialValues.liftGate = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Residential Delivery') {
          assessorialValues.residential = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Limited Access Delivery') {
          assessorialValues.limitedAccess = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Notify') {
          assessorialValues.notify = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Single Shipment') {
          assessorialValues.singleShipment = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Delivery Appointment Required') {
          assessorialValues.deliveryAppointmentRequired = this.assessorialArray[a].charge;
        } else if (this.assessorialArray[a].assessorialName === 'Hazmat') {
          assessorialValues.hazmat = this.assessorialArray[a].charge;
        } else {
          assessorialValues.insideDelivery = this.assessorialArray[a].charge;
        }
      }
      const assessorialValues1 = { liftGate: 0, residential: 0, limitedAccess: 0, notify: 0, insideDelivery: 0 };
      this.finalAssessorial.push(assessorialValues);
    }
    console.log('this.finalAssessorial', this.finalAssessorial);
    if (customerForm.value.category === '' || customerForm.value.carrierType === '' ||
      customerForm.value.directions === '' || customerForm.value.discount === '' ||
      customerForm.value.minimumCharge === '') {
      this.showErrorMessageOnAddRules = true;
      this.enableSaveButton = false;
    } else {
      const newRuleData = {
        type: customerForm.value.carrierType,
        category: customerForm.value.category,
        directions: customerForm.value.directions,
        discount: customerForm.value.discount,
        minCharge: customerForm.value.minimumCharge,
        liftGate: assessorialValues.liftGate ? assessorialValues.liftGate : '',
        residential: assessorialValues.residential ? assessorialValues.residential : '',
        limitedAccessDelivery: assessorialValues.limitedAccess ? assessorialValues.limitedAccess : '',
        insideDelivery: assessorialValues.insideDelivery ? assessorialValues.insideDelivery : '',
        notify: assessorialValues.notify ? assessorialValues.notify : '',
        singleShipment: assessorialValues.singleShipment ? assessorialValues.singleShipment : '',
        deliveryAppointmentRequired: assessorialValues.deliveryAppointmentRequired ? assessorialValues.deliveryAppointmentRequired : '',
        hazmat: assessorialValues.hazmat ? assessorialValues.hazmat : '',
        charge: customerForm.value.charge,
        presentFakValue: customerForm.value.presentFakValue,
        fakRange: this.finalFakArray.length > 0 ? this.finalFakArray : [],
        fakValue: this.finalFakClass.length > 0 ? this.finalFakClass : [],
        specialRule: customerForm.value.specialRule,
        specificZipFlag: customerForm.value.specificZipFlag,
        stateFrom: this.specificStateFrom.length > 0 ? this.specificStateFrom : [],
        stateTo: this.specificStateTo.length > 0 ? this.specificStateTo : [],
        cityFrom: this.specificCityFrom.length > 0 ? this.specificCityFrom : [],
        cityTo: this.specificCityTo.length > 0 ? this.specificCityTo : []
      };
      this.arrayValues.push(newRuleData);
      if (this.arrayValues.length > 0) {
        this.showTableDetail = true;
        this.enableSaveNewRule = true;
      } else {
        this.showTableDetail = false;
        this.enableSaveNewRule = false;
      }
    }
    console.log('this.arrayValues New', this.arrayValues);
    this.assessorialArray = [];
    this.finalFakArray = [];
    this.finalFakClass = [];
    this.fakArray = [];
    this.showFakValues = false;
    this.showFAKTable = false;
    this.showAssessorials = false;

    this.customerForm.patchValue({
      carrierType: '',
      category: '',
      directions: '',
      discount: '',
      minimumCharge: '',
      assessorialName: '',
      charge: '',
      fakRange: '',
      fakValue: '',
      specialRule: '',
      fromCityState: '',
      toCityState: ''
    });
    this.showFieldsFrom = false;
    this.showFieldsTo = false;
  }

  updateNewRule(customerForm:any) {
    this.finalArray = [];
    this.showErrorMessageRuleAlreadyExist = false;
    this.accessDeniedMsg = false;
    let finalData;
    console.log('this.arrayValues New Update', this.arrayValues);
    if (this.arrayValues.length > 0) {
      for (let s = 0; s < this.arrayValues.length; s++) {
        finalData = {
          directions: this.arrayValues[s].directions,
          fakRange: JSON.stringify(this.arrayValues[s].fakRange.length > 0 ? this.arrayValues[s].fakRange : []),
          fak: JSON.stringify(this.arrayValues[s].fakValue.length > 0 ? this.arrayValues[s].fakValue : []),
          classRange: '',
          customerId: this.customerData.id,
          category: this.arrayValues[s].category,
          type: this.arrayValues[s].type,
          classification: [],
          specificStateList1: JSON.stringify(this.arrayValues[s].stateFrom.length > 0 ? this.arrayValues[s].stateFrom : []),
          specificStateList2: JSON.stringify(this.arrayValues[s].stateTo.length > 0 ? this.arrayValues[s].stateTo : []),
          specificCityList1: JSON.stringify(this.arrayValues[s].cityFrom.length > 0 ? this.arrayValues[s].cityFrom : []),
          specificCityList2: JSON.stringify(this.arrayValues[s].cityTo.length > 0 ? this.arrayValues[s].cityTo : []),
          specificStateFlag: this.arrayValues[s].specialRule,
          specificZipFlag: this.arrayValues[s].specificZipFlag,
          liftGate: this.arrayValues[s].liftGate,
          residential: this.arrayValues[s].residential,
          limitedAccessDelivery: this.arrayValues[s].limitedAccessDelivery,
          insideDelivery: this.arrayValues[s].insideDelivery,
          notify: this.arrayValues[s].notify,
          singleShipment: this.arrayValues[s].singleShipment,
          deliveryAppointmentRequired: this.arrayValues[s].deliveryAppointmentRequired,
          hazmat: this.arrayValues[s].hazmat,
          discount: this.arrayValues[s].discount,
          minCharge: this.arrayValues[s].minCharge,
          createdOn: new Date(),

          companyId: this.customerData.id,
          id: 0
        };
        this.finalArray.push(finalData);
      }
      const updateNewRuleData = {};
      if (this.finalArray.length > 0) {
        this.responseData = [];
        this.pricingInfoService.getBusinessRules1(this.accessToken, this.customerData.id, this.finalArray[0].category,
          this.finalArray[0].directions, this.finalArray[0].type, this.finalArray[0].discount).subscribe((data:any) => {
            this.responseData = data;
            this.logger = {
              'method': 'getBusinessRules1',
              'message': 'Adding new rule to the existing Customer detail',
              'customerId': this.customerData.id
            };
            this.loggerService.info(this.logger);
            if (this.responseData.length > 0) {
              this.showTableDetail = false;
              this.arrayValues = [];
              this.showErrorMessageRuleAlreadyExist = true;
            } else {
              this.showErrorMessageRuleAlreadyExist = false;
              this.customerService.setNewRuleForCompany(this.finalArray, this.accessToken).subscribe((response:any) => {
                this.toastr.success('Updated Successfully');
                this.pricingInfoService.setCustomerId(this.customerData.id);
                this.router.navigate(['/companySummary']);
              }, (err:any) => {
                console.log(err);
                this.accessDeniedMsg = true;
              });
            }
          }, (err:any) => {
            this.accessDeniedMsg = true;
          });
      }
    }
  }
  updatePassword(form:any) {
    this.passwordErrorMsg = false;
    let object;
    if (form.password !== '') {
      object = {
        id: this.customerData.id,
        password: form.password
      };
      console.log('object', object);
      this.pricingInfoService.updateCustomerPassword(object, this.accessToken).subscribe((response:any) => {
        console.log('response', response);
        this.toastr.success('Updated Successfully');
        this.router.navigate(['/customerSummary']);
      });

    } else {
      this.passwordErrorMsg = true;
    }
  }

  userCredentials(value:any) {
    this.saveUserCredentials = true;
    if (value.fedexKey !== '' && value.fedexPassword !== '' && value.fedexAccNumber !== '' && value.fedexMeterNumber !== '') {
      this.saveUserCredentials = false;
      this.fedexCredentials = { key: value.fedexKey, password: value.fedexPassword, accountNumber: value.fedexAccNumber, meterNumber: value.fedexMeterNumber };
    } else if (value.fedexKey === '' || value.fedexPassword === '' || value.fedexAccNumber === '' || value.fedexMeterNumber === '') {
      this.saveUserCredentials = true;
      this.fedexCredentials = { key: value.fedexKey, password: value.fedexPassword, accountNumber: value.fedexAccNumber, meterNumber: value.fedexMeterNumber };
    } else {
      this.saveUserCredentials = false;
      this.fedexCredentials = {};
    }
  }


  fedexSubscriptionMethod(value:any, type:any) {
    console.log('value', value, type);
    this.typeOfAccountSubscribe = '';
    if (type === 'initialOne') {
      if (value === 'true') {
        this.showFedexCredentials = true;
        this.fedexSubscribe = true;
      } else {
        this.showFedexCredentials = false;
        this.fedexSubscribe = false;
      }
      this.customerForm.patchValue({
        accountSubscription: ''
      });
    } else {
      if (value === 'true') {
        this.typeOfAccountSubscribe = 'fedex';
      } else {
        this.typeOfAccountSubscribe = 'forte';
        this.fedexCredentials = {};
      }
    }
  }

  costPlusMethod(value:any) {
    if (value === 'true') {
      this.showForCostPlus = true;
    } else {
      this.showForCostPlus = false;
      this.costPlusArray = [];
      this.showTableForCostPlus = false;
    }
  }
  addCostPlus(form:any) {
    this.showForAddingCostPlus = true;
    let array = [];
    let object = {};
    object = {
      carrier: form.carrierTypeForCostplus,
      factor: form.factor
    }
    this.costPlusArray.push(object);
    console.log('this.costPlusArray', this.costPlusArray);
    if (this.costPlusArray.length > 0) {
      this.showTableForCostPlus = true;
      this.customerForm.patchValue({
        carrierTypeForCostplus: '',
        factor: ''
      });
    } else {
      this.showTableForCostPlus = false;
    }
  }
  editCostPlus(value:any, i:any) {
    console.log('value', value, 'i', i);
    this.costPlusArrayIndex = i;
    this.customerForm.patchValue({
      carrierTypeForCostplus: value.carrier,
      factor: value.factor
    });
    this.showForAddingCostPlus = false;
    this.costPlusArray.splice(this.costPlusArrayIndex, 1);
  }
  editaccountPricing(value:any,i:any) {
    console.log('value', value, 'i', i);
    this.pricingListArrayIndex = i;
    this.customerForm.patchValue({
      carrierTypeForAccountPricing: value.carrier
    });
    this.showForAddingAccountPricing = false;
    this.specificPricingList.splice(this.costPlusArrayIndex, 1);
  }

  editSaveCostPlus(value:any) {

    this.costPlusArray[this.costPlusArrayIndex].carrier = value.carrierTypeForCostplus;
    this.costPlusArray[this.costPlusArrayIndex].factor = value.factor;
    this.showForAddingCostPlus = true;
    this.addCostPlus(value);
  }

  deleteCostPlus(value:any, i:any) {
    this.costPlusArray.splice(i, 1);
    if (this.costPlusArray.length > 0) {
      this.showTableForCostPlus = true;
    } else {
      this.showTableForCostPlus = false;
    }
  }

  deleteaccountPricing(value:any,i:any) {
    this.specificPricingList.splice(i,1);
    if (this.specificPricingList.length > 0) {
      this.showTableForAccountSpecific = true;
    } else {
      this.showTableForAccountSpecific = false;
    }
  }

  addAccountPricing(form:any) {
    this.showForAddingAccountPricing = true;
    console.log(form);
    let array = [];
    let object = {};
    object =  form.carrierTypeForAccountPricing;
    console.log(object);
    this.existData = this.specificPricingList.find((a:any) => a === object);
    console.log(this.existData);
    if (this.existData !== undefined) {
this.showErrorPricing = true;
    } else {
      this.specificPricingList.push(object);
      this.showErrorPricing = false;
    }
    // this.specificPricingList = this.accountSpecificPricingArray;
    console.log('this.costPlusArray', this.specificPricingList);
    if (this.specificPricingList.length > 0) {
      this.showTableForAccountSpecific = true;
      this.customerForm.patchValue({
        carrierTypeForAccountPricing: '',
        specificPricing: 'true'
      });
    } else {
      this.showTableForAccountSpecific = false;
      this.customerForm.patchValue({
        carrierTypeForAccountPricing: '',
        specificPricing: 'false'
      });
    }
  }

  duplicateCarrier(carrier:any) {
    if (this.costPlusArray.length > 0) {
      for (let c = 0; c < this.costPlusArray.length; c++) {
        if (carrier === this.costPlusArray[c].carrier) {
          this.costPlusCarrierError = true;
          setTimeout(() => {    // <<<---    using ()=> syntax
            this.costPlusCarrierError = false;
          }, 2000);
          this.customerForm.patchValue({ carrierTypeForCostplus: '' });
        }
      }
    }
  }
}
