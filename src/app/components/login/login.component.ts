import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
	public page_title:string;
	public message:string;
	public user:User;
	public token:string;
	public identity;
	public status;
  constructor(
  	private _userService:UserService,
  	private _router:Router
  	) { 
  	this.page_title = "Inicia sesión con tu email";
  	this.user = new User(1,"","","","","");
  	
  }

  ngOnInit() {
  }

  onSubmit(form){
  	this._userService.login(this.user,true).subscribe(
		response =>{
			
			if(response.status == 'success'){
				this.token = response.token.jwt;
				localStorage.setItem('token', this.token);
            	if(response.token.payload){
	              	this.identity = response.token.payload;
	              	//Persistir datos de usuario en local storage
	              	localStorage.setItem('identity', JSON.stringify(this.identity));
            	}
            	this._router.navigate(['home']);
            	form.reset();
			}else{
				this.status = 'error';
				this.message = "Login incorrecto, intenta nuevamente";
			}
		},
		error => {
			console.log(error);
			this.status = 'error';
		}
  		);
  }

}
