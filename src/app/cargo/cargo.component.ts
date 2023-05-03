import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {
  cargoClaims: FormGroup = new FormGroup({});
  showFedex = false;
  showYrc = false;
  showFedexPriority = false;
  showReddaway = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.cargoClaims = this.fb.group({
      cargo: ['', [Validators.required]]
    });
  }

  getCargo(value: any) {
    if (value === 'fedex') {
      this.showFedex = true;
      this.showYrc = false;
      this.showFedexPriority = false;
      this.showReddaway = false;
    } else if (value === 'fedexPriority') {
      this.showFedexPriority = true;
      this.showFedex = false;
      this.showYrc = false;
      this.showReddaway = false;
    } else if (value === 'yrc') {
      this.showFedex = false;
      this.showYrc = true;
      this.showFedexPriority = false;
      this.showReddaway = false;
    } else {
      this.showReddaway = true;
      this.showYrc = false;
      this.showFedexPriority = false;
      this.showFedex = false;
    }
  }
}
