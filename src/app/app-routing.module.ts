import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationAbsenceComponent } from './components/absence-creation/absence-creation.component';
import { ConnexionComponent } from './components/connection/connection.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { CalendrierComponent } from './components/calendar/calendar.component';
import { isAuthGuard } from './services/guards/is-auth.guard';
import { AbsenceViewerComponent } from './components/absence-viewer/absence-viewer.component';
import { CreationCompteComponent } from './components/account-creation/account-creation.component';
import { isAdminGuard } from './services/guards/is-admin.guard';
import { AbsenceModificationComponent } from './components/absence-modification/absence-modification.component';

const routes: Routes = [
  //routes relatives au login
  { path: '', component: ConnexionComponent },
  { path : 'password_reset', component : PasswordResetComponent },
  
  //route d'accueil quand connecté 
  { path : 'calendar', component : CalendrierComponent, canActivate : [isAuthGuard] },
  //manque la visualisation des jours si congé / rtt / rtt employeur / jour férié avec couleur diff entre demande perso et congé imposé
  //manque l'affichage des compteurs congés payés + rtt
  //manque changer d'année 


  //Routes pour la gestion de soi même
  { path : 'absences_view', component : AbsenceViewerComponent, canActivate : [isAuthGuard] },
  // --liste par ordre chrono jours de congés + rtt employeur + jours fériés + 
  //manque modifier une demande 
  // absence.id, absence.dateStart, absence.dateEnd, absence.motif, absence.type, absence.status
  { path : 'absences_update/:id/:dateStart/:dateEnd/:motif/:label/:type/:status', component : AbsenceModificationComponent, canActivate : [isAuthGuard] },
  //manque supprimer une demande

  { path: 'creation_absence', component: CreationAbsenceComponent, canActivate : [isAuthGuard] },
  
  //Routes pour les managers
  //Manque visualisation de mon département en vue par jour
  //Manque histogramme de mon département en vue par jour

  //Routes pour les admin
  { path: 'creation_compte', component: CreationCompteComponent, canActivate : [isAdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
