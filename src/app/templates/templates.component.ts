import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { classArrayForBillOfLading } from '../app.constant';
import { ExternalService } from '../services/external.service';
import { PricingInfoService } from '../services/pricing-info.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  addressTemplateForm: FormGroup = new FormGroup({});
  searchAddressForm: FormGroup = new FormGroup({});
  itemTemplateForm: FormGroup = new FormGroup({});
  searchItemForm: FormGroup = new FormGroup({});
  public showForItemCreateTemplate = false;
  public showForAddressCreateTemplate = false;
  public showForAddress = true;
  public showForItem = false;
  public invalidZipMsg = false;
  public showTemplateAddressValues = false;
  public showTemplateItemValues = false;
  public salesRep: any;
  public accessToken: any;
  public salesRepValues: any;
  public salesRepType: any;
  public customerType: any;
  public salesRepId: any;
  public getZipCode: any;
  public openType = 'address';
  public templateDetails: any;
  public companyNames: any;
  public uniqueCompanyNames: any;
  public unniquetemplateDetails: any;
  public editIndex: any;
  public showUpdateDetail = false;
  public completeForm: any;
  public searchData: any;
  public showLoader = false;
  public searchErrorMessage = false;
  public showNmfcErrorMsg = false;
  public showCreateErrorMsg = false;
  public customerId: any;
  public companyId: any;
  public clearNFMC: any;
  public phoneNumber: any;
  public deleteIndex: any;
  public weightUnit = 'ea.';
  public p = 1;
  public numberPerPage: any;
  public numberOfPages = [5, 10, 15];
  classificationArray = classArrayForBillOfLading;
  public NmfcNull = true;
  public selectPagination: any;
  constructor(private fb: FormBuilder,
    private externalService: ExternalService,
    private pricingInfoService: PricingInfoService) {
  }

  ngOnInit() {
    this.buildForm();
    this.localStorageSalesData();
    if (this.customerType === 'admin') {
      this.openType = 'admin';
    }
    this.getTemplateValues();
    this.getCompanyName();
    // (<HTMLInputElement>document.getElementById("cpf3")).value = '';
  }

  selectRanges(selectPagination: any) {
    this.numberPerPage = Number(selectPagination);
  }


  buildForm() {
    this.addressTemplateForm = this.fb.group({
      templateName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      country: ['USA', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: [''],
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      type: ['']
    });
    this.itemTemplateForm = this.fb.group({
      templateName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      class: ['', [Validators.required]],
      nmfcNumber: ['', [Validators.required]],
      harmonizedBCode: [''],
      length: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      hazmat: [false],
      stackable: [false]
    });
    this.searchAddressForm = this.fb.group({
      customerId: [''],
      keyword: [''],
      templateName: [''],
      companyName: [''],
      contactName: [''],
      zip: [''],
      type: ['']
    });
    this.searchItemForm = this.fb.group({
      customerId: [''],
      keyword: [''],
      templateName: [''],
      description: [''],
      weight: [''],
      class: [''],
      nmfcNumber: [''],
      harmonizedBCode: ['']
    });
  }

  localStorageSalesData() {
    this.salesRep = localStorage.getItem(('SalesRepName'));
    this.accessToken = localStorage.getItem(('accessToken'));
    this.salesRepValues = JSON.parse(this.salesRep);
    this.salesRepId = this.salesRepValues.id;
    this.companyId = this.salesRepValues.companyId;
    this.salesRepType = this.salesRepValues.type;
    this.customerType = localStorage.getItem(('customerType'));
  }
  getCompanyName() {
    if (this.customerType === 'admin') {
      this.openType = 'admin';
    }
    this.companyNames = [];
    this.searchErrorMessage = false;
    this.externalService.getTemplate(this.companyId, this.openType).subscribe((response: any) => {
      this.companyNames = response;
      this.uniqueCompanyNames = [...new Map(this.companyNames.map((m: any) => [m.companyName, m])).values()];
    })
  }
  clickedTemplate(type: any) {
    if (type === 'address') {
      this.addressTemplateForm.reset();
      this.addressTemplateForm.patchValue({ country: 'USA' });
      this.showForAddress = true;
      this.showForItem = false;
    } else {
      this.itemTemplateForm.reset();
      this.showForAddress = false;
      this.showForItem = true;
    }
    this.openType = type;
    this.getTemplateValues();
  }
  customSearchFn(term: string, item: any) {
    return item.companyName.toLowerCase().startsWith(term.toLowerCase())
  }
  createNewTemplate(type: any) {
    this.NmfcNull = true;
    if (type === 'address') {
      this.addressTemplateForm.reset();
      this.addressTemplateForm.patchValue({ country: 'USA' });
      this.showForAddressCreateTemplate = true;
      this.showForItemCreateTemplate = false;
      this.showUpdateDetail = false;
    } else {
      this.itemTemplateForm.reset();
      this.showForItemCreateTemplate = true;
      this.showForAddressCreateTemplate = false;
      this.showUpdateDetail = false;
      this.showNmfcErrorMsg = false;
      this.showCreateErrorMsg = false;
    }
    if ((<HTMLInputElement>document.getElementById('cpf3')).value !== null) {
      (<HTMLInputElement>document.getElementById('cpf3')).value = '';
    }
  }

  changedDecimal(value: any, type: any) {
    if (value.endsWith("s") === true || value.endsWith("S") === true) {
      if (type === 'search') {
        this.showNmfcErrorMsg = true;
        this.showCreateErrorMsg = false;
      } else {
        this.showCreateErrorMsg = true;
        this.showNmfcErrorMsg = false;
      }
    } else {
      this.showCreateErrorMsg = false;
      this.showNmfcErrorMsg = false;
    }
    if (value === null || value === undefined || this.showCreateErrorMsg === true) {
      this.NmfcNull = true;
    } else {
      this.NmfcNull = false;
    }
  }

  formatPhoneNumber(s: any) {
    let s2 = ('' + s).replace(/\D/g, '');
    let m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ')' + m[2] + '-' + m[3];
  }

  checkForPhoneNumber(phoneNumber: any) {
    this.phoneNumber = phoneNumber;
    let number = this.formatPhoneNumber(phoneNumber);
    this.addressTemplateForm.patchValue({ contactNumber: number });
  }

  changedUnit(weightUnit: any) {
    if (weightUnit === 'ea.') {
      this.weightUnit = 'ttl';
    } else if (weightUnit === 'ttl') {
      this.weightUnit = 'ea';
    }
  }

  getTemplateValues() {
    if (this.customerType === 'admin') {
      this.openType = 'admin';
    }
    this.templateDetails = [];
    this.searchErrorMessage = false;
    this.externalService.getTemplate(this.companyId, this.openType).subscribe(response => {
      this.unniquetemplateDetails = response;
      this.templateDetails = [...new Map(this.unniquetemplateDetails.map((m: any) => [m.companyName, m])).values()];
      if (this.templateDetails.length > 0) {
        if (this.openType === 'address') {
          this.showForAddress = true;
          this.showTemplateAddressValues = true;
          this.showForItem = false;
          this.showTemplateItemValues = false;
        } else if (this.openType === 'admin') {
          this.showForAddress = true;
          this.showTemplateAddressValues = true;
          this.showForItem = false;
          this.showTemplateItemValues = false;
        } else {
          this.showForItem = true;
          this.showTemplateItemValues = true;
        }
        if (this.templateDetails.length > 10) {
          this.numberPerPage = 10;
        } else {
          this.numberPerPage = this.templateDetails.length;
        }
      } else {
        if (this.openType === 'address') {
          this.searchErrorMessage = true;
        } else {
          this.searchErrorMessage = true;
        }
      }
    });
  }

  checkForZipCode(zipCode: any) {
    let city, state;
    this.pricingInfoService.getCityState(zipCode).subscribe(getArrayValues => {
      this.getZipCode = getArrayValues;
      if (this.getZipCode.length > 0) {
        for (let i = 0; i < this.getZipCode.length; i++) {
          city = this.getZipCode[i].city;
          state = this.getZipCode[i].state;
          this.addressTemplateForm.patchValue({ city: city, state: state });
          this.invalidZipMsg = false;
        }
      } else {
        this.invalidZipMsg = true;
      }
    });
  }

  saveTemplate(form: any, type: any) {
    let object;
    if (type === 'address') {
      object = {
        customerId: this.salesRepId,
        companyId: this.companyId,
        salesRepId: 0,
        createdOn: new Date(),
        contactNumber: this.phoneNumber,
        templateName: form.templateName,
        companyName: form.companyName,
        contactName: form.contactName,
        country: form.country,
        street1: form.street1,
        street2: form.street2,
        zip: form.zip,
        city: form.city,
        state: form.state,
        type: form.type
      }
      this.externalService.saveTemplate(object, type).subscribe((response: any) => {
        Swal.fire("Saved!", "Template is saved successfully!", "success");
        this.getTemplateValues();
      });
    } else {
      object = {
        customerId: this.salesRepId,
        companyId: this.companyId,
        salesRepId: 0,
        createdOn: new Date(),
        templateName: form.templateName,
        description: form.description,
        weight: form.weight,
        class: form.class,
        nmfcNumber: form.nmfcNumber,
        harmonizedBCode: form.harmonizedBCode,
        hazmat: form.hazmat,
        stackable: form.stackable,
        weightUnit: this.weightUnit,
        dimensions: { length: form.length, width: form.width, height: form.height }
      };
      this.externalService.saveTemplate(object, type).subscribe((response: any) => {
        this.getTemplateValues();
      });
    }
    if (type === 'item') {
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      //    alert ( (<HTMLInputElement>document.getElementById("cpf3")).value );
      console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
    }
  }

  updateTemplate(form: any, type: any) {
    console.log('from', form);
    let object;
    if (type === 'address') {
      object = {
        customerId: this.salesRepId,
        companyId: this.companyId,
        salesRepId: 0,
        createdOn: form.createdOn,
        contactNumber: this.phoneNumber,
        templateName: form.templateName,
        companyName: form.companyName,
        contactName: form.contactName,
        country: form.country,
        street1: form.street1,
        street2: form.street2,
        zip: form.zip,
        city: form.city,
        state: form.state,
        updatedOn: new Date(),
        type: form.type,
        id: this.editIndex
      }
      console.log('object', object);
      this.externalService.updateTemplateDetail(object, type).subscribe((response: any) => {
        console.log('response', response);
        Swal.fire("Updated!", "Template is Updated Succesfully!", "success");
        this.getTemplateValues();
      });
    } else {
      object = {
        updatedOn: new Date(),
        id: this.editIndex,
        customerId: this.salesRepId,
        companyId: this.companyId,
        salesRepId: 0,
        createdOn: form.createdOn,
        templateName: form.templateName,
        description: form.description,
        weight: form.weight,
        class: form.class,
        nmfcNumber: form.nmfcNumber,
        harmonizedBCode: form.harmonizedBCode,
        hazmat: form.hazmat,
        stackable: form.stackable,
        weightUnit: this.weightUnit,
        dimensions: { length: form.length, width: form.width, height: form.height }
      };
      console.log('object', object);
      this.externalService.updateTemplateDetail(object, type).subscribe((response: any) => {
        console.log('response', response);
        Swal.fire("Updated!", "Template is Updated Succesfully!", "success");
        this.getTemplateValues();
      });
    }
    if (type === 'item') {
      (<HTMLInputElement>document.getElementById("cpf3")).value = '';
      //    alert ( (<HTMLInputElement>document.getElementById("cpf3")).value );
      console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
    }
  }

  search(searchValue: any, type: any) {
    // if (this.customerType === 'externalCustomer') {
    this.showNmfcErrorMsg = false;
    this.searchErrorMessage = false;
    searchValue.customerId = '';
    searchValue.salesRepId = '';
    // }
    if (type === 'address') {
      if (searchValue.keyword === '' && searchValue.templateName === '' && searchValue.companyName === '' && searchValue.contactName === '' &&
        searchValue.zip === '' && searchValue.type === '') {
        console.log('value IF');
        this.searchErrorMessage = true;
        this.showTemplateAddressValues = false;
        this.showLoader = false;
        // this.showSearchDetail = false;
      } else {
        this.showLoader = true;
        console.log('searchAddressValue', searchValue);
        this.completeForm = searchValue;
        this.completeForm.companyId = this.companyId;
        this.externalService.getAddressTemplateSearchData(this.completeForm).subscribe((data: any) => {
          console.log('responceSearchData', data);
          this.searchData = data;
          this.showLoader = false;
          let companyNames = this.searchData.result;

          this.templateDetails = [...new Map(companyNames.map((m: any) => [m.companyName, m])).values()];
          // this.bolData = this.searchData.result;
          if (this.searchData.result.length > 0) {
            this.searchData.result.sort((a: any, b: any) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
            let companyNames = this.searchData.result;
            this.templateDetails = [...new Map(companyNames.map((m: any) => [m.companyName, m])).values()];
            console.log('bolData', this.templateDetails);
            if (this.searchData.result.length > 10) {
              this.numberPerPage = 10;
            } else {
              this.numberPerPage = this.searchData.result.length;
            }
            this.showTemplateItemValues = true;
          }
          if (this.searchData.result.length === 0) {
            this.searchErrorMessage = true;
            this.showTemplateAddressValues = false;
          } else if (this.searchData.result === false) {
            this.searchErrorMessage = true;
            this.showTemplateAddressValues = false;
          } else {
            this.showTemplateAddressValues = true;
          }
        }, (error: any) => {
          console.log('error', error);
          if (error.error.status === 0) {
            this.searchErrorMessage = true;
            this.showTemplateAddressValues = false;
          }
        });
      }
    } else if (type === 'item') {
      if (searchValue.keyword === '' && searchValue.templateName === '' && searchValue.description === '' && searchValue.weight === '' &&
        searchValue.class === '' && searchValue.nmfcNumber === '' && searchValue.harmonizedBCode === '') {
        console.log('value IF');
        this.searchErrorMessage = true;
        this.showTemplateItemValues = false;
        this.showLoader = false;
        // this.showSearchDetail = false;
      } else {
        this.showLoader = true;
        console.log('searchAddressValue', searchValue);
        this.completeForm = searchValue;
        this.completeForm.companyId = this.companyId;
        this.externalService.getIdTemplateSearchData(this.completeForm).subscribe((data: any) => {
          console.log('responceSearchData', data);
          this.searchData = data;
          this.showLoader = false;
          this.templateDetails = this.searchData.result;
          // this.bolData = this.searchData.result;
          if (this.searchData.result.length > 0) {
            this.searchData.result.sort((a: any, b: any) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
            this.templateDetails = this.searchData.result;
            console.log('bolData', this.templateDetails);
            if (this.searchData.result.length > 10) {
              this.numberPerPage = 10;
            } else {
              this.numberPerPage = this.searchData.result.length;
            }
            this.showTemplateItemValues = true;
          }
          if (this.searchData.result.length === 0) {
            this.searchErrorMessage = true;
            this.showTemplateItemValues = false;
          } else if (this.searchData.result === false) {
            this.searchErrorMessage = true;
            this.showTemplateItemValues = false;
          } else {
            this.showTemplateItemValues = true;
          }
        }, (error: any) => {
          console.log('error', error);
          if (error.error.status === 0) {
            this.searchErrorMessage = true;
            this.showTemplateItemValues = false;
          }
        });
      }
    }
  }

  cancel(type: any) {
    if (type === 'address') {
      this.showForAddressCreateTemplate = false;
      this.showForAddress = true;
      this.showForItem = false;

    } else {

      this.showForItemCreateTemplate = false;
      this.showForAddress = false;
      this.showForItem = true;
      this.showNmfcErrorMsg = false;
      this.showCreateErrorMsg = false;
      // this.showNmfcErrorMsg = false;
      // this. showCreateErrorMsg = false;

    }

  }

  clear(type: any) {
    if (type === 'address') {
      this.searchAddressForm.reset({
        'customerId': '',
        'keyword': '',
        'templateName': '',
        'companyName': '',
        'contactName': '',
        'zip': ''
      });

      // this.searchAddressForm.reset();
    } else {
      this.searchItemForm.reset({
        'customerId': '',
        'keyword': '',
        'templateName': '',
        'description': '',
        'weight': '',
        'class': '',
        'nmfcNumber': '',
        'harmonizedBCode': ''
      });
      this.showNmfcErrorMsg = false;
      this.showCreateErrorMsg = false;
      (<HTMLInputElement>document.getElementById("cpf10")).value = '';
      //    alert ( (<HTMLInputElement>document.getElementById("cpf3")).value );
      console.log((<HTMLInputElement>document.getElementById("cpf10")).value);
      // this.searchItemForm.patchValue({nmfcNumber: ''});
      // this.clearNFMC = form;
      // this.clearNFMC.nmfcNumber = '';
      // this.searchItemForm.reset();
    }
    this.showNmfcErrorMsg = false;
    this.buildForm();
    this.getTemplateValues();
  }

  refresh(type: any) {
    if (type === 'address') {
      this.searchAddressForm.reset({
        'customerId': '',
        'keyword': '',
        'templateName': '',
        'companyName': '',
        'contactName': '',
        'zip': ''
      });
      // this.searchAddressForm.reset();
    } else {
      this.searchItemForm.reset({
        'customerId': '',
        'keyword': '',
        'templateName': '',
        'description': '',
        'weight': '',
        'class': '',
        'nmfcNumber': '',
        'harmonizedBCode': ''
      });
      // this.searchItemForm.reset();
    }
    this.searchErrorMessage = false;
    this.showNmfcErrorMsg = false;
    this.buildForm();
    this.localStorageSalesData();
    this.getTemplateValues();
  }

  checkForWeight(value: any) {
    if (Number(value) > 20000) {

    } else {

    }
  }

  reset(type: any) {
    if (type === 'address') {
      this.addressTemplateForm.reset();
      this.addressTemplateForm.patchValue({ country: 'USA' });

    } else {
      this.itemTemplateForm.reset();
      this.showNmfcErrorMsg = false;
      this.showCreateErrorMsg = false;
    }
    (<HTMLInputElement>document.getElementById("cpf3")).value = '';
    //    alert ( (<HTMLInputElement>document.getElementById("cpf3")).value );
    console.log((<HTMLInputElement>document.getElementById("cpf3")).value);
  }

  editTemplate(value: any, type: any) {
    console.log(value, type);
    this.companyId = value.companyId;
    this.editIndex = '';
    this.NmfcNull = false;
    if (type === 'address') {
      this.phoneNumber = value.contactNumber;
      let contactNumber = this.formatPhoneNumber(value.contactNumber);
      this.addressTemplateForm.patchValue({
        templateName: value.templateName,
        companyName: value.companyName,
        contactName: value.contactName,
        contactNumber: contactNumber,
        country: 'USA',
        street1: value.street1,
        street2: value.street2,
        zip: value.zip,
        city: value.city,
        state: value.state,
        type: value.type
      });
      this.editIndex = value.id;
      this.showForAddressCreateTemplate = true;
      this.showUpdateDetail = true;
    } else {
      this.weightUnit = value.weightUnit;
      this.itemTemplateForm.patchValue({
        templateName: value.templateName,
        description: value.description,
        weight: value.weight,
        class: value.class,
        nmfcNumber: value.nmfcNumber,
        harmonizedBCode: value.harmonizedBCode,
        length: value.dimensions.length,
        width: value.dimensions.width,
        height: value.dimensions.height,
        hazmat: value.hazmat,
        stackable: value.stackable,
      });
      if (this.weightUnit !== '' && this.weightUnit !== null && this.weightUnit !== undefined) {
        this.weightUnit = this.weightUnit;
      } else {
        this.weightUnit = 'ttl.'
      }
      this.editIndex = value.id;
      this.showForItemCreateTemplate = true;
      this.showUpdateDetail = true;
    }
  }

  // changedDecimal(nmfc) {
  //   console.log('check', nmfc);
  //   if (nmfc.nmfcNumber.length > 6) {
  //     this.showNmfcErrorMsg = false;
  //   } else {
  //     this.showNmfcErrorMsg = true;
  //   }
  // this.billOfLading.patchValue({nmfc: nmfc});

  // }

  deleteTemplate(id: any, type: any) {
    this.deleteIndex = id;
    this.openType = type;
  }

  deleteData() {
    this.externalService.deleteTemplateDetail(this.deleteIndex, this.openType).subscribe((response: any) => {
      console.log('response', response);
      this.getTemplateValues();
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
          (document.getElementById('packageQuantity') as HTMLFormElement).focus();
          event.preventDefault();
        } else {
          (document.getElementById('weight') as HTMLFormElement).focus();
          event.preventDefault();
        }
      }
      else {
        console.log('checkEnterKey1', event);
        (document.getElementById('weight') as HTMLFormElement).focus();
        event.preventDefault();
      }
      // }
      if (type === 'packageQuantity') {
        (document.getElementById('weight') as HTMLFormElement).focus();
        event.preventDefault();
      }
      if (type === 'weight') {
        console.log('checkEnterKey1 weight', event);
        if (event.target.value !== '') {
          console.log('checkEnterKey1 weight If', event);
          (document.getElementById('desc') as HTMLFormElement).focus();
          event.preventDefault();
        }
      }
      //  } else if (type === 'weight') {
      //     document.getElementById('desc').focus();
      //     event.preventDefault();
      //   }
      if (type === 'desc') {
        (document.getElementById('length') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'length') {
        (document.getElementById('width') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'width') {
        (document.getElementById('height') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'height') {
        console.log('height');
        $('#cpf3').focus();
        (<HTMLInputElement>document.getElementById("cpf3")).focus;
        // document.getElementById('nmfc').focus();
        event.preventDefault();
      } else if (type === 'nmfc') {
        (document.getElementById('classification') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'classification') {
        (document.getElementById('cube') as HTMLFormElement).focus();
        event.preventDefault();
      } else if (type === 'cube') {
        (document.getElementById('addButton') as HTMLFormElement).focus();
        event.preventDefault();
      }
    }

  }
}
