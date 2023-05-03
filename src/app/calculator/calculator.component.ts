import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { classFactorValue } from '../app.constant';
import { ExternalService } from '../services/external.service';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  calculatorForm: FormGroup = new FormGroup({});
  public showMeter = true;
  public showFeet = false;
  public lwhUnit = 'cm';
  public weightUnit = 'kg';
  public showQuantityErrorMessage = false;
  public showForCubicMeter = false;
  public showForCubicFeet = false;
  public showAllDetails = false;
  public densityUnit: any;
  public volumeUnit: any;
  public densityForMeter: any;
  public errorMsg: any;
  public regexp = /^([0-9]+)(([\.][0-9]+)?)$/
  public showErrorMessage = false;
  public classArray = classFactorValue;
  public getSpecification: any;
  public calculatorName: any;
  public showClass = false;
  className = 'FREIGHT CLASS ESTIMATOR';
  densityName = 'DENSITY CALCULATOR';
  constructor(
    private fb: FormBuilder, 
    private externalService: ExternalService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe(params => {
      this.getSpecification = params['type'];
      this.buildForm();
      this.showAllDetails = false;
      this.showForCubicMeter = false;
      this.showForCubicFeet = false;
      if (this.getSpecification === 'class') {
        this.calculatorName = this.className;
        this.showClass = true;
      } else {
        this.calculatorName = this.densityName;
        this.showClass = false;
      }
    });
  }

  buildForm() {
    this.calculatorForm = this.fb.group({
      dimension: [],
      length: [''],
      width: [''],
      height: [''],
      grossWeight: [''],
      quantity: [''],
      weight: [''],
      volume: [''],
      density: [''],
      weightlb: [''],
      volumecft: [''],
      densitycft: [''],
      dimensionCategoryForMeter: [''],
      dimensionCategoryForFeet: [''],
      classification: ['']
    });
  }

  getCalculator(value: any) {
    if (value === 'cubicMeter') {
      this.showForCubicMeter = true;
      this.showForCubicFeet = false;
      this.lwhUnit = 'cm';
      this.weightUnit = 'kg';
    } else {
      this.showForCubicFeet = true;
      this.showForCubicMeter = false;
      this.lwhUnit = 'inch';
      this.weightUnit = 'lb';
    }
    let type = 'category';
    this.clear(type);
    this.showAllDetails = false;
  }

  getDimension(value: any) {
    let type = 'subcategory';
    this.clear(type);
    if (value === 'meter') {
      this.lwhUnit = 'm';
      this.weightUnit = 'kg';
      this.densityUnit = 'kg/cu.m'
      this.volumeUnit = 'cu.m'
    } else if (value === 'centimeter') {
      this.lwhUnit = 'cm';
      this.weightUnit = 'kg';
      this.densityUnit = 'kg/cu.m'
      this.volumeUnit = 'cu.m';
    } else if (value === 'inches') {
      this.lwhUnit = 'inch';
      this.weightUnit = 'lb';
      this.densityUnit = 'lb/cu.ft';
      this.volumeUnit = 'cu.ft';
    } else {
      this.lwhUnit = 'ft';
      this.weightUnit = 'lb';
      this.densityUnit = 'lb/cu.ft';
      this.volumeUnit = 'cu.ft';      
    }
    this.showAllDetails = true;
  }

  getGrossWeight(calculatorForm: any) {
    this.showQuantityErrorMessage = false;
    let weightForKg: any;
    let weightForLB;
    let volumeFormeterCube;
    let volumeForFeet;
    let densityForFeet;
    let densityForMeter;
    let densityForFeetCube;
    let volumeForCubicFeet;
    let densityForCubicFeet;
    let densityCubicCm;
    let volumeCubeMeter;
    let volumeCuFeet;
    if (calculatorForm.quantity !== '') {
      calculatorForm.quantity = calculatorForm.quantity;
    } else {
      calculatorForm.quantity = 1;
    }
    if (calculatorForm.dimension === 'cubicMeter') {
      weightForKg = (calculatorForm.grossWeight * calculatorForm.quantity).toFixed(2);
      weightForLB = Number((weightForKg * 2.2046)).toFixed(2);      
      this.calculatorForm.patchValue({
        weight: weightForKg,
        weightlb: weightForLB
      });
      volumeFormeterCube = calculatorForm.length * calculatorForm.width * calculatorForm.height;
      volumeForFeet = Number(volumeFormeterCube / 1728).toFixed(2);
      densityForFeet = (Number(weightForLB) / Number(volumeForFeet));
      if (calculatorForm.dimensionCategoryForMeter === 'meter') {
        volumeFormeterCube = (calculatorForm.length * calculatorForm.width * calculatorForm.height);
        densityForMeter = (calculatorForm.grossWeight / Number(volumeFormeterCube)).toFixed(2);
        volumeForCubicFeet = ((calculatorForm.length * 3.281) * (calculatorForm.width * 3.281) * (calculatorForm.height * 3.281));
        var volumeForCubicFeetNew = ((calculatorForm.length * 3.281) * (calculatorForm.width * 3.281) * (calculatorForm.height * 3.281));
        volumeCuFeet = volumeForCubicFeet.toFixed(2);;
        densityForCubicFeet = (Number(weightForLB) / Number(volumeForCubicFeetNew)).toFixed(2);
      } else {
        volumeFormeterCube = ((calculatorForm.length * calculatorForm.width * calculatorForm.height) / 1000000).toFixed(2);;
        densityCubicCm = (calculatorForm.grossWeight / Number(volumeFormeterCube));
        densityForMeter = (densityCubicCm).toFixed(2);
        volumeCubeMeter = ((calculatorForm.length / 100) * (calculatorForm.width / 100) * (calculatorForm.height / 100));
        var volumeCubeMeterNew = ((calculatorForm.length / 30.48) * (calculatorForm.width / 30.48) * (calculatorForm.height / 30.48));
        volumeCuFeet = volumeCubeMeterNew.toFixed(2);;
        densityForCubicFeet = (Number(weightForLB) / Number(volumeCubeMeterNew)).toFixed(2);
      }
      this.calculatorForm.patchValue({
        volume: volumeFormeterCube,
        density: densityForMeter,
        volumecft: volumeCuFeet,
        densitycft: densityForCubicFeet
      });
      this.classCalculation(densityForCubicFeet);
    } else {
      weightForLB = (calculatorForm.grossWeight * calculatorForm.quantity).toFixed(2);
      weightForKg = (Number(weightForLB) / 2.2046).toFixed(2);
      this.calculatorForm.patchValue({
        weightlb: weightForLB,
        weight: weightForKg
      });
      volumeFormeterCube = (calculatorForm.length * calculatorForm.width * calculatorForm.height).toFixed(2);
      densityForMeter = (Number(weightForKg) / Number(volumeFormeterCube)).toFixed(2);
      if (calculatorForm.dimensionCategoryForFeet === 'feet') {
        volumeForFeet = (calculatorForm.length * calculatorForm.width * calculatorForm.height).toFixed(2);
        densityForFeet = (Number(weightForLB) / Number(volumeForFeet)).toFixed(2);
        volumeFormeterCube = ((calculatorForm.length / 3.281) * (calculatorForm.width / 3.281) * (calculatorForm.height / 3.281)).toFixed(2);;
        var volumeFormeterCubeNew = ((calculatorForm.length / 3.281) * (calculatorForm.width / 3.281) * (calculatorForm.height / 3.281));
        densityForMeter = (Number(weightForKg) / Number(volumeFormeterCubeNew)).toFixed(2);
      } else {
        volumeForFeet = ((calculatorForm.length * calculatorForm.width * calculatorForm.height) / 1728).toFixed(2);
        densityForFeet = (Number(weightForLB) / Number(volumeForFeet)).toFixed(2);
        volumeFormeterCube = ((calculatorForm.length / 39.37) * (calculatorForm.width / 39.37) * (calculatorForm.height / 39.37)).toFixed(2);;
        var volumeFormeterCubeNew = ((calculatorForm.length / 39.37) * (calculatorForm.width / 39.37) * (calculatorForm.height / 39.37));
        densityForMeter = (Number(weightForKg) / Number(volumeFormeterCubeNew)).toFixed(2);
      }
      this.calculatorForm.patchValue({
        volumecft: volumeForFeet,
        densitycft: densityForFeet,
        volume: volumeFormeterCube,
        density: densityForMeter
      });
      this.classCalculation(densityForFeet);
    }
  }

  clear(type: any) {
    if (type === 'category') {
      this.calculatorForm.patchValue({
        dimensionCategoryForMeter: '',
        dimensionCategoryForFeet: ''
      });
      this.clearForm();
    } else {
      this.clearForm();
    }
  }
  clearForm() {
    this.calculatorForm.patchValue({
      length: '',
      width: '',
      height: '',
      grossWeight: '',
      quantity: '',
      weight: '',
      volume: '',
      density: '',
      weightlb: '',
      volumecft: '',
      densitycft: '',
      classification: ''
    });
  }

  getValue() {
    if (this.calculatorForm.value.length === '' || this.calculatorForm.value.width === '' || this.calculatorForm.value.height === '' || this.calculatorForm.value.grossWeight === '') {
      this.calculatorForm.patchValue({
        weight: '', volume: '',
        density: '', weightlb: '',
        volumecft: '', densitycft: '',
      });
    } else {
      this.getGrossWeight(this.calculatorForm.value);
    }
  }

  getCrtInputValues(type: any) {
    this.showErrorMessage = false;
    if (type === 'length') {
      if (this.calculatorForm.value.length !== '') {
        if (this.regexp.test(this.calculatorForm.value.length) === false) {
          this.errorMsg = 'Length';
          this.showErrorMessage = true;
          this.calculatorForm.patchValue({
            length: ''
          });
        }
      }
    } else if (type === 'width') {
      if (this.calculatorForm.value.width !== '') {
        if (this.regexp.test(this.calculatorForm.value.width) === false) {
          this.errorMsg = 'Width';
          this.showErrorMessage = true;
          this.calculatorForm.patchValue({
            width: ''
          });
        }
      }
    } else if (type === 'height') {
      if (this.calculatorForm.value.height !== '') {
        if (this.regexp.test(this.calculatorForm.value.height) === false) {
          this.errorMsg = 'Height';
          this.showErrorMessage = true;
          this.calculatorForm.patchValue({
            height: ''
          });
        }
      }
    } else if (type === 'grossWt') {
      if (this.calculatorForm.value.grossWeight !== '') {
        if (this.regexp.test(this.calculatorForm.value.grossWeight) === false) {
          this.errorMsg = 'Gross Wt';
          this.showErrorMessage = true;
          this.calculatorForm.patchValue({
            grossWeight: ''
          });
        }
      }
    }
  }

  classCalculation(densityValue: any) {
    console.log('density', densityValue);
    let classValue;
    if (Number(densityValue) < 1) {
      classValue = this.classArray[0];
    } else if (Number(densityValue) >= 1 && Number(densityValue) < 2) {
      classValue = this.classArray[1];
    } else if (Number(densityValue) >= 2 && Number(densityValue) < 4) {
      classValue = this.classArray[2];
    } else if (Number(densityValue) >= 4 && Number(densityValue) < 6) {
      classValue = this.classArray[3];
    } else if (Number(densityValue) >= 6 && Number(densityValue) < 8) {
      classValue = this.classArray[4];
    } else if (Number(densityValue) >= 8 && Number(densityValue) < 10) {
      classValue = this.classArray[5];
    } else if (Number(densityValue) >= 10 && Number(densityValue) < 12) {
      classValue = this.classArray[6];
    } else if (Number(densityValue) >= 12 && Number(densityValue) < 15) {
      classValue = this.classArray[7];
    } else if (Number(densityValue) >= 15 && Number(densityValue) < 22.5) {
      classValue = this.classArray[8];
    } else if (Number(densityValue) >= 22.5 && Number(densityValue) < 30) {
      classValue = this.classArray[9];
    } else if (Number(densityValue) >= 30) {
      classValue = this.classArray[10];
    }
    this.calculatorForm.patchValue({
      classification: classValue
    });
  }

  checkEnterKey(event: any, type: any) {
    if (event.which === 13) {
      event.preventDefault();
      if (type === 'length') {
        (document.getElementById('width')as HTMLFormElement).focus();
      } else if (type === 'width') {
        (document.getElementById('height')as HTMLFormElement).focus();
      } else if (type === 'height') {
        (document.getElementById('grossWt')as HTMLFormElement).focus();
      }
    }
  }
}
