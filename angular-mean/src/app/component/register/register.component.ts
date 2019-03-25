import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }
  register() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('fill all fields!', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email!', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }
    this.authService.registerUser(user).subscribe((data: any) => {
      // console.log(data.success)
      if (data.success == true) {
        this.flashMessage.show('Successful!', { cssClass: 'alert-success', timeout: 1000 });
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show('Error, Try again!', { cssClass: 'alert-danger', timeout: 1000 });
      }
    })
  }

}
