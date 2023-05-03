import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { classArrayForBillOfLading } from '../app.constant';
import { PricingInfoService } from '../services/pricing-info.service';
import { ExternalService } from '../services/external.service';
import { LoggerService } from '../services/logger.service';
import { IntlenrouteService } from '../services/intlenroute.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-full-ltl-quote',
  templateUrl: './full-ltl-quote.component.html',
  styleUrls: ['./full-ltl-quote.component.css']
})
export class FullLtlQuoteComponent implements OnInit {
  fullRateQuoteForm: FormGroup = new FormGroup({});
  addressTemplateNameForm: FormGroup= new FormGroup({});
  itemTemplateNameForm: FormGroup = new FormGroup({});
  public showForm = true;
  public showFieldForTruckloadForm = true;
  public showFieldForVolumeForm = false;
  public showFieldForAirForm = false;
  public showFieldForOceanForm = false;
  public shipperErrorMessage = false;
  public consigneeErrorMessage = false;
  public showAddedValue = false;
  public showAddField = true;
  public showLoader = false;
  public showAlrightPopUp = false;
  public classArray;
  public externalCustomer:any;
  public accessToken:any;
  public externalCustomerParseData:any;
  public salesRepId:any;
  public customerType:any;
  public weightUnit = 'ttl';
  public weightUnitArray:any = [];
  public detailArray:any = [];
  public customerFeatures:any;
  public transportationType = 'truckload';
  public totalPieces = 0;
  public totalWeight = 0;
  public logger:any;
  public shipmentDate:any;
  setFlagForExisting:any;
  public deliveryDate:any;
  public customerId:any;
  public customerName:any;
  public requestObject: any;
  public currentDate = new Date();
  public showErrorCustomer = false;
  public showTruckload = true;
  public showVolume = false;
  public showAir = false;
  public showOcean = false;
  public showMessageForDatePicker = false;
  public showContactCallCenterMsg = false;
  public showQuoteErrorMsg = false;
  public showNmfcErrorMsg:any;
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
  public contactNumber:any;
  public shipperTemplate:any = [];
  public consigneeTemplate:any = [];
  public shipperTemplatesPresent = false;
  public consigneeTemplatesPresent = false;
  public shipperTemplate1:any = [];
  public consigneeTemplate1:any = [];
  public handlingUnitTypeArray = ['CTN', 'PLT', 'PCS', 'DRM'];
  public showContactCallCenterMsgForTotalWeight = false;
  public companyId:any;
  description: any;
  closeDescription = false;
  charArray:any = [];
  warehouseAddress: any;
  WMSSubscription: any = Subscription;
  inventoryItems: any;
  wmsFlow = false;
  detailArrIndex: any;

  constructor(private router: Router, private fb: FormBuilder, private pricingInfoService: PricingInfoService,
    private externalService: ExternalService, public loggerService: LoggerService, private intl: IntlenrouteService) {
    this.classArray = classArrayForBillOfLading;
    this.localStorageSalesData();
  }

  ngOnInit() {
    this.buildForm();
    // this.getShipperName();
    this.WMSSubscription = this.intl.ftlRoutingSubjectObservable.subscribe((element) => {
      console.log(element);
      this.inventoryItems = element;
    })

    if (this.inventoryItems === null) {
      this.normalFtlFlow();
    } else {
      this.intl.getWarehouseAddress(this.accessToken).subscribe((res) => {
        this.warehouseAddress = res;
        this.warehouseFlow();
      });
      this.wmsFlow = true;
    }
    console.log(this.inventoryItems)
  }
  ngOnDestroy() {
    let apiObject = null;
    this.intl.setFtlRoutingData(apiObject);
    this.WMSSubscription.unsubscribe();
  }
  eventHandler(event:any) {
    console.log('1', event, event.keyCode, event.keyIdentifier);
    console.log('2', event.keyCode);
    console.log('3', event.keyIdentifier);
    if (event.which === '13') {
      event.preventDefault();
    }
  }

  checkDescription(value:any) {
    console.log('desc');
    console.log('value', value);
    this.description = value;
    this.fullRateQuoteForm.controls['description'].setValue(this.description);
    if (value !== '') {
      $('#description-modal').modal('show');
      $('#tasknote').focus();
    }
  }

