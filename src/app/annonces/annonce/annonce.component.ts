import {Component, Input, OnInit} from '@angular/core';
import { Car } from 'src/app/model/car.model';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  constructor(public domSanitizer : DomSanitizer) { }
  @Input() car!: Car;

  ngOnInit(): void {
  }

}
