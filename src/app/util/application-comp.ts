import { PricingInfoService } from "../services/pricing-info.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { QuoteReportService } from "../services/quote-report.service";
import { increasePercentForAR } from '../app.constant';
import * as moment from 'moment-timezone';
import { CustomerService } from "../services/customer.service";
import { LoggerService } from "../services/logger.service";
import { FormGroup } from '@angular/forms';
declare let $: any;
export class ApplicationComp {
  public parseSetMasterData: any;
  public showDirections: any;
  public showSingleShipmentValue = false;
  public showDeficitValue = false;
  public showMinimumCharge = false;
  public hideYrcData = true;
  public localStorageArData: any;
  public weightForCal: any;
  public applyCostPlusFlag = false;
  public getARRule: any;
  public singleShipmentCharge: any;
  public increasedValueForAR = Number(increasePercentForAR);
  showNegativeMargin = false;
 
 
 
  selectedItems: any = [];
  pricingInfo: any;
  public arrayData:any = [];
  public resultArray: any = [];  
  public resultObject:any = {};
  showcolor = false;
  public costPlusPercentFactor: any;
  public finalTotalWeight: any;
  public finalRateCharge: any;
  userData: any;
  public showData = false;
  public quote: any;
  public quoteId: any;
  public quoteDetailsId: any;
  public quoteDetailsArray: any = [];
  public customerData: any;
  public showAdminErrorMessage = false;
  public showQuoteId = false;
  public showAllData = false;
  public salesRepType: any;
  public setSalesRepId: any;
  public customerId: any;
  public salesRepValues: any;
  public assessorials: any = [];
  public getSpecification: any;
  public higherValueAP = false;
  public detailArray: any = [];
  public description = '';
  public ltBolValue: any;
  public showPiecesVarianceMsg: any;
  public enableDescriptionValue = false;
  public errorMessageForPiecesCount = false;
  public showWeightVarianceMsg: any;
  public totalHeaderPieces: any;
  public totalPiecesForMultiClass: any;
  public piecesForMultiClassListArray: any = [];
  public piecesListArray: any = [];
  public piecesForItemizeListArray: any = [];
  public piecesClassListArray: any = [];
  public totalWeightForPieces: any;
  public totalHeaderWeight: any;
  public errorMessageForWeightCount = false;
  public rowIndex: any;
  public billOfLadingValues: any;
  public bolShipmentNewDate: any;
  public minDate: any;
  public showCarrierNoRule = false;
  public showCarrierRule = false;
  public errorGetRateMsg = false;
  public carrierResponse: any;
  public companyId: any;
  public accessToken;
  public factorization: any;
  public getZipcodeValues: any;
  public showZipcodes = false;
  public filterValues: any;
  public filterValuesState: any;
  public errorMessage: any;
  public filterValuesDest: any;
  public noshipmentData = false;
  showTableZip = false;
  public filterValuesDestState: any;
  public showZipcodeDest = false;
  public errorMessageDest: any;
  showTableZip1 = false;
  public showChooseClass = false;
  public showErrorMessageForClass = false;
  public logger: any;
  public listOfApValues: any;
  public listOfArValues: any;
  public getQuoteFlag = false;
  originZipArray: any = [];
  destinationZipArray: any = [];
  selectedIndex = 0;
  public noshipmentDestData = false;
  billOfLading: FormGroup = new FormGroup({});
  public numberPerPage: any;
  public numberOfPages = [5, 10, 15];
  public selectPagination: any;
  public searchLoader = false;
  


  numbersArray: any = [
    { 'name': 'ONE', 'id': 1 },
    { 'name': 'TWO', 'id': 2 },
    { 'name': 'THREE', 'id': 3 },
    { 'name': 'FOUR', 'id': 4 },
    { 'name': 'FIVE', 'id': 5 },
    { 'name': 'SIX', 'id': 6 },
    { 'name': 'SEVEN', 'id': 7 },
    { 'name': 'EIGHT', 'id': 8 },
    { 'name': 'NINE', 'id': 9 },
    { 'name': 'TEN', 'id': 10 },
    { 'name': 'ELEVEN', 'id': 11 },
    { 'name': 'TWELVE', 'id': 12 },
    { 'name': 'THIRTEEN', 'id': 13 },
    { 'name': 'FOURTEEN', 'id': 14 },
    { 'name': 'FIFTEEN', 'id': 15 },
    { 'name': 'SIXTEEN', 'id': 16 },
    { 'name': 'SEVENTEEN', 'id': 17 },
    { 'name': 'EIGHTEEN', 'id': 18 },
    { 'name': 'NINETEEN', 'id': 19 },
    { 'name': 'TWENTY', 'id': 20 }
  ];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    enableCheckAll: false,
    allowSearchFilter: false
  }
  dropdownList = [
    { 'id': 1, 'itemName': 'LiftGate PickUp', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 10, 'itemName': 'LiftGate Delivery', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 2, 'itemName': 'Residential PickUp', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 11, 'itemName': 'Residential Delivery', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 3, 'itemName': 'Limited Access PickUp', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 12, 'itemName': 'Limited Access Delivery', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 4, 'itemName': 'Inside Delivery', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40' },
    { 'id': 5, 'itemName': 'Notify', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 7, 'itemName': 'Delivery Appointment Required', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 8, 'itemName': 'HazMat', 'Yrccost': '0', 'Fedexcost': '0' }
    // {'id': 6, 'itemName': 'Others'}
  ];
  carrierArray: any;
  emergencyStop = true;
  emergencyStopYRC = true;
  emergencyStopPriority = true;
  emergencyStopEconomy = true;
  emergencyStopReddaway = true;
  
  constructor(private customerService: CustomerService, private pricingInfoService: PricingInfoService,
    private quoteReportService: QuoteReportService,
    private loggerService: LoggerService) {
    this.accessToken = localStorage.getItem('accessToken');

  }

  scroll(event: KeyboardEvent, id: any, type: any, comp: any) {
    //up 38 down 40
    // event.preventDefault();
    console.log(event);
    if (type === 'origin' && comp === 'internal' || comp === 'main') {
     this.checktypeOfZipcode(event)
     this.getCityNameValue(this.originZipArray[this.selectedIndex - 1], 'origin')
    } else if (type === 'destination' && comp != 'company') {
      // this.selectedIndex = 0;
      this.checktypeOfZipcode(event)
      this.getCityNameValue(this.destinationZipArray[this.selectedIndex - 1], 'destination')
    }
    console.log(this.selectedIndex);
  }
checktypeOfZipcode(event: KeyboardEvent)
{
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
    console.log(this.selectedIndex - 1);    
  }
}
  getcarrierArray() {
    this.carrierArray.forEach((ele: any, index: any) => {
      if (ele === 'YRC') {
        if (this.emergencyStopYRC === false) {
          this.carrierArray.splice(index, 1)
        }
      }
      if (ele === 'FEDEX ECONOMY') {
        if (this.emergencyStopEconomy === false) {
          this.carrierArray.splice(index, 1)
        }
      }
      if (ele === 'FEDEX PRIORITY') {
        if (this.emergencyStopPriority === false) {
          this.carrierArray.splice(index, 1)
        }
      }
      if (ele === 'REDDAWAY') {
        if (this.emergencyStopReddaway === false) {
          this.carrierArray.splice(index, 1)
        }
      }
    })
  }
  getLTLBolValuesBILLTOFORTE() {
    this.ltBolValue.thirdParty = 'to Forte';
    this.ltBolValue.thirdPartyCity = 'Fife';
    this.ltBolValue.thirdPartyCompanyName = 'Forte';
    this.ltBolValue.thirdPartyPostalCode = '98424';
    this.ltBolValue.thirdPartyState = 'WA';
    this.ltBolValue.thirdPartyStreet = '301 54th Ave. E.Ste 200';
  }
  getThirdPArty() {
    this.ltBolValue.thirdParty = 'Third Party';
    this.ltBolValue.thirdPartyCity = this.ltBolValue.bolRequest.billPaidTo.city;
    this.ltBolValue.thirdPartyCompanyName = this.ltBolValue.bolRequest.billPaidTo.companyName;
    this.ltBolValue.thirdPartyPostalCode = this.ltBolValue.bolRequest.billPaidTo.zip;
    this.ltBolValue.thirdPartyState = this.ltBolValue.bolRequest.billPaidTo.state;
    this.ltBolValue.thirdPartyStreet = this.ltBolValue.bolRequest.billPaidTo.address;
  }

  getCityNameValue(value:any, type:any) {
    console.log(value);
    if (type === "origin") {
      this.filterValues = value.cityName;
      this.filterValuesState = value.state;
      if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK' ) {
        this.noshipmentData = true;
       } else {
      this.showZipcodes = true;
      this.errorMessage = false;
      this.showTableZip = false;
      // this.showTableZip1 = false;
      (document.getElementById('destinationZipCode')as HTMLFormElement).focus();
       }
console.log(this.showZipcodes, this.filterValues);
    } else if (type === "destination") {
      // let 
      this.filterValuesDest = [];
      let obbb = {city:value.cityName, state:value.state}
      this.filterValuesDest = obbb;
      this.filterValuesDestState = value.state;
      if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK' ) {
        this.noshipmentData = true;
       } else {
        this.showZipcodeDest = true;
        this.errorMessageDest = false;
        // this.showTableZip = false;
        this.showTableZip1 = false;
        this.showErrorMessageForClass = false;
        this.showChooseClass =false;
        (document.getElementById('classification')as HTMLFormElement).focus();
       }
