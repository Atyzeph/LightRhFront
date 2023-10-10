import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projetfinal';

  currentComponent : string = ""
  constructor(private router : Router){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this.currentComponent = this.getComponentTitle((<NavigationEnd>event).url);
      }
    });
  }

  getComponentTitle(url : string) : string{
    switch(url){
      case("/calendar") : return "Calendrier";
      case("/absences_view") : return "Liste de mes absences";
      case("/creation_absence") : return "Demander une absence";
      case("/creation_compte") : return "Créer un employé";      
      default : return "Connexion";
    }
  }
}
