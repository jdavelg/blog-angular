import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Post } from "../models/post";
import { global } from "./global";
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  public url:string;
 
  
  
  constructor(
public _http:HttpClient

  ) { 

    this.url=global.url;
  }

  pruebas(){
return "hola desde el servicio de post"

  }
  create(token, post):any{
    //limpiar campo content que viene desde el editor de texto froala
    post.content=global.htmlEntities(post.content);
let json= JSON.stringify(post);

let params= "json="+json;


let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

return this._http.post(this.url+'post', params, {headers:headers})

  }

  getPosts():any{
    let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url+ 'post', {headers:headers})
  }

  getPost(id):any{

    let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url+ 'post/'+id, {headers:headers})

  }


  update(token, post, id):any{
 //limpiar campo content que viene desde el editor de texto froala
 post.content=global.htmlEntities(post.content);
let json= JSON.stringify(post);
let params= "json="+json;
let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

return this._http.put(this.url+'post/'+id, params, {headers:headers})

  }

  delete(token, id){
    let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

    return this._http.delete(this.url+'post/'+id, {headers:headers});
  }

}