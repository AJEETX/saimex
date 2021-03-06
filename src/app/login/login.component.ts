import { AuthService } from './../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {environment} from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false;
  submitted = false;
  returnUrl: string;
  error :any={error:''};
  haserror=false
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authservice:AuthService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.authservice.logout();

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.haserror=false

        if (this.loginForm.invalid) {
            return;
        }
        if(!environment.production){
          this.f.username.setValue('ajeetx@email.com')
          this.f.password.setValue('azy')
        }

        this.loading = true;
        this.spinnerService.show();
        this.authservice.login(this.f.username.value, this.f.password.value)
          .subscribe( data => {
            var isAdmin=data.roles.filter(d=>d.name=='Admin').length==1
            if(this.authservice.loggedIn())
            {
                this.router.navigate([this.returnUrl]);
            }
            else if(!isAdmin){
              this.router.navigate(['view-candidate']);
            }
            else{
              this.router.navigate(['login']);
            }
              },
              error => {
                if(error.status==400){
                  this.error=error
                }
                  else{this.error={
                    error:'Server error'
                  }
                }
                this.loading = false;
                this.spinnerService.hide();
                this.haserror=true
              });
    }
}
