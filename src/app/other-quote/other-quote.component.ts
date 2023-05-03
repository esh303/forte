import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-quote',
  templateUrl: './other-quote.component.html',
  styleUrls: ['./other-quote.component.css']
})
export class OtherQuoteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  quickieQuote() {
  	this.router.navigate(['/quickie_Quote']);
  }

  fullLtlQuote() {
  	this.router.navigate(['/fullltl_Quote']);
  }


}
