import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('Anda Telah melakukan Logout', {
      cssClass: 'alert-info',
      timeout: 3000,
    });
    this.router.navigate(['/login']);
    return false;
  }
}
