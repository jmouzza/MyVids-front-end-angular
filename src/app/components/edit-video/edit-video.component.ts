import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import{ VideoService } from '../../services/video.service';
import{ UserService } from '../../services/user.service';
import { Video } from '../../models/video';
@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css'],
  providers: [VideoService, UserService]
})
export class EditVideoComponent implements OnInit {
	public id:number;
	public token:string;
	public video:Video;
	public status:string;
	public message:string;
	public page_title:string;
  constructor(
  	private _router:Router,
  	private _route:ActivatedRoute,
  	private _videoService:VideoService,
  	private _userService:UserService
  	) { 
  	this.token = this._userService.getToken();
  	this.page_title = "Actualiza la información del video";
  }

  ngOnInit() {
  	this._route.params.subscribe(params => {
  		this.id = params['id'];
  		this._videoService.videoDetail(this.token, this.id).subscribe(
  			response => {
  				if(response.status == 'success'){
  					this.video = response.video;
  				}else{
  					this._router.navigate(['home']);
  				}
  			},
  			error => {
  				this._router.navigate(['home']);
  			}
  			);
  	});
  }

  onSubmit(form){
 	this._videoService.updateVideo(this.video,this.token,this.id).subscribe(
 		response => {
 			if(response.status == 'success'){
 				this.status = 'success';
 				this.message = 'El video fue actualizado con éxito';
 			}else{
 				this.status = 'error';
 				this.message = 'Ocurrió un error al actualizar el video';
 			}
 		},
 		error => {
			this.status = 'error';
			this.message = 'Ocurrió un error al actualizar el video';
			console.log(error);
 		}
 	); 	
  }

}
