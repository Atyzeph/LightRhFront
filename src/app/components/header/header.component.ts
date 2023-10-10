import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UserInfo } from '../../models/user-info';
import { UserInfosService } from 'src/app/services/user-infos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userInfos? : UserInfo;

  constructor(private userInfosService : UserInfosService, private router :Router){
    userInfosService.userInfos$.pipe(
      map(userInfo => this.userInfos = userInfo)
    ).subscribe(res => {
      if(res.email!=""){
        router.navigateByUrl("calendar");
      }
    });
  }

  logout(){
    this.userInfosService.logout();
  }

  redirectTo(route : string){
    this.router.navigateByUrl(route);
  }
}
