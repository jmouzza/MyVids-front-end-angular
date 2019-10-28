import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User }	from '../../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {
	public page_title:string;
	public identity;
	public token:string;
	public message:string;
	public status:string;
	public user:User;
  constructor(
  	private _userService:UserService
  	) { 
  	this.page_title = "Actualiza tus datos de usuario";
  	this.token = this._userService.getToken();
  	this.identity = this._userService.getIdentity();
  	this.user = new User(
  		this.identity.sub,
  		this.identity.name,
  		this.identity.surname,
  		this.identity.email,
  		"",
  		"ROLE_USER");
  }

  ngOnInit() {
  }

  ngDoCheck(){

  }

  loadUser(){
  	this.identity = this._userService.getIdentity();
  }

  onSubmit(form){
  	this._userService.update(this.user,this.token).subscribe(
  		response => {
  			if(response.status == 'success'){
	  			this.status = 'success';
	  			this.message = 'Se han actualizado tus datos';
	  			localStorage.setItem('identity', JSON.stringify(response.user_updated));
  			}else{
  				this.status = 'error';
  				this.message = response.message;
  			}
  			
  		},
  		error => {
  			this.status = 'error';
			this.message = 'No se han podido actualizar tus datos';
			console.log(error);
  		}
  		);
  }

}
