import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkBook, read, utils, write, readFile } from 'xlsx';
import { ExcelService } from '../services/excel.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { InvoiceService } from '../services/invoice.service';
import { DatePipe } from '@angular/common';
// import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-worksheet',
  templateUrl: './upload-worksheet.component.html',
  styleUrls: ['./upload-worksheet.component.css']
})
export class UploadWorksheetComponent implements OnInit {
  analyticsForm: FormGroup = new FormGroup({});
  public formattedArray: any = [];
  accessorialArray: any = [];
  selectedFile: any;
  companyDetails: any;
  setLoadedData: any;
  loading = false;
  invoiceDetails: any;
  accessToken: any = '';
  itemArray: any;
  newArray: any;
  loginDetails: any;
  showFiles = false;
  analyticsCode: any;
  disableButton = true;
  showErrorMsg = false;
  splittedOrigin: any = [];
  originZip: any;
  destinationZip: any;
  fuelCharge: any;
  class: any;
  invoiceAmountValue: any;
  showUpload = false;

  assessorialNames: any = [
    { 'id': 1, 'itemName': 'LiftGate Service', 'name': 'LG', 'Yrccost': '8.80', 'Fedexcost': '72.06' },
    { 'id': 2, 'itemName': 'Residential Delivery', 'name': 'RD', 'Yrccost': '11', 'Fedexcost': '76' },
    { 'id': 3, 'itemName': 'Limited Access Delivery', 'name': 'LA', 'Yrccost': '0', 'Fedexcost': '76' },
    { 'id': 4, 'itemName': 'Inside Delivery', 'name': 'ID', 'Yrccost': '11.85', 'Fedexcost': '6.98', 'FedexcostAR': '11.40' },
    { 'id': 5, 'itemName': 'Notify', 'name': 'NTFY', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 6, 'itemName': 'High Cost', 'name': 'HC', 'Yrccost': '0', 'Fedexcost': '0' },
    { 'id': 7, 'itemName': 'Single Shipment', 'name':'SS', 'Yrccost': '0', 'Fedexcost': '0' }];

  constructor(private router: Router,
    private excelService: ExcelService,
    private invoiceService: InvoiceService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    let details: any = localStorage.getItem(('SalesRepName'));
    this.loginDetails = JSON.parse(details);
    this.companyDetails = this.invoiceService.getCompanyInformation1();
    console.log('this.companyDetails initialization', this.companyDetails);
    this.fetchCompanyInvoice();
    let object = '';
    this.invoiceService.setSocketData(object);
  }
  buildForm() {
    this.analyticsForm = this.fb.group({
      codeName: ['']
    })
  }
  fetchCompanyInvoice() {
    if (this.companyDetails !== null && this.companyDetails !== undefined) {
      // this.invoiceService.getCompanyInvoice(this.companyDetails.id, this.accessToken).subscribe(response => {
      //   this.invoiceDetails = response;
      //   console.log('this.invoiceDetails', this.invoiceDetails);
      //   if (this.invoiceDetails.length > 0) {
      //     for (let i = 0; i < this.invoiceDetails.length; i++) {
      //       let newDate = moment(this.invoiceDetails[i].shipmentDate).format('MM/DD/YY');
      //       this.invoiceDetails[i].shipmentDate = newDate;
      //       this.invoiceDetails[i].retrievedTableDataFlag = true;
      //     }
      //     this.itemArray = this.invoiceDetails;
      //     console.log('this.itemArray If', this.itemArray);

      //   } else {
      //     this.itemArray = [];
      //   }
        let object = this.companyDetails.id;
        this.invoiceService.getAnalyticsCode(object).subscribe((response: any) => {
          console.log(response);
          if (response.length > 0) {
            this.showFiles = true;
            this.buildForm();
            this.analyticsCode = response;

          }
        });
      // });
    }
  }

