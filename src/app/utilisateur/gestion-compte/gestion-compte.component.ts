import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-gestion-compte',
  templateUrl: './gestion-compte.component.html',
  styleUrls: ['./gestion-compte.component.css']
})
export class GestionCompteComponent implements OnInit {

  faCog = faCog;
  faEdit =faEdit;
  user!: User;
  userForm!: FormGroup;
  isReadOnly = true;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  getUser(): any{
    this.userService.getOne().subscribe((data: any) => {;
      this.user = data;
      console.log(this.user);
      this.userForm = this.formBuilder.group({
        firstname: new FormControl(this.user.firstname),
        lastname: new FormControl(this.user.lastname),
        email: new FormControl(this.user.email),
        phone: new FormControl(('0' + this.user.phoneNumber)),
        siret: new FormControl(this.user.siret)
      })

    });
    ;
  }

  editUser(): any{
    this.userService.editUser(this.user.id, this.userForm.value).subscribe((data: any)=>location.reload())
  }

  ngOnInit(): void {
    this.getUser();
  }

  showInput() {
    this.isReadOnly=false;
  }
}
