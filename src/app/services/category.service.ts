import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from "../models/user";
import { global } from "./global";
import { stringify } from 'querystring';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url:string;
 
  
  
    constructor(
  public _http:HttpClient
  
    ) { 
  
      this.url=global.url;
    }

    create(token, category):any{
let json= JSON.stringify(category);
let params= "json="+json;


let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

return this._http.post(this.url+'category', params, {headers:headers});
    }


    getCategories():any{
      let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

return this._http.get(this.url+"category", {headers:headers});

    }

    getCategory(id):any{
      let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

return this._http.get(this.url+"category/"+id, {headers:headers});

    }

    getPosts(id):any{
      let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

return this._http.get(this.url+"post/category/"+id, {headers:headers});

    }

  }