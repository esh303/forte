import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {classArrayForBillOfLading} from '../app.constant';
import {PricingInfoService} from '../services/pricing-info.service';
import {ExternalService} from '../services/external.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-quickie-quote',
  templateUrl: './quickie-quote.component.html',
  styleUrls: ['./quickie-quote.component.css']
})
export class QuickieQuoteComponent implements OnInit {
  description: any;
  // [x: string]: any;
  // [x: string]: any;
  quickieForm: FormGroup = new FormGroup({});
  addressTemplateNameForm: FormGroup = new FormGroup({});
  itemTemplateNameForm: FormGroup = new FormGroup({});
  public showForm = true;
  public showTruckloadForm = true;
  public showVolumeForm = false;
  public showAirForm = false;
  public showOceanForm = false;
  public shipperErrorMessage = false;
  public consigneeErrorMessage = false;
  public showForTruckLoad = true;
  public showForVolume = true;
  public originState: any;
  public destinationState: any;
  public originCity: any;
  public destinationCity: any;
  public classArray;
  public externalCustomer: any;
  public accessToken: any;
  public externalCustomerParseData: any;
  public salesRepId: any;
  public customerType: any;
  public object: any;
  public currentDate = new Date();
  public minDate = new Date();
  public showAlrightPopUp = false;
  public showLoader = false;
  public className: any;
  public shipmentDate: any;
  public deliveryDate: any;
  public customerId: any;
  public customerName: any;
  public showMessageForDatePicker = false;
  public showContactCallCenterMsg = false;
  public showQuoteErrorMsg = false;
  public transportationType = 'truckload';
  public weightUnit = 'ttl';
  public totalPieces = 0;
  public totalWeight = 0;
  public openType: any;
  public templateId: any;
  public addressTemplate: any;
  public addressTemplateAutoFill: any;
  public itemTemplate: any;
  public itemTemplateAutoFill: any;
  public newAddressTemplate: any;
  public itemIndex: any;
  public newItemTemplate: any;
  public itemTemplatesPresent = false;
  public addressTemplatesPresent = false;
  public shipperTemplate: any = [];
  public consigneeTemplate: any = [];
  public shipperTemplatesPresent = false;
  public consigneeTemplatesPresent = false;
  public shipperTemplate1: any = [];
  public consigneeTemplate1: any = [];
  public showNmfcErrorMsg = false;
  public companyId: any;
  public handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
  closeDescription = false;
  charArray: any = [];
  constructor(private router: Router, private fb: FormBuilder, private pricingInfoService: PricingInfoService, private externalService: ExternalService) {
    this.classArray = classArrayForBillOfLading;
    this.localStorageSalesData();
  }

  ngOnInit() {
    this.buildForm();
   
  }

  eventHandler(event: any) {
    console.log('1', event, event.keyCode, event.keyIdentifier);
    console.log('2', event.keyCode);
    console.log('3', event.keyIdentifier);
    if (event.which === '13') {
      event.preventDefault();
    }
  }

  itemTemplateSave(form: any, type: any, nameForm: any) {
    console.log('form', form);
    this.newItemTemplate = {
      customerId: this.templateId,
      companyId: this.companyId,
      createdOn: new Date(),
      templateName: nameForm.itemTempName,
      description: form.description,
      weight: '',
      class: '',
      nmfcNumber: form.nmfc,
      harmonizedBCode: '',
      hazmat: false,
      stackable: '',
      weightUnit: '',
      dimensions: {length: '', width: '', height: ''}
    };
    console.log('newItemTemplate', this.newItemTemplate);
    this.externalService.saveTemplate(this.newItemTemplate, type).subscribe((response:any) => {
      console.log('response', response);
      if (response.id !== null && response.id !== '') {
        this.itemTemplateNameForm.reset();
        this.itemTemplateData();
        $('#item-save-modal').modal('hide');
        Swal.fire("Saved!","Template is saved successfully!","success",);
      } else {
        Swal.fire("Oops!","Failed to save Template!","error");
      }
    }, (err: any) => {
      console.log('error', err);
      Swal.fire("Oops!","Failed to save Template!","error");
    });
  }

