import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Garage} from "../../model/garage.model";

@Component({
  selector: 'app-infos-garage',
  templateUrl: './infos-garage.component.html',
  styleUrls: ['./infos-garage.component.css']
})
export class InfosGarageComponent implements OnInit {

  @Input() garage!: Garage;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
