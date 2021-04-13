import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authenticated$ = this.oidcSecurityService.checkAuth();
  userData$ = this.oidcSecurityService.userData$.pipe(
    map(userData => JSON.stringify(userData, null, 2)),
    startWith("not logged in")
  );

  constructor(private oidcSecurityService: OidcSecurityService) { }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
