import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Auto-completion via IDE doesn't work for this service
export class AbsenceStatusService {

  WAITING_VALIDATION: string = 'EN_ATTENTE_VALIDATION';
  INITIAL: string = 'INITIALE';
  REJECTED: string = 'REJETEE';
  VALIDATED: string ='VALIDEE';
}
