import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Auto-completion via IDE doesn't work for this service
export class AbsenceTypeService {

  EMPLOYEE_RTT: string = 'EMPLOYEE_RTT';
  EMPLOYER_RTT: string = 'EMPLOYER_RTT';
  HOLIDAY: string = 'HOLIDAY';
  PAID_LEAVE: string = 'PAID_LEAVE';
  UNPAID_LEAVE: string = 'UNPAID_LEAVE';
}
