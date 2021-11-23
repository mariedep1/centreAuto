import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AjoutUtilisateurComponent} from "../../modals/ajout-utilisateur/ajout-utilisateur.component";
import {User} from "../../model/user.model";
import {AjoutGarageComponent} from "../../modals/ajout-garage/ajout-garage.component";
import {Car} from "../../model/car.model";
import {Garage} from "../../model/garage.model";
import {AnnonceService} from "../../services/annonce.service";
import {UserService} from "../../services/user.service";
import {GarageService} from "../../services/garage.service";
import {InfosUserComponent} from "../../modals/infos-user/infos-user.component";
import {InfosGarageComponent} from "../../modals/infos-garage/infos-garage.component";
import {EditAnnonceComponent} from "../../modals/edit-annonce/edit-annonce.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayUtilisateurs = false;
  displayAnnonces = true;
  displayGarages = false;
  cars!: Car[];
  users!: User[];
  garages!: Garage[];
  user!: User;
  garage!: Garage;
  infos!: any;

  constructor(private modalService: NgbModal, private annonceService: AnnonceService,
              private userService: UserService, private garageService: GarageService) { }

  openAjoutUtilisateur(){
    this.modalService.open(AjoutUtilisateurComponent)
  }

  openEditUtilisateur(user: User){
    const modalRef = this.modalService.open(AjoutUtilisateurComponent);
    modalRef.componentInstance.user = user;
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data=>{
       this.users = data.filter((user: any)=>user.roles.indexOf('ROLE_ADMIN') == -1);
    })
    this.annonceService.getAll().subscribe(data=>{
      this.cars = data
    })
    this.garageService.getAllGarages().subscribe(data=>{
      this.garages = data
    })
    this.userService.getInfos().subscribe(data=>{
      this.infos = data})
  }

  showUsers() {
    if(this.displayAnnonces){
      this.displayAnnonces = false;
    }
    if(this.displayGarages){
      this.displayGarages = false;
    }
    this.displayUtilisateurs = true;
  }

  deleteGarage(id: number) {
    this.garageService.deleteGarage(id).subscribe(r=>location.reload())
  }

  openEditGarage(garage: Garage) {
    this.garage = garage;
    const modalRef = this.modalService.open(AjoutGarageComponent);
    modalRef.componentInstance.garage = this.garage;
  }

  showGarages() {
    if(this.displayAnnonces){
      this.displayAnnonces = false;
    }
    if(this.displayUtilisateurs){
      this.displayUtilisateurs = false;
    }
    this.displayGarages = true;
  }

  showCars() {
    if(this.displayUtilisateurs){
      this.displayUtilisateurs = false;
    }
    if(this.displayGarages){
      this.displayGarages = false;
    }
    this.displayAnnonces = true;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data=>location.reload())
  }

  openInfoUtilisateur(user: User) {
    const modalRef = this.modalService.open(InfosUserComponent);
    modalRef.componentInstance.user = user;
  }

  openInfoGarage(garage: Garage) {
    const modalRef = this.modalService.open(InfosGarageComponent);
    modalRef.componentInstance.garage = garage;
  }

  openEditAnnonce(car: Car) {
    const modalRef = this.modalService.open(EditAnnonceComponent);
    modalRef.componentInstance.car = car;
  }


  deleteAnnonce(id: number) {
    this.annonceService.deleteCar(id).subscribe(r=>location.reload())
  }
}
