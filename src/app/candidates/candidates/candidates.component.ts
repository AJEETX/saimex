import { VehicleService } from '../../service/vehicle.service';
import { UserService } from '../../service/user.service';
import { Vehicle,User } from '../../model';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  products:Vehicle[]
  users:User[]
  user:string
  userId:string
  admin:boolean
  loading=false
  error :any={error:''};
  haserror=false  
  searchField: FormControl
  searches: string[] = [];
  colordanger:'red'
  colornormal:'black'
    //sorting
    key: string = 'name'; //set default
    reverse: boolean = false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  p: number = 1;

  constructor(private router:Router, private service:VehicleService,private userService:UserService,private spinnerService: Ng4LoadingSpinnerService) {
    this.haserror=false
    if(localStorage.getItem('user')){
      this.loading=true
      this.spinnerService.show();
     this.user=localStorage.getItem('user')
      if(localStorage.getItem('userId'))
      this.userId=localStorage.getItem('userId')
      this.userService.getUsers("")
      .subscribe(data=>{
          this.users=data
          this.loading=false
          this.spinnerService.hide()
      },
      error => {
        if(error && error.status==401){
          this.router.navigate(['/login']);
        }else{
          this.error={
            error:'Server error'
          }
          this.haserror=true
        }
          this.loading = false;
          this.spinnerService.hide();
      })   
    }
    else{
      this.router.navigate(['/login']);
    }
   }
  ngOnInit() {
    this.loading=true
    this.spinnerService.show();
    this.haserror=false
    this.searchField = new FormControl()
    this.searchField.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(term => {
      this.spinnerService.show();
      this.userService.getUsers(term)
        .subscribe(data=>{
          console.log(data)
          this.loading=false
          this.spinnerService.hide()
          this.users=data
        },
        error => {
          if(error && error.status==401){
            this.router.navigate(['/login']);
          }else{
            this.haserror=true
            this.error={
              error:'Server error'
            }
          }
            this.loading = false;
            this.spinnerService.hide();
        })
    });
  }
  addProduct():void{
    this.loading=true
    this.spinnerService.show();
    this.haserror=false
    this.router.navigate(['add-candidate'])
  }
  editProduct(product: Vehicle): void {
    this.loading=true
    this.spinnerService.show();
    this.haserror=false
    localStorage.removeItem("pid");
    localStorage.setItem("pid", product.pId.toString());
    this.router.navigate(['edit-vehicle']);
  };
  deleteProduct(product: Vehicle): void {
    this.loading=true
    this.spinnerService.show();
    this.haserror=false
    this.service.delete(product.pId)
      .subscribe( data => {
        this.loading=false
        this.spinnerService.hide();
        this.products = this.products.filter(u => u !== product);
      },
      error => {
        if(error && error.status==401){
          this.error = error;
          this.router.navigate(['/login']);
        }else{
          this.error={
            error:'Server error'
          }          
          this.haserror=true
        }
          this.loading = false;
          this.spinnerService.hide();
  })
  };
  getUserDetail(){
    this.router.navigate(['/user']);
  }
  setMyStyles(product) {
    let styles = {
      'color': product.watch ? 'white' : 'black',
      'font-size': '.8em',
      'background-color':product.watch ?'red':'white'
    };
    return styles;
  }

}
