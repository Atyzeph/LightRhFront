import { CanActivateFn, Router } from '@angular/router';
import { UserInfosService } from '../user-infos.service';
import { inject } from '@angular/core';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const userInfosService = inject(UserInfosService);
  const router = inject(Router);

  if (userInfosService.userInfos.email != "") {    
    return true;
  }
  router.navigateByUrl("");
  return false;
};