  checkForEnterKey(event:any, type:any) {
    if (type === 'close') {
      $('#description-modal').modal('hide');
      $('#classification').focus();
      event.preventDefault();
    } else if (type === 'descr') {
      this.charArray.push(event.key);
      console.log(this.charArray);
      if (this.charArray.length > 2) {
        this.charArray.forEach((obj:any, index:any) => {
          console.log(obj);
          if (obj === 'Enter') {
            // console.log(obj);
            if (obj === this.charArray[index - 1]) {
              this.closeDescription = true;
              console.log('cgararray', this.charArray);
            }
          }

        });
      }
      if (this.closeDescription === true) {
        // $('#closeDescriptionBtn').focus();
        $('#description-modal').modal('hide');
        $('#classification').focus();
        this.closeDescription = false;
        this.charArray = [];
        event.preventDefault();
      }
    }
  }
  itemTemplateIndex(index:any) {
    this.itemIndex = index;
    console.log('itemIndex', this.itemIndex);
    console.log('detailArray', this.detailArray[index]);
  }
  itemTemplateSave(form:any, type:any, nameForm:any) {
    console.log('form', form);
    this.newItemTemplate = {
      customerId: this.templateId,
      companyId: this.companyId,
      createdOn: new Date(),
      templateName: nameForm.itemTempName,
      description: this.detailArray[this.itemIndex].Description,
      weight: '',
      class: this.detailArray[this.itemIndex].FreightClass,
      nmfcNumber: this.detailArray[this.itemIndex].nmfc,
      harmonizedBCode: '',
      hazmat: false,
      stackable: false,
      weightUnit: '',
      dimensions: {
        length: '', width: '',
        height: ''
      }
    };
    console.log('newItemTemplate', this.newItemTemplate);
    this.externalService.saveTemplate(this.newItemTemplate, type).subscribe((response:any) => {
      console.log('response', response);
      if (response.id !== null && response.id !== '') {
        this.itemTemplateNameForm.reset();
        this.itemTemplateData();
        $('#item-save-modal').modal('hide');
        Swal.fire({
          title: "Saved!",
          text: "Template is saved successfully!",
          icon: "success",

        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Failed to save Template!",
          icon: "error"
        });
      }
    }, (err:any) => {
      console.log('error', err);
      Swal.fire({
        title: "Oops!",
        text: "Failed to save Template!",
        icon: "error"
      });
    });
  }
  addressTemplateSave(form:any, type:any, nameForm:any) {
    console.log('form', form);
    if (type === 'address') {
      this.newAddressTemplate = {
        customerId: this.templateId,
        companyId: this.companyId,
        createdOn: new Date(),
        contactNumber: form.consigneePhone,
        templateName: nameForm.addressTempName,
        companyName: form.consigneeCompany,
        contactName: form.consigneeContactName,
        country: form.consigneeCountry,
        street1: form.consigneeStreet1,
        street2: form.consigneeStreet2,
        zip: form.consigneeZip,
        city: form.consigneeCity,
        state: form.consigneeState,
        type: 'consignee'
      };
    } else if (type === 'shipperAddress') {
      this.newAddressTemplate = {
        customerId: this.templateId,
        createdOn: new Date(),
        contactNumber: form.shipperPhone,
        templateName: nameForm.addressTempName,
        companyName: form.shipperCompanyName,
        contactName: form.shipperContactName,
        country: form.shipperCountry,
        street1: form.shipperStreet1,
        street2: form.shipperStreet2,
        zip: form.shipperZip,
        city: form.shipperCity,
        state: form.shipperState,
        type: 'shipper'
      };
    }

    this.externalService.saveTemplate(this.newAddressTemplate, type).subscribe((response:any) => {
      console.log('response', response);
      if (response.id !== null && response.id !== '') {
        this.addressTemplateNameForm.reset();
        this.addressTemplateData();
        $('#address-save-modal').modal('hide');
        $('#shipper-address-save-modal').modal('hide');
        Swal.fire({
          title: "Saved!",
          text: "Template is saved successfully!",
          icon: "success",

        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Failed to save Template!",
          icon: "error"
        });
      }
    }, (err:any) => {
      console.log('error', err);
      Swal.fire({
        title: "Oops!",
        text: "Failed to save Template!",
        icon: "error"
      });
    });
  }

