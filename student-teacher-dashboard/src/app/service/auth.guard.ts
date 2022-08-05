import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInComponent } from '../components/log-in/log-in.component';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: DataServiceService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('check guard');

    if(this.service.fl){
      return true;
    }
    else{
      alert("Access Denied, login first");
      this.router.navigateByUrl('/log-in')
      return false;
    }
  }
  
}
