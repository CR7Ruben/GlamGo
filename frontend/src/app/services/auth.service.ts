import { Injectable } from '@angular/core';

export interface Usuario {
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'glamgo_usuario';

  get usuario(): Usuario | null {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? (JSON.parse(raw) as Usuario) : null;
    } catch {
      return null;
    }
  }

  get estaLogueado(): boolean {
    return this.usuario !== null;
  }

  /** Login simulado. Luego se reemplaza por la llamada a tu API (JWT). */
  login(email: string, nombre?: string): void {
    const usuario: Usuario = {
      nombre: nombre?.trim() || this.nombreDesdeCorreo(email),
      email: email.trim()
    };
    try {
      localStorage.setItem(this.KEY, JSON.stringify(usuario));
    } catch {
      /* sin almacenamiento disponible */
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(this.KEY);
    } catch {
      /* nada */
    }
  }

  private nombreDesdeCorreo(email: string): string {
    const base = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
    return base
      .split(' ')
      .filter(Boolean)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ') || 'Cliente';
  }
}