import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService,VideoService]
})
export class HomeComponent implements OnInit {
	public page_title:string;
	public identity;
  public token;
  public videos;
  public status;
  public message;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  public total_videos;

  constructor(
    private _userService:UserService,
    private _videoService:VideoService,
    private _sanitizer: DomSanitizer,
    private _router:Router,
    private _route:ActivatedRoute
    ) {
  	this.page_title = "Últimos videos agregados";
    this.identity = this._userService.getIdentity();
    this.token =this._userService.getToken(); 
  }

  ngOnInit() {

      //Conseguir parametro (PAGE) que llega por la URL para la paginación desde el API
      this._route.params.subscribe(params => {
        var page = +params['page']; //sacando el parámetro de página
        if(!page){
          page = 1;
          this.prev_page = 1;
          this.next_page = 2;
        }
        this.getVideos(page);
      });
      
  }

  ngDoCheck(){

  }
  getVideos(page){
    this._videoService.getVideos(this.token, page).subscribe(
      response => {
        this.videos = response.videos;
        this.total_videos = this.videos.length;

        var array_pages = [];
        for(var i = 1; i <= response.total_pages; i++){
          array_pages.push(i);
        }

        this.number_pages = array_pages;
        if(response.page_actual>1){
          this.prev_page = response.page_actual - 1;  
        }else{
          this.prev_page = 1;
        }
        
        if(response.page_actual == response.total_pages){
          this.next_page = response.page_actual;  
        }else{
          this.next_page = response.page_actual + 1;
        }
        
      },
      error => {
        console.log(error);
      }
      );
  }


  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }

  deleteVideo(id){
    this._videoService.deleteVideo(this.token,id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = "success";
          this.message = "El video se ha eliminado";
          this.getVideos(1);
        }else{
          window.scroll(0,0);
          this.status = "error";
          this.message = "No se ha podido eliminar el video";
        }
      },
      error => {
        window.scroll(0,0);
        this.status = "error";
        this.message = "No se ha podido eliminar el video";
      }
      );

  }


}
