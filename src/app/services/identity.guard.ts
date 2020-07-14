import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {


constructor(
private _router:Router,
private _userService:UserService

){

}

  canActivate(){

    
  
    let identity= this._userService.getIdentity();
    if(identity){

      return true;
    }else{
      this._router.navigate(['/error']);
      return false;
    
    }
  }
  
}
