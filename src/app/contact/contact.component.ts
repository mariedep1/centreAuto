import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  constructor(private builderForm: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.contactForm = this.builderForm.group({
      isPro: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      message: new FormControl('', Validators.required)
    })
  }

  submitForm() {
      if(this.contactForm.valid){
        this.router.navigate(['/annonces']);
      }
  }
}
