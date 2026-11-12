import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  error = '';

  nombre = '';
  email = '';
  password = '';
  remember = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Permitir abrir login o registro aunque exista una sesión
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] === 'register'
        ? 'register'
        : 'login';

      this.error = '';
    });
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.showPassword = false;
    this.error = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.error = '';

    if (this.mode === 'register' && !this.nombre.trim()) {
      this.error = 'Escribe tu nombre.';
      return;
    }

    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Escribe tu correo y contraseña.';
      return;
    }

    // Autenticación simulada
    this.auth.login(
      this.email,
      this.mode === 'register' ? this.nombre : undefined
    );

    // Redirigir al panel del negocio
    this.router.navigate(['/panel-negocio']);
  }
}