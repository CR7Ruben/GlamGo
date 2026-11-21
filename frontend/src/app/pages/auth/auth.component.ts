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

  /** Reglas de la contraseña (solo se exigen al crear cuenta). */
  private readonly reglas: { texto: string; cumple: (p: string) => boolean }[] = [
    { texto: 'De 6 a 20 caracteres', cumple: p => p.length >= 6 && p.length <= 20 },
    { texto: 'Una mayúscula',        cumple: p => /\p{Lu}/u.test(p) },
    { texto: 'Una minúscula',        cumple: p => /\p{Ll}/u.test(p) },
    { texto: 'Un número',            cumple: p => /\d/.test(p) },
    { texto: 'Un carácter especial', cumple: p => /[^\p{L}\d\s]/u.test(p) }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  /** Estado de cada regla según lo que se va escribiendo. */
  get reglasPassword(): { texto: string; ok: boolean }[] {
    return this.reglas.map(r => ({ texto: r.texto, ok: r.cumple(this.password) }));
  }

  get reglasCumplidas(): number {
    return this.reglasPassword.filter(r => r.ok).length;
  }

  get passwordValida(): boolean {
    return this.reglas.every(r => r.cumple(this.password));
  }

  ngOnInit(): void {
    // Permitir abrir login o registro aunque exista una sesión
    this.route.queryParams.subscribe(params => {
      this.aplicarModo(params['mode'] === 'register' ? 'register' : 'login');
    });
  }

  setMode(mode: 'login' | 'register'): void {
    this.aplicarModo(mode);
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

    if (this.mode === 'register' && !this.passwordValida) {
      this.error = 'La contraseña no cumple con todos los requisitos.';
      return;
    }

    // Autenticación simulada
    this.auth.login(
      this.email,
      this.mode === 'register' ? this.nombre : undefined,
      this.mode === 'login' && this.remember
    );

    // Redirigir al panel del negocio
    this.router.navigate(['/panel-negocio']);
  }

  /** Ajusta el formulario según la pestaña. El correo recordado solo se usa en el login. */
  private aplicarModo(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.showPassword = false;
    this.error = '';

    const recordado = this.auth.emailRecordado;

    if (mode === 'login') {
      if (!this.email.trim()) {
        this.email = recordado;
      }
      this.remember = recordado !== '';
    } else {
      if (this.email === recordado) {
        this.email = '';          // no mostrar el correo recordado al registrarse
      }
      this.remember = false;
    }
  }
}