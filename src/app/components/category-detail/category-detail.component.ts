import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

import { global } from "../../services/global";
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers:[
    CategoryService,
    UserService,
    PostService
  ]
})
export class CategoryDetailComponent implements OnInit {
public page_title:string;
public category:Category;
public posts:any;
public url:string;
public identity;
public token;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _categoryService: CategoryService,
    private _userService:UserService,
    private _postSerive:PostService
  ) { 

this.url=global.url;
    this.page_title="Categoria";
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

getPostsByCategory():any{

  this._route.params.subscribe(params=>{

let id=+params['id'];

this._categoryService.getCategory(id).subscribe(

  response=>{
if(response.status== "success"){
this.category= response.category;
this._categoryService.getPosts(id).subscribe(

  response=>{
    if (response.status=="success") {
      this.posts= response.posts
    } else {
      this._router.navigate(['/inicio'])
    }

  },
  error=>{
    console.log(error);
    
  }
)


}else{
  this._router.navigate(['/inicio'])
}


  },
  error=>{
    console.log(error);
    
  }
)
  });
}

}
