import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnnonceListeComponent} from "./annonces/annonce-liste/annonce-liste.component";
import {AnnonceAjoutComponent} from "./annonces/annonce-ajout/annonce-ajout.component";
import {GuideComponent} from "./guide/guide.component";
import {ContactComponent} from "./contact/contact.component";
import {CguComponent} from "./bas-page/cgu/cgu.component";
import {PolitiqueConfidentialiteComponent} from "./bas-page/politique-confidentialite/politique-confidentialite.component";
import {MentionLegalComponent} from "./bas-page/mention-legal/mention-legal.component";
import {PlanSiteComponent} from "./bas-page/plan-site/plan-site.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {ProfilComponent} from "./utilisateur/profil/profil.component";
import {GestionCompteComponent} from "./utilisateur/gestion-compte/gestion-compte.component";
import {GestionGarageComponent} from "./utilisateur/gestion-garage/gestion-garage.component";
import {GestionAnnoncesComponent} from "./utilisateur/gestion-annonces/gestion-annonces.component";
import {AnnonceDetailComponent} from "./annonces/annonce-detail/annonce-detail.component";
import {PageNonTrouveComponent} from "./page-non-trouve/page-non-trouve.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {AuthAdminGuard} from "./auth-admin.guard";

const routes: Routes = [
  {path: 'annonces', component: AnnonceListeComponent},
  {path: 'annonce/nouvelle', canActivate: [AuthGuard], component: AnnonceAjoutComponent},
  {path: 'guide', component: GuideComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cgu', component: CguComponent},
  {path: 'confidentialite', component: PolitiqueConfidentialiteComponent},
  {path: 'mentionslegales', component: MentionLegalComponent},
  {path: 'plan', component: PlanSiteComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'admin', canActivate:[AuthAdminGuard],component: DashboardComponent},
  {path: 'profil',canActivate: [AuthGuard], component: ProfilComponent},
  {path: 'profil/compte',canActivate: [AuthGuard], component: GestionCompteComponent},
  {path: 'profil/garages',canActivate: [AuthGuard], component: GestionGarageComponent},
  {path: 'profil/annonces', canActivate: [AuthGuard],component: GestionAnnoncesComponent},
  {path: 'annonce/:id', component: AnnonceDetailComponent},
  {path: '', redirectTo: 'annonces', pathMatch: 'full'},
  {path: '**', component: PageNonTrouveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
