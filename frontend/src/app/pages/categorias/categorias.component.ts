import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Categoria, CategoriasService } from '../../services/categorias';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  busqueda = '';
  grupoActivo = 'Todas';

  grupos = ['Todas', 'Cabello', 'Uñas', 'Rostro', 'Cuerpo'];
  categorias: Categoria[];

  constructor(private service: CategoriasService, private router: Router) {
    this.categorias = this.service.getCategorias();
  }

  get filtradas(): Categoria[] {
    const texto = this.normalizar(this.busqueda);
    return this.categorias.filter(c => {
      const coincideGrupo = this.grupoActivo === 'Todas' || c.grupo === this.grupoActivo;
      const coincideTexto =
        !texto ||
        this.normalizar(c.nombre).includes(texto) ||
        this.normalizar(c.descripcion).includes(texto);
      return coincideGrupo && coincideTexto;
    });
  }

  setGrupo(grupo: string): void {
    this.grupoActivo = grupo;
  }

  limpiar(): void {
    this.busqueda = '';
    this.grupoActivo = 'Todas';
  }

  seleccionar(categoria: Categoria): void {
    this.router.navigate(['/categorias', categoria.id]);
  }

  trackById(_: number, c: Categoria): number {
    return c.id;
  }

  private normalizar(texto: string): string {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
}