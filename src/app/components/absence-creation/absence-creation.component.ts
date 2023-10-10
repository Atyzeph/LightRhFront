import { Component } from '@angular/core';
import { catchError, throwError, of } from 'rxjs';
import { AbsenceCreateDto } from 'src/app/models/absenceCreateDto';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { UserInfosService } from 'src/app/services/user-infos.service';


@Component({
  selector: 'app-absence-creation',
  templateUrl: './absence-creation.component.html',
  styleUrls: ['./absence-creation.component.scss']
})
export class CreationAbsenceComponent {
  absenceInitial: AbsenceCreateDto={
    dateEnd: new Date(),
    dateStart: new Date(),
    motif: "test",
    type: "EMPLOYEE_RTT",
    label: "Congé",
    email: this.userInfoService.userInfos.email
    
  };
  absence: AbsenceCreateDto= this.absenceInitial;

  constructor(private absenceService: AbsenceService, private userInfoService : UserInfosService) {}

  onSubmitForm() {
    this.absenceService.addAbsence(this.absence)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la création de l\'absence :', error);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        console.info('Absence créée avec succès :', response);
      });
  }
}
