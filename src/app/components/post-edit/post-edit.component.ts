import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/post';
import { global } from "../../services/global";
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers:[
    UserService,
    CategoryService,
    PostService

  ]
})
export class PostEditComponent implements OnInit {

 
public page_title:string;
public identity;
public token;
public post:Post;
public categories;
public status;
public is_edit:boolean;
public url:string;

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

    this.page_title="Editar Entrada";
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.is_edit=true;
    this.url=global.url
  }

  ngOnInit(): void {
    this.post= new Post(1,this.identity.sub,1,'','',null, null);
this.getCategories();
this.getPost();
  }


  getPost(){
    //sacar el id del post desde la URL
this._route.params.subscribe(
  params=>{
    let id= +params['id'];


//peticion ajax para sacar los datos

this._postService.getPost(id).subscribe(
response=>{
if (response.status=="success") {

  this.post= response.post;

if (this.post.user_id != this.identity.sub) {
  this._router.navigate(['/inicio'])
}

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

    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response=>{
if(response.status=="success"){
  this.status="success";
  
 //redirigir a la pagina del post

 this._router.navigate(['/entrada', this.post.id])
}else{
  this.status= 'error'
}

      },
      error=>{
console.log(<any>error);
this.status="error"

      }
    )
}
deletePost(id){
  
}

}
