import { Component, OnInit } from '@angular/core';
import { faUserCircle, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faCog, faCar } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  faUser = faUserCircle;
  faCog = faCog;
  faCar = faCar;
  faPaper = faNewspaper;

  constructor( private authService: AuthService, private router: Router) { }

  deconnect(): void{
    this.authService.logOut();
  }
  ngOnInit(): void {
  }

}
