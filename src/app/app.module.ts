import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { LoginComponent } from './auth/login/login.component';
import { Comp1Component } from './comps/comp1/comp1.component';
import { Comp2Component } from './comps/comp2/comp2.component';

@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Comp2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
