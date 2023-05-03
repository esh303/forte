import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { PricingInfoService } from '../services/pricing-info.service';
import { LoggerService } from '../services/logger.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

declare var $: any;

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  APForm: FormGroup = new FormGroup({});
  ARForm: FormGroup = new FormGroup({});
  listOfApValues: any;
  listOfArValues: any;
  saveResponse: any;
  // $('select').selectpicker();

  public showEditAp = false;
  public showEditAr = false;
  public showDetailApTable = false;
  public showDetailArTable = false;
  public showErrorMsg = false;
  public showErrorMsgAr = false;
  public showForAssessorials = false;
  public showAccessorialsTable = false;
  emergencyStop = false;
  emergencyStop1 = false;
  public logger: any;
  public accessToken: any;
  deleteRateId: any = 0;
  deleteArRateId: any =0;
  public fedexEconomyAr: any;
  public fedexPriorityAr: any;
  public yrcAr: any;
  public reddawayAr:any;
  public arValues: any = [];
  public fedexEconomyAp: any;
  public fedexpriorityAp: any;
  public yrcAp: any;
  public reddawayAp: any;
  public assessorialObject: any;
  public maxValue: any;
  public minValue: any;
  public editId: any;
  public showForMaxValue = false;
  public assessorialErrorMsg = false;
  public showForAssessorialsAR = false;
  public showAccessorialsTableAR = false;
  public assessorialErrorMsgAR = false;
  public showEditSaveAssessorials = false;
  public showEditSaveAssessorialsAR = false;
  public showTableForViewAssessorials = false;
  public showForEditAP = false;
  public showForEditAR = false;
  public assessorialObjectArrayAR: any = [];
  public assessorialObjectArray: any = [];
  public viewAssessorialArray: any = [];
  salesRepName: any;
  emergencyStopYRC = false;
  emergencyStopPriority = false;
  emergencyStopEconomy = false;
  emergencyStopReddaway= false;
  // dropdownSettings = {
  //   singleSelection: true,
  //   text: 'Carrier',
  //   enableCheckAll: false,
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   enableSearchFilter: true,
  //   classes: 'myclass custom-class'
  // };
  showcarriermodal = false;

  // dropdownSettings :IDropdownSettings= {
  //   singleSelection: false,
  //   enableCheckAll: false,
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   idField: 'id',
  //   textField: 'itemName',
  //   defaultOpen: true
  // };
