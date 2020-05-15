import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {Router} from '@angular/router';
import {
  faEye,
  faEyeSlash,
  faFrown,
  faLock,
  faPaperPlane,
  faQuestionCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('password', {static: false}) password;
  @ViewChild('errorContainer', {static: false}) errorContainer;
  visible = false;
  capsOn;
  numLock = true;
  loginForm;
  error = false;
  currentUser;
  messageError = '';
  authUser = {
    username: '',
    password: '',
  };
  faPaperPlane = faPaperPlane;
  faFrown = faFrown;
  faLock = faLock;
  faUser = faUser;
  faQuestionCircle = faQuestionCircle;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  mobileSize: boolean;

  constructor(private authService: AuthService, private router: Router,
              private render: Renderer2) {
  }

  ngOnInit() {
    if(window.innerWidth < 700) this.mobileSize = true;
    if (this.authService.isLogged()) {
      this.router.navigate(['/painel-leitos']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (!this.mobileSize) {
      this.capsOn = event.getModifierState('CapsLock');
      this.numLock = event.getModifierState('NumLock');
    }
      if (event.key == 'Enter') this.login();
  }


  showPass() {
    this.visible = !this.visible;
    this.password.nativeElement = this.visible ? 'text' : 'password';
  }


  showErrors() {
    this.render.removeClass(this.errorContainer.nativeElement, 'valid');
    this.render.addClass(this.errorContainer.nativeElement, 'invalid');
    setTimeout(() => {
      this.render.removeClass(this.errorContainer.nativeElement, 'invalid');
      this.render.addClass(this.errorContainer.nativeElement, 'valid');
    }, 2000);
  }

  login() {
    this.error = false;
    this.authUser.username = this.loginForm.get('username').value;
    this.authUser.password = this.loginForm.get('password').value;
    if (!this.loginForm.invalid) {
      this.authService.authentication(this.authUser).subscribe(res => {
          this.currentUser = res;
          if (res.hasOwnProperty('access_token')) {
            localStorage.setItem('id', res['id']);
            localStorage.setItem('username', res['username']);
            localStorage.setItem('nome', res['nome']);
            localStorage.setItem('roles', res['roles']);
            localStorage.setItem('grupo', res['grupo']);
            localStorage.setItem('token', res['access_token']);
          }
          this.router.navigate(['/painel-leitos']);
        },
        error => {
          this.error = true;
          this.messageError = 'Usuário ou senha inválida!';
          this.showErrors();
        });
    } else {
      this.error = true;
      this.messageError = 'Login e senha em branco';
      this.showErrors();
    }
  }
}
