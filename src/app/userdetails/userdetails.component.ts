import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    url: string;
    user: UserDetails;  
    imgBase64String = "";

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
     private cd: ChangeDetectorRef) { }

    ngOnInit() {
      this.userForm = this.formBuilder.group({
        userID: ['', Validators.required],
        name: ['', Validators.required],
        emailID: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        userImageUpload: [''],
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

      onUploadChange(evt: any) {
        const file = evt.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = this.handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        }
      }

      handleReaderLoaded(e) {
        this.imgBase64String = 'data:image/png;base64,' + btoa(e.target.result);
        this.userForm.patchValue({
          userImageUpload: btoa(e.target.result),
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