  getItemClickValues(id:any) {
    this.openType = 'itemId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      console.log('itemTempAutoFillVal', response);
      this.itemTemplate = response;
      console.log('id', id);
      this.itemTemplateAutoFill = this.itemTemplate[0];
      console.log('val', this.itemTemplateAutoFill);
      this.fullRateQuoteForm.patchValue({
        // hazMat: '',
        // weight: '',
        description: this.itemTemplateAutoFill.description,
        // length: '',
        // width: '',
        // height: '',
        nmfc: this.itemTemplateAutoFill.nmfcNumber,
        classification: this.itemTemplateAutoFill.class,
        // pieces: '',
        // stackable: ''
      });
      // this.weightUnit = '';
      this.itemTemplateData();
    });
  }

  itemTemplateData() {
    this.itemTemplatesPresent = false;
    this.openType = 'item';
    this.externalService.getTemplate(this.companyId, this.openType).subscribe(response => {
      console.log('itemTempAutoFillVal', response);
      this.itemTemplate = response;
      if (this.itemTemplate.length <= 0) {
        this.itemTemplatesPresent = true;
      }
    });
  }

  getAddressClickValues(id:any, type:any) {
    this.openType = 'addressId';
    this.externalService.getTemplate(id, this.openType).subscribe(response => {
      console.log('addressTempAutoFillVal', response);
      this.addressTemplate = response;
      console.log('id', id);
      this.addressTemplateAutoFill = this.addressTemplate[0];
      console.log('val', this.addressTemplateAutoFill);
      if (type === 'shipperid') {
        this.fullRateQuoteForm.patchValue({
          shipperCompanyName: this.addressTemplateAutoFill.companyName,
          shipperContactName: this.addressTemplateAutoFill.contactName,
          shipperPhone: this.addressTemplateAutoFill.contactNumber,
          shipperStreet1: this.addressTemplateAutoFill.street1,
          shipperStreet2: this.addressTemplateAutoFill.street2,
          shipperZip: this.addressTemplateAutoFill.zip,
          shipperCity: this.addressTemplateAutoFill.city,
          shipperState: this.addressTemplateAutoFill.state
        });
      } else {
        this.fullRateQuoteForm.patchValue({
          consigneeCompany: this.addressTemplateAutoFill.companyName,
          consigneeContactName: this.addressTemplateAutoFill.contactName,
          consigneePhone: this.addressTemplateAutoFill.contactNumber,
          consigneeStreet1: this.addressTemplateAutoFill.street1,
          consigneeStreet2: this.addressTemplateAutoFill.street2,
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
    this.externalService.getTemplate(this.companyId, this.openType).subscribe((response:any) => {
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
    this.fullRateQuoteForm = this.fb.group({
      customerName: ['', [Validators.required]],
      shipperCompanyName: ['', [Validators.required]],
      shipperContactName: ['', [Validators.required]],
      shipperPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      shipperStreet1: ['', [Validators.required]],
      shipperStreet2: [''],
      shipperCountry: ['USA', Validators.required],
      shipperZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      shipperCity: ['', Validators.required],
      shipperState: ['', Validators.required],
      consigneeCompany: ['', Validators.required],
      consigneeContactName: [''],
      consigneePhone: ['', Validators.required],
      consigneeStreet1: ['', Validators.required],
      consigneeStreet2: [''],
      consigneeCity: ['', Validators.required],
      consigneeState: ['', Validators.required],
      consigneeCountry: ['USA', Validators.required],
      consigneeZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      hazmat: [false],
      pieces: [''],
      weight: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      classification: [''],
      description: [],
      length: [''],
      width: [''],
      height: [''],
      nmfc: [''],
      stackable: [false],
      notes: ['', Validators.required],
      typeOfEquipment: [''],
      linearFeetOfTrailer: [''],
      serviceLevel: [''],
      competitivePrice: ['', Validators.required],
      shipmentReadyDate: ['', Validators.required],
      requestedDeliveryDate: ['', Validators.required],
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
    this.templateId = this.externalCustomerParseData.id;
    this.accessToken = localStorage.getItem(('accessToken'));
    this.customerType = localStorage.getItem(('customerType'));
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
    if (this.externalCustomerParseData.contactNumber !== undefined && this.externalCustomerParseData.contactNumber !== null && this.externalCustomerParseData.contactNumber !== '') {
      if (this.externalCustomerParseData.contactNumber.length > 10) {
        this.contactNumber = this.externalCustomerParseData.contactNumber;
      } else {
        this.contactNumber = this.formatPhoneNumber(this.externalCustomerParseData.contactNumber);
      }
    }
    this.addressTemplateData();
    this.itemTemplateData();
  }
  warehouseFlow() {
    this.fullRateQuoteForm.patchValue({
      customerName: this.externalCustomerParseData.customerName,
      shipperCompanyName: this.warehouseAddress[0].name,
      shipperContactName: this.warehouseAddress[0].contactPerson,
      shipperPhone: this.warehouseAddress[0].contactNumber,
      shipperStreet1: this.warehouseAddress[0].street,
      shipperStreet2: '',
      shipperCountry: 'USA',
      shipperZip: this.warehouseAddress[0].zip,
      shipperCity: this.warehouseAddress[0].city,
      shipperState: this.warehouseAddress[0].state,
      consigneeCompany: this.externalCustomerParseData.companyName,
      consigneeContactName: this.externalCustomerParseData.customerName,
      consigneePhone: this.contactNumber,
      consigneeStreet1: this.externalCustomerParseData.address,
      consigneeStreet2: '',
      consigneeCity: this.externalCustomerParseData.city,
      consigneeState: this.externalCustomerParseData.state,
      consigneeCountry: 'USA',
      consigneeZip: this.externalCustomerParseData.zip
    });
    this.patchWmsLineItems();
  }

  patchWmsLineItems() {
    this.detailArray = this.inventoryItems.map((item:any) => ({
      'warehouseId' : item.id,
      'controlNumber' : item.controlNumber,
      'stackable': false,
      'isHazardous': false,
      'FreightClass': '65',
      'Pieces': item.createOrderPieces,
      'HandlingUnitQuantity': item.createOrderSkd,
      'HandlingUnitType': '',
      'Description': item.description,
      'nmfc': '',
      'weightUnit': this.weightUnit,
      'PackageQuantity': item.createOrderCtns,
      'PackageUnitType': 'PLT',
      'Weight': {
        'Units': 'LB',
        'Value': item.createOrderWeight
      },
      'Dimensions': {
        'Length': '',
        'Width': '',
        'Height': '',
        'Units': 'IN'
      }
    }));
    console.log(this.detailArray);
    this.showAddedValue = true;
    this.addpiecesWeight();
    console.log(this.inventoryItems)
  }

  normalFtlFlow() {
    this.fullRateQuoteForm.patchValue({
      customerName: this.externalCustomerParseData.customerName,
      shipperCompanyName: this.externalCustomerParseData.companyName,
      shipperContactName: this.externalCustomerParseData.customerName,
      shipperPhone: this.contactNumber,
      shipperStreet1: this.externalCustomerParseData.address,
      shipperStreet2: '',
      shipperCountry: 'USA',
      shipperZip: this.externalCustomerParseData.zip,
      shipperCity: this.externalCustomerParseData.city,
      shipperState: this.externalCustomerParseData.state
    })
  }

  // getShipperName() {
  //   this.pricingInfoService.getAllCustomerName(this.accessToken).subscribe(getCustomerData => {
  //     this.customerFeatures = getCustomerData;
  //     this.logger = {
  //       'method': 'getArForm',
  //       'message': 'Customers assigned to this salesrepId',
  //       'CustomerDetail ': this.salesRepId
  //     };
  //     this.loggerService.info(this.logger);
  //   });
  // }

  // getData(value) {
  //   if (value === true) {
  //     this.showErrorCustomer = true;
  //     setTimeout(() => {
  //       this.showErrorCustomer = false;
  //       this.fullRateQuoteForm.patchValue({shipperCompanyName: ''});
  //     }, 2000);
  //   } else {
  //     this.showErrorCustomer = false;
  //   }
  // }

  fullRateQuote(type:any) {
    this.transportationType = 'truckload';
    if (type === 'truckload') {
      this.transportationType = type;
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.showFieldForTruckloadForm = true;
      this.showFieldForVolumeForm = false;
      this.showFieldForAirForm = false;
      this.showFieldForOceanForm = false;
      this.fullRateQuoteForm.reset();
      if (this.wmsFlow === true) {
        this.warehouseFlow();
      } else {
        if (this.externalCustomerParseData.contactNumber !== undefined && this.externalCustomerParseData.contactNumber !== null && this.externalCustomerParseData.contactNumber !== '') {
          if (this.externalCustomerParseData.contactNumber.length > 10) {
            this.contactNumber = this.externalCustomerParseData.contactNumber;
          } else {
            this.contactNumber = this.formatPhoneNumber(this.externalCustomerParseData.contactNumber);
          }
        }
        this.fullRateQuoteForm.patchValue({
          customerName: this.externalCustomerParseData.customerName,
          shipperCompanyName: this.externalCustomerParseData.companyName,
          shipperContactName: this.externalCustomerParseData.customerName,
          shipperPhone: this.contactNumber,

          shipperStreet1: this.externalCustomerParseData.address,
          shipperCountry: 'USA',
          shipperZip: this.externalCustomerParseData.zip,
          shipperState: this.externalCustomerParseData.state,
          shipperCity: this.externalCustomerParseData.city,
          consigneeCountry: 'USA',
          handlingUnitType: 'PLT',
          hazmat: false,
          stackable: false
        });
        (<HTMLInputElement>document.getElementById("cpf3")).value = '';
        console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
        this.detailArray = [];
      }
      this.showTruckload = true;
      this.showVolume = false;
      this.showAir = false;
      this.showOcean = false;
    } else if (type === 'volume') {
      this.transportationType = type;
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.showForm = true;
      this.showFieldForTruckloadForm = false;
      this.showFieldForVolumeForm = true;
      this.showFieldForAirForm = false;
      this.showFieldForOceanForm = false;
      this.fullRateQuoteForm.reset();
      if (this.wmsFlow === true) {
        this.warehouseFlow();
      } else {
        if (this.externalCustomerParseData.contactNumber !== undefined && this.externalCustomerParseData.contactNumber !== null && this.externalCustomerParseData.contactNumber !== '') {
          if (this.externalCustomerParseData.contactNumber.length > 10) {
            this.contactNumber = this.externalCustomerParseData.contactNumber;
          } else {
            this.contactNumber = this.formatPhoneNumber(this.externalCustomerParseData.contactNumber);
          }
        }
        this.fullRateQuoteForm.patchValue({
          customerName: this.externalCustomerParseData.customerName,
          shipperCompanyName: this.externalCustomerParseData.companyName,
          shipperContactName: this.externalCustomerParseData.customerName,
          shipperPhone: this.contactNumber,
          shipperStreet1: this.externalCustomerParseData.address,
          shipperCountry: 'USA',
          shipperZip: this.externalCustomerParseData.zip,
          shipperState: this.externalCustomerParseData.state,
          shipperCity: this.externalCustomerParseData.city,
          consigneeCountry: 'USA',
          handlingUnitType: 'PLT',
          hazmat: false,
          stackable: false
        });
        (<HTMLInputElement>document.getElementById("cpf3")).value = '';
        console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
        this.detailArray = [];
      }
      this.showTruckload = false;
      this.showVolume = true;
      this.showAir = false;
      this.showOcean = false;
    } else if (type === 'air') {
      this.transportationType = type;
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.showForm = true;
      this.showFieldForTruckloadForm = false;
      this.showFieldForVolumeForm = false;
      this.showFieldForAirForm = true;
      this.showFieldForOceanForm = false;
      this.fullRateQuoteForm.reset();
      if (this.wmsFlow === true) {
        this.warehouseFlow();
      } else {
        if (this.externalCustomerParseData.contactNumber !== undefined && this.externalCustomerParseData.contactNumber !== null && this.externalCustomerParseData.contactNumber !== '') {
          if (this.externalCustomerParseData.contactNumber.length > 10) {
            this.contactNumber = this.externalCustomerParseData.contactNumber;
          } else {
            this.contactNumber = this.formatPhoneNumber(this.externalCustomerParseData.contactNumber);
          }
        }
        this.fullRateQuoteForm.patchValue({
          customerName: this.externalCustomerParseData.customerName,
          shipperCompanyName: this.externalCustomerParseData.companyName,
          shipperContactName: this.externalCustomerParseData.customerName,
          shipperPhone: this.contactNumber,
          shipperStreet1: this.externalCustomerParseData.address,
          shipperCountry: 'USA',
          shipperZip: this.externalCustomerParseData.zip,
          shipperState: this.externalCustomerParseData.state,
          shipperCity: this.externalCustomerParseData.city,
          consigneeCountry: 'USA',
          handlingUnitType: 'PLT',
          hazmat: false,
          stackable: false
        });
        (<HTMLInputElement>document.getElementById("cpf3")).value = '';
        console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
        this.detailArray = [];
      }
      this.showTruckload = false;
      this.showVolume = false;
      this.showAir = true;
      this.showOcean = false;
    } else {
      this.transportationType = type;
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.showForm = true;
      this.showFieldForTruckloadForm = false;
      this.showFieldForVolumeForm = false;
      this.showFieldForAirForm = false;
      this.showFieldForOceanForm = true;
      this.fullRateQuoteForm.reset();
      if (this.wmsFlow === true) {
        this.warehouseFlow();
      } else {
        if (this.externalCustomerParseData.contactNumber !== undefined && this.externalCustomerParseData.contactNumber !== null && this.externalCustomerParseData.contactNumber !== '') {
          if (this.externalCustomerParseData.contactNumber.length > 10) {
            this.contactNumber = this.externalCustomerParseData.contactNumber;
          } else {
            this.contactNumber = this.formatPhoneNumber(this.externalCustomerParseData.contactNumber);
          }
        }
        this.fullRateQuoteForm.patchValue({
          customerName: this.externalCustomerParseData.customerName,
          shipperCompanyName: this.externalCustomerParseData.companyName,
          shipperContactName: this.externalCustomerParseData.customerName,
          shipperPhone: this.contactNumber,
          shipperStreet1: this.externalCustomerParseData.address,
          shipperCountry: 'USA',
          shipperZip: this.externalCustomerParseData.zip,
          shipperState: this.externalCustomerParseData.state,
          shipperCity: this.externalCustomerParseData.city,
          consigneeCountry: 'USA',
          handlingUnitType: 'PLT',
          hazmat: false,
          stackable: false
        });
        (<HTMLInputElement>document.getElementById("cpf3")).value = '';
        console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
        this.detailArray = [];
      }
      this.showTruckload = false;
      this.showVolume = false;
      this.showAir = false;
      this.showOcean = true;
    }
  }

  getCityState(zip:any, type:any) {
    let zipcodeResponse: any;
    this.pricingInfoService.getCityState(zip).subscribe(response => {
      zipcodeResponse = response;
      if (zipcodeResponse.length > 0) {
        for (let i = 0; i < zipcodeResponse.length; i++) {
          let city = zipcodeResponse[i].city;
          let state = zipcodeResponse[i].state;
          if (type === 'origin') {
            this.fullRateQuoteForm.patchValue({ shipperCity: city, shipperState: state });
            this.shipperErrorMessage = false;
          } else {
            this.fullRateQuoteForm.patchValue({ consigneeCity: city, consigneeState: state });
            this.shipperErrorMessage = false;
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

  onValueChange(date:any, type:any) {
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

  changedDecimal(value1:any) {
    let value =value1.target.value
    console.log('nm', value.endsWith("s"));
    if (value.endsWith("s") === true || value.endsWith("S") === true) {
      this.showNmfcErrorMsg = true;
    } else {
      this.showNmfcErrorMsg = false;
    }
    // this.billOfLading.patchValue({nmfc: nmfc});

  }


  checkNumber(value:any) {
    let num;
    if (isNaN(value)) {
      let numbers = value.match(/\d+/g).map(Number);
      num = numbers[0];
    } else {
      num = value;
    }
    return num;
  }

  formatPhoneNumber(s:any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }

  checkPhoneNumber(value:any, type:any) {
    let phoneNumber = this.formatPhoneNumber(value);
    if (type === 'consignee') {
      this.fullRateQuoteForm.patchValue({ consigneePhone: phoneNumber });
    } else {
      this.fullRateQuoteForm.patchValue({ shipperPhone: phoneNumber });
    }
  }

  checkForNumber(value:any, type:any) {
    let numberData = this.checkNumber(value);
    if (type === 'pieces') {
      this.fullRateQuoteForm.patchValue({ pieces: numberData });
    } else {
      if (type === 'weight') {
        if (numberData > 44500) {
          this.showContactCallCenterMsg = true;
        } else {
          this.showContactCallCenterMsg = false;
        }
        this.fullRateQuoteForm.patchValue({ weight: numberData });
      } else if (type === 'length') {
        this.fullRateQuoteForm.patchValue({ length: numberData });
      } else if (type === 'width') {
        this.fullRateQuoteForm.patchValue({ width: numberData });
      } else if (type === 'height') {
        this.fullRateQuoteForm.patchValue({ height: numberData });
      } else {
        this.fullRateQuoteForm.patchValue({ nmfc: numberData });
      }
    }

  }

  addArrayValues(value:any) {
    let total = 0;
    value.forEach(function (key:any) {
      total = total + Number(key);
    });
    return total;
  }

  changedUnit(weightUnit:any, weight:any) {
    if (weightUnit === 'ea.') {
      this.weightUnit = 'ttl';
    } else if (weightUnit === 'ttl') {
      this.weightUnit = 'ea.';
    }
  }

  addRow(fullRateQuoteForm:any) {
    let object = {};
    if(this.inventoryItems !== null) {
      if (fullRateQuoteForm.pieces !== '' && fullRateQuoteForm.weight !== '' &&
      fullRateQuoteForm.length !== '' && fullRateQuoteForm.width !== '' &&
      fullRateQuoteForm.height !== '') {
      this.detailArray[this.detailArrIndex].stackable = fullRateQuoteForm.stackable;
      this.detailArray[this.detailArrIndex].isHazardous = fullRateQuoteForm.hazmat;
      this.detailArray[this.detailArrIndex].FreightClass = fullRateQuoteForm.classification;
      this.detailArray[this.detailArrIndex].nmfc = fullRateQuoteForm.nmfc;
      this.detailArray[this.detailArrIndex].Dimensions.Length = fullRateQuoteForm.length;
      this.detailArray[this.detailArrIndex].Dimensions.Width = fullRateQuoteForm.width;
      this.detailArray[this.detailArrIndex].Dimensions.Height = fullRateQuoteForm.height;
      this.detailArray[this.detailArrIndex].Units = 'IN';
      } else {
        this.detailArray[this.detailArrIndex].stackable = fullRateQuoteForm.stackable;
      this.detailArray[this.detailArrIndex].isHazardous = fullRateQuoteForm.hazmat;
      this.detailArray[this.detailArrIndex].FreightClass = fullRateQuoteForm.classification;
      this.detailArray[this.detailArrIndex].nmfc = fullRateQuoteForm.nmfc;
      this.detailArray[this.detailArrIndex].Dimensions.Length = '';
      this.detailArray[this.detailArrIndex].Width = '';
      this.detailArray[this.detailArrIndex].Height = '';
      this.detailArray[this.detailArrIndex].Units = 'IN';
      }
    }else {
      if (fullRateQuoteForm.pieces !== '' && fullRateQuoteForm.weight !== '' &&
      fullRateQuoteForm.length !== '' && fullRateQuoteForm.width !== '' &&
      fullRateQuoteForm.height !== '') {
      object = {
        'stackable': fullRateQuoteForm.stackable,
        'isHazardous': fullRateQuoteForm.hazmat,
        'FreightClass': fullRateQuoteForm.classification,
        'PackageQuantity': fullRateQuoteForm.pieces,
        'PackageUnitType': 'PLT',
        'HandlingUnitQuantity': fullRateQuoteForm.pieces,
        'HandlingUnitType': fullRateQuoteForm.handlingUnitType,
        'Pieces': fullRateQuoteForm.pieces,
        'weightUnit': this.weightUnit,
        'Description': fullRateQuoteForm.description,
        'nmfc': fullRateQuoteForm.nmfc,
        'Weight': {
          'Units': 'LB',
          'Value': fullRateQuoteForm.weight
        },
        'Dimensions': {
          'Length': fullRateQuoteForm.length,
          'Width': fullRateQuoteForm.width,
          'Height': fullRateQuoteForm.height,
          'Units': 'IN'
        }

      };
    } else {
      object = {
        'stackable': fullRateQuoteForm.stackable,
        'isHazardous': fullRateQuoteForm.hazmat,
        'FreightClass': fullRateQuoteForm.classification,
        'Pieces': fullRateQuoteForm.pieces,
        'HandlingUnitQuantity': fullRateQuoteForm.pieces,
        'HandlingUnitType': fullRateQuoteForm.handlingUnitType,
        'Description': fullRateQuoteForm.description,
        'nmfc': fullRateQuoteForm.nmfc,
        'weightUnit': this.weightUnit,
        'PackageQuantity': fullRateQuoteForm.pieces,
        'PackageUnitType': 'PLT',
        'Weight': {
          'Units': 'LB',
          'Value': fullRateQuoteForm.weight
        },
        'Dimensions': {
          'Length': '',
          'Width': '',
          'Height': '',
          'Units': 'IN'
        }
      };
    }
    this.detailArray.push(object);
    }
    

    console.log('deArray', this.detailArray);
    this.fullRateQuoteForm.patchValue({
      hazmat: false,
      pieces: '',
      weight: '',
      description: '',
      length: '',
      width: '',
      height: '',
      nmfc: '',
      classification: '',
      stackable: false
    });
    this.addpiecesWeight();
    (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    console.log((<HTMLInputElement>document.getElementById("cpf3")).value);

  }

  addpiecesWeight() {
    let piecesArray = [], weightArray = [];
    let totalWeight;
    if (this.detailArray.length > 0) {
      this.showAddField = true;
      this.showAddedValue = true;
      for (let d = 0; d < this.detailArray.length; d++) {
        let addPieces = this.detailArray[d].Pieces;
        let addWeight = this.detailArray[d].Weight.Value;

        if (this.detailArray[d].weightUnit === 'ea.') {
          totalWeight = Number(addPieces) * Number(addWeight);
          weightArray.push(totalWeight);
          console.log('weightArray', weightArray);
        } else {
          totalWeight = Number(addWeight);
          weightArray.push(totalWeight);
          console.log('weightArray', weightArray);
        }
        piecesArray.push(addPieces);

      }

      this.totalPieces = this.addArrayValues(piecesArray);
      this.totalWeight = this.addArrayValues(weightArray);
      if (Number(this.totalWeight) > 44500) {
        this.showContactCallCenterMsgForTotalWeight = true;
      } else {
        this.showContactCallCenterMsgForTotalWeight = false;
      }
      console.log('this.totalPieces', this.totalPieces, this.totalWeight);
    } else {
      this.showAddedValue = false;
    }
  }

  deleteRow(index:any) {
    this.detailArray.splice(index, 1);
    let weightArray = [], piecesArray = [], totalWeight;
    if (this.detailArray.length > 0) {
      this.showAddField = true;
      this.showAddedValue = true;
      this.showAddField = true;
      this.showAddedValue = true;
      for (let d = 0; d < this.detailArray.length; d++) {
        let addPieces = this.detailArray[d].Pieces;
        let addWeight = this.detailArray[d].Weight.Value;
        if (this.detailArray[d].weightUnit === 'ea.') {
          totalWeight = Number(addPieces) * Number(addWeight);
          weightArray.push(totalWeight);
          console.log('weightArray', weightArray);
        } else {
          totalWeight = Number(addWeight);
          weightArray.push(totalWeight);
          console.log('weightArray', weightArray);
        }
        piecesArray.push(addPieces);
      }
      this.totalPieces = this.addArrayValues(piecesArray);
      this.totalWeight = this.addArrayValues(weightArray);
      console.log('this.totalPieces', this.totalPieces, this.totalWeight);
    } else {
      this.totalPieces = 0;
      this.totalWeight = 0;
      this.showAddField = true;
      this.showAddedValue = false;
    }

  }

  editRow(row:any, i:any) {
    console.log(row,i)
    this.detailArrIndex = i;
    this.showAddField = false;
    if (row.Dimensions === undefined) {
      this.fullRateQuoteForm.patchValue({
        pieces: row.Pieces,
        weight: row.Weight.Value,
        classification: row.FreightClass,
        hazmat: row.isHazardous,
        stackable: row.stackable
      });
    } else {
      this.fullRateQuoteForm.patchValue({
        pieces: row.Pieces,
        weight: row.Weight.Value,
        description: row.Description,
        length: row.Dimensions.Length,
        width: row.Dimensions.Width,
        height: row.Dimensions.Height,
        nmfc: row.nmfc,
        classification: row.FreightClass,
        hazmat: row.isHazardous,
        stackable: row.stackable
      });
    }
    setTimeout(() => {
      (document.getElementById('pieces')as HTMLFormElement).focus();
    },1000);
  }

  updateRow(value:any) {
    if (this.inventoryItems === null) {
      this.detailArray.splice(this.detailArrIndex, 1);
      this.addRow(value);
    } else {
      this.addRow(value);
    }
    
  }

  submit(value:any, quoteType:any) {
    this.showLoader = true;
    this.requestObject = {};
    let wmsItems = [];
    this.requestObject = value;
    if(this.inventoryItems !== null) {
      this.requestObject.createdVia = 'warehouse';
      wmsItems = this.detailArray.map((ele:any) => ({
        'warehouseId' : ele.warehouseId,
        'controlNumber' : ele.controlNumber,
        'skd' : Number(ele.HandlingUnitQuantity),
        'ctns' : Number(ele.PackageQuantity),
        'pieces' : Number(ele.Pieces),
        'weight' : Number(ele.Weight.Value),
        'description' : ele.Description
      }));
      for( let i in this.detailArray ) {
        delete this.detailArray[i].warehouseId;
        delete this.detailArray[i].controlNumber;
        }
      this.requestObject.warehouseItems = wmsItems;
    } else {
      this.requestObject.createdVia = 'ftl';
    }
    
    this.requestObject.customerId = this.customerId;
    this.requestObject.customerName = this.customerName;
    this.requestObject.salesRepId = this.salesRepId;
    this.requestObject.companyId = this.companyId;
    this.requestObject.lineItem = JSON.stringify(this.detailArray);
    this.requestObject.quoteType = quoteType;
    this.requestObject.transportationType = this.transportationType;
    console.log(this.requestObject);
    this.externalService.setRateQuote(this.requestObject).subscribe((response:any) => {
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

  checkEnterKey(event:any, type:any) {
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
      if (type === 'weight') {
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
      } else if (type === 'nmfc') {
        (document.getElementById('classification')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'classification') {
        (document.getElementById('cube')as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'cube') {
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
