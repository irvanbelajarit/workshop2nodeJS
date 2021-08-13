import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;
  email: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    //console.log(123);

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };
    if (!this.validateService.validateRegister(user)) {
      // console.log('isi semua field');
      this.flashMessage.show('isi semua fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });

      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      // console.log('email tidak valid');
      this.flashMessage.show('email tidak valid', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    //register user
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show('Data Tersimpan Silahkan Login', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Data error tidak tersimpan', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/register']);
      }
    });

    return true;
  }
}
