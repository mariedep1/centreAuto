import { Component, OnInit } from '@angular/core';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import {Garage} from "../../model/garage.model";
import { AjoutGarageComponent} from "../../modals/ajout-garage/ajout-garage.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GarageService} from "../../services/garage.service";


@Component({
  selector: 'app-gestion-garage',
  templateUrl: './gestion-garage.component.html',
  styleUrls: ['./gestion-garage.component.css']
})
export class GestionGarageComponent implements OnInit {
  garages: Garage[] = [];
  garage!: Garage;
  faCar = faCar;
  constructor(private modalService: NgbModal, private garageService: GarageService) { }

  openAjoutGarage(){
    this.modalService.open(AjoutGarageComponent);
  }

  ngOnInit(): void {
    this.garageService.getGarages().subscribe(data=>this.garages = data);
  }

  openEditGarage(garage: Garage) {
    this.garage = garage;
    const modalRef = this.modalService.open(AjoutGarageComponent);
    modalRef.componentInstance.garage = this.garage;
  }

  deleteGarage(id: number){
      this.garageService.deleteGarage(id).subscribe(r=>location.reload())
  }
}
