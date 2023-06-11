import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, map, noop, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserId: string | null = null;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.initCurrentUserId();
  }
  login(event: any) {
    if (event.authResult.user) {
      this.router.navigate(['/book-marks/tabs/explore']);
    }
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigateByUrl('/log-in');
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.fireAuth.user.pipe(
      tap((user) => (!!user ? noop() : this.router.navigate(['log-in']))),
      map((user) => !!user)
    );
  }

  private initCurrentUserId() {
    this.fireAuth.user
      .pipe(map((currentUser) => currentUser?.uid))
      .subscribe((currentUser) => (this.currentUserId = currentUser));
  }
  getCurrentUserId(): string | null {
    return this.currentUserId;
  }
}
