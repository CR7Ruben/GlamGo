import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'register' = 'login';
  showPassword = false;

  nombre = '';
  email = '';
  password = '';
  remember = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] === 'register' ? 'register' : 'login';
    });
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.showPassword = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.mode === 'login') {
      console.log('Login', { email: this.email, password: this.password });
    } else {
      console.log('Registro', { nombre: this.nombre, email: this.email, password: this.password });
    }
  }
}