import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginForm.valid)  return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify((response as any).data.user));
        localStorage.setItem('token', (response as any).data.token);
        this.router.navigate(['/']);
      },
      error: (err) => {console.log(err)}
    });
  }

}