  checkForAnalyticscode(passingdatahtml: any,formvalue:any) {
    console.log(formvalue);
    let codeName: any,notesValue,contractPerson,contractAddress,contractDate,contractPosition, costplus,billToAddress;
    this.analyticsCode.forEach((element: any) => {
      if(element.id === Number(formvalue.codeName)) {
        console.log('test');
        codeName = element.code;
        notesValue = element.notes;
        contractPerson = element.contractPerson;
        contractAddress = element.contractAddress;
        contractDate = element.contractDate;
        contractPosition = element.contractPosition;
      costplus = element.costPlus;
      billToAddress = element.billToAddress;

      } 
    });
    console.log(codeName);
    let value = (codeName).split('_');
    console.log(value);
    let emptyArray = null;
    this.invoiceService.setTrafficData(emptyArray);
    // this.invoiceService.setTrafficDataEnable(emptyArray);
    let data = undefined;
    this.invoiceService.setUploadedData(data);
    let passingObject = {
      filterValue: codeName,
      carrierValue: '',
      analyticsId: formvalue.codeName,
      notes: notesValue,
      contractPerson: contractPerson,
        contractAddress : contractAddress,
        contractDate : contractDate,
        contractPosition : contractPosition,
        costPlus : costplus,
        billtoAddress : billToAddress
    };
    console.log(passingObject);
    this.invoiceService.setAnalyticsCode(passingObject);
    this.router.navigate(['/trafficdatanew']);
  }

  nextflow() {
    this.router.navigate(['/uploadTrafficFlow']);
  }

  carrierAnalytics() {
    let emptyArray = null;
    this.invoiceService.setTrafficData(emptyArray);
    this.invoiceService.setTrafficDataEnable(emptyArray);

    this.router.navigate(['/carrierAnalytics']);
  }