console.log(this.showZipcodes, this.filterValues,this.filterValuesDest);
    }
 

  }
  emergencyStatus() {
    this.pricingInfoService.getEmergencyStatus().subscribe((res: any) => {
      console.log(res);
      if (res.yrc === true) {
        this.emergencyStopYRC = true;
      } else {
        this.emergencyStopYRC = false;
        // this.selectedCarrier.push('YRC');

      }
      if (res.reddaway === true) {
        this.emergencyStopReddaway = true;
      } else {
        this.emergencyStopReddaway = false;
      }
      if (res.fxfe === true) {
        this.emergencyStopEconomy = true;
      } else {
        this.emergencyStopEconomy = false;
      }
      if (res.fxfp === true) {
        this.emergencyStopPriority = true;
      } else {
        this.emergencyStopPriority = false;
      }
      if (res.yrc === false || res.reddaway === false || res.fxfe === false || res.fxfp === false) {
        this.emergencyStop = false;
        console.log(this.emergencyStop)
      } else {
        this.emergencyStop = true;
      }
    })
  }
  bolCarrier() {

    let timestamp = new Date();
    console.log('timestamp', timestamp);
    let pstDate = moment(timestamp).tz("America/Los_Angeles").format();
    let newValue = pstDate.split('T');
    console.log('pstNrewvbgfrd', new Date(newValue[0]));
    let newDate = new Date(newValue[0]);
    this.bolShipmentNewDate = newDate;
    this.minDate = newDate;
    console.log('this.bolShipmentNewDate', this.bolShipmentNewDate);
    this.customerService.getCarrierForCustomer(this.companyId, this.accessToken).subscribe(response => {
      this.carrierResponse = response;
      let carrier;
      if (this.carrierResponse.length > 0) {
        for (let d = 0; d < this.carrierResponse.length; d++) {
          if (this.carrierResponse[d].type === 'FEDEX ECONOMY') {
            carrier = 'FXFE';
          } else if (this.carrierResponse[d].type === 'FEDEX PRIORITY') {
            carrier = 'FXFP';
          } else {
            carrier = this.carrierResponse[d].type;
          }
          this.carrierArray.push(carrier);
        }
        if (this.carrierArray.length > 0) {
          this.carrierArray = this.removeDuplicates(this.carrierArray);
          this.showCarrierRule = true;
        }
      } else {
        this.carrierArray = [];
        this.errorGetRateMsg = true;
        this.showCarrierRule = false;
        this.showCarrierNoRule = false;
      }
    });
  }
  removeDuplicates(arr: any) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }
  getPArticularReport() {
    // from bol component
    let quoteArray: any = [], array: any;
    this.quoteReportService.getParticularReportUsingReferenceId(this.billOfLadingValues.quoteNumber).subscribe(response => {
      console.log('quotesgd', response);
      array = response;
      if (array.length > 0) {
        for (let a = 0; a < array.length; a++) {
          if (array[a].category === 'COSTPLUS') {
            quoteArray.push(array[a]);
            if (quoteArray.length > 0) {
              for (let b = 0; b < quoteArray.length; b++) {
                this.factorization = quoteArray[b].category;
              }
            }
            break;
          } else if (array[a].category === 'AR') {
            quoteArray.push(array[a]);
            if (quoteArray.length > 0) {
              for (let b = 0; b < quoteArray.length; b++) {
                this.factorization = quoteArray[b].category;
              }
            }
            break;
          }
        }
      }
    });
  }


  checkForClassification(pricingDetail: any) {
    let classification;
    let classInfo = [];
    classInfo = pricingDetail;
    for (let p = 0; p < classInfo.length; p++) {
      if (classInfo[p].classification === '77.5') {
        classification = 77;
        classInfo[p].classification = classification;
      } else {
        if (classInfo[p].classification === '92.5') {
          classification = 92;
          classInfo[p].classification = classification;
        } else {
          classInfo[p].classificaton = classInfo[p].classification;
        }
      }
    }
    return classInfo;
  }
