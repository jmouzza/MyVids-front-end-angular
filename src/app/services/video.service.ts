import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { global } from './global';

@Injectable()

export class VideoService{
	public url;
	constructor(private _http:HttpClient){
		this.url = global.url;
	}

	create(video,token):Observable<any>{
		let json = JSON.stringify(video);   
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
	   	return this._http.post(this.url+"create",params,{headers:headers});
	}

	getVideos(token, page):Observable<any>{
		if(!page){
			page = 1;
		}
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
	    return this._http.get(this.url+"videos?page="+page,{headers:headers});
	}

	deleteVideo(token,id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
	    return this._http.delete(this.url+"delete/"+id,{headers:headers});
	}

	videoDetail(token,id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
	    return this._http.get(this.url+"video/"+id,{headers:headers});	
	}

	updateVideo(video,token,id):Observable<any>{
		let json = JSON.stringify(video);   
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
	   	return this._http.put(this.url+"update/"+id,params,{headers:headers});
	}
} 