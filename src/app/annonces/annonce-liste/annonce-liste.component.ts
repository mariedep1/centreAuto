import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnonceService} from "../../services/annonce.service";
import {Car} from "src/app/model/car.model";
import { Options } from '@angular-slider/ngx-slider';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-annonce-liste',
  templateUrl: './annonce-liste.component.html',
  styleUrls: ['./annonce-liste.component.css']
})
export class AnnonceListeComponent implements OnInit, OnDestroy {

  cars: Car[] = [];
  models: [] = [];
  brands: [] = [];
  brand!: any;
  fuels: [] = [];
  searchForm!: FormGroup;
  display = false;
  //Pagination
  page = 1;
  pageSize = 16;
  currentYear = new Date().getFullYear();
  collectionSize = this.cars.length;

  constructor(private annonceService: AnnonceService, private builderForm: FormBuilder) { }

  // Variables slider Année
  yearOptions: Options = {
    floor: 1950,
    ceil:  this.currentYear,
  };

// Variables slider Kilometres
  kilometersOptions: Options = {
    floor: 0,
    ceil: 200000,
    step: 10000
  };
// Variables slider Prix
  priceOptions: Options = {
    floor: 0,
    ceil: 20000,
    step: 1000
  };
  clear = false;

  ngOnInit(): void {
    this.annonceService.getAllBrands().subscribe(data => this.brands = data);
    this.annonceService.getAllFuels().subscribe(data => this.fuels = data);

    this.searchForm = this.builderForm.group({
      brand: [],
      model: [],
      fuel: [],
      year:new FormControl([1950, this.currentYear]),
      kilometers: new FormControl([0, 200000]),
      price: new FormControl([1000,20000]),
    })

    if(this.annonceService.getCurrentCarSearch().length>0){
      this.cars = this.annonceService.getCurrentCarSearch();
      this.clear = true;
    }else{
      this.annonceService.getAll().subscribe(data => {
        this.cars = data;
      });
    }

  }

  onChange() {
    this.annonceService.getModelsByBrand(this.brand).subscribe(m => {
      this.models = m
    })
  }

  clearSearch(){
    this.annonceService.clearCurrentCars();
    location.reload();
  }

  submitSearch() {
    if(this.searchForm.get('brand')?.value == undefined){
      this.searchForm.patchValue({
        brand: null
      })
    }
    if(this.searchForm.valid){
        this.annonceService.getBySearchBar(this.searchForm.value).subscribe(data => {
          this.cars = data,
            this.clear = true,
            this.annonceService.setCurrentCarSearch(this.cars);
        })
    }
  }
  ngOnDestroy(){
    this.annonceService.setCurrentCarSearch(this.cars);
  }
}
