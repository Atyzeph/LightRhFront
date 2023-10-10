import { Component, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Observable, of, tap } from 'rxjs';
import { Absence } from 'src/app/models/absence.model';
import { HighlightedDay } from 'src/app/models/highlighted-day';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendrierComponent {
  @ViewChild(MatCalendar) calendar?: MatCalendar<Date>;

  absences : Array<Absence> = new Array<Absence>;
  highlightedDays : Array<HighlightedDay> = new Array<HighlightedDay>;
  dateClass : MatCalendarCellClassFunction<moment.Moment> = (cellDate, view) => {
    if(view == "month"){
      if(cellDate.day()==0 || cellDate.day()==6)
        return 'cellHighlight-weekend';
        let type = "";
      if(this.highlightedDays.some((hDay )=>{
        if(hDay.moment>=cellDate && hDay.moment<cellDate.clone().add(1,'days')){
          type = hDay.type;
          return true;
        }
        return false;
      })){
        switch(type){
          case("EMPLOYE_RTT"):return 'cellHighlight-conge-perso';
          case("EMPLOYER_RTT"):return 'cellHighlight-conge-force';
          case("HOLIDAY"):return 'cellHighlight-conge-force';
          case("PAID_LEAVE"):return 'cellHighlight-conge-perso';
          case("UNPAID_LEAVE"):return 'cellHighlight-conge-perso';
          default:return 'cellHighlight-basic';
        }        
      }
      return 'cellHighlight-basic';
    }
    return 'cellHighlight-basic';
  };

  constructor(private adapter : DateAdapter<any>, private employeeService : EmployeeService){
    this.adapter.setLocale(moment.locale('fr'));
    this.employeeService.getAbsences().pipe(
      tap((absences:Array<Absence>)=> {
        if(absences){
          this.absences = absences;
          this.highlightedDays = this.daysToHiglight(absences);
          this.calendar?.updateTodaysDate();
        }
      })
    ).subscribe();
  }

  private daysToHiglight(absences : Array<Absence>):Array<HighlightedDay>{
    if(absences.length==0){
      return new Array<HighlightedDay>();
    }
    let highlightedDays = new Array<HighlightedDay>();
    absences.forEach(absence => {
      if(absence.status == "VALIDEE"){
        let dateStart = moment(absence.dateStart);
        let dateEnd = moment(absence.dateEnd);
        let numberOfDays = dateEnd.diff(dateStart, 'days')+1
        for(let i=0;i<numberOfDays;i++){
          let highlightedDay : HighlightedDay = {
            moment : dateStart.clone().add(i,'days'),
            type : absence.type
          }
          highlightedDays.push(highlightedDay);
        }
      }
    });
    return highlightedDays;
  }
}
