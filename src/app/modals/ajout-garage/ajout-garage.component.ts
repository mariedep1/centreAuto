import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user.model";
import {Garage} from "../../model/garage.model";
import {GarageService} from "../../services/garage.service";


@Component({
  selector: 'app-ajout-garage',
  templateUrl: './ajout-garage.component.html',
  styleUrls: ['./ajout-garage.component.css']
})
export class AjoutGarageComponent implements OnInit {

  @Input() garage!: Garage;
  garageForm!: FormGroup;
  editForm = false;
  constructor(public modal: NgbActiveModal, public formbuilder: FormBuilder, private userService: UserService,
              private garageService: GarageService) { }

  ngOnInit(): void {
    if(this.garage){
      this.editForm = true;
    }
    if(!this.editForm){
      this.garageForm = this.formbuilder.group({
        name: ['', Validators.required],
        phoneNumber:new FormControl('', [
          Validators.required,
          Validators.pattern("^0[1-79][0-9]{8}$")
        ]),
        address:['', Validators.required],
        postcode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/)]),
        city: ['', Validators.required]
      })
    }else{
      this.garageForm = this.formbuilder.group({
        name: new FormControl(this.garage.name, Validators.required),
        phoneNumber:new FormControl(("0" + this.garage.phoneNumber), [
          Validators.required,
          Validators.pattern("^0[1-79][0-9]{8}$")
        ]),
        address:new FormControl(this.garage.address, Validators.required),
        postcode: new FormControl(this.garage.postcode, [
          Validators.required,
          Validators.pattern(/^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/)]),
        city: new FormControl(this.garage.city, Validators.required)
      })
    }

  }


  submitForm() {
    if(this.editForm){
      if(this.garageForm.valid){
        this.garageService.editGarage(this.garageForm.value, this.garage.id).subscribe(data=> {
          this.modal.close();
          location.reload();
        })
      }
    }
    if(!this.editForm){
      if(this.garageForm.valid){
        this.garageService.addGarage(this.garageForm.value).subscribe(data=> {
          this.modal.close();
          location.reload();
        })
      }
    }
  }
}