  addressTemplateSave(form: any, type: any, nameForm: any) {
    console.log('form', form);
    if (type === 'address') {
      this.newAddressTemplate = {
        customerId: this.templateId,
        companyId: this.companyId,
        createdOn: new Date(),
        contactNumber: '',
        templateName: nameForm.addressTempName,
        companyName: '',
        contactName: '',
        country: '',
        street1: '',
        street2: '',
        zip: form.consigneeZip,
        city: form.consigneeCity,
        state: form.consigneeState,
        type: 'consignee'
      };
    } else if (type === 'shipperAddress') {
      this.newAddressTemplate = {
        customerId: this.templateId,
        companyId: this.companyId,
        createdOn: new Date(),
        contactNumber: '',
        templateName: nameForm.addressTempName,
        companyName: '',
        contactName: '',
        country: '',
        street1: '',
        street2: '',
        zip: form.shipperZip,
        city: form.shipperCity,
        state: form.shipperState,
        type: 'shipper'
      };
    }

    this.externalService.saveTemplate(this.newAddressTemplate, type).subscribe((response: any) => {
      console.log('response', response);
      if (response.id !== null && response.id !== '') {
        this.addressTemplateNameForm.reset();
        this.addressTemplateData();
        $('#address-save-modal').modal('hide');
        $('#shipper-address-save-modal').modal('hide');
        Swal.fire( "Saved!","Template is saved successfully!","success");
      } else {
        Swal.fire("Oops!","Failed to save Template!","error");
      }
    }, (err: any) => {
      console.log('error', err);
      Swal.fire( "Oops!","Failed to save Template!","error");
    });
  }

