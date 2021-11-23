import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginform!: FormGroup;
  invalid = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  /**
   * validation du formulaire de connexion
   */
  submitLogin(): any {

    if (this.loginform.valid) {
      this.authService.login(this.loginform.value)
        .subscribe(
          (data: any) => {
            this.authService.setToken(data.token);
            const decoded: any = jwt_decode(data.token);
            this.authService.setLoggedUser(decoded.username);
            this.authService.setRefreshToken(data.refresh_token)
            this.authService.isAdmin(decoded.roles)
            if(this.authService.getIsAdmin()){
              window.location.replace('/admin')
            }else{
              window.location.replace('/profil')
            }
          },
          (error)=>{
            this.invalid = true
          }
        );
    }
  }
  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    });
  }

}
