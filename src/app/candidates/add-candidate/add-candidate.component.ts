import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {DataService} from '../../service/data.service'

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  registerForm: FormGroup
  loading = false;
  submitted = false;
  user:string
  userId:string
  location=''
  locations:any
  haserror=false
  error :any={error:''};

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router,private spinnerService: Ng4LoadingSpinnerService,
    private authservice:AuthService,private dataService:DataService) { 
      if(localStorage.getItem('user')){
        this.locations=dataService.locations
        this.user=localStorage.getItem('user')
        this.location=localStorage.getItem('location')
        if(localStorage.getItem('userId'))
        this.userId=localStorage.getItem('userId')
        this.spinnerService.hide()
      this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        location: [null, Validators.required]
      });
    }
    }
  ngOnInit() {
    // this.authservice.logout();
  }
    get f() { return this.registerForm.controls; }
    onSubmit() {
      this.submitted = true;
      this.haserror=false

      if (this.registerForm.invalid) {
          return;
      }
      this.spinnerService.show()
      this.loading = true;
     this.authservice.create(this.f.firstname.value,this.f.lastname.value,this.f.username.value, this.f.location.value.name)
      .subscribe(data=>{
        console.log(data)
        this.spinnerService.hide()
        this.router.navigate([''])
      },
      error=>{
        if(error && error.status==401){
          this.error = error;
        }
        else if(error && error.error){
          this.error=error
          this.haserror=true
        }else{
          this.error={
            error:'Server error'
          }
          this.haserror=true
        }
        this.submitted = false;
        this.spinnerService.hide()
        this.loading = false;
    })
    }
    keyword = 'name';
    
      selectEvent(item) {
        this.registerForm.controls.location.setValue(item.name);
    }
  
    onChangeSearch(search: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocused(e) {
      // do something
    }

}
