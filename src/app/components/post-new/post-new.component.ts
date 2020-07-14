import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/post';
import { global } from "../../services/global";
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers:[
    UserService,
    
    PostService

  ]
})
export class PostNewComponent implements OnInit {

public page_title:string;
public identity;
public token;
public post:Post;
public categories;
public status;
public is_edit;
public url;


public afuConfig = {
  multiple: false,
  formatsAllowed: ".jpg,.png, .jpeg, .gif",
  maxSize: "50",
  uploadAPI:  {
    url:global.url+'post/upload',
   
    headers: {
   
  "Authorization" : this._userService.getToken()
    },
   
  },
  theme: "attachPin",
 
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  attachPinText: 'Sube tu avatar de Usuario'
  
};

public froala_options: Object = {
  charCounterCount: true,
  language: 'es',
  toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
  toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
  toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
  toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
};


  constructor(
private _router:Router,
private _route:ActivatedRoute,
private _userService :UserService,
private _categoryService:CategoryService,
private _postService:PostService

  ) { 

    this.page_title="Crear una Entrada";
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.is_edit=false;
    this.url=global.url
  }

  ngOnInit(): void {
    this.post= new Post(1,this.identity.sub,1,'','',null, null);
this.getCategories();
  }

  getCategories():any{
    this._categoryService.getCategories().subscribe(
      response=>{
if (response.status=="success") {
  this.categories=response.categories;

  
}


      },
      error=>{
console.log(<any>error);

      }
    )
  }


 imageUpload(data){
    let image_data=JSON.parse(data.response);
     this.post.image= image_data.image; 
   }

   onSubmit(form):any{
this._postService.create(this.token, this.post).subscribe(
  response=>{

if(response.status=="success"){


  this.post= response.post,
  this.status="success";
  this._router.navigate(['/inicio']);
}else{
  this.status="error"
}

  },
  error=>{
    console.log(<any>error);
    this.status="error"
  }
)
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
