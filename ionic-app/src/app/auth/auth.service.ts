import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _isAuthenticated=false;

  constructor() { }
    get isAutenticated():boolean
    {
      return this._isAuthenticated;

    }
    logIn(){
this._isAuthenticated=true;
    }
    logOut(){
this._isAuthenticated=false;
    }
  
}
