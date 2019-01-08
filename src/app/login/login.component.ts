import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = "";
  loginForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailID: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

     // reset login status
     this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.loginUser(this.loginForm.value)
      .subscribe((data : any) => {
        localStorage.setItem('userToken', data.token);
        if(data.user.userType == "Admin"){
          this.router.navigate(['users']);
        }
        else if(data.user.userType == "User"){
          this.router.navigate(['userdetails']);
        }
        else {
          this.router.navigate(['/']);
        }
      }, error => {
        if(error.status == 404) {
          this.message = "Invalid login details."; 
        } 
      });
  }
}
