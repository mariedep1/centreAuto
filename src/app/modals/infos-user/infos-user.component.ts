import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-infos-user',
  templateUrl: './infos-user.component.html',
  styleUrls: ['./infos-user.component.css']
})
export class InfosUserComponent implements OnInit {

  @Input() user!: User;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
