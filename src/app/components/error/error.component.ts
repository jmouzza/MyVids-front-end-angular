import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
	public page_title:string;
	public page_description:string;
  constructor() { 
  	this.page_title = "Error 404";
  	this.page_description = "La página que intentas ver no existe";
  }

  ngOnInit() {
  }

}
