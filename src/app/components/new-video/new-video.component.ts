import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.css'],
  providers: [UserService,VideoService]
})
export class NewVideoComponent implements OnInit {
	public user_id:number;
	public video:Video;
	public page_title:string;
  public token:string;
  public status:string;
  public message:string;
  constructor(
  	private _userService:UserService,
    private _videoService:VideoService
  	){ 
  	this.page_title = "Agrega un nuevo video completando el formulario";
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.user_id = this._userService.getIdentity().sub;
  	this.video = new Video(1,this.user_id,"","","","");
  }

  onSubmit(form){
    this._videoService.create(this.video,this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = "success";
          this.message ="Video guardado";
          form.reset();
        }else{
          this.status = "error";
          this.message ="Ocurrió un error";
        }
      },
      error => {
        this.status = "error";
        this.message ="Ocurrió un error"; 
      }
      );
  }

}
