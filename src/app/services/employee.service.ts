import { Injectable } from '@angular/core';
import { UserInfosService } from './user-infos.service';
import { Observable } from 'rxjs';
import { Absence } from '../models/absence.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/employee';
  constructor(private userInfosService : UserInfosService, private http: HttpClient) { }

  getAbsences():Observable<Array<Absence>>{
    const email = this.userInfosService.userInfos.email;

    return this.http.get<Array<Absence>>(this.apiUrl+"/absences?email="+email);
  }
}
