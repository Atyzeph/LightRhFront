import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfosService } from 'src/app/services/user-infos.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  passwordResetForm = new FormGroup({
    email: new FormControl(''),
  });

  mailSent:boolean = false;

  constructor(private userInfosService : UserInfosService, private router :Router){

  }

  submitForm(){
    this.userInfosService.changePassword(this.passwordResetForm).subscribe((res:boolean)=>this.mailSent=res);
    setTimeout(()=>this.router.navigateByUrl(""),5000);
  }
}
