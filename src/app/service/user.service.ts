import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserInfo } from '../model';
import {Config} from '../../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=Config.baseUrl+"Users"
  constructor(private http:HttpClient) {
   }
  getUsers(query?:string){
    var userid=localStorage.getItem('username')
    if(query==""){
      query="undefined"
    }
    var users= this.http.get<User[]>(this.baseUrl+ '/'+userid+'/'+query);
    return users;
  }
}
