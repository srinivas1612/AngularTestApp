import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { PasswordValidation } from '../others/passwordvalidation';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  message = "";
  passwordForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: PasswordValidation.MatchPassword 
    })
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    this.userService.changePassword(this.passwordForm.value)
      .subscribe((data: any) => {
        this.message = "Success";
      }, error => {
        this.message = "Error, Try again later.";
      });
  }
}
