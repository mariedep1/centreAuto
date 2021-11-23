import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/model/car.model';
import { faCar, faRoad, faCalendarAlt, faGasPump, faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons';
import {AnnonceService} from "../../services/annonce.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {

  faCar = faCar;
  faGas = faGasPump;
  faCalendar = faCalendarAlt;
  faRoad = faRoad;
  faMoney = faMoneyBillWaveAlt;
  car!: Car;
  images = false;

  constructor(private annonceService: AnnonceService, private route: ActivatedRoute) {  }

  getYear(year: any): any{
    const result = new Date(year);
    return result.getFullYear();
  }
  formatePrice(price: any): any{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.annonceService.getOne(+id).subscribe(c => {
        this.car = c, this.car.year = this.getYear(this.car.year), this.car.price = this.formatePrice(this.car.price),
        this.images = true;
      });
    }
  }

}