  fileUpload(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0].name;
    this.showUpload = true;
    console.log(event.srcElement.files[0]);
    this.convertExcelToJson(event.srcElement.files[0])
  }

  convertExcelToJson(file: any) {
    let reader = new FileReader();
    let workbookkk: any;
    let XL_row_object;
    let json_object;
    let formatted_object;
    this.formattedArray = [];
    this.splittedOrigin = [];
    let chargeValue: any;
    reader.readAsBinaryString(file);
    let that = this;
    this.disableButton = false;
    return new Promise((resolve, reject) => {
      reader.onload = function () {
        //  alert(reader.result);
        let data = reader.result;
        workbookkk = read(data, { type: 'binary' });
        console.log(workbookkk);
        let mySheetName = "Frt Bill Analysis";
        let no;
        let ws;
        let dummy:any = [];
        workbookkk.SheetNames.forEach(function (sheetName: any) {
          // Here is your object
          if (mySheetName === sheetName) {
            ws = workbookkk.Sheets[sheetName];
            const range = XLSX.utils.decode_range(ws['!ref']);
            console.log(range);
            let cell_ref;
            let listArray : any= [];
            let tmp = [];

            // for(var R = range.s.r; R <= range.e.r; ++R) {
            for (var R = 8; R <= range.e.r; ++R) {
              for (var C = range.s.c; C < 1; ++C) {
                var cell_address = { c: C, r: R };
                console.log(cell_address);
                console.log(ws);
                cell_ref = XLSX.utils.encode_cell(cell_address);
                console.log(cell_ref);
                // const reference = String(cell_ref);
                console.log(ws[cell_ref]);
                if (ws[cell_ref] !== undefined && ws[cell_ref] !== null) {
                  delete ws[cell_ref].w;
                  ws[cell_ref].z = 'yyyy-MM-dd';
                  XLSX.utils.format_cell(ws[cell_ref]);
                }
              }
            }
            XL_row_object = XLSX.utils.sheet_to_json(ws);
            // let newdataobject = XLSX.utils.
            json_object = JSON.stringify(XL_row_object);
            console.log(XL_row_object);
            console.log(json_object);
            resolve(XL_row_object);
            no = reader.result;
            //  dummy = json_object.split('\n');
            dummy = XL_row_object;
            console.log(dummy);
            for (let i = 0; i < dummy.length; i++) {
              console.log(dummy[i].__EMPTY, dummy[i].__EMPTY !== undefined,dummy[i]);
              if (dummy[i].__EMPTY === 'OUTBOUND') {
                loop1: for (let j = i + 1; j < dummy.length; j++) {
                  if ((dummy[j].__EMPTY === '' && dummy[j].__EMPTY === undefined) &&(dummy[j].__EMPTY_3 === '' && dummy[j].__EMPTY_3 === undefined) && 
                  (dummy[j].__EMPTY_5 === '' && dummy[j].__EMPTY_5 === undefined) &&
                  (dummy[j].__EMPTY_7 === '' && dummy[j].__EMPTY_7 === undefined) && (dummy[j].__EMPTY_8 === '' && dummy[j].__EMPTY_8 === undefined) && 
                  (dummy[j].__EMPTY_12 === '' && dummy[j].__EMPTY_12 === undefined)) {
            break;
          } else {
                  if (dummy[j].__EMPTY !== '' && dummy[j].__EMPTY !== 'INBOUND' && dummy[j].__EMPTY !== undefined) {
                    console.log('originzip', dummy[j].__EMPTY_13);
                    console.log('originzip', dummy[j].__EMPTY_3);
                    if (dummy[j].__EMPTY_3 !== undefined) {
                    that.originZip = (dummy[j].__EMPTY_3.length > 4) ? dummy[j].__EMPTY_3 : '0' + dummy[j].__EMPTY_3;
                    } else {
                      that.originZip = '00';
                    }
                    // console.log('sele', dummy[j].__EMPTY_5.length,dummy[j].__EMPTY_5);
                    if (dummy[j].__EMPTY_5 !== undefined) {
                    that.destinationZip = (dummy[j].__EMPTY_5.length > 4) ? dummy[j].__EMPTY_5 : '0' + dummy[j].__EMPTY_5;
                    } else {
                      that.destinationZip = '00';
                    }
                    console.log(that.destinationZip);
                    if (dummy[j].__EMPTY_13 !== undefined) {
                      that.fuelCharge = dummy[j].__EMPTY_13.split('$')[1];
                    } else {
                      that.fuelCharge = '0';
                    }
                    console.log(that.fuelCharge);
                    if (dummy[j].__EMPTY_12 !== undefined) {
                      that.invoiceAmountValue = dummy[j].__EMPTY_12.split('$')[1];
                    } else {
                      that.invoiceAmountValue = '0';
                    }
                    console.log(dummy[j].__EMPTY_7.includes('/'));
                    if (dummy[j].__EMPTY_7.includes('/') === true) {
                      console.log(dummy[j].__EMPTY_7.split('/'));
                      let data = dummy[j].__EMPTY_7.split('/');
                      if (data[1] === '77.5') {
                        that.class = '77'
                      } else if (data[1] === '92.5') {
                        that.class = '92'
                      } else {
                        that.class = data[1];
                      }
                    } else {
                      //  that.class = dummy[j].__EMPTY_7;
                      if (dummy[j].__EMPTY_7 === '77.5') {
                        that.class = '77'
                      } else if (dummy[j].__EMPTY_7 === '92.5') {
                        that.class = '92'
                      } else {
                        that.class = dummy[j].__EMPTY_7;
                      }
                    }
                    console.log('class', that.class)
                    console.log('text',dummy[j]);
                    if(dummy[j].__EMPTY_15 !== undefined) {
                      console.log('ass',dummy[j].__EMPTY_15);
  let dummyValue = dummy[j].__EMPTY_15.split('$');
                     chargeValue = Number(dummyValue[1]);
                    } else {
                      console.log('ass',dummy[j].__EMPTY_15);
  
                      chargeValue = 0;
                    }
                    console.log('ass',chargeValue);
                    if (dummy[j].__EMPTY_17 !== undefined) {
                      console.log('ass', dummy[j].__EMPTY_17);
                      let dummyValue1 = dummy[j].__EMPTY_17.split('$')
                      chargeValue = Number(chargeValue) + Number(dummyValue1[1]);
                    } else {
                      console.log('ass', dummy[j].__EMPTY_15);

                      chargeValue = chargeValue + 0;
                    }
                    let assArray:any = [];
                    if (dummy[j].__EMPTY_14 !== undefined) {
                    if(dummy[j].__EMPTY_14.includes(',')) {
                      let arryass = dummy[j].__EMPTY_14.split(',');
                      arryass.forEach((ele:any) => {
                        let name1 ;
                        if(ele === 'Notify') {
                       name1 = 'NTFY';
                       assArray.push({"name":name1,'charge': '0'});

                        } else {
                        assArray.push({"name":ele,'charge': '0'});
                        }

                      })
                      //  assArray = dummy[j].__EMPTY_14.split(',');
                       console.log('split',assArray);
                    } else {
                      let split = dummy[j].__EMPTY_15.split('$');
                      let name1 ;
                        if(dummy[j].__EMPTY_14 === 'Notify') {
name1 = 'NTFY';
                        
                      assArray.push({"name":name1,'charge': split[1]});
                    } else {
                      assArray.push({"name":dummy[j].__EMPTY_14,'charge': split[1]});
                      }

                    }
                  } 
                  if (dummy[j].__EMPTY_16 !== undefined) {
                    if(dummy[j].__EMPTY_16.includes(',')) {
                      let arryass = dummy[j].__EMPTY_16.split(',');
                      arryass.forEach((ele: any) => {
                        let name1 ;
                        if(ele === 'Notify') {
                       name1 = 'NTFY';
                       assArray.push({"name":name1,'charge': '0'});

                        } else {
                        assArray.push({"name":ele,'charge': '0'});
                        }

                      })
                      //  assArray = dummy[j].__EMPTY_14.split(',');
                       console.log('split',assArray);
                    } else {
                      let split = dummy[j].__EMPTY_17.split('$');
                      let name1 ;
                        if(dummy[j].__EMPTY_16 === 'Notify') {
name1 = 'NTFY';
                        
                      assArray.push({"name":name1,'charge': split[1]});
                    } else {
                      assArray.push({"name":dummy[j].__EMPTY_16,'charge': split[1]});
                      }

                    }
                  } 



                  // if (dummy[j].__EMPTY_14 !== undefined) {
                  //   if(dummy[j].__EMPTY_14.includes(',')) {
                  //      assArray = dummy[j].__EMPTY_14.split(',');
                  //   } else {
                  //     assArray.push(dummy[j].__EMPTY_14);
                  //   }
                  // }
//                   if (dummy[j].__EMPTY_16 !== undefined) {
//                     if(dummy[j].__EMPTY_16.includes(',')) {
//                       let arryass = dummy[j].__EMPTY_16.split(',');
//                       arryass.forEach((ele) => {
//                         let name1 ;
//                         if(ele === 'Notify') {
// name1 = 'NTFY';
                        
//                         assArray.push({"name":name1,'charge': '0'});
//                       } else {
//                         assArray.push({"name":ele,'charge': '0'});
//                         }

//                       })
//                       //  assArray = dummy[j].__EMPTY_14.split(',');
//                        console.log('split',assArray);
//                     } else {
//                       let split = dummy[j].__EMPTY_17.split('$');
//                       let name1 ;
//                       if(dummy[j].__EMPTY_16 === 'Notify') {
//                     name1 = 'NTFY';                   
//                       assArray.push({"name":name1,'charge': split[1]});
//                       } else {
//                         assArray.push({"name":dummy[j].__EMPTY_16,'charge': split[1]});
//                         }
//                     }
//                   } 
                  that.accessorialArray = [];
                  let otherArray =[];
                  for (let d=0;d<assArray.length;d++) {
                    let element = assArray[d];
                    for(let a=0;a<that.assessorialNames.length;a++) {
                      let ele= that.assessorialNames[a];
                      if(ele.name === element.name) {
                        console.log(element);
                        element.status = 'existing'
                        that.accessorialArray.push({ assessorialName: ele.itemName, charge: element.charge, shortName: element.name })
                      } 
                    }
                  }
                  console.log(assArray);
                  console.log(that.accessorialArray);
                  //  let tempArray = [];
                  //  let arrayList = [];
                  //  arrayList = assArray;
                  //  tempArray = arrayList;

                //    tempArray.forEach((item, index) => {
                //      if(item.status !== undefined && item.status === 'existing') {
                //       console.log(item.status);

                //       tempArray.splice(index, 1);

                //      }
                    
                // });
                // setTimeout(() => {
                  // tempArray.forEach((m) => {
                  //   m.assessorialName = "Others ("+ m.name+")";
                  // })
                // }, 2000);
               
                // console.log('assArray',tempArray);
                // that.accessorialArray = that.accessorialArray.concat(tempArray);
                console.log('ass',that.accessorialArray);

                    for (let a = 0; a < assArray.length; a++) {
                    if (assArray[a].status !== undefined) {
                      console.log(assArray[a]);
                    } else {
                      console.log('else',assArray[a]);
                        that.accessorialArray.push({assessorialName: "Others ("+assArray[a].name +")", charge: assArray[a].charge, shortName: assArray[a].name})

                    }
                    }
                  if(listArray.length === 0) {
                    listArray = assArray;
                  } else {
                    listArray.forEach((ee: any) => {
                      for(let c= 0; c< assArray.length;c++) {
                        if(ee.name === assArray[c].name ) {
                          if(ee.charge ==='0') {
                            ee.charge = assArray[c].charge;
                          }
                          break;
                        } else {
                          listArray.push(assArray[c]);
                        }

                      }
                    })
                  }
                  console.log('list1',listArray);
            //       for(let i = 0; i < listArray.length; i++){
            //         if(tmp.indexOf(listArray[i].name) === -1){
            //         tmp.push(listArray[i]);
            //         }
            //     }
            
            // console.log(tmp);
            // listArray = tmp;
            listArray.forEach((le2: any) => {
              let value = le2.name;
              le2.name =  value.trim();
            });
            let lengthlist = listArray.length;

            listArray.forEach((item: any, index: any) => {
              console.log('charge', item);

              if (index !== listArray.findIndex((i: any) => i.name === item.name)) {
                listArray.splice(index, 1);
              } else if (item.charge === '0') {
                console.log('charge', item)
                listArray.splice(index, 1);
              } 
                         
          });

        
                  that.accessorialArray.forEach((le:any) => {
                    listArray.forEach((le1: any) => {
                      if (le.shortName === le1.name) {
                        console.log(le);
                        le.charge = le1.charge;
                      }
                    })
                  });
                  console.log('list',listArray)
                  console.log(that.accessorialArray);
                  let added = 0
                  that.accessorialArray.forEach((check:any,index:any) => {
                    if (check.charge !== '0') {
                    added = added + Number(check.charge);
                    console.log(added,check);
                    } 
                    if (index === that.accessorialArray.length - 1) {
                      console.log('test12345');
                      let temporaryArray = that.accessorialArray.filter((chargevalue:any) => chargevalue.charge === '0');
                      console.log(temporaryArray);

                      if (temporaryArray.length === 1) {
                      let tempIndex = that.accessorialArray.findIndex((chargevalue:any) => chargevalue.charge === '0');
                      let tempValue = (Number(chargeValue) - Number(added)).toFixed(2);
                      console.log('test12345',tempIndex);
                      console.log(tempIndex,tempValue);
                      if (tempIndex > -1) {
                        // listArray.forEach((le1, indexnew) => {
                        //   // let newAccArray = listArray.findIndex(chargevalue => chargevalue.charge === '0');
                        //   if (that.accessorialArray[tempIndex].shortName === le1.name) {
                        //     console.log(that.accessorialArray[tempIndex]);
                        //     that.accessorialArray[tempIndex].charge = le1.charge;
                        //   } else {
                        //     if (indexnew === listArray.length -1) {
                              that.accessorialArray[tempIndex].charge= tempValue;
                        //     }
                        //   }
                        // })
                      }
                    } else if (temporaryArray.length > 1) {
                      temporaryArray.forEach((elem:any) => {
                        let exp = listArray.find((mm:any)=>mm.name === elem.shortName);
                        console.log(exp);
                        if (exp !== undefined) {
                          elem.charge = exp.charge;
                        }
                      })
                    }
                    }
                  })

//                   if(dummy[j].__EMPTY_15 !== undefined) {
//                     console.log('ass',dummy[j].__EMPTY_15);
// let dummyValue = dummy[j].__EMPTY_15.split('$');
//                    chargeValue = Number(dummyValue[1]);
//                   } else {
//                     console.log('ass',dummy[j].__EMPTY_15);

//                     chargeValue = 0;
//                   }
//                   console.log('ass',chargeValue);

//                   if(dummy[j].__EMPTY_17 !== undefined) {
//                     console.log('ass',dummy[j].__EMPTY_17);
// let dummyValue1 = dummy[j].__EMPTY_17.split('$')
//                    chargeValue = Number(chargeValue) + Number(dummyValue1[1]);
//                   } else {
//                     console.log('ass',dummy[j].__EMPTY_15);

//                     chargeValue = chargeValue + 0;
//                   }
                    console.log('ass1',chargeValue);
                    // if (dummy[j].__EMPTY_3)
                    formatted_object = {
                      companyId: that.companyDetails.id,
                      // shipmentDate: '2018-08-16',
                      shipmentDate: that.datePipe.transform(dummy[j].__EMPTY, "yyyy-MM-dd"),
                      carrier: dummy[j].__EMPTY_1,
                      originZip: that.originZip,
                      originState: dummy[j].__EMPTY_4,
                      destinationZip: that.destinationZip,
                      destinationState: dummy[j].__EMPTY_6,
                      class: that.class,
                      weight: dummy[j].__EMPTY_8,
                      pallets: dummy[j].__EMPTY_11,
                      invoiceAmount: that.invoiceAmountValue,
                      fuelCharge: that.fuelCharge,
                      assessorial: that.accessorialArray,
                      typeOfInvoice: 'Out Bound',
                      assessorialCharge: chargeValue,
                      salesRepId: that.companyDetails.salesRepId,
                      createdVia: 'Excel',
                      Accesslist : listArray
                    };
                    that.formattedArray.push(formatted_object);
                  } else {
                    console.log('jlength',dummy[j].__EMPTY);

                    if (dummy[j].__EMPTY === 'INBOUND') {
                      console.log('jlength',dummy[j].__EMPTY);

                      i = j;
                      console.log('j',i , j);

                      continue loop1;
                    }
                  }
                }
                }
                // for (let k = i+ 1; k < dummy.length; k++) {
                //   console.log('k', k)
                //   console.log('k', dummy[k])

                //   if ((dummy[k].__EMPTY !== '' && dummy[k].__EMPTY !== undefined) &&(dummy[k].__EMPTY_3 !== '' && dummy[k].__EMPTY_3 !== undefined) && 
                //       (dummy[k].__EMPTY_5 !== '' && dummy[k].__EMPTY_5 !== undefined) &&
                //       (dummy[k].__EMPTY_7 !== '' && dummy[k].__EMPTY_7 !== undefined) && (dummy[k].__EMPTY_8 !== '' && dummy[k].__EMPTY_8 !== undefined) && 
                //       (dummy[k].__EMPTY_12 !== '' && dummy[k].__EMPTY_12 !== undefined)) {
                //     console.log(dummy[k]);
                //     that.originZip = (dummy[k].__EMPTY_3.length > 4) ? dummy[k].__EMPTY_3 : '0' + dummy[k].__EMPTY_3;
                //     console.log('sele', that.originZip);
                //     that.destinationZip = (dummy[k].__EMPTY_5.length > 4) ? dummy[k].__EMPTY_5 : '0' + dummy[k].__EMPTY_5;
                //     if (dummy[k].__EMPTY_13 !== undefined) {
                //       that.fuelCharge = dummy[k].__EMPTY_13.split('$')[1];
                //     } else {
                //       that.fuelCharge = '0';
                //     }
                //     console.log(that.fuelCharge);
                //     if (dummy[k].__EMPTY_12 !== undefined) {
                //       that.invoiceAmountValue = dummy[k].__EMPTY_12.split('$')[1];
                //     } else {
                //       that.invoiceAmountValue = '0';
                //     }
                //     console.log(dummy[k].__EMPTY_7.includes('/'));
                //     if (dummy[k].__EMPTY_7.includes('/') === true) {
                //       console.log(dummy[k].__EMPTY_7.split('/'));
                //       let data = dummy[k].__EMPTY_7.split('/');
                //       that.class = data[1];
                //     } else {
                //       that.class = dummy[k].__EMPTY_7;
                //     }
                //     let assArray = [];
                //     if (dummy[k].__EMPTY_14 !== undefined) {
                //     if(dummy[k].__EMPTY_14.includes(',')) {
                //        assArray = dummy[k].__EMPTY_14.split(',');
                //     } else {
                //       assArray.push(dummy[k].__EMPTY_14);
                //     }
                //   }
                //   that.accessorialArray = [];
                //   assArray.forEach((element) => {
                //     that.assessorialNames.forEach((ele) => {
                //       if(ele.name === element) {
                //         that.accessorialArray.push({ assessorialName: ele.itemName, charge: '0', shortName: element })
                //       } 
                //       // else {
                //       //   that.accessorialArray.push({ assessorialName: 'Others', charge: '0', shortName: element })

                //       // }
                //     })
                //   });
                //   if(dummy[k].__EMPTY_15 !== undefined) {
                //     console.log('ass',dummy[k].__EMPTY_15);

                //    chargeValue = dummy[k].__EMPTY_15.split('$');
                //   } else {
                //     console.log('ass',dummy[k].__EMPTY_15);

                //     chargeValue = '0';
                //   }
                //     console.log('ass',chargeValue);



                //     formatted_object = {
                //       companyId: that.companyDetails.id,
                //       // shipmentDate: '2018-08-16',
                //       shipmentDate: that.datePipe.transform(dummy[k].__EMPTY, "yyyy-MM-dd"),
                //       carrier: dummy[k].__EMPTY_1,
                //       originZip: that.originZip,
                //       originState: dummy[k].__EMPTY_4,
                //       destinationZip: that.destinationZip,
                //       destinationState: dummy[k].__EMPTY_6,
                //       class: that.class,
                //       weight: dummy[k].__EMPTY_8,
                //       pallets: dummy[k].__EMPTY_11,
                //       invoiceAmount: that.invoiceAmountValue,
                //       fuelCharge: that.fuelCharge,
                //       assessorial: that.accessorialArray,
                //       typeOfInvoice: 'In Bound',
                //       assessorialCharge: chargeValue,
                //       salesRepId: that.companyDetails.salesRepId,
                //       createdVia: 'Excel'
                //     };
                //     that.formattedArray.push(formatted_object);
                //   }
                //   //  else {
                //   //   break;
                //   // }
                // }
              }

              // if (dummy[i].__EMPTY === '') {
              
            }
            /* for (let i = 8; i < 15; i++) {
              formatted_object = {
                companyId: that.companyDetails.id,
                // shipmentDate: '2018-08-16',
                shipmentDate : that.datePipe.transform(dummy[i].__EMPTY,"yyyy-MM-dd") ,
                carrier : dummy[i].__EMPTY_1,
                originZip : dummy[i].__EMPTY_3,
                originState: dummy[i].__EMPTY_4,
                destinationZip: dummy[i].__EMPTY_5,
                destinationState: dummy[i].__EMPTY_6,
                class: dummy[i].__EMPTY_7,
                weight: dummy[i].__EMPTY_8,
                pallets: dummy[i].__EMPTY_11,
                invoiceAmount: dummy[i].__EMPTY_12.split('$')[1],
                fuelCharge: dummy[i].__EMPTY_13.split('$')[1],
                assessorial: [],
                typeOfInvoice: 'Out Bound',
                assessorialCharge:  '0',
                salesRepId: that.companyDetails.salesRepId,
                createdVia: 'Excel'
                 };
              that.formattedArray.push(formatted_object);
            } */
          }

        });
      };
      console.log('formatted', that.formattedArray);
    });
  }

  saveUploadedFile() {
    if (this.formattedArray.length > 1) {
      if (this.itemArray !== undefined) {
        this.newArray = this.itemArray.concat(this.formattedArray);
      }
      let emptyArray = null;
      let routingLength = 0;
      this.invoiceService.setTrafficData(emptyArray);
      this.invoiceService.setTrafficDataEnable(emptyArray);
      this.invoiceService.setUploadedData(this.formattedArray);
      this.formattedArray.forEach((res:any, index:any) => {
        console.log(res, this.companyDetails);
        routingLength = index + 1;
        if (res.originZip === this.companyDetails.companyZip) {
          console.log(res);
          res.typeOfInvoice = 'Out Bound';
        } else if (res.destinationZip === this.companyDetails.companyZip) {
          console.log(res);

          res.typeOfInvoice = 'In Bound';
        } else {
          console.log(res);

          res.typeOfInvoice = 'Third Party';
        }
      });
      console.log(this.formattedArray);

      // this.formattedArray.slice(0,5);
      this.loading = true;
      this.showErrorMsg = false;
      let object = {
          socketInitialize: true,
          socketRequestLength: this.formattedArray.length
        }
        this.invoiceService.setSocketData(object);
      // this.invoiceService.saveUploadedInvoice(this.formattedArray).subscribe((res) => {
        // let object = {
        //   socketInitialize: true,
        //   socketRequestLength: this.formattedArray.length
        // }
        // this.invoiceService.setSocketData(object);
        // console.log('socket', object);
        // console.log(res);
        // setTimeout(() => {
        this.loading = false;
        if (routingLength === this.formattedArray.length) {
        this.router.navigate(['/trafficdatanew']);
        }
        // }, 15000);


      // });
    } else {
      this.showErrorMsg = true;
    }
  }
  getBusisnessRule() {
    this.router.navigate(['/promoteRule']);
  }
}
