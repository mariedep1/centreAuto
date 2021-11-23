import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle as faUserCircleSolid } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faUser = faUserCircle;
  faUserConnected = faUserCircleSolid;
  isLoggedIn?: boolean;
  isAdmin?: any;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.getIsAdmin();
  }

  logOut() {
    this.authService.logOut();
  }
}
