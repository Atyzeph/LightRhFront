import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserInfosService } from '../user-infos.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const userInfosService = inject(UserInfosService);
  
  if (userInfosService.userInfos.role == "ADMIN") {
    return true;
  }
  return false;
};
