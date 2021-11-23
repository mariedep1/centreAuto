import { Component, OnInit } from '@angular/core';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import {Car} from "../../model/car.model";
import {Garage} from "../../model/garage.model";
import {AnnonceService} from "../../services/annonce.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {EditAnnonceComponent} from "../../modals/edit-annonce/edit-annonce.component";


@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  styleUrls: ['./gestion-annonces.component.css']
})
export class GestionAnnoncesComponent implements OnInit {

  faPaper = faNewspaper;
  cars: Car[] = [];
  car!: Car;
  garages : Garage[] = [];

  constructor(private annonceService: AnnonceService, private modalService: NgbModal, private config: NgbModalConfig) {
    config.size = 'lg';
  }

  getAllCarsByUser(){
    this.annonceService.getCarsByUser().subscribe(data => {
      this.cars = data;
    });
  }
  deleteCar(id: number){
    this.annonceService.deleteCar(id).subscribe(r=>location.reload())
  }
  openCarModal(car: Car){
    this.car = car;
    const modalRef = this.modalService.open(EditAnnonceComponent);
    modalRef.componentInstance.car = this.car;
  }
  ngOnInit(): void {
    this.getAllCarsByUser()
  }

}
