import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Categoria, CategoriasService, Diseno } from '../../services/categorias';

@Component({
  selector: 'app-categoria-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './categoria-detalle.component.html',
  styleUrl: './categoria-detalle.component.scss'
})
export class CategoriaDetalleComponent implements OnInit {
  categoria?: Categoria;
  disenos: Diseno[] = [];
  noEncontrada = false;

  constructor(private route: ActivatedRoute, private service: CategoriasService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.categoria = this.service.getCategoria(id);
      this.disenos = this.categoria ? this.service.getDisenos(id) : [];
      this.noEncontrada = !this.categoria;
    });
  }

  reservar(diseno: Diseno): void {
    // Aquí después irá el flujo de reservación
    console.log('Reservar', diseno);
  }

  trackById(_: number, d: Diseno): number {
    return d.id;
  }
}