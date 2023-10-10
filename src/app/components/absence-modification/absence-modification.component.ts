import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Absence } from 'src/app/models/absence.model';
import { AbsenceTypeService } from 'src/app/services/absence/absence-type.service';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { UserInfosService } from 'src/app/services/user-infos.service';


@Component({
  selector: 'app-absence-modification',
  templateUrl: './absence-modification.component.html',
  styleUrls: ['./absence-modification.component.scss']
})
export class AbsenceModificationComponent {

  formData: any = {};
  myForm!: FormGroup;
  role!: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private absenceService: AbsenceService, 
    private userInfoService: UserInfosService, 
    public absenceType: AbsenceTypeService,
    ) { }
    ngOnInit(){
    this.role = this.userInfoService.userInfos.role
    this.myForm = this.formBuilder.group({
      dateStart: [''],
      dateEnd: [''],
      motif: [''],
      label: [''],
      type: [''],
      status: [''],
    });
  }
  
  // Getting values from URL ...
  currentId = Number(this.route.snapshot.paramMap.get('id'));
  currentEmail = this.userInfoService.userInfos.email;
  currentDateStart = this.route.snapshot.paramMap.get('dateStart');
  currentDateEnd = this.route.snapshot.paramMap.get('dateEnd');
  currentMotif = this.route.snapshot.paramMap.get('motif');
  currentLabel = this.route.snapshot.paramMap.get('label');
  currentType = this.route.snapshot.paramMap.get('type');
  currentStatus = this.route.snapshot.paramMap.get('status');

  // New absence (which takes the current values ...)
  absence: Absence = {
    id: this.currentId,
    email: this.currentEmail,
    dateStart: new Date(),
    dateEnd: new Date(),
    motif: this.currentMotif || '',
    label: this.currentLabel || '',
    type: this.currentType || '',
    status: this.currentStatus || '',
  };
  
  // Current absence
  currentAbsence: Absence = {
    id: this.currentId,
    email: this.currentEmail,
    dateStart: this.currentDateStart ? new Date(this.currentDateStart) : new Date(),
    dateEnd: this.currentDateEnd ? new Date(this.currentDateEnd) : new Date(),
    motif: this.currentMotif || '',
    label: this.currentLabel || '',
    type: this.currentType || '',
    status: this.currentStatus || '',
  };

  redirectTo(route : string){
    this.router.navigateByUrl(route);
  }

  onSubmitForm() {
    this.absenceService.updateAbsence(this.absence)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la modification de l\'absence :', error);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        console.log("motif : "+this.absence.motif);
        
        console.info('Absence modifiée avec succès :', response);
        this.redirectTo("absences_view");
      });
  }
}
