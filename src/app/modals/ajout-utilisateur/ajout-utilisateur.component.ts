import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {User} from "../../model/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {

  addForm!: FormGroup;
  editForm!: FormGroup;
  @Input() user!: User;

  users!: User[];
  edit = false;

  constructor(public modal: NgbActiveModal, private builderForm: FormBuilder, private userService: UserService) { }


  createEmailUniqueValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }
      return this.users.filter(user => user.email == value).length ? {emailUnique:true}:null
    }
  }

  createUsernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }
      return this.users.filter(user => user.username == value).length ? {usernameUnique:true}:null
    }
  }

  submitForm() {
    if (!this.edit) {
      if (this.addForm.valid) {
        this.userService.addUser(this.addForm.value).subscribe(data => {
          this.modal.close();
          location.reload();
        })
      }
    } else {
      if (this.editForm.valid) {
        this.userService.editUser(this.user.id, this.editForm.value).subscribe((data: any) => {
          this.modal.close();
          location.reload();
        })
      }
    }
  }



  ngOnInit(): void {
    this.userService.getAll().subscribe(data=> {
      this.users = data
    })

    if(this.user){
      this.edit = true;
    }

    if(!this.edit){
      this.addForm = this.builderForm.group({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        username: new FormControl('', [
          Validators.required,
          this.createUsernameValidator()]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          this.createEmailUniqueValidator()]),
        siret: new FormControl('', [
          Validators.required,
          Validators.pattern("^[0-9]{14}$")
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern("^0[1-79][0-9]{8}$")
        ])
      })
    }else{
      this.editForm = this.builderForm.group({
        firstname: new FormControl(this.user.firstname, Validators.required),
        lastname: new FormControl(this.user.lastname, Validators.required),
        username: new FormControl(this.user.username, [
          Validators.required]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email]),
        phone: new FormControl(('0' + this.user.phoneNumber), [
          Validators.required,
          Validators.pattern("^0[1-79][0-9]{8}$")]),
        siret: new FormControl(this.user.siret, [
          Validators.required,
          Validators.pattern("^[0-9]{14}$")])
      })
    }
  }



}
