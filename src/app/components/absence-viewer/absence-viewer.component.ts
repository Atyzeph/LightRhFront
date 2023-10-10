import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Absence } from 'src/app/models/absence.model';
import { AbsenceStatusService } from 'src/app/services/absence/absence-status.service';
import { AbsenceTypeService } from 'src/app/services/absence/absence-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserInfosService } from 'src/app/services/user-infos.service';

@Component({
  selector: 'app-absence-viewer',
  templateUrl: './absence-viewer.component.html',
  styleUrls: ['./absence-viewer.component.scss']
})
export class AbsenceViewerComponent implements OnInit{
  absences?: Array<Absence>;
  role!: string;

  constructor(private router: Router, private employeeService : EmployeeService, public absenceStatus: AbsenceStatusService, public absenceType: AbsenceTypeService, private userInfoService: UserInfosService){
    employeeService.getAbsences().pipe(
      tap((absences : Array<Absence>)=> {
        if(absences) {
          this.absences = absences
        }
      })
    ).subscribe();
  }
  ngOnInit(): void {
    this.role = this.userInfoService.userInfos.role;
  }

  getAbsenceId(absence: any){
    return this.router.navigate(['absences_update', absence.id, absence.dateStart, absence.dateEnd, absence.motif, absence.label, absence.type, absence.status])
  }

  getAbsenceTypeString(absenceType : String){
    switch(absenceType){
      case(this.absenceType.EMPLOYER_RTT) : return "RTT choisie par l'employeur";
      case(this.absenceType.EMPLOYEE_RTT) : return "RTT choisie par l'employé";
      case(this.absenceType.HOLIDAY) : return "Jour férié";
      case(this.absenceType.PAID_LEAVE) : return "Congés payés";
      case(this.absenceType.UNPAID_LEAVE) : return "Absence non rémunérée";
      default : return "Type inconnu";
    }
  }

  getAbsenceStatusString(absenceStatut : string){
    switch(absenceStatut){
      case(this.absenceStatus.WAITING_VALIDATION) : return "Demande en attente de validation";
      case(this.absenceStatus.INITIAL) : return "Demande déposée";
      case(this.absenceStatus.REJECTED) : return "Demande refusée";
      case(this.absenceStatus.VALIDATED) : return "Demande validée";
      default : return "Statut inconnu";
    }  
  }
}