//   dropdownSettings:IDropdownSettings = {
//     singleSelection: false,
//     idField: 'item_id',
//     textField: 'item_text',
//     selectAllText: 'Select All',
//     unSelectAllText: 'UnSelect All',
//     allowSearchFilter: false,
//     defaultOpen: true
// };
  dropdownList = [
    { item_id: 1, item_text: 'YRC' },
    { item_id: 2, item_text: 'REDDAWAY' },
    { item_id: 3, item_text: 'FEDEX ECONOMY' },
    { item_id: 4, item_text: 'FEDEX PRIORITY' }
];
 dropdownList1 = [ { 'id': 1, 'itemName': 'YRC'}, { 'id': 2, 'itemName':  'REDDAWAY'},  { 'id': 3, 'itemName': 'FEDEX ECONOMY'}, { 'id': 4, 'itemName': 'FEDEX PRIORITY'}]
  public assessorialArray = [{id: 1, assessorialName: 'LiftGate Service'}, {id: 2, assessorialName: 'Residential Delivery'},
    {id: 3, assessorialName: 'Limited Access Delivery'}, {id: 4, assessorialName: 'Inside Delivery'},
     {id: 5, assessorialName: 'Notify'}, {id: 6, assessorialName: 'Single Shipment'},{id:7, assessorialName: 'Delivery Appointment Required'},
    {id:8, assessorialName:'HazMat'}];
  public apValues: any = [];
  selectedCarrier: any = [];
  selectedCarrier1: any;
  constructor(private router: Router, private formBuilder: FormBuilder,
              private service: PricingInfoService,
              private loggerService: LoggerService) {}
  ngOnInit() {
    // $('.selectpicker').selectpicker('refresh');

    this.buildForm();
    this.getData();
    this.getSalesRepData();
    this.emergencyStatus();
    this.emergencyStatus1();
  //   let data = localStorage.getItem(('EmergencyButton'));
  //    this.emergencyStop = JSON.parse(data);
  }
  buildForm() {
    this.APForm = this.formBuilder.group({
      id: [''],
      apCompany: ['', [ Validators.required ]],
      apDiscount: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      apFsc: ['', [ Validators.required]],
      apAmc: ['', [ Validators.required]],
      assessorials: [''],
      cost: [''],
      min: [''],
      max: [''],
      otherChargeName: ['CA Charges'],
      caCharge: ['']
    });
    this.ARForm = this.formBuilder.group( {
      id: [''],
      arCompany: ['', Validators.required],
      arDiscount: ['', Validators.required],
      arFsc: ['', Validators.required],
      arAmc: ['', Validators.required],
      assessorials: [''],
      cost: [''],
      min: [''],
      max: [''],
      otherChargeName: ['CA Charges'],
      caCharge: ['']
    });
  }
  getSalesRepData() {
    this.accessToken = localStorage.getItem('accessToken');
    this.salesRepName = localStorage.getItem('salesRepName');
  }
  /**
   * Retrieving Values from table
   */
  getData() {
    this.listOfApValues = [];
    this.listOfArValues = [];
    this.apValues = [];
    this.arValues = [];
    this.service.getApForm().subscribe(data => {
      this.listOfApValues = data;
      console.log('this.listOfApValues', this.listOfApValues);
      this.fedexEconomyAp = this.listOfApValues.filter((value: any) => {
        if (value.companyName === 'FEDEX ECONOMY') {
          return value;
        }
      });
      this.fedexpriorityAp = this.listOfApValues.filter((value: any) => {
        if (value.companyName === 'FEDEX PRIORITY') {
          return value;
        }
      });
      this.yrcAp = this.listOfApValues.filter((value: any) => {
        if (value.companyName === 'YRC') {
          return value;
        }
      });
      this.reddawayAp = this.listOfApValues.filter((value: any) => {
        if (value.companyName === 'REDDAWAY') {
          return value;
        }
      });
      this.apValues.push.apply(this.apValues, this.fedexEconomyAp);
      this.apValues.push.apply(this.apValues, this.fedexpriorityAp);
      this.apValues.push.apply(this.apValues, this.yrcAp);
      this.apValues.push.apply(this.apValues, this.reddawayAp);
      console.log('this.arValues', this.apValues);
      if (this.listOfApValues.length > 0) {
        this.showDetailApTable = true;
        const tableValue = JSON.stringify(this.listOfApValues);
      } else {
        this.showDetailApTable = false;
      }
      this.logger = { 'method': 'getApForm', 'message': 'Retrieving Ap data' };
      this.loggerService.info(this.logger);
    });
    this.service.getArForm().subscribe((data: any) => {
      this.listOfArValues = data;
      console.log('this.listOfArValues', this.listOfArValues);
      this.fedexEconomyAr = this.listOfArValues.filter((value: any) => {
        if (value.companyName === 'FEDEX ECONOMY') {
          return value;
        }
      });
      this.fedexPriorityAr = this.listOfArValues.filter((value: any) => {
        if (value.companyName === 'FEDEX PRIORITY') {
          return value;
        }
      });
      this.yrcAr = this.listOfArValues.filter((value: any) => {
        if (value.companyName === 'YRC') {
          return value;
        }
      });
      this.reddawayAr = this.listOfArValues.filter((value: any) => {
        if (value.companyName === 'REDDAWAY') {
          return value;
        }
      });
      this.arValues.push.apply(this.arValues, this.fedexEconomyAr);
      this.arValues.push.apply(this.arValues, this.fedexPriorityAr);
      this.arValues.push.apply(this.arValues, this.yrcAr);
      this.arValues.push.apply(this.arValues, this.reddawayAr);
      console.log('this.listOfArValues', this.listOfArValues);
      if (this.listOfArValues.length > 0) {
        this.showDetailArTable = true;
        const tableValueAr = JSON.stringify(this.listOfArValues);
        localStorage.setItem('artableData', tableValueAr);
      } else {
        this.showDetailArTable = false;
      }
      this.logger = { 'method': 'getArForm', 'message': 'Retrieving AR data' };
      this.loggerService.info(this.logger);
    });
  }
  onItemSelect(event: any) {
    console.log(event);
    if (this.selectedCarrier.length >0) {
      this.selectedCarrier.forEach((ele: any) => {
        if(ele.itemName !== event.itemName) {
          this.selectedCarrier.push(event);

        }
      })
    } else {
      this.selectedCarrier.push(event);

    }
  }

  OnItemDeSelect(event: any) {
    console.log(event);
    if (this.selectedCarrier.length >0) {
      this.selectedCarrier.forEach((ele: any) => {
        if(ele.itemName === event.itemName) {
          this.selectedCarrier.splice(ele,1);

        }
      })
    } else {
      this.selectedCarrier = [] ;

    }
  }
  emergencyStatus() {
    this.service.getEmergencyStatus().subscribe((res:any) => {
      console.log(res);
      if (res.yrc === true) {
        this.emergencyStopYRC = false;
      } else {
        this.emergencyStopYRC = true;
        this.selectedCarrier.push({ item_id: 1, item_text: 'YRC'});

      }
      if (res.reddaway === true) {
        this.emergencyStopReddaway = false;
      } else {
        this.emergencyStopReddaway = true;
        this.selectedCarrier.push({ item_id: 2, item_text: 'REDDAWAY'});

      }
      if (res.fxfe === true) {
        this.emergencyStopEconomy = false;
      } else {
        this.emergencyStopEconomy = true;
        this.selectedCarrier.push({ item_id: 3, item_text: 'FEDEX ECONOMY'});

      }
      if (res.fxfp === true) {
        this.emergencyStopPriority = false;
      } else {
        this.emergencyStopPriority = true;
        this.selectedCarrier.push({ item_id: 4, item_text: 'FEDEX PRIORITY'});

      }
      if (res.yrc === false || res.reddaway === false) {
        this.emergencyStop = false;
        console.log(this.emergencyStop)
      } else {
        this.emergencyStop = true;
      }
    })
        // this.selectedCarrier1 = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];

    console.log(this.selectedCarrier);
    console.log(this.selectedCarrier1)

  }

  getYRCValue(event: any){
    console.log(event);
    if (event.target.checked === true) {
      this.emergencyStopYRC = true;
      this.stopService('YRC');
      // this.selectedCarrier.push({ item_id: 1, item_text: 'YRC'});
    } else {
      this.emergencyStopYRC = false;
      this.startService('YRC');

      // if (this.selectedCarrier.length >0) {
      //   this.selectedCarrier.forEach((ele) => {
      //     if(ele.item_text === 'YRC') {
      //       this.selectedCarrier.splice(ele,1);
  
      //     }
      //   })
      // } else {
      //   this.selectedCarrier = [] ;
  
      // }
      // this.selectedCarrier.push({ item_id: 1, item_text: 'YRC'});

    }
  }
  getReddawayValue(event: any) {
    console.log(event);
    if (event.target.checked === true) {
      this.emergencyStopReddaway = true;
      this.stopService('REDDAWAY');

      // this.selectedCarrier.push({ item_id: 2, item_text: 'REDDAWAY'});

    } else {
      this.emergencyStopReddaway = false;
    this.startService('REDDAWAY')
    }
  }

  getEconomyValue(event: any) {
    console.log(event);
    if (event.target.checked === true) {
      this.emergencyStopEconomy = true;
      this.stopService('FXFE');

      // this.selectedCarrier.push({ item_id: 3, item_text: 'FEDEX ECONOMY'});

    } else {
      this.emergencyStopEconomy = false;
  this.startService('FXFE')
    }
  }

  getPriorityValue(event: any) {
    console.log(event);
    if (event.target.checked === true) {
      this.emergencyStopPriority = true;
      this.stopService('FXFP');
    } else {
      this.emergencyStopPriority = false;
      this.startService('FXFP')
    }
  }

  startService(value: any) {
    console.log(this.emergencyStopYRC, this.emergencyStopReddaway, this.emergencyStopEconomy, this.emergencyStopPriority);
    let passArray = []
    passArray.push(value);
    let data = { "service": "start", 
    "carrier": passArray, "salesRepId": 1 }
    this.service.startCarrierService(data).subscribe((response: any) => {
      console.log(response);
    });
    setTimeout(() => {
      this.emergencyStatus();

    }, 2000);
  }
  stopService(value: any) {
    console.log(this.emergencyStopYRC, this.emergencyStopReddaway, this.emergencyStopEconomy, this.emergencyStopPriority);
    let passArray = []
    passArray.push(value);
    let data = { "service": "stop", 
    "carrier": passArray, "salesRepId": 1 }
    this.service.startCarrierService(data).subscribe((response: any) => {
      console.log(response);
    });
    setTimeout(() => {
      this.emergencyStatus();

    }, 2000);
  }
  emergencyStatus1() {
    this.service.getpeakStatus().subscribe((res: any) => {
      console.log(res);
      if (res === 'false') {
        this.emergencyStop1 = true;
        console.log(this.emergencyStop)
      } else {
        this.emergencyStop1 = false;
      }
    })
    // this.emergencyStop1 = false;

  }

  internalPage() {
    this.router.navigate(['/internal']);
  }

  /**
   * Checking for duplicate company name
   * @param apCompany
   */
  duplicateCompany(apCompany: any) {
    console.log('check', this.listOfApValues, apCompany);
    for (let c = 0; c < this.listOfApValues.length; c++) {
      if (apCompany === this.listOfApValues[c].companyName) {
        this.showErrorMsg = true;
        setTimeout ( () => {    // <<<---    using ()=> syntax
          this.showErrorMsg = false;
        }, 2000);
        this.APForm.patchValue({ apCompany: ''});
      }
    }
  }
  duplicateArCompany(arCompany: any) {
    for (let c = 0; c < this.listOfArValues.length; c++) {
      if (arCompany === this.listOfArValues[c].companyName) {
        this.showErrorMsgAr = true;
        setTimeout ( () => {    // <<<---    using ()=> syntax
          this.showErrorMsgAr = false;
        }, 2000);
        this.ARForm.patchValue({ arCompany: ''});
      }
    }
  }

  saveAPData(Apform: any) {
    console.log('Apform', Apform);
    const payloadData = {
      companyName: Apform.apCompany, discount: Apform.apDiscount,
      fuelsurcharge: Apform.apFsc, amc: Apform.apAmc, recentRateId: 0, type: 'AP', caCharge: Apform.caCharge, baseFactor: '',  
      assessorials: JSON.stringify(this.assessorialObjectArray)
    };
    this.service.saveApForm(this.accessToken, payloadData).subscribe((response: any) => {
      this.saveResponse = response;
      this.getData();
      this.logger = { 'method': 'saveApForm', 'message': 'Create new carrier based discount and minimum charge AP' };
      this.loggerService.info(this.logger);
    });
    this.APForm.patchValue({ apCompany: '', apDiscount: '', apFsc: '', apAmc: '', assessorials: '', cost: '', min: '', max: '', caCharge: ''});
    this.showDetailApTable = true;
    this.showAccessorialsTable = false;
    this.assessorialObjectArray = [];
  }
  editApData(ap: any) {
    console.log('edit ap data', ap);
    this.assessorialObjectArray = [];
    this.APForm.patchValue({ apCompany: ap.companyName, apDiscount: ap.discount,
      apFsc: ap.fuelsurcharge, apAmc: ap.amc, id: ap.recentRateId, caCharge: ap.caCharge});
    this.assessorialObjectArray = JSON.parse(ap.assessorials);
    this.showEditAp = true;
    if (this.assessorialObjectArray.length > 0) {
      this.showAccessorialsTable = true;
      this.showForAssessorials = true;
    } else {
      this.showAccessorialsTable = false;
      this.showForAssessorials = false;
    }

    this.showEditSaveAssessorials = true;
  

  }
  editSaveAPData(data: any) {
    console.log('data', data);
    console.log('this.assessorialObjectArray', this.assessorialObjectArray);
    const payloadData = {
      companyName: data.apCompany, discount: data.apDiscount,
      fuelsurcharge: data.apFsc, amc: data.apAmc, recentRateId: data.id, type: 'AP', caCharge: data.caCharge,
      assessorials: JSON.stringify(this.assessorialObjectArray)
    };
    console.log('payloadData', payloadData);
    this.service.editSaveApForm(this.accessToken, payloadData).subscribe((response: any) => {
      this.getData();
      this.logger = { 'method': 'editSaveApForm', 'message': 'Modified for existing carrier discount and minimum charge AP' };
      this.loggerService.info(this.logger);
    });
    this.APForm.patchValue({ apCompany: '', apDiscount: '', apFsc: '', apAmc: '', assessorials: '', cost: '', min: '', max: '', caCharge: ''});
    this.showEditAp = false;
    this.showAccessorialsTable = false;
    this.showForAssessorials = false;
    this.showEditSaveAssessorials = false;
    this.assessorialObjectArray = [];
  }

  deleteApModal(rateId: any) {
    this.deleteRateId = rateId;

  }

  deleteApData() {
    this.service.deleteAp(this.accessToken, this.deleteRateId)
      .subscribe( (deletedata: any) => {
          this.getData();
          this.logger = { 'method': 'deleteAp', 'message': 'Deleting a AP record' };
          this.loggerService.info(this.logger);
        }, (error: any) => { }, () => { }
      );
  }
  cancel(type: any) {
    if (type === 'ap') {
      this.APForm.patchValue({ apCompany: '', apDiscount: '', apFsc: '', apAmc: '', assessorials: '', cost: '', min: '', max: '', caCharge: ''});
      this.showEditAp = false;
      this.showAccessorialsTable = false;
      this.showForAssessorials = false;
      this.assessorialErrorMsg = false;
      this.assessorialObjectArray = [];
    } else {
      this.ARForm.patchValue({ arCompany: '', arDiscount: '', arFsc: '', arAmc: '', assessorials: '', cost: '', min: '', max: '', caCharge: ''});
      this.showEditAr = false;
      this.showAccessorialsTableAR = false;
      this.showForAssessorialsAR = false;
      this.assessorialErrorMsgAR = false;
      this.assessorialObjectArrayAR = [];
    }
  }
  saveARData(Arform: any) {
    console.log('ARform', Arform);
    const payloadData = {
      companyName: Arform.arCompany, discount: Arform.arDiscount,
      fuelsurcharge: Arform.arFsc, amc: Arform.arAmc, recentRateId: 0, type: 'AR', caCharge: Arform.caCharge,
      assessorials: JSON.stringify(this.assessorialObjectArrayAR)
    };
    console.log('payloadDaata', payloadData);
    this.service.saveArForm(this.accessToken, payloadData).subscribe((response: any) => {
      this.saveResponse = response;
      this.getData();
      this.logger = { 'method': 'saveArForm', 'message': 'Create new carrier based discount and minimum charge AR' };
      this.loggerService.info(this.logger);
    });
    this.ARForm.patchValue({ arCompany: '', arDiscount: '', arFsc: '', arAmc: '', assessorials: '', cost: '', min: '', max: '', caCharge: ''});
    this.showDetailArTable = true;
    this.showAccessorialsTableAR = false;
    this.assessorialObjectArrayAR = [];
  }

  editArData(ar: any) {
    this.ARForm.patchValue({ arCompany: ar.companyName, arDiscount: ar.discount,
      arFsc: ar.fuelsurcharge, arAmc: ar.amc, id: ar.recentRateId, caCharge: ar.caCharge});
    this.showEditAr = true;
    this.showEditSaveAssessorialsAR = true;
    this.assessorialObjectArrayAR = JSON.parse(ar.assessorials);
    if (this.assessorialObjectArrayAR.length > 0) {
      this.showAccessorialsTableAR = true;
      this.showForAssessorialsAR = true;

    } else {
      this.showAccessorialsTableAR = false;
      this.showForAssessorialsAR = false;
    }

  }

  editSaveArData(data: any) {
    const payloadData = {
      companyName: data.arCompany, discount: data.arDiscount,
      fuelsurcharge: data.arFsc, amc: data.arAmc, recentRateId: data.id, type: 'AR', caCharge: data.caCharge,
      assessorials: JSON.stringify(this.assessorialObjectArrayAR)
    };
    this.service.editSaveArForm(this.accessToken, payloadData).subscribe((response: any) => {
      this.getData();
      this.logger = { 'method': 'editSaveArForm', 'message': 'Modified for existing carrier discount and minimum charge AR' };
      this.loggerService.info(this.logger);
    });
    this.ARForm.patchValue({ arCompany: '', arDiscount: '', arFsc: '', arAmc: '', assessorials: '', cost: '', min: '', max: '', caCharge: ''});
    this.showEditAr = false;
    this.showAccessorialsTableAR = false;
    this.showForAssessorialsAR = false;
    this.showEditSaveAssessorialsAR = false;
    this.assessorialObjectArrayAR = [];
  }

  deleteArModal(rateId: any) {
    this.deleteArRateId = rateId;
  }

  deleteArData() {
    this.service.deleteAr(this.accessToken,  this.deleteArRateId)
      .subscribe((deleteDataAr:any)  => {
          this.getData();
          this.logger = { 'method': 'deleteAr', 'message': 'Deleting a AR record' };
          this.loggerService.info(this.logger);
        }, (error: any) => {
        }, () => { }
      );
  }
  checkForValues(value: any, type: any) {
    if (type === 'min') {
      this.minValue = value;
      if (this.maxValue !== null && this.maxValue !== '') {
        if (this.maxValue < this.minValue) {
          this.showForMaxValue = true;
        } else {
          this.showForMaxValue = false;
        }
      }
    } else {
      this.maxValue = value;
      if (this.maxValue !== null && this.maxValue !== '') {
        if (this.maxValue < this.minValue) {
          this.showForMaxValue = true;
        } else {
          this.showForMaxValue = false;
        }
      }
    }
  }
  checkAssessorials(id: any, type: any, criteria: any) {
    this.assessorialObject = {};
    let assessorialName;

    if (id === '1') {
      assessorialName = 'LiftGate Service';
    } else if (id === '2') {
      assessorialName = 'Residential Delivery';
    } else if (id === '3') {
      assessorialName = 'Limited Access Delivery';
    } else if (id === '4') {
      assessorialName = 'Inside Delivery';
    } else if (id === '5') {
      assessorialName = 'Notify';
    } else if (id === '6') {
      assessorialName = 'Single Shipment';
    } else if (id === '7') {
      assessorialName = 'Delivery Appointment Required';

    } else if (id === '8') {
      assessorialName = 'Hazmat';

    }
    if (type === 'AP') {
      if (this.assessorialObjectArray.length > 0) {
        for (let i = 0; i < this.assessorialObjectArray.length; i++) {
          if (id === this.assessorialObjectArray[i].id) {
            if (criteria === 'save') {
              this.assessorialErrorMsg = true;
              break;
            } else {
              this.assessorialErrorMsg = false;
            }
          } else {
            this.assessorialErrorMsg = false;
          }
        }
      } else {
        this.assessorialErrorMsg = false;
      }
      this.assessorialObject = {id: id, assessorial: assessorialName};
      console.log('this.assessorialObject', this.assessorialObject);
    } else {
      if (this.assessorialObjectArrayAR.length > 0) {
        for (let i = 0; i < this.assessorialObjectArrayAR.length; i++) {
          if (id === this.assessorialObjectArrayAR[i].id) {
            if (criteria === 'save') {
              this.assessorialErrorMsgAR = true;
              break;
            } else {
              this.assessorialErrorMsgAR = false;
            }
          } else {
            this.assessorialErrorMsgAR = false;
          }
        }
      } else {
        this.assessorialErrorMsgAR = false;
      }
      this.assessorialObject = {id: id, assessorial: assessorialName};
      console.log('this.assessorialObject', this.assessorialObject);
    }
  }

  addAssessorials(type: any) {
    if (type === 'AP') {
      this.showForAssessorials = true;
    } else {
      this.showForAssessorialsAR = true;
    }

  }
  addSaveAssessorials(form: any, type: any) {
    console.log('form', form);
    let array: any = [];
    let cwt = false;
    if (form.min !== '' && form.max !== '') {

      cwt = true;
    } else {
      cwt = false;
    }
    let object = {
      id : this.assessorialObject.id,
      name: this.assessorialObject.assessorial,
      cost: form.cost,
      min: form.min,
      max: form.max,
      cwt: cwt
    }
    if (type === 'AP') {
      this.assessorialObjectArray.push(object);
      console.log('array', array);
      if (this.assessorialObjectArray.length > 0 ) {
        this.showAccessorialsTable = true;
        this.assessorialObjectArray.sort(function(a: any, b: any){
          return a.id - b.id;
        });
        this.APForm.patchValue({assessorials: '', cost: '', min: '', max: ''});
      } else {
        this.showAccessorialsTable = false;
      }
    } else {
      this.assessorialObjectArrayAR.push(object);
      console.log('array', array);
      if (this.assessorialObjectArrayAR.length > 0 ) {
        this.showAccessorialsTableAR = true;
        this.assessorialObjectArrayAR.sort(function(a: any, b: any){
          return a.id - b.id;
        });
        this.ARForm.patchValue({assessorials: '', cost: '', min: '', max: ''});
      } else {
        this.showAccessorialsTableAR = false;
      }
    }
  }

  editAssessorials(list: any, type: any) {
    console.log('list', list);
    if (type === 'AP') {
      this.editId = list.id;
      console.log('this.editId', this.editId);
      this.showForEditAP = true;
      this.checkAssessorials(list.id, 'AP', 'edit');
      this.APForm.patchValue({assessorials: list.id, cost: list.cost, min: list.min, max: list.max});
    } else {
      this.editId = list.id;
      this.showForEditAR = true;
      console.log('this.editId', this.editId);
      this.checkAssessorials(list.id, 'AR', 'edit');
      this.ARForm.patchValue({assessorials: list.id, cost: list.cost, min: list.min, max: list.max});
    }
  }

  deleteAssessorials(i: any, type: any) {
    if (type === 'AP') {
      this.assessorialObjectArray.splice(i, 1);
    } else {
      this.assessorialObjectArrayAR.splice(i, 1);
    }
  }
  viewAssessorials(list: any, type: any) {
    if (type === 'AP') {
      this.viewAssessorialArray = JSON.parse(list.assessorials);
      this.showTableForViewAssessorials = true;
    } else {
      this.viewAssessorialArray = JSON.parse(list.assessorials);
      this.showTableForViewAssessorials = true;
    }
  }
  viewCarrier() {
    this.showcarriermodal = true;
  }

  Close(type: any) {
    if (type === 'AP') {
      this.showTableForViewAssessorials = false;
      this.viewAssessorialArray = [];
    } else {
      this.showTableForViewAssessorials = false;
      this.viewAssessorialArray = [];
    }
  }

  editSaveAssessorials(form: any, type: any) {
    console.log('form', form);
    let cwt;
    let id: any;
    if (type === 'AP') {
      id = this.editId;
      this.showForEditAP = false;
      console.log('this.editId', this.editId);
      this.assessorialObjectArray = this.assessorialObjectArray.filter(function( obj : any) {
        console.log('obj.id', obj.id);
        return obj.id !== id;
      });
      // this.assessorialObjectArray.splice(this.editId, 1);
      if (form.min !== '' && form.max !== '') {

        cwt = true;
      } else {
        cwt = false;
      }
      console.log('this.assessorialObject', this.assessorialObject);
      let object = {
        id : this.assessorialObject.id,
        name: this.assessorialObject.assessorial,
        cost: form.cost,
        min: form.min,
        max: form.max,
        cwt: cwt
      }
      this.assessorialObjectArray.push(object);
      this.assessorialObjectArray.sort(function(a: any, b: any){
        return a.id - b.id;
      });
      console.log('this.assessorialObjectArray', this.assessorialObjectArray);
      this.APForm.patchValue({assessorials: '', cost: '', min: '', max: ''});
    } else {
      id = this.editId;
      this.showForEditAR = false;
      console.log('this.editId', this.editId);
      this.assessorialObjectArrayAR = this.assessorialObjectArrayAR.filter(function( obj: any ) {
        console.log('obj.id', obj.id);
        return obj.id !== id;
      });
      // this.assessorialObjectArray.splice(this.editId, 1);
      if (form.min !== '' && form.max !== '') {

        cwt = true;
      } else {
        cwt = false;
      }
      console.log('this.assessorialObject', this.assessorialObject);
      let object = {
        id : this.assessorialObject.id,
        name: this.assessorialObject.assessorial,
        cost: form.cost,
        min: form.min,
        max: form.max,
        cwt: cwt
      }
      this.assessorialObjectArrayAR.push(object);
      this.assessorialObjectArrayAR.sort(function(a: any, b: any){
        return a.id - b.id;
      });
      console.log('this.assessorialObjectArray', this.assessorialObjectArrayAR);
      this.ARForm.patchValue({assessorials: '', cost: '', min: '', max: ''});
    }
    // this.showEditSaveAssessorials = true;
  }
  getValue(event: any) {
    console.log(event);
    if (event.target.checked === true) {
//       let object = { "emergencyService":"start", "createdBy":"test", "salesRepId":1 }
//       this.service.setEmergencyStatus(object).subscribe((data: any) => {
// console.log(data);
// if (data.result.emergencyService === 'start') {
//   this.emergencyStop = true;

// }
//       })
// this.stopService();
    } else if (event.target.checked === false) {

//       let object = { "emergencyService":"stop", "createdBy":"test", "salesRepId":1 }
//       this.service.setEmergencyStatus(object).subscribe((data: any) => {
// console.log(data);
// if (data.result.emergencyService === 'stop') {
//   this.emergencyStop = false;

// }
//       })
//       this.emergencyStop = false;
// this.startService();
    }
    const stopButton = JSON.stringify(this.emergencyStop);
    localStorage.setItem('EmergencyButton',stopButton);

  }
  getValue1(event: any) {
    console.log(event);
    if (event.target.checked === true) {
      let object = { "peakSurcharge": "off" }
      this.service.setPeakCharge(object).subscribe((data: any) => {
console.log(data);
if (data.result === true) {
  this.emergencyStop1 = true;

}
      })
    } else if (event.target.checked === false) {

      let object = { "peakSurcharge": "on" }
      this.service.setPeakCharge(object).subscribe((data: any) => {
console.log(data);
if (data.result === true) {
  this.emergencyStop1 = false;

}
      })
      this.emergencyStop = false;
    }
    const stopButton = JSON.stringify(this.emergencyStop);
    localStorage.setItem('EmergencyButton',stopButton);

  }
}
