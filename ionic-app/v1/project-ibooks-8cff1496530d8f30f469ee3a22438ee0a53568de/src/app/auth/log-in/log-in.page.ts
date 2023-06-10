import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {
  constructor(private authService: AuthService) {}

  onLogIn(event: any) {
    this.authService.login(event);
  }
}
