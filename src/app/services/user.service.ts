import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from "../models/user";
import { global } from "./global";
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public url:string;
public identity;
public token;


  constructor(
public _http:HttpClient

  ) { 

    this.url=global.url;
  }

test(){

  console.log("hola mundo desde un service");
  
}

register(user):any{
let json= JSON.stringify(user);

let params= 'json='+json;
let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

return this._http.post(this.url+"user/register", params,{headers:headers})


}

signup(user, gettoken=null): any{
if(gettoken !=null){
  user.gettoken=true;
}

let json= JSON.stringify(user);
let params='json='+json;
let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
return this._http.post(this.url+"user/login", params, {headers:headers} )

}

getIdentity(){
let identity= JSON.parse(localStorage.getItem('identity'));
if(identity &&identity!= "undefined"){
this.identity=identity;

}else{
  this.identity=null;
}

return this.identity;
}

getToken(){
let token= localStorage.getItem('token');

if(token != "undefined"){
  this.token= token;

}else{
  this.token=null;
}

return this.token;

}

update( token, user):any{

//limpiar campo content que viene desde el editor de texto froala
user.description=global.htmlEntities(user.description);

  let json= JSON.stringify(user);
  let params= "json="+json;

  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);


  return this._http.put(this.url+'user', params, {headers:headers} )

}

avatarUpload(datos){
  let data=datos.response;
  this.identity.image= data.image; 

}

getPosts(id):any{
  let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

return this._http.get(this.url+"post/user/"+id, {headers:headers});

}

getUser(id):any{
  let headers= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

return this._http.get(this.url+"user/detail/"+id, {headers:headers});






}



}
