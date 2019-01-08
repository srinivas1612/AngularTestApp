import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
    message = "";
    registerForm: FormGroup;
    submitted = false;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            emailID: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phoneNumber: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.userService.createUser(this.registerForm.value)
            .subscribe((data: any) => {
                this.router.navigate(['users']);
            }, error => {
                console.log(error);
                if (error.status == 404) {
                    this.message = "Error, Try again later.";
                }
            });
    }
}
