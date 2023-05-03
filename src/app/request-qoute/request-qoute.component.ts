import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-qoute',
  templateUrl: './request-qoute.component.html',
  styleUrls: ['./request-qoute.component.css']
})
export class RequestQouteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ltlQuote() {
  	this.router.navigate(['/home']);
  }

  otherQuote() {
  	this.router.navigate(['/other_quote']);
  }

}
