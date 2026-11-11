import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly links: NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Categorías', path: '/categorias' },
    { label: '¿Cómo funciona?', path: '/como-funciona' }
  ];

  constructor(private router: Router) {}

  /** Todos los enlaces menos el de la página actual */
  get visibleLinks(): NavLink[] {
    const current = this.router.url.split(/[?#]/)[0] || '/';
    return this.links.filter(link => link.path !== current);
  }
}