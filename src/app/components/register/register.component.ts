import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public page_title:string;
	public user:User;
  public status:string;
  public message:string
  constructor(
      private _userService: UserService
    ) { 
  	this.page_title = "Regístrate con tu email";
  	this.user = new User(1,"","","","","ROLE_USER");
  	
  }

  ngOnInit() {
  	
  }

  onSubmit(form){
  	this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.status = "success";
          this.message = "Te has registrado correctamente.";
        }else{
          this.status = "error";
          this.message = "Ha ocurrido un error al registrarte.";    
        }
      },
      error => {
        console.log(error);
        this.status = "error";
        this.message = "Ha ocurrido un error al registrarte.";
      }
      );
  }

}
