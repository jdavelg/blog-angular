import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from "../../services/global";
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[
PostService,
UserService

  ]
})
export class HomeComponent implements OnInit {
public page_title:string;
public url:string;
public posts: Array<Post>;
public identity;
public token;

  constructor(
    private _postService: PostService,
    private _userService:UserService
  ) { 

    this.page_title="Inicio";
    this.url=global.url;
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.getposts();
  }

  getposts(){
    this._postService.getPosts().subscribe(
response=>{
if (response.status=="success") {
  
this.posts=response.posts;



}
},
error=>{
console.log(<any>error);


}

    );
  }

}
