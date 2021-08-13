import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  user: any;
  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.user = profile.user;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
