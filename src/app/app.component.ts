import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  template: `<div>Hello {{value}}. Message from Azure Function: {{message$ | async}}</div>`,
})
export class AppComponent {
  value = 'World';
  message$ = this.appService.getMessage$();

  constructor(private appService: AppService) {
  }
}
