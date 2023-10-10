import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserInfosService } from '../user-infos.service';

export const isManagerGuard: CanActivateFn = (route, state) => {
  const userInfosService = inject(UserInfosService);
  
  if (userInfosService.userInfos.profile == "MANAGER") {
    return true;
  }
  return false;
};
