import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { Car } from 'src/app/model/car.model';
import {Router} from '@angular/router';
import {AnnonceService} from "../../services/annonce.service";
import {User} from "../../model/user.model";
import {GarageService} from "../../services/garage.service";
import {Garage} from "../../model/garage.model";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-annonce-ajout',
  templateUrl: './annonce-ajout.component.html',
  styleUrls: ['./annonce-ajout.component.css']
})
export class AnnonceAjoutComponent implements OnInit {

  faPaper = faNewspaper;
  user!: User;
  models: [] = [];
  brands: [] = [];
  fuels: [] = [];
  garages: Garage[] = [];
  images: any = [];
  files: any = [];
  brand!: any;
  carForm!: FormGroup;
  display = false;

  constructor(private fb: FormBuilder, private annonceService: AnnonceService, private garageService: GarageService
              , private router: Router, ) { }

  onChange(): any{
    this.annonceService.getModelsByBrand(this.brand).subscribe(m => this.models = m);
  }
  addAd(): any{
    if (this.carForm.valid){
      this.annonceService.addCar(this.carForm.value).subscribe(v => this.router.navigate(['/profil/annonces']));
    }
  }

  ngOnInit(): void {
    this.carForm = this.fb.group(
      {
        title: [, Validators.required],
        description: new FormControl('',[
          Validators.required,
          Validators.minLength(100)]),
        year: [, Validators.required],
        kilometers: [, Validators.required],
        price: [, Validators.required],
        fuel: [, Validators.required],
        model: [, Validators.required],
        garage_id: [, Validators.required],
        photos: ['', Validators.required],
        fileSource: ['', Validators.required]
      }
    );
    this.annonceService.getAllBrands().subscribe(data => this.brands = data);
    this.annonceService.getAllFuels().subscribe(data => this.fuels = data);
    this.garageService.getGarages().subscribe(data => this.garages = data);
  }

  onFileChange(event: any) {
    this.display = true;
      const filesAmount = event.target.files.length;
      for(let i=0; i<filesAmount; i++){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (readerEvent:any )=>{
          for(let j=0; j<4; j++){
            if(this.images[j] == null){
              this.images.push(readerEvent.target.result);
              break
            }
          }
          this.carForm.patchValue({
            fileSource: this.images
          })
        }
      }
  }

  removeImage(image: any){
    this.images.splice(this.images.indexOf(image),1);
    if(this.images.length == 0){
      this.display = false;
    }
  }

}
