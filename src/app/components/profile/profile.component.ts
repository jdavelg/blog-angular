import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from "../../services/global";
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[
    PostService,
    UserService
    
      ]
})
export class ProfileComponent implements OnInit {

  public page_title:string;
public url:string;
public posts: Array<Post>;
public identity;
public token;
public user:User;

  constructor(
    private _postService: PostService,
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router: Router
  ) { 

    this.page_title="Perfil de usuario";
    this.url=global.url;
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
  this.getprofile()
}


getprofile(){
    //sacar el id del post desde la URL
this._route.params.subscribe(
  params=>{
    let userId= +params['id'];
    this.getUser(userId);
    this.getposts(userId);
  })
}

getUser(userId){

this._userService.getUser(userId).subscribe(
  response=>{
  if (response.status=="success") {
    
  this.user=response.user;  
    
  }
  },
  error=>{
  console.log(<any>error);
  
  
  }
  
      );
}

  getposts(userId){
    this._userService.getPosts(userId).subscribe(
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



  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response=>{
  this._router.navigate(['/inicio']);
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
