import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public identity;
  public token;
  constructor(
  	private _userService:UserService){

  }

  ngOnInit(){

  }

  ngDoCheck(){
  	this.loadUserInfo();
  }

  loadUserInfo(){
  	this.token = this._userService.getToken();
  	this.identity = this._userService.getIdentity();
  	
  	
  }
}