excessPieces(oldObject: any){
  this.errorMessageForPiecesCount = true;
  let differenceInPieces = Number(this.totalPiecesForMultiClass) - Number(oldObject.PackageQuantity);
  this.showPiecesVarianceMsg = 'There is a excess of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
  setTimeout(() => {
    this.showPiecesVarianceMsg = '';
  }, 5000);
  console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);
}
shortagePieces(oldObject:any){
  let differenceObject = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
          this.errorMessageForPiecesCount = true;
          let differenceInPieces = Number(oldObject.PackageQuantity) - Number(this.totalPiecesForMultiClass);
          this.showPiecesVarianceMsg = 'There is a shortage of ' + Number(differenceInPieces) + 'Pcs in ' + Number(this.totalHeaderPieces) + ' total PCS';
          setTimeout(() => {
            this.showPiecesVarianceMsg = '';
          }, 5000);
          console.log(this.showPiecesVarianceMsg, differenceInPieces, this.totalPiecesForMultiClass,);
}
  getpiecesforItemisedArray(type: any) {
    let oldObject;
    if (type === 'Itemized') {
      oldObject = this.piecesForItemizeListArray[this.rowIndex];
      if (this.piecesListArray.length > 0) {
        let sumOfPiecesWeight: any = [], sumOfPieces = [];
        if (this.piecesListArray.length > 0) {
          for (let p = 0; p < this.piecesListArray.length; p++) {
            sumOfPieces.push(this.piecesListArray[p].PackageQuantity);
            console.log('this.sumOfPiecesWeight', sumOfPiecesWeight, sumOfPieces);
          }
        }
        this.totalPiecesForMultiClass = this.netChargeArrSum(sumOfPieces);
        console.log('sumOfPiecesWeight', sumOfPiecesWeight);
        this.totalHeaderPieces = Number(oldObject.PackageQuantity);
        console.log(this.totalPiecesForMultiClass, Number(oldObject.PackageQuantity));
        if (Number(this.totalPiecesForMultiClass) > Number(oldObject.PackageQuantity)) {
        this.excessPieces(oldObject)

        } else if (Number(this.totalPiecesForMultiClass) < Number(oldObject.PackageQuantity)) {
          this.shortagePieces(oldObject);
        } else {
          this.errorMessageForPiecesCount = false;
          this.showPiecesVarianceMsg = '';
          this.piecesForItemizeListArray[this.rowIndex].newAddPieces = this.piecesListArray;
          this.piecesForItemizeListArray[this.rowIndex].showFlag = 'Itemize';
          if (this.piecesForItemizeListArray.length > 0) {
            for (let p = 0; p < this.piecesForItemizeListArray.length; p++) {
              if (this.piecesForItemizeListArray[p].newAddPieces.length > 0) {
                this.piecesForItemizeListArray[p].rowSpanValues = this.piecesForItemizeListArray[p].newAddPieces.length;
                console.log('this.piecesForItemizeListArray[p].rowSpanValues ', this.piecesForItemizeListArray[p].rowSpanValues);
              }
            }
          }
        }
        console.log(this.errorMessageForPiecesCount);
        setTimeout(() => {
          if (this.errorMessageForPiecesCount === false) {
            $('#add-pieces-modal').modal('hide');

          } else {
          }
        }, 500);
      }
    } else {
      oldObject = this.piecesForMultiClassListArray[this.rowIndex];
      console.log('OldObject', this.piecesClassListArray[this.rowIndex]);
      if (this.piecesClassListArray.length > 0) {
        let sumOfPiecesWeight = [], sumOfPieces = [];
        if (this.piecesClassListArray.length > 0) {
          for (let p = 0; p < this.piecesClassListArray.length; p++) {
            sumOfPiecesWeight.push(this.piecesClassListArray[p].Weight.Value);
            sumOfPieces.push(this.piecesClassListArray[p].PackageQuantity);
            console.log('this.sumOfPiecesWeight', sumOfPiecesWeight, sumOfPieces);
          }
        }
        this.totalWeightForPieces = this.netChargeArrSum(sumOfPiecesWeight);
        this.totalPiecesForMultiClass = this.netChargeArrSum(sumOfPieces);
        console.log('sumOfPiecesWeight', sumOfPiecesWeight);
        this.totalHeaderWeight = Number(oldObject.Weight.Value);
        this.totalHeaderPieces = Number(oldObject.PackageQuantity);
        console.log(this.totalPiecesForMultiClass, Number(oldObject.PackageQuantity));
        if (Number(this.totalPiecesForMultiClass) > Number(oldObject.PackageQuantity)) {
          this.shortagePieces(oldObject);

        } else if (Number(this.totalPiecesForMultiClass) < Number(oldObject.PackageQuantity)) {
          this.shortagePieces(oldObject);
        }
        else {
          this.errorMessageForPiecesCount = false;
          this.showPiecesVarianceMsg = '';
        }

        if (Number(this.totalWeightForPieces) > Number(oldObject.Weight.Value)) {
          this.errorMessageForWeightCount = true;
          let differenceWeight = Number(this.totalWeightForPieces) - Number(oldObject.Weight.Value);
          this.showWeightVarianceMsg = 'There is a over weight of ' + Number(differenceWeight) + ' pounds from the total weight of ' + Number(this.totalHeaderWeight) + ' pounds.'
          setTimeout(() => {
            this.showWeightVarianceMsg = '';
          }, 5000);
          console.log('errorMessageForWeightCount if >', this.errorMessageForWeightCount);
        } else {
          let differenceObject = Number(oldObject.Weight.Value) - Number(this.totalWeightForPieces);
          console.log('differenceObject', differenceObject);
          if (Number(differenceObject) > 40) {
            this.errorMessageForWeightCount = true;
            this.showWeightVarianceMsg = 'There is a variance of ' + Number(differenceObject) + ' pounds under weight from ' + Number(oldObject.Weight.Value) + ' pounds.';
            setTimeout(() => {
              this.showWeightVarianceMsg = ''
            }, 5000);
            console.log('errorMessageForWeightCount if <', this.errorMessageForWeightCount);
          } else {
            this.errorMessageForWeightCount = false;
            console.log('differenceObject else', differenceObject);
            console.log('this.piecesForMultiClassListArray', this.piecesForMultiClassListArray);
            this.piecesForMultiClassListArray[this.rowIndex].newAddPieces = this.piecesClassListArray;
            this.piecesForMultiClassListArray[this.rowIndex].showFlag = 'Multi Classed Pallet';
            if (this.piecesForMultiClassListArray.length > 0) {
              for (let p = 0; p < this.piecesForMultiClassListArray.length; p++) {
                if (this.piecesForMultiClassListArray[p].newAddPieces.length > 0) {
                  this.piecesForMultiClassListArray[p].rowSpanValues = this.piecesForMultiClassListArray[p].newAddPieces.length;
                  console.log('this.piecesForMultiClassListArray[p].rowSpanValues ', this.piecesForMultiClassListArray[p].rowSpanValues);
                }
              }
            }
          }
        }
        console.log(this.errorMessageForPiecesCount, this.errorMessageForWeightCount);
        setTimeout(() => {
          if (this.errorMessageForWeightCount === false && this.errorMessageForPiecesCount === false) {
            $('#add-pieces-modal').modal('hide');

          }
        }, 500);

      }
    }
    console.log('this.detailArray ', this.detailArray);
    console.log('this.this.piecesForMultiClassListArray ', this.piecesForMultiClassListArray, this.rowIndex, this.piecesForMultiClassListArray);
    console.log('this.piecesForItemizeListArray ', this.piecesForItemizeListArray, this.rowIndex, this.piecesListArray);
    this.description = '';
    this.billOfLading.patchValue({
      hazmat: false,
      handlingUnitQuantity: '',
      handlingUnitType: 'PLT',
      weightUnitType: 'ttl',
      packageQuantity: '',
      packageUnitType: 'CTN',
      weight: '',
      description: '',
      length: '',
      width: '',
      height: '',
      nmfc: '',
      classification: '',
      cube: '',
      totalWeight: '',
      totalClassification: ''
    });
  }
  netChargeArrSum(netCharge: any) {
    let total = 0;
    netCharge.forEach(function (key: any) {
      total = total + Number(key);
    });
    return total;
  }

  getArData() {
    this.pricingInfoService.getArForm().subscribe((data: any) => {
      this.listOfArValues = data;
      console.log('this.listOfValues');
      if (this.listOfArValues.length > 0) {
        const tableArData = JSON.stringify(this.listOfArValues);
        let t;
        t = [{ 'id': '3' }, { 'id': '4' }, { 'id': '5' }];
        let newone;
        newone = JSON.stringify(t);
        let p;
        p = JSON.parse(newone);
        localStorage.setItem('artableData', tableArData);
      } else {
      }
      this.logger = {
        'method': 'getArForm',
        'message': 'AR(discount,minimum charge, fuel charge)',
        'AP Data': 'Ar Full Data'
      };
      this.loggerService.info(this.logger);
    });
  }
  getCityState1(zipCode: any, type: any, comp: any) {
    this.getQuoteFlag = true;
    this.showTableZip = false;
    this.showTableZip1 = false;

    this.pricingInfoService.getCityState(zipCode).subscribe((getArrayValues : any) => {
      console.log(getArrayValues);
      this.originZipArray = [];
      this.destinationZipArray = [];
      let cityAndState: any = getArrayValues;
      let CityArray = getArrayValues[0].yrcCity;
      console.log(CityArray);
      // getArrayValues.yrcCity;
      if (cityAndState && cityAndState.length > 0) {
        // console.log(response.lookupCityResponse.cities.city[0].name.$value);

        if (CityArray.length > 1) {
          if (type === 'origin') {
            this.showTableZip = true;
            if(comp = 'main'){
            CityArray.forEach((ele: any) => {
              this.originZipArray.push({ 'cityName': ele, 'state': cityAndState[0].state })
            })}
            else if(comp = 'internal'){  CityArray.forEach((ele: any) => {
              this.originZipArray.push({'cityName': ele, 'state': cityAndState[0].state, 'selectedFocus': false}) //differ
            })
            this.originZipArray[0].selectedFocus = true; //differ
          }
            setTimeout(() => {
              var id = $("tr:focus").attr("0");
              id++;
              if (id > 6) {
                id = 0;
              }
              $("#consigneeTableId tr[tabindex=0]").focus();
            }, 500);
            
            this.selectedIndex = 0;
          } else {
            this.showTableZip1 = true;
            CityArray.forEach((ele: any) => {
              this.destinationZipArray.push({ 'cityName': ele, 'state': cityAndState[0].state })
            })
            setTimeout(() => {
              var id = $("tr:focus").attr("0");
              id++;
              if (id > 6) {
                id = 0;
              }
              $("#consigneeTableId1 tr[tabindex=0]").focus();
            }, 500);
            this.selectedIndex = 0;
          }         
        } else {
          if (type === 'origin') {
            this.filterValues = cityAndState[0].city;
            this.filterValuesState = cityAndState[0].state;
            if (this.filterValuesState === 'HI' || this.filterValuesState === 'AK') {
              this.noshipmentData = true;
            } else {
              this.showZipcodes = true;
              this.errorMessage = false;
              (document.getElementById('destinationZipCode') as HTMLFormElement).focus();
            }
            console.log(this.showZipcodes, this.filterValues, this.filterValuesState);
          } else {
            let obbb = { city: cityAndState[0].city, state: cityAndState[0].state }
            this.filterValuesDest = obbb;
            this.filterValuesDestState = comp = 'main'? cityAndState[0].state : cityAndState[0].state.$value;
           
            if (this.filterValuesDestState === 'HI' || this.filterValuesDestState === 'AK') {
              this.noshipmentDestData = true;
            } else {
              this.showZipcodeDest = true;
              this.errorMessageDest = false;
              if(comp = 'internal') { 
                this.showErrorMessageForClass = false; //differ
              this.showChooseClass =false; //differ
            }
              (document.getElementById('classification') as HTMLFormElement).focus();
            }
          }
        }
      }   
      this.logger = { 'method': 'getCityState', 'message': 'Info Message', 'Zipcode': zipCode };
      this.loggerService.info(this.logger);
    });
  }
  
  rateCalculationForYRCReddawayNew(response:any, carrierType:any, category:any, factoring:any, type: any) {
    let date = new Date();
    console.log('RATE CALCULATION TIME FOR YRC', date);
    let discount, fuelSurcharge, rateId, amc, highCost, addCACharge, addRate, discountedRate:any,
      addSingleShipmentCharge, minimumClass, totalAssessorialCharge, assessorialCharge, customerBusinessRule = [], assessorialChargeArray = [], profileAssessorials = [];
    const weightArray = [], classificationArray = [], classification1 = [], finalRateArray = [], discountedRateArray = [],
      netChargeArray = [], netChargeResultArray = [], totalChargeArray = [];
    let finalRate = [], rate = [], crtRateArray = [], fuelSurchargeArray = [];
    const diffFinalRateArray = [], diffRateArray = [], discountArray = [], diffWeightArray = [];
    let profileMinimumCharge, profileLifeGateCharge, profileResidentialCharge, profileLimitedAccessDelivery,
      profileInsideDelivery, profileNotify, profileSingleShipment, singleShipmentsetMasterData,profiledeliveryAppointmentRequired, profilehazmat, profileLiftGatePickupCharge,profileResidentialPickupcharge,profilelimitedpickup;
    this.parseSetMasterData = [];
    let currentFinalRate, currentRate;
    let discountedRateCalculation;
    this.showDirections = '';
    this.showSingleShipmentValue = false;
    this.showDeficitValue = false;
    this.showMinimumCharge = false;
    this.hideYrcData = false;
    this.localStorageArData = [];
    let staticData:any = localStorage.getItem('artableData');
    this.localStorageArData = JSON.parse(staticData);
    if (category === 'AP') {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('aptableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      if (carrierType === 'YRC') {
        if (Object.keys(response.result.yrcProfileRateAp).length === 0 || response.result.yrcProfileRateAp === '') {
          customerBusinessRule = [];
        } else {
          if (response.result.yrcProfileRateAp.liftGateService !== undefined) {
            customerBusinessRule.push(response.result.yrcProfileRateAp);
          } else {
            response.result.yrcProfileRateAp.liftGateService = '';
            response.result.yrcProfileRateAp.residentialDelivery = '';
            response.result.yrcProfileRateAp.limitedAccessDelivery = '';
            response.result.yrcProfileRateAp.insideDelivery = '';
            response.result.yrcProfileRateAp.notify = '';
            response.result.yrcProfileRateAp.singleShipment = '';
            response.result.yrcProfileRateAp.deliveryAppointmentRequired = '';
            response.result.yrcProfileRateAp.hazmat = '';
            customerBusinessRule.push(response.result.yrcProfileRateAp);
          }
        }
        /*
   check the origin state and destination state for 'CA' add 8.50 for YRC alone
    */
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAp;
      }
    } else {
      /*set master data discount, minimum charge values which is stored in local storage */
      const setMasterData:any = localStorage.getItem('artableData');
      this.parseSetMasterData = JSON.parse(setMasterData);
      /*Customer specific rules*/
      if (carrierType === 'YRC') {
        customerBusinessRule = response.result.yrcProfileRateAr;
        if (customerBusinessRule.length > 0) {
          for (let c = 0; c < customerBusinessRule.length; c++) {
            if (customerBusinessRule[c].liftGateService !== undefined) {
            } else {
              customerBusinessRule[c].liftGateService = '';
              customerBusinessRule[c].residentialDelivery = '';
              customerBusinessRule[c].limitedAccessDelivery = '';
              customerBusinessRule[c].insideDelivery = '';
              customerBusinessRule[c].notify = '';
              customerBusinessRule[c].singleShipment = '';
              customerBusinessRule[c].deliveryAppointmentRequired = '';
              customerBusinessRule[c].hazmat = '';


            }
          }
        } else {
        }
      } else {
        customerBusinessRule = response.result.reddawayProfileRateAr;
      }
    }
    if (factoring !== 'COSTPLUS') {
      for (let i = 0; i < this.parseSetMasterData.length; i++) {
        if (this.parseSetMasterData[i].companyName === carrierType) {
          discount = this.parseSetMasterData[i].discount;
          fuelSurcharge = this.parseSetMasterData[i].fuelsurcharge;
          rateId = this.parseSetMasterData[i].recentRateId;
          amc = this.parseSetMasterData[i].amc;
          this.parseSetMasterData.assessorials = JSON.parse(this.parseSetMasterData[i].assessorials);
          if (this.parseSetMasterData.assessorials.length > 0) {
            for (let i = 0; i < this.parseSetMasterData.assessorials.length; i++) {
              if (this.parseSetMasterData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.parseSetMasterData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
            if (this.parseSetMasterData[i].caCharge !== '' && this.parseSetMasterData[i].caCharge !== null && this.parseSetMasterData[i].caCharge !== undefined) {
              addCACharge = this.parseSetMasterData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    } else {
      for (let apData = 0; apData < this.parseSetMasterData.length; apData++) {
        if (this.parseSetMasterData[apData].companyName === carrierType) {
          discount = this.parseSetMasterData[apData].discount;
          fuelSurcharge = this.parseSetMasterData[apData].fuelsurcharge;
          rateId = this.parseSetMasterData[apData].recentRateId;
          amc = this.parseSetMasterData[apData].amc;
        }
      }
      for (let i = 0; i < this.localStorageArData.length; i++) {
        if (this.localStorageArData[i].companyName === carrierType) {
          this.localStorageArData.assessorials = JSON.parse(this.localStorageArData[i].assessorials);
          if (this.localStorageArData.assessorials.length > 0) {
            for (let i = 0; i < this.localStorageArData.assessorials.length; i++) {
              if (this.localStorageArData.assessorials[i].name === 'Single Shipment') {
                singleShipmentsetMasterData = this.localStorageArData.assessorials[i];
                break;
              } else {
                singleShipmentsetMasterData = '';
              }
            }
          }
          if (this.filterValues.state === 'CA' || this.filterValuesDest.state === 'CA') {
            if (this.localStorageArData[i].caCharge !== '' && this.localStorageArData[i].caCharge !== null && this.localStorageArData[i].caCharge !== undefined) {
              addCACharge = this.localStorageArData[i].caCharge;
            } else {
              addCACharge = 0;
            }
          } else {
            addCACharge = 0;
          }
        }
      }
    }
    for (let i = 0; i < response.result.classWeight.length; i++) {
      const weight = response.result.classWeight[i].weight;
      weightArray.push(weight);
      const classification = response.result.classWeight[i].classification;
      classificationArray.push(classification);
      classification1.push(classification);
    }
    this.weightForCal = this.netChargeArrSum(weightArray);
    /*Both the additional rate and additional min rate is given */
    /*AdditionalMinRate => additinalRate*totalWeight/100*/
    if (carrierType === 'YRC') {
    if (response.result.additionalMinRate !== 0) {
      const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
      if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
        highCost = response.result.additionalMinRate;
      } else {
        highCost = Number(additionalRateCalculation).toFixed(2);
      }
    } else {
      /*AdditionalMinRate is zero and additional rate is given*/
      if (response.result.additionalRate !== 0) {
        highCost = response.result.additionalRate;
      } else {
        highCost = 0;
      }
    }
  } else {
    if (Number(response.result.additionalMaxRate) !== 0) {
      const additionalRateCalculation = (Number(response.result.additionalRate) * (this.weightForCal / 100));
      if (Number(additionalRateCalculation) < Number(response.result.additionalMinRate)) {
        highCost = Number(response.result.additionalMinRate);
      } else if (Number(additionalRateCalculation) > Number(response.result.additionalMaxRate)){
        highCost = Number(response.result.additionalMaxRate);
      } else {
        highCost = Number(additionalRateCalculation).toFixed(2);
      }
    } else {
      if (Number(response.result.additionalRate) !== 0) {
        highCost = Number(response.result.additionalRate);
      } else {
        highCost = 0;
      }
    }
  }
    /* If Customer Business rule is given discount, minCharge is taken,
    Else part shipTypes is direct setmaster data values are taken,
    shipTypes is non-direct discount is 0 zero
     */
    if (customerBusinessRule.length > 0) {
      for (let pr = 0; pr < customerBusinessRule.length; pr++) {
        this.showDirections = response.result.shipTypes;
        discount = customerBusinessRule[pr].profileDiscount;
        fuelSurcharge = fuelSurcharge;
        if (customerBusinessRule[pr].profileMinCharge !== undefined) {
          profileMinimumCharge = customerBusinessRule[pr].profileMinCharge;
        } else {
          profileMinimumCharge = amc;
        }
        if (factoring !== 'COSTPLUS') {
          profileLifeGateCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialCharge = customerBusinessRule[pr].residentialDelivery;
          profileLimitedAccessDelivery = customerBusinessRule[pr].limitedAccessDelivery;
          profileInsideDelivery = customerBusinessRule[pr].insideDelivery;
          profileNotify = customerBusinessRule[pr].notify;
          profileSingleShipment = customerBusinessRule[pr].singleShipment;
          profiledeliveryAppointmentRequired = customerBusinessRule[pr].deliveryAppointmentRequired;
          profilehazmat = customerBusinessRule[pr].hazmat;
          profileLiftGatePickupCharge = customerBusinessRule[pr].liftGateService;
          profileResidentialPickupcharge = customerBusinessRule[pr].residentialDelivery;         
         profilelimitedpickup = customerBusinessRule[pr].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, 'id': 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
            { insideDelivery: profileInsideDelivery, 'id': 4 },
            { notify: profileNotify, 'id': 5 },
            { deliveryAppointmentRequired:profiledeliveryAppointmentRequired, 'id': 7 },
            { hazmat : profilehazmat, 'id':8},
            {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
            {residentialPickup: profileResidentialPickupcharge, 'id':11},
            {limitedaccesspickup: profilelimitedpickup,'id': 12});
        } else {
          if (this.getARRule.length > 0) {
            profileLifeGateCharge = this.getARRule[0].liftGateService;
            profileResidentialCharge = this.getARRule[0].residentialDelivery;
            profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
            profileInsideDelivery = this.getARRule[0].insideDelivery;
            profileNotify = this.getARRule[0].notify;
            profileSingleShipment = this.getARRule[0].singleShipment;
            profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
            profilehazmat = this.getARRule[0].hazmat;
            profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
            profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;         
           profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
            profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
              { residential: profileResidentialCharge, 'id': 2 },
              { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
              { insideDelivery: profileInsideDelivery, 'id': 4 },
              { notify: profileNotify, 'id': 5 },
              { deliveryAppointmentRequired:profiledeliveryAppointmentRequired, 'id': 7 },
              { hazmat: profilehazmat, 'id': 8},
              {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
              {residentialPickup: profileResidentialPickupcharge, 'id':11},
              {limitedaccesspickup: profilelimitedpickup,'id': 12});
          } else {
            profileAssessorials.push({ liftGate: '', 'id': 1 },
              { residential: '', 'id': 2 },
              { limitedAccessDelivery: '', 'id': 3 },
              { insideDelivery: '', 'id': 4 },
              { notify: '', 'id': 5 },
              { deliveryAppointmentRequired: '', 'id': 7 },
              { hazmat: '', 'id': 8},
              {liftGatePickup: '','id': 10 },
              {residentialPickup: '', 'id':11},
              {limitedaccesspickup: '','id': 12});
          }
        }
      }      
    } else {
      if (response.result.shipTypes === 'Direct') {
        this.showDirections = 'Direct';
        discount = discount;
        fuelSurcharge = fuelSurcharge;
      } else {
        this.showDirections = 'Non-Direct';
        if (carrierType === 'YRC') {
          discount = 80; // NON - Direct YRC->AP AND AR (Apply discount -> 80)
        } else {
          discount = 0;
        }
        fuelSurcharge = fuelSurcharge;
      }
      if (factoring === 'COSTPLUS') {
        if (this.getARRule.length > 0) {
          profileLifeGateCharge = this.getARRule[0].liftGateService;
          profileResidentialCharge = this.getARRule[0].residentialDelivery;
          profileLimitedAccessDelivery = this.getARRule[0].limitedAccessDelivery;
          profileInsideDelivery = this.getARRule[0].insideDelivery;
          profileNotify = this.getARRule[0].notify;
          profileSingleShipment = this.getARRule[0].singleShipment;
          profiledeliveryAppointmentRequired = this.getARRule[0].deliveryAppointmentRequired;
          profilehazmat = this.getARRule[0].hazmat;
          profileLiftGatePickupCharge = this.getARRule[0].liftGateService;
          profileResidentialPickupcharge = this.getARRule[0].residentialDelivery;         
         profilelimitedpickup = this.getARRule[0].limitedAccessDelivery;
          profileAssessorials.push({ liftGate: profileLifeGateCharge, 'id': 1 },
            { residential: profileResidentialCharge, 'id': 2 },
            { limitedAccessDelivery: profileLimitedAccessDelivery, 'id': 3 },
            { insideDelivery: profileInsideDelivery, 'id': 4 },
            { notify: profileNotify, 'id': 5 },
            { deliveryAppointmentRequired: profiledeliveryAppointmentRequired, 'id': 7 },
            { hazmat: profilehazmat, 'id': 8 },
            {liftGatePickup: profileLiftGatePickupCharge,'id': 10 },
            {residentialPickup: profileResidentialPickupcharge, 'id':11},
            {limitedaccesspickup: profilelimitedpickup,'id': 12});
        } else {
          profileAssessorials.push({ liftGate: '', 'id': 1 },
            { residential: '', 'id': 2 },
            { limitedAccessDelivery: '', 'id': 3 },
            { insideDelivery: '', 'id': 4 },
            { notify: '', 'id': 5 },
            {deliveryAppointmentRequired: '', 'id': 7},
            { hazmat: '', 'id': 8 },
            {liftGatePickup: '','id': 10 },
            {residentialPickup: '', 'id':11},
            {limitedaccesspickup: '','id': 12});
        }
      } else {
        profileAssessorials.push({ liftGate: '', 'id': 1 },
          { residential: '', 'id': 2 },
          { limitedAccessDelivery: '', 'id': 3 },
          { insideDelivery: '', 'id': 4 },
          { notify: '', 'id': 5 },
          { deliveryAppointmentRequired: '', 'id': 7},
          { hazmat: '', 'id': 8 },
          {liftGatePickup: '','id': 10 },
          {residentialPickup: '', 'id':11},
          {limitedaccesspickup: '','id': 12});
      }
    }
    discountArray.push(discount);
    fuelSurchargeArray.push(fuelSurcharge);
    if (carrierType === 'YRC') {
      if (category === 'AP') {
        if (this.weightForCal < 500) {
          if (this.applyCostPlusFlag === true) {
            if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
              addSingleShipmentCharge = this.singleShipmentCharge;
            } else {
              addSingleShipmentCharge = 0;
            }
          } else {
            if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
              addSingleShipmentCharge = profileSingleShipment;
            } else {
              if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
                addSingleShipmentCharge = singleShipmentsetMasterData.cost;
              } else {
                addSingleShipmentCharge = 0;
              }
            }
          }
        } else {
          addSingleShipmentCharge = 0;
        }
      } else {
        if (this.singleShipmentCharge !== '' && this.singleShipmentCharge !== null && this.singleShipmentCharge !== undefined) {
          addSingleShipmentCharge = this.singleShipmentCharge;
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    } else {
      if (profileSingleShipment !== '' && profileSingleShipment !== null && profileSingleShipment !== undefined) {
        addSingleShipmentCharge = profileSingleShipment;
      } else {
        if (singleShipmentsetMasterData.cost !== '' && singleShipmentsetMasterData.cost !== null && singleShipmentsetMasterData.cost !== undefined) {
          addSingleShipmentCharge = singleShipmentsetMasterData.cost;
        } else {
          addSingleShipmentCharge = 0;
        }
      }
    }

    /*
    check the type is Rate or DwRate
     */
    if (response.result.type === 'Rate') {
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          currentFinalRate = Number(response.result.rate[i].finalRate) * this.increasedValueForAR;
        } else {
          currentFinalRate = Number(response.result.rate[i].finalRate);
        }
        finalRateArray.push(currentFinalRate.toFixed(2));
      }
    } else {
      for (let i = 0; i < response.result.rate.length; i++) {
        if (category === 'AR') {
          currentFinalRate = Number(response.result.rate[i].finalDWRate) * this.increasedValueForAR;
        } else {
          currentFinalRate = Number(response.result.rate[i].finalDWRate);
        }
        finalRateArray.push(currentFinalRate.toFixed(2));
      }
    }
    addRate = this.netChargeArrSum(finalRateArray);
    let minCharges;
    /*Compare final rate and mincharges if minCharges > final rate (mincharges is taken) if not final rate is taken*/
    for (let t = 0; t < response.result.rate.length; t++) {
      if (response.result.type === 'Rate') {
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.rate[t].finalRate);
              currentRate = Number(response.result.rate[t].rate);
            }
            finalRate.push(currentFinalRate.toFixed(2));
          }
          if (category === 'AR') {
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentRate = Number(response.result.rate[t].rate);
          }
          rate.push(currentRate.toFixed(2));
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            currentFinalRate = Number(response.result.rate[t].finalRate) * this.increasedValueForAR;
            currentRate = Number(response.result.rate[t].rate) * this.increasedValueForAR;
          } else {
            currentFinalRate = Number(response.result.rate[t].finalRate);
            currentRate = Number(response.result.rate[t].rate);
          }
          finalRate.push(currentFinalRate.toFixed(2));
          rate.push(currentRate.toFixed(2));
        }
      } else {
        /*If part is for YRC => it will check for (mincharges > total final rate) else part reddaway need not check*/
        if (carrierType === 'YRC') {
          if (category === 'AR') {
            minCharges = Number(response.result.minCharges) * this.increasedValueForAR;
          } else {
            minCharges = Number(response.result.minCharges);
          }
          if (Number(minCharges) > Number(addRate)) {
            this.showMinimumCharge = true;
            if (category === 'AR') {
              currentFinalRate = Number(response.result.minCharges) * this.increasedValueForAR;
            } else {
              currentFinalRate = Number(response.result.minCharges);
            }
            finalRate.push(currentFinalRate.toFixed(2));
            this.finalRateCharge = this.netChargeArrSum(finalRate);
          } else {
            this.showMinimumCharge = false;
            if (category === 'AR') {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
              finalRate.push(currentFinalDwRate.toFixed(2));
            } else {
              const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
              finalRate.push(currentFinalDwRate.toFixed(2));
            }
          }
          if (category === 'AR') {
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        } else {
          this.showMinimumCharge = false;
          if (category === 'AR') {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate) * this.increasedValueForAR;
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate) * this.increasedValueForAR;
            rate.push(currentDwRate.toFixed(2));
          } else {
            const currentFinalDwRate = Number(response.result.rate[t].finalDWRate);
            finalRate.push(currentFinalDwRate.toFixed(2));
            const currentDwRate = Number(response.result.rate[t].DWRate);
            rate.push(currentDwRate.toFixed(2));
          }
        }
      }
    }
    this.finalRateCharge = this.netChargeArrSum(finalRate);
    /*Compare diffRate is given => if it is given deficit value will be taken diffRate, diffFinalRate and crtRate, if not normal rate and final rate is considered */
    if (response.result.diffRate === 0 && response.result.diffWeight === 0 && response.result.finalDiffRate === 0 && response.result.crtRate === 0) {
      this.showDeficitValue = false;
    } else {
      this.showDeficitValue = true;
      if (category === 'AR') {
        const currentDiffRate = Number(response.result.diffRate) * this.increasedValueForAR;
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate) * this.increasedValueForAR;
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate) * this.increasedValueForAR;
        crtRateArray.push(currentCrtRate.toFixed(2));
      } else {
        const currentDiffRate = Number(response.result.diffRate);
        diffRateArray.push(currentDiffRate.toFixed(2));
        const currentFinalDiffRate = Number(response.result.finalDiffRate);
        diffFinalRateArray.push(currentFinalDiffRate.toFixed(2));
        const currentCrtRate = Number(response.result.crtRate);
        crtRateArray.push(currentCrtRate.toFixed(2));
      }
      const weight = Number(response.result.diffWeight);
      diffWeightArray.push(weight);
      this.finalRateCharge = this.finalRateCharge + this.netChargeArrSum(diffRateArray);
    }
    /*Discounted Rate => finalRate * (1-(discount/100))*/
    if (factoring !== 'COSTPLUS') {
      discountedRateCalculation = (this.finalRateCharge * (1 - (discount / 100)));
    } else {
      let discountedRateNewCalculation = (this.finalRateCharge * (1 - (discount / 100)));
      discountedRateCalculation = (Number(discountedRateNewCalculation) * Number(this.costPlusPercentFactor));
    }
    /* Comparing discounted Rate and the minCharge given in the customer business rules and Amc in set master data*/
    if (profileMinimumCharge !== undefined && profileMinimumCharge !== '' && profileMinimumCharge !== null) {
      if (Number(profileMinimumCharge) > Number(discountedRateCalculation)) {
        // discountedRate = Number(profileMinimumCharge);
        if (factoring !== 'COSTPLUS') {
          discountedRate = Number(profileMinimumCharge);
          console.log('profileFedex1 ', discountedRate);
        } else {
          discountedRate = (Number(profileMinimumCharge)* Number(this.costPlusPercentFactor)).toFixed(2);
          console.log('profileFedex3 cost plus ', discountedRate);
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    } else {
      if (amc !== '' && amc !== null && amc !== undefined) {
        if (Number(amc) > Number(discountedRateCalculation)) {
          if (factoring !== 'COSTPLUS') {
            discountedRate = Number(amc);
            console.log('profileFedex1 ', discountedRate);
          } else {
            discountedRate = (Number(amc)* Number(this.costPlusPercentFactor)).toFixed(2);
            console.log('profileFedex3 cost plus ', discountedRate);
          }
          
        } else {
          discountedRate = Number(discountedRateCalculation.toFixed(2));
        }
      } else {
        discountedRate = Number(discountedRateCalculation.toFixed(2));
      }
    }
    discountedRateArray.push(discountedRate);
    /*Net charge => (1+(fuelSurchareg/100))*discountedRate */
    if (factoring !== 'COSTPLUS') {
      const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
      netChargeArray.push(netCharge.toFixed(2));
      const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
      netChargeResultArray.push(netChargeResult.toFixed(2));
    } else {
      const netCharge = (1 + (fuelSurcharge / 100)) * discountedRate;
      netChargeArray.push(netCharge.toFixed(2));
      const netChargeResult = ((discountedRate) * (fuelSurcharge / 100));
      netChargeResultArray.push(netChargeResult.toFixed(2));
    }
    let assessorialUnique = [], uniqueArray = [];
    console.log('this.selectedItems before duplicating', this.selectedItems);
    uniqueArray = this.selectedItems;
    console.log('assessorialUnique After', uniqueArray);
    /* assessorial function => static values if customer rule is given that value will be considered*/
    if (factoring !== 'COSTPLUS') {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.parseSetMasterData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    } else {
      assessorialChargeArray = this.pricingInfoService.assessorialFunction(uniqueArray, this.localStorageArData.assessorials, profileAssessorials, this.weightForCal, carrierType, category);
    }
    assessorialCharge = assessorialChargeArray[0];
    this.arrayData = this.pricingInfoService.getAssessorial();
    const netChargeValue = this.netChargeArrSum(netChargeArray);
    if(carrierType === 'YRC') {
      addCACharge = Number(response.result.yrcCaCharge);
    } else {
      addCACharge = Number(response.result.reddawayCaCharge );

    }
    totalAssessorialCharge = Number(highCost) + Number(addCACharge) + Number(addSingleShipmentCharge) + assessorialCharge;
    /*totalCharge => Add netCharge, assessorialCharge, addCACharge, highCost, addSingleShipmentCharge */
    if (factoring !== "COSTPLUS") {
      const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
      totalChargeArray.push(totalCharge.toFixed(2));
    } else {
      const totalCharge = Number(highCost) + Number(addCACharge) + Number(netChargeValue) + Number(addSingleShipmentCharge) + assessorialCharge;
      totalChargeArray.push(totalCharge.toFixed(2));
    }
    classification1.splice(0, 2);
    const totalChargeForComparing = this.netChargeArrSum(totalChargeArray)
    minimumClass = Math.min(...classificationArray);
    this.pricingInfo = {
      rate: rate,
      finalRate: finalRate,
      totalGrossCharge: this.finalRateCharge.toFixed(2),
      discount: discountArray,
      fuelChargeYrc: fuelSurchargeArray,
      fuelCharge: fuelSurchargeArray,
      discountedRate: discountedRateArray,
      netCharge: netChargeArray,
      totalCharge: totalChargeArray,
      fuelChargeDiff: fuelSurcharge,
      discountDiff: discount,
      weight: weightArray,
      classification: classificationArray,
      classification1: classification1,
      diffWeight: diffWeightArray,
      diffRate: diffRateArray,
      diffFinalRate: diffFinalRateArray,
      crtRate: crtRateArray,
      diffDiscountedRate: discountedRateArray,
      diffNetCharge: netChargeArray,
      assessorialCharge: assessorialCharge,
      assessorialChargeValue: totalAssessorialCharge,
      assessorialDataList: this.arrayData,
      netChargeResult: netChargeResultArray,
      netChargeDiffResult: netChargeResultArray,
      additionalCharge: addCACharge,
      singleShipmentCharge: addSingleShipmentCharge,
      highCostDeliveryCharge: highCost,
   
      showMinimumCharge: this.showMinimumCharge,
      shipTypes: this.showDirections,
      carrierType: carrierType,
      netChargeValue: netChargeValue,
      totalChargeForComparing: totalChargeForComparing,
      factor: factoring,
      costPlusPercent: this.costPlusPercentFactor,
      totalWeight: this.finalTotalWeight,
      higherValueAP: this.higherValueAP,
      
    };
    let pricingInfo1 = {
      category: category,
      showcolor:this.showcolor
    }   
    let pricingInfo2 = {
      category: 'OLDAP',
      showcolor:false
    }   
    if(type === 'yrcReddaway')
    {
      this.pricingInfo = Object.assign(this.pricingInfo, pricingInfo1);      
    }
    else if(type === 'yrcReddaway2'){
      this.pricingInfo = Object.assign(this.pricingInfo, pricingInfo2);      
    }
    this.resultArray.push(this.pricingInfo);
    if (this.resultArray.length > 1) {
      this.resultArray.sort(function (a:any, b:any) {
        return (a.category - b.category);
      });
      if (this.resultArray[0].category === 'AP') {
      } else {
        this.resultArray.reverse();
      }
    }
    if(type === 'yrcReddaway'){
      let rateArray = [];
      if (this.resultArray.length > 1) {
        let Apdiscountrate;
        let Ap: any, Ar: any;
        let ARindex; //next if condition here...
        this.resultArray.forEach((ee: any, index: any) => {
          if (ee.category === "AP") {
            Ap = ee;
  
          };
          if (ee.category === "AR") {
            Ar = ee;
            ARindex = index; //differ
  
          };
        });
        console.log('jefrin', Ap, Ar);
        if (Number(Ap.totalCharge) > Number(Ar.totalCharge[0])) {
          let charge = Number(Ap.totalCharge) / 0.95;
          let addedCharge = charge;
          let charegArry = [];
          charegArry.push(addedCharge.toFixed(2));
          Ar.totalCharge = charegArry;
          Ar.showcolor = true;
        }
  
        (document.getElementById('myDiv') as HTMLFormElement).className = 'imgBlock';
        /*If AP netcharge value > AR netcharge it gives Error message as sales rep will contact you*/
        if (this.resultArray[1].factor !== 'COSTPLUS') {
          this.showData = true;
          this.resultArray.forEach((el: any) => {
            if (el.category === 'AR') {
              this.resultObject = el;
  
            }
          })
            (document.getElementById('myDiv') as HTMLFormElement).className = 'imgBlock';
          if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          } else {
            if (this.resultArray.length > 1) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          }
        } else {
          this.showData = true;
          this.resultArray.forEach((el: any) => {
            if (el.category === 'AR') {
              this.resultObject = el;
  
            }
          })
            (document.getElementById('myDiv') as HTMLFormElement).className = 'imgBlock';
          if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          } else {
            if (this.resultArray.length > 1) {
              this.giveRateDetails(this.resultArray, 'AR');
            }
          }
        }
      }
    }
    else if(type === 'yrcReddaway2'){
    let rateArray = [];
    if (this.resultArray.length > 1) {
            let Apdiscountrate;
        let Ap:any,Ar:any;
        console.log(this.applyCostPlusFlag);
        if (this.applyCostPlusFlag === false) {
        this.resultArray.forEach((ee:any, index:any) => {
          if (ee.category === "AP") {
            Ap = ee;

          };
          if (ee.category === "AR") {
            Ar = ee;

          };
        });
            console.log('jefrin',Ap,Ar);
            Apdiscountrate = Ap.discountedRate;
            let consoleArray;
            consoleArray = this.resultArray;
            if (Number(Ap.totalCharge) > Number(Ar.totalCharge[0])) {
              // this.showNegativeMargin = true;
              let charge = Number(Ap.totalCharge)/0.95;
              let addedCharge = charge;
              let charegArry = [];
              charegArry.push(addedCharge.toFixed(2));
              Ar.totalCharge = charegArry;
              Ar.showcolor = true;
              // this.showData = false;
            }
            this.resultArray.forEach((el:any) => {
              if (el.category === 'AR') {
                this.resultObject = el;
  
              }
            })
          }
      (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
 
      /*If AP netcharge value > AR netcharge it gives Error message as sales rep will contact you*/
      if (this.resultArray[1].factor !== 'COSTPLUS') {
          this.showData = true;
          this.resultArray.forEach((el:any) => {
            if (el.category === 'AR') {
              this.resultObject = el;

            }
          })
          (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
          // this.giveRateDetails(this.resultArray, 'AR');
          // if (this.userData.carrier === 'YRC') {
            if (this.resultArray.length > 2) {
            this.giveRateDetails(this.resultArray, 'AR');
            }
          // } else {
          //   this.giveRateDetails(this.resultArray, 'AR');
  
          // }
        // }
      } else {
        this.showData = true;
        // this.resultObject = this.resultArray[1];
        this.resultArray.forEach((el:any) => {
          if (el.category === 'AR') {
            this.resultObject = el;

          }
        })
        (document.getElementById('myDiv')as HTMLFormElement).className = 'imgBlock';
        // if (this.userData.carrier === 'YRC') {
          if (this.resultArray.length > 2) {
          this.giveRateDetails(this.resultArray, 'AR');
          }
        // } else {
        //   this.giveRateDetails(this.resultArray, 'AR');

        // }
      }
    }
  }
  }
  giveRateDetails(rateDetail:any, value:any) {
    console.log('rateDetail', rateDetail);
    this.quote = {};
    this.quoteDetailsArray = [];
    this.quoteId = '';
    let category, highValue;
    this.quoteDetailsId;
    // rateDetail.forEach((ee,index) => {
      for(let i=0;i<rateDetail.length;i++) {
        if (rateDetail[0].carrierType=== 'FEDEX ECONOMY'|| rateDetail[0].carrierType === 'FEDEX PRIORITY') {
if (rateDetail[0].category === 'AP') {
  rateDetail[0].fedexHighcost = rateDetail[1].fedexHighcost;
  rateDetail[0].highCostDeliveryCharge = rateDetail[1].highCostDeliveryCharge;

  console.log(rateDetail);

}
        }
      }
    //   if (ee.carrierType === 'FEDEX ECONOMY'|| ee.carrierType === 'FEDEX PRIORITY') {
    //     if (ee.category === "AP" && index === 0) {
    //       console.log(index,ee[0]);
    //       console.log(ee[1]);
    //       ee[0].fedexHighcost = ee[1].fedexHighcost; 
    //     }
    //   }
    // })
    (document.getElementById('clear')as HTMLFormElement).focus();
    if (rateDetail.length > 0) {
      for (let i = 0; i < rateDetail.length; i++) {
        // if (rateDetail[i].factor === 'AP' || rateDetail[i].factor === 'AR') {
        //   category = rateDetail[i].factor;
        //   highValue = value;
        // } else {
        //   category = 'COSTPLUS';
        //   highValue = 'COSTPLUS';
        // }
        if (rateDetail[i].factor === 'COSTPLUS') {
          highValue = 'COSTPLUS';
          category = 'COSTPLUS';
        } else {
          highValue = 'AR';
          category = rateDetail[i].category;
        }
        this.quote = {
          customerId: this.customerId,
          companyId: this.companyId,
          ratingNotes: this.customerData,
          originZip: this.userData.origin,
          destinationZip: this.userData.destination,
          classAndWeight: this.userData.classWeight,
          accessorials: this.assessorials,
          carrierName: this.userData.carrierName,
          rateDetail: JSON.stringify(rateDetail[i]),
          totalCharge: rateDetail[i].totalCharge,
          createdBy: this.salesRepType,
          highValue: highValue,
          category: category,
          higherValueAp: rateDetail[i].higherValueAP,
          salesRepId: this.setSalesRepId,
          viewType: 'externalCustomer',
          loginId: this.salesRepValues.id,
          originCityState: JSON.stringify({ 'city': this.filterValues.city, 'state': this.filterValues.state }),
          destinationCityState: JSON.stringify({ 'city': this.filterValuesDest.city, 'state': this.filterValuesDest.state })
        };
        this.quoteDetailsArray.push(this.quote);
      }
    }
    console.log('Quotes creation', this.quoteDetailsArray);
    if (this.quoteDetailsArray.length > 0) {
      this.pricingInfoService.saveQuoteDetails(this.quoteDetailsArray).subscribe((data:any) => {
        console.log(data);
        if (data.quoteId === false) {
          this.showQuoteId = false;
        } else if (data.quoteId === 'ap') {
          this.showAdminErrorMessage = true;
          this.showAllData = false;
        } else {
          this.showQuoteId = true;
          if (data.quoteId['YRCAR']) {
            this.quoteId = data.quoteId['YRCAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['YRCARID'];
          } else if (data.quoteId['YRCCOSTPLUS']) {
            this.quoteId = data.quoteId['YRCCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['YRCCOSTPLUSID'];
          } else if (data.quoteId['FEDEX ECONOMYAR']) {
            this.quoteId = data.quoteId['FEDEX ECONOMYAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX ECONOMYARID'];
          } else if (data.quoteId['FEDEX ECONOMYCOSTPLUS']) {
            this.quoteId = data.quoteId['FEDEX ECONOMYCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX ECONOMYCOSTPLUSID'];
          } else if (data.quoteId['FEDEX PRIORITYAR']) {
            this.quoteId = data.quoteId['FEDEX PRIORITYAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX PRIORITYARID'];
          } else if (data.quoteId['FEDEX PRIORITYCOSTPLUS']) {
            this.quoteId = data.quoteId['FEDEX PRIORITYCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['FEDEX PRIORITYCOSTPLUSID'];
          } else if (data.quoteId['REDDAWAYAR']) {
            this.quoteId = data.quoteId['REDDAWAYAR'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['REDDAWAYARID'];
          } else if (data.quoteId['REDDAWAYCOSTPLUS']) {
            this.quoteId = data.quoteId['REDDAWAYCOSTPLUS'];
            this.showQuoteId = true;
            this.quoteDetailsId = data.quoteId['REDDAWAYCOSTPLUSID'];
          }
        }
      });
    }
  }
}