  getItemClickValues(id: any) {
    this.openType = 'itemId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      console.log('itemTempAutoFillVal', response);
      this.itemTemplate = response;
      console.log('id', id);
      this.itemTemplateAutoFill = this.itemTemplate[0];
      console.log('val', this.itemTemplateAutoFill);
      this.quickieForm.patchValue({
        // hazMat: '',
        // weight: '',
        description: this.itemTemplateAutoFill.description,
        nmfc: this.itemTemplateAutoFill.nmfcNumber,
        // pieces: ''
      });
      // this.weightUnit = this.itemTemplateAutoFill.weightUnit;
      // this.checkForNumber(1, 'pieces', 'truckload');
      // this.checkForNumber(this.itemTemplateAutoFill.weight, 'weight', 'truckload');
      this.itemTemplateData();
    });
  }

  checkDescription(value: any) {
    console.log('desc');
    console.log('value', value);
    this.description = value;
    this.quickieForm.controls['description'].setValue(this.description);
    if (value !== '') {
      $('#description-modal').modal('show');
      $('#tasknote').focus();
    }
  }

  checkForEnterKey(event: any, type: any ) {
    if (type === 'close') {
      $('#description-modal').modal('hide');
      $('#nmfc').focus();
      event.preventDefault();
    } else if (type === 'descr') {
      this.charArray.push(event.key);
      console.log(this.charArray);
      if (this.charArray.length > 2) {
        this.charArray.forEach((obj: any ,index: any) => {
          console.log(obj);
          if (obj === 'Enter'){
           // console.log(obj);
           if (obj === this.charArray[index-1]) {
             this.closeDescription = true;
             console.log('cgararray',this.charArray);
           }
          }
          
        });
      }
      if (this.closeDescription === true) {
        // $('#closeDescriptionBtn').focus();
        $('#description-modal').modal('hide');
      $('#nmfc').focus();
      this.closeDescription = false;
      this.charArray = [];
        event.preventDefault();
      }
    }
  }

  itemTemplateData() {
    this.itemTemplatesPresent = false;
    this.openType = 'item';
    this.externalService.getTemplate(this.templateId, this.openType).subscribe(response => {
      console.log('itemTempAutoFillVal', response);
      this.itemTemplate = response;
      if (this.itemTemplate.length <= 0) {
        this.itemTemplatesPresent = true;
      }
    });
  }

  getAddressClickValues(id: any, type: any) {
    this.openType = 'addressId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      console.log('addressTempAutoFillVal', response);
      this.addressTemplate = response;
      console.log('id', id);
      this.addressTemplateAutoFill = this.addressTemplate[0];
      console.log('val', this.addressTemplateAutoFill);
      if (type === 'shipperid') {
        this.quickieForm.patchValue({
          shipperZip: this.addressTemplateAutoFill.zip,
          shipperCity: this.addressTemplateAutoFill.city,
          shipperState: this.addressTemplateAutoFill.state
        });
      } else {
        this.quickieForm.patchValue({
          consigneeZip: this.addressTemplateAutoFill.zip,
          consigneeCity: this.addressTemplateAutoFill.city,
          consigneeState: this.addressTemplateAutoFill.state
        });
      }
      this.addressTemplateData();
    });
  }

  addressTemplateData() {
    this.shipperTemplatesPresent = false;
    this.consigneeTemplatesPresent = false;
    this.shipperTemplate1 = [];
    this.consigneeTemplate1 = [];
    this.addressTemplatesPresent = false;
    this.openType = 'address';
    this.externalService.getTemplate(this.companyId, this.openType).subscribe((response: any) => {
      console.log('addressTempAutoFillVal', response);
      this.addressTemplate = response;
      for (let i = 0; i < this.addressTemplate.length; i++) {
        if (response[i].type === 'shipper') {
          console.log('type', response[i].type);
          this.shipperTemplate1.push(response[i]);
        } else if (response[i].type === 'consignee') {
          console.log('type', response[i].type);
          this.consigneeTemplate1.push(response[i]);
        }
      }
      if (this.shipperTemplate1.length <= 0) {
        this.shipperTemplatesPresent = true;
      } else {
        this.shipperTemplate = this.shipperTemplate1;
      }
      if (this.consigneeTemplate1.length <= 0) {
        this.consigneeTemplatesPresent = true;
      } else {
        this.consigneeTemplate = this.consigneeTemplate1;
      }
      // if (this.addressTemplate.length <= 0) {
      //   this.addressTemplatesPresent = true;
      // }
    });
  }

  buildForm() {
    this.quickieForm = this.fb.group({
      customerName: ['', [Validators.required]],
      shipperZip: [this.externalCustomerParseData.zip, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      shipperCity: [this.externalCustomerParseData.city, [Validators.required]],
      shipperState: [this.externalCustomerParseData.state, [Validators.required]],
      consigneeZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      consigneeCity: ['', Validators.required],
      consigneeState: ['', Validators.required],
      hazMat: [false],
      pieces: ['', Validators.required],
      weight: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      description: ['', Validators.required],
      nmfc: [''],
      typeOfEquipment: ['', Validators.required],
      notes: ['', Validators.required],
      competitivePrice: ['', Validators.required],
      shipmentReadyDate: ['', Validators.required],
      requestedDeliveryDate: ['', Validators.required],
      linearFeetOfTrailer: [''],
      serviceLevel: [''],
      length: [''],
      width: [''],
      height: [''],
      stackable: [''],
      handlingUnitType: ['PLT']
    });
    this.addressTemplateNameForm = this.fb.group({
      addressTempName: ['', [Validators.required]]
    });
    this.itemTemplateNameForm = this.fb.group({
      itemTempName: ['', [Validators.required]]
    });
  }

  localStorageSalesData() {
    this.externalCustomer = localStorage.getItem(('SalesRepName'));
    this.externalCustomerParseData = JSON.parse(this.externalCustomer);
    this.accessToken = localStorage.getItem(('accessToken'));
    this.customerType = localStorage.getItem(('customerType'));
    this.templateId = this.externalCustomerParseData.id;
    console.log('name', this.externalCustomerParseData.customerName);
    if (this.customerType === 'admin') {
      this.salesRepId = this.externalCustomerParseData.id;
      this.customerId = 0;
      this.customerName = this.externalCustomerParseData.salesRepName;
      this.companyId = 0;
    } else {
      this.salesRepId = this.externalCustomerParseData.salesRepId;
      this.customerId = this.externalCustomerParseData.id;
      this.customerName = this.externalCustomerParseData.customerName;
      this.companyId = this.externalCustomerParseData.companyId;
    }
    this.addressTemplateData();
    this.itemTemplateData();
  }

  onValueChange(date: any, type: any) {
    if (type === 'shipment') {
      this.shipmentDate = date;
    } else {
      this.deliveryDate = date;
      if (this.deliveryDate !== null) {
        if (this.deliveryDate < this.shipmentDate) {
          this.showMessageForDatePicker = true;
        } else {
          this.showMessageForDatePicker = false;
        }
      }
    }
  }

  checkNumber(value:any) {
    console.log('value', value);
    let num;
    if (isNaN(value)) {
      let numbers = value.match(/\d+/g).map(Number);
      num = numbers[0];
    } else {
      num = value;
    }
    return num;
  }

  changedUnit(weightUnit: any, weight: any, type: any) {
    console.log('value');
    if (weightUnit === 'ea.') {
      this.weightUnit = 'ttl';
      let numberData = this.checkNumber(weight);
      this.total(numberData, type);

    } else {
      this.weightUnit = 'ea.';
      let numberData = this.checkNumber(weight);
      this.total(numberData, type);
    }
  }

  changedDecimal(value: any) {
    let testingValue = value.target.value
    console.log('nm', value.endsWith("s"));
    if (testingValue.endsWith("s") === true || testingValue.endsWith("S")=== true) {
      this.showNmfcErrorMsg = true;
    } else {
      this.showNmfcErrorMsg = false;
    }
// this.billOfLading.patchValue({nmfc: nmfc});

  }

  total(numberData: any, type: any) {
    if (type === 'pieces') {
      //  this.totalPieces = 0;
      //  this.totalWeight = 0;
      this.totalPieces = numberData;
      console.log('this.totalPieces', this.totalPieces);
      console.log('this.weight form value', this.quickieForm.controls['weight'].value);
      if (this.weightUnit === 'ea.') {
        if (this.quickieForm.controls['weight'].value !== '' || this.quickieForm.controls['weight'].value !== null || this.quickieForm.controls['weight'].value !== undefined) {
          this.totalWeight = this.totalPieces * Number(this.quickieForm.controls['weight'].value);
        } else {
          if (type === 'pieces') {
            //  this.totalWeight = 0;
          } else {
            this.totalWeight = numberData;
          }
          // this.totalWeight = this.totalPieces * Number(this.quickieForm.controls.weight.value);
          // this.totalWeight = 0;
        }
      } else {
        // this.totalWeight = numberData;
      }
      console.log('this.totalWeight1', this.totalWeight);
      console.log('this.totalP', this.totalPieces);
    } else {
      if (this.weightUnit === 'ea.') {
        this.totalWeight = this.totalPieces * numberData;
      } else {
        this.totalWeight = numberData;
      }
      console.log('this.totalWeight2', this.totalWeight);
    }
  }

  checkForNumber(value: any, type: any, transportationType: any) {
    console.log('value', value);
    let numberData = this.checkNumber(value);
    console.log('numberData', numberData);
    if (type === 'pieces') {
      if (transportationType === 'truckload') {
        console.log('pieces', numberData);
        this.quickieForm.patchValue({pieces: numberData});
      } else {
        this.quickieForm.patchValue({pieces: numberData});

      }
      this.total(numberData, type);
    } else {
      if (type === 'weight') {
        console.log('weight', numberData);
        if (numberData > 44500) {
          this.showContactCallCenterMsg = true;
        } else {
          this.showContactCallCenterMsg = false;
        }
        if (transportationType === 'truckload') {
          this.quickieForm.patchValue({weight: numberData});
        } else {
          this.quickieForm.patchValue({weight: numberData});
        }
        this.total(numberData, type);

      } else if (type === 'length') {
        console.log('length', numberData);
        this.quickieForm.patchValue({length: numberData});
      } else if (type === 'width') {
        console.log('width', numberData);
        this.quickieForm.patchValue({width: numberData});
      } else if (type === 'height') {
        console.log('height', numberData);
        this.quickieForm.patchValue({height: numberData});
      }
      // else {
      //   if (transportationType === 'truckload') {
      //     console.log('nmfc', numberData);
      //     this.quickieForm.patchValue({nmfc: numberData});
      //   } else {
      //     this.quickieForm.patchValue({nmfc: numberData});
      //   }
      // }
    }
  }


  quickieQuoteTruckLoad(type: any) {
    console.log('type', type);
    if (type === 'truckload') {
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.transportationType = 'truckload';
      this.showTruckloadForm = true;
      this.showVolumeForm = false;
      this.showAirForm = false;
      this.showOceanForm = false;
      this.quickieForm.reset();
      this.quickieForm.patchValue({
        shipperZip: this.externalCustomerParseData.zip,
        shipperState: this.externalCustomerParseData.state,
        shipperCity: this.externalCustomerParseData.city,
        handlingUnitType: 'PLT',
        hazmat: false
      });
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
    } else if (type === 'volume') {
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.transportationType = 'volume';
      this.showVolumeForm = true;
      this.showTruckloadForm = false;
      this.showAirForm = false;
      this.showOceanForm = false;
      this.quickieForm.reset();
      this.quickieForm.patchValue({
        shipperZip: this.externalCustomerParseData.zip,
        shipperState: this.externalCustomerParseData.state,
        shipperCity: this.externalCustomerParseData.city,
        handlingUnitType: 'PLT',
        hazmat: false
      });
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
    } else if (type === 'air') {
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.transportationType = 'air';
      this.showAirForm = true;
      this.showTruckloadForm = false;
      this.showVolumeForm = false;
      this.showOceanForm = false;
      this.quickieForm.reset();
      this.quickieForm.patchValue({
        shipperZip: this.externalCustomerParseData.zip,
        shipperState: this.externalCustomerParseData.state,
        shipperCity: this.externalCustomerParseData.city,
        handlingUnitType: 'PLT',
        hazmat: false

      });
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
    } else if (type === 'ocean') {
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.transportationType = 'ocean';
      this.showOceanForm = true;
      this.showTruckloadForm = false;
      this.showVolumeForm = false;
      this.showAirForm = false;
      this.quickieForm.reset();
      this.quickieForm.patchValue({
        shipperZip: this.externalCustomerParseData.zip,
        shipperState: this.externalCustomerParseData.state,
        shipperCity: this.externalCustomerParseData.city,
        handlingUnitType: 'PLT',
        hazmat: false
      });
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
    }
  }

  getCityState(zip: any, type: any, transportationType: any) {
    let zipcodeResponse: any;
    this.pricingInfoService.getCityState(zip).subscribe(response => {
      zipcodeResponse = response;
      if (zipcodeResponse.length > 0) {
        for (let i = 0; i < zipcodeResponse.length; i++) {
          const city = zipcodeResponse[i].city;
          const state = zipcodeResponse[i].state;
          if (transportationType === 'truckload') {
            if (type === 'origin') {
              this.quickieForm.patchValue({shipperCity: city, shipperState: state});
              this.shipperErrorMessage = false;
            } else {
              this.quickieForm.patchValue({consigneeCity: city, consigneeState: state});
              this.consigneeErrorMessage = false;
            }
          } else {
            if (type === 'origin') {
              this.quickieForm.patchValue({shipperCity: city, shipperState: state});
              this.shipperErrorMessage = false;
            } else {
              this.quickieForm.patchValue({consigneeCity: city, consigneeState: state});
              this.consigneeErrorMessage = false;
            }
          }
        }
      } else {
        if (type === 'origin') {
          this.shipperErrorMessage = true;
        } else {
          this.consigneeErrorMessage = true;
        }
      }
    });
  }

  submit(form: any, quoteType: any) {
    console.log('beforeAssign', this.object);
    this.showLoader = true;
    this.object = {};
    let lineItemArray = [];
    this.object = form;
    this.object.customerName = this.customerName;
    this.object.customerId = this.customerId;
    this.object.salesRepId = this.salesRepId;
    this.object.companyId = this.companyId;
    this.object.quoteType = quoteType;
    this.object.shipperCompanyName = this.externalCustomerParseData.companyName;
    // this.object.shipperContactName = this.externalCustomerParseData.;
    this.object.transportationType = this.transportationType;
    let lineItem = {
      'FreightClass': '',
      'Pieces': form.pieces,
      'HandlingUnitQuantity': form.pieces,
      'HandlingUnitType': form.handlingUnitType,
      'Description': form.description,
      'nmfc': form.nmfc,
      'isHazardous': form.hazMat,
      'PackageQuantity': '',
        'PackageUnitType': 'CTN',
      'Weight': {
        'Units': 'LB',
        'Value': form.weight
      },
      'Dimensions': {
        'Length': '',
        'Width': '',
        'Height': '',
        'Units': 'IN'
      }
    };
    lineItemArray.push(lineItem);
    this.object.lineItem = JSON.stringify(lineItemArray);
    console.log('afterAssign', this.object);
    this.externalService.setRateQuote(this.object).subscribe((response: any) => {
      this.showLoader = false;
      if (response.result === true) {
        this.showAlrightPopUp = true;
        this.showQuoteErrorMsg = false;
      } else {
        this.showAlrightPopUp = false;
        this.showQuoteErrorMsg = true;
      }
    });
  }

  checkEnterKey(event: any, type: any) {
    console.log('checkEnterKey', event);
    let carrierData;
    if (event.which === 13) {
      event.preventDefault();
      if (type === 'handlingUnitQuantity') {
      console.log('checkEnterKey1', event);
      // if (this.serviceCarrierType === 'YRC' ) {
        console.log('checkEnterKey1 Yrc', event);
        //document.getElementById('packageQuantity').focus();
        //event.preventDefault();
        if (type === 'handlingUnitQuantity') {
          console.log('checkEnterKey2 Yrc', event);
          (document.getElementById('packageQuantity')as HTMLFormElement).focus();
          event.preventDefault();
        } else {
          (document.getElementById('weight')as HTMLFormElement).focus();
          event.preventDefault();
        }
      }
       else {
        console.log('checkEnterKey1', event);
      (document.getElementById('weight')as HTMLFormElement).focus();
      event.preventDefault();
    }
  // }
  if (type === 'packageQuantity') {
    (document.getElementById('weight')as HTMLFormElement).focus();
    event.preventDefault();
  }
  if(type === 'weight') {
    console.log('checkEnterKey1 weight', event);
    if (event.target.value !== '') {
      console.log('checkEnterKey1 weight If', event);
    (document.getElementById('desc')as HTMLFormElement).focus();
    event.preventDefault();
  }
  }
  //  } else if (type === 'weight') {
  //     document.getElementById('desc').focus();
  //     event.preventDefault();
  //   }
   if (type === 'desc') {
      (document.getElementById('length')as HTMLFormElement).focus();
      event.preventDefault();
    } else if (type === 'length') {
      (document.getElementById('width')as HTMLFormElement).focus();
      event.preventDefault();
    } else if (type === 'width') {
      (document.getElementById('height')as HTMLFormElement).focus();
      event.preventDefault();
    } else if (type === 'height') {
      console.log('height');
      $('#cpf3').focus();
      (<HTMLInputElement>document.getElementById("cpf3")).focus;
      // document.getElementById('nmfc').focus();
      event.preventDefault();
    }else if(type === 'nmfc') {
      (document.getElementById('classification')as HTMLFormElement).focus();
      event.preventDefault();
    }else if (type === 'classification') {
      (document.getElementById('cube')as HTMLFormElement).focus();
      event.preventDefault();
    } else if (type ==='cube') {
      (document.getElementById('addButton')as HTMLFormElement).focus();
      event.preventDefault();
    }
    }

  }
  activeRequest() {
    this.externalService.setTools('ftl');
    this.router.navigate(['/active_request', 'ftl']);
  }
}
