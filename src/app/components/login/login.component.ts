import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[
    UserService
  ]
})
export class LoginComponent implements OnInit {

public page_title:string;
public user:User;
public status:string;
public token;
public identity;

  constructor( private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute,
    
    ) { 

    this.page_title= "identificate";
    this.user = new User(1, '', '', 'user', '', '', '', '');
  }

  ngOnInit(): void {
//se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
    this.logout();
  }


  onSubmit(form):any{

this._userService.signup(this.user).subscribe(
  response=>{

  //devuelve el token
  if (status!="error") {
  this.status="success";
  this.token=response;
  //objeto usuario identificado

  this._userService.signup(this.user,true).subscribe(
    response=>{
  
    
    this.identity=response;
    console.log(this.identity);
    console.log(this.token);


    //persistir datos de usuario identificado en LocalStorage
    localStorage.setItem('token',this.token);
    localStorage.setItem('identity', JSON.stringify(this.identity));

    //redirigir a inicio
    this._router.navigate(['inicio']);

  },
        error=>{
    
        this.status="error";
        console.log(<any>error);
    
    }) 

  
  }else{
    this.status="error";
  }
},  
  error=>{
    if (this.status=="error") {
      this.status="error";
      console.log(<any>error);
    }   
    
  }
);

  }

logout(){
this._route.params.subscribe(
  params=>{
    let logout= +params['sure'];

    if(logout== 1){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');

      this.identity=null;
      this.token=null;

      //redireccion a inicio
this._router.navigate(['inicio'])

    }
  }
);
}


}
