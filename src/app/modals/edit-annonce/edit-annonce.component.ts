import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import {Car} from "../../model/car.model";
import {Garage} from "../../model/garage.model";
import {AnnonceService} from "../../services/annonce.service";
import {GarageService} from "../../services/garage.service";
import { faEdit } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {

  @Input() car!: Car;
  models: [] = [];
  brands: [] = [];
  fuels: [] = [];
  garages: Garage[] = [];
  adForm!: FormGroup;
  photoForm!: FormGroup;
  images: any = [];
  brand!: any;
  faEdit = faEdit;
  editInfos = false;
  editPhoto = false;
  infos = true;
  display = false;
  constructor(public modal: NgbActiveModal, public formbuilder: FormBuilder, public annonceService: AnnonceService,
              public garageService: GarageService) { }

  getYear(year: any): any{
    const result = new Date(year);
    return result.getFullYear();
  }
  formatePrice(price: any): any{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  onChange(): any{
    this.annonceService.getModelsByBrand(this.brand).subscribe(m => this.models = m);
  }

  ngOnInit(): void {
    this.adForm = this.formbuilder.group({
      title: new FormControl(this.car.title),
      description: new FormControl(this.car.description),
      year: new FormControl(this.car.year),
      kilometers: new FormControl(this.car.kilometers),
      price:new FormControl(this.car.price),
      model: new FormControl(),
      fuel: new FormControl(),
      garage_id: new FormControl(),
    })
    this.photoForm = this.formbuilder.group({
      photos: [],
      fileSource: [],
      id: []
    })
    this.annonceService.getAllBrands().subscribe(data => this.brands = data);
    this.annonceService.getAllFuels().subscribe(data => this.fuels = data);
    this.garageService.getGarages().subscribe(data => this.garages = data);
    this.car.year = this.getYear(this.car.year);
    this.car.price = this.formatePrice(this.car.price);
  }

  showInput(option: string) {
    this.infos = false;
    if(option == "info"){
      this.editInfos = true;
    }
    if(option == "photo"){
      this.editPhoto = true;
    }
  }

  onFileChange(event: any) {
    let count = this.car.photos.length;
     this.display = true;
    const filesAmount = event.target.files.length;
    for(let i=0; i<filesAmount; i++){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (readerEvent:any )=>{
        for(let j=0; j<(4 - count); j++){
          if(this.images[j] == null){
            this.images.push(readerEvent.target.result);
            break
          }
        }
        this.photoForm.patchValue({
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

  deleteImage(id: number) {
    this.annonceService.deleteImage(id).subscribe( r =>{
      this.modal.close();
      location.reload();
    })

  }

  submitInfos() {
    console.log(this.adForm.value)
    if(this.adForm.valid){
      this.annonceService.editCar(this.car.id, this.adForm.value).subscribe(r=> {
        this.modal.close();
        location.reload();
      })
    }
  }

  submitPhoto() {
    this.photoForm.patchValue({
      id: this.car.id
    })
    if(this.photoForm.valid){
      this.annonceService.addImage(this.photoForm.value).subscribe( r=>{
        this.modal.close();
        location.reload();
      })
    }
  }
}
