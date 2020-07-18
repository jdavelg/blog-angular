import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers:[
    PostService,
    UserService

  ]
})
export class PostDetailComponent implements OnInit {
public url:string
  public post:Post;
  public status:string;
  public identity;

  constructor(
    private _postService:PostService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService

  ) {
this.url=global.url
    this.identity=this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.getPost();
  }

  getPost():any{
    //sacar el id del post desde la URL
this._route.params.subscribe(
  params=>{
    let id= Number(params['id']);


//peticion ajax para sacar los datos

this._postService.getPost(id).subscribe(
response=>{
if (response.status=="success") {
  this.post= response.post;

  console.log(this.post);
  
}else{
  this.status="error";
  
}
},
error=>{
  console.log(<any>error);
  this._router.navigate(['/inicio'])
  
}

)


  });


  }

 

}
