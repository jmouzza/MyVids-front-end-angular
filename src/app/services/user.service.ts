import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()

export class UserService{
	public url:string;
	public token:string;
	public identity;

	constructor(
		private _http:HttpClient
	){
		this.url = global.url;
	}

	register(user):Observable<any>{
		let json = JSON.stringify(user)
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url+'register',params,{headers: headers});

	}

	login(user,getToken=null):Observable<any>{
		if(getToken != null){
			user.getToken = 'true';
		}
		let json = JSON.stringify(user);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url+'login',params,{headers: headers});
	}

	update(user,token):Observable<any>{
		let json = JSON.stringify(user)
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);
		return this._http.put(this.url+'update_user',params,{headers: headers});
	}

	getToken(){
		let token = localStorage.getItem('token');
		if(token && token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		
		return this.token; 	
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}
}