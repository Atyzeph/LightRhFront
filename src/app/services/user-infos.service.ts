import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, of, switchMap, identity } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { HttpClient } from '@angular/common/http';
import { LoginParamsDto } from '../models/login-paramsDto';
import { Authority } from '../models/authority';
import { FormGroup } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserInfosService {
  public userInfos$ : BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(
    {
      firstName : "",
      lastName : "",
      email : "",
      expirationDate : 0,
      role:"",
      profile:""
    }
  );

  get userInfos() : UserInfo{
    return this.userInfos$.value;
  }

  private apiUrl = 'http://localhost:8080/user';
  constructor(private httpClient: HttpClient, private router : Router) {
    let storageToken = localStorage.getItem('jwtToken');
    if(storageToken){
      let userInfo = this.decode(storageToken);
      let now = new Date().getTime() / 1000;
      //jwt provides number in sec while getTime provides number in millisec
      if(userInfo.expirationDate < (new Date().getTime() /1000)){
        localStorage.removeItem('jwtToken');
      }
      else {
        this.userInfos$.next(userInfo);
      }
    }
  }

  logout(){
    localStorage.removeItem('jwtToken');
    this.userInfos$.next({
      firstName : "",
      lastName : "",
      email : "",
      expirationDate : 0,
      role:"",
      profile:""
    });
    this.router.navigateByUrl('');
  }

  changePassword(form : FormGroup):Observable<boolean>{
    return this.httpClient.get<string>(this.apiUrl+"/changepassword?email="+form.controls["email"].value).pipe(
      map((responseString : string ) => responseString=="mail sent"?true:false)
    );
  }

  getToken(form : FormGroup):Observable<UserInfo>{    
    let loginParams : LoginParamsDto = {
      email : form.controls["email"].value, 
      password : form.controls["password"].value
    }
    return this.httpClient.post<string>(this.apiUrl+"/login", loginParams).pipe(
      map((token) => {
        localStorage.setItem("jwtToken", token);
        
        return this.decode(token);
      }),
      tap((userInfo : UserInfo) => this.userInfos$.next(userInfo)),
    );
  }

  decode(token : string) : UserInfo {
    const decoded = jwt_decode<any>(token);
    console.log(decoded);
    
    let role = "";
    let profile = "";
    let authorities : Array<Authority> = decoded.authorities;
    role = authorities.some((authority : Authority) => authority.authority == "ADMIN") ? "ADMIN" : "USER";
    profile = authorities.some((authority : Authority) => authority.authority == "MANAGER") ? "MANAGER" : "EMPLOYEE";
    return {
      firstName : decoded.firstName,
      lastName : decoded.lastName,
      email : decoded.sub,
      role : role,
      profile : profile,
      expirationDate : decoded.exp
    }
  }
}
