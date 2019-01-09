import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { UserDetails } from '../models';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
    loading = false;
    message = "";
    userForm: FormGroup;
    submitted = false;
    user: UserDetails;  

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
      this.userForm = this.formBuilder.group({
        userID: ['', Validators.required],
        name: ['', Validators.required],
        emailID: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
       });
        this.getUserDetails();
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    getUserDetails()
    {
      this.loading = true;
      this.userService.getUserDetails()
      .subscribe((data: any) => {
        this.userForm.patchValue(data)
        this.loading = false;
      }, error => {
          this.message = error;
          this.loading = false;
      });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.saveUser(this.userForm.value)
            .subscribe((data: any) => {
              this.message = "Success.";
              this.loading = false;
            }, error => {
                this.message = error;
                this.loading = false;
            });
    }

}
