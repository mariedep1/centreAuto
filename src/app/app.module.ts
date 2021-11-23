import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnnonceListeComponent } from './annonces/annonce-liste/annonce-liste.component';
import { AnnonceComponent } from './annonces/annonce/annonce.component';
import { AnnonceDetailComponent } from './annonces/annonce-detail/annonce-detail.component';
import { AnnonceAjoutComponent } from './annonces/annonce-ajout/annonce-ajout.component';
import { GuideComponent } from './guide/guide.component';
import { MenuComponent } from './menu/menu.component';
import { PageNonTrouveComponent } from './page-non-trouve/page-non-trouve.component';
import { ProfilComponent } from './utilisateur/profil/profil.component';
import { GestionAnnoncesComponent } from './utilisateur/gestion-annonces/gestion-annonces.component';
import { GestionCompteComponent } from './utilisateur/gestion-compte/gestion-compte.component';
import { GestionGarageComponent } from './utilisateur/gestion-garage/gestion-garage.component';
import { UtilisateurAjoutComponent } from './admin/utilisateur-ajout/utilisateur-ajout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CguComponent } from './bas-page/cgu/cgu.component';
import { FooterComponent } from './bas-page/footer/footer.component';
import { MentionLegalComponent } from './bas-page/mention-legal/mention-legal.component';
import { PolitiqueConfidentialiteComponent } from './bas-page/politique-confidentialite/politique-confidentialite.component';
import { PlanSiteComponent } from './bas-page/plan-site/plan-site.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContactComponent } from './contact/contact.component';
import { NgbModule, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AjoutGarageComponent } from './modals/ajout-garage/ajout-garage.component';
import { DomSanitizer } from '@angular/platform-browser';
import { EditAnnonceComponent } from './modals/edit-annonce/edit-annonce.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AjoutUtilisateurComponent } from './modals/ajout-utilisateur/ajout-utilisateur.component';
import { InfosUserComponent } from './modals/infos-user/infos-user.component';
import { InfosGarageComponent } from './modals/infos-garage/infos-garage.component';


@NgModule({
  declarations: [
    AppComponent,
    AnnonceListeComponent,
    AnnonceComponent,
    AnnonceDetailComponent,
    AnnonceAjoutComponent,
    GuideComponent,
    MenuComponent,
    PageNonTrouveComponent,
    ProfilComponent,
    GestionAnnoncesComponent,
    GestionCompteComponent,
    GestionGarageComponent,
    UtilisateurAjoutComponent,
    CguComponent,
    FooterComponent,
    MentionLegalComponent,
    PolitiqueConfidentialiteComponent,
    PlanSiteComponent,
    ConnexionComponent,
    ContactComponent,
    AjoutGarageComponent,
    EditAnnonceComponent,
    DashboardComponent,
    AjoutUtilisateurComponent,
    InfosUserComponent,
    InfosGarageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    NgbModule,
  ],
  providers: [ NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
