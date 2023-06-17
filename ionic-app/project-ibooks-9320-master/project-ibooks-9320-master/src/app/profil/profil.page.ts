import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit, OnDestroy {
  user: { userName: string; userPhoto: string; userEmail: string };
  destroy = new Subject<void>();
  constructor(public authData: AuthService) {}

  ngOnInit() {
    this.authData
      .getUserInformation()
      .pipe(takeUntil(this.destroy))
      .subscribe((userData) => {
        this.user = userData;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
