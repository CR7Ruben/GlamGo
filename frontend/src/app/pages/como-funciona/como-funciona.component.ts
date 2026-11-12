import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

interface Paso {
  icono: 'buscar' | 'comparar' | 'reservar' | 'resenas';
  titulo: string;
  texto: string;
}

interface Pregunta {
  pregunta: string;
  respuesta: string;
}

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './como-funciona.component.html',
  styleUrl: './como-funciona.component.scss'
})
export class ComoFuncionaComponent {
  abierta: number | null = 0;

  pasos: Paso[] = [
    {
      icono: 'buscar',
      titulo: 'Busca por categoría',
      texto: 'Explora cabello, uñas, rostro y cuerpo para encontrar el servicio que quieres.'
    },
    {
      icono: 'comparar',
      titulo: 'Compara servicios',
      texto: 'Revisa diseños, precios y duración para elegir el que mejor va contigo.'
    },
    {
      icono: 'reservar',
      titulo: 'Reserva tu cita',
      texto: 'Escoge el día y la hora, y confirma tu reservación en unos cuantos clics.'
    },
    {
      icono: 'resenas',
      titulo: 'Lee reseñas',
      texto: 'Conoce la opinión de otras clientas para decidir con confianza.'
    }
  ];

  // Textos de ejemplo: cámbialos por los reales de tu proyecto
  preguntas: Pregunta[] = [
    {
      pregunta: '¿Necesito una cuenta para reservar?',
      respuesta: 'Sí. Crear tu cuenta es gratis y te permite reservar, ver tus citas y administrarlas desde un solo lugar.'
    },
    {
      pregunta: '¿Cuánto cuesta usar GlamGo?',
      respuesta: 'Usar la plataforma no tiene costo para ti. Solo pagas el servicio que reservas.'
    },
    {
      pregunta: '¿Puedo cancelar o cambiar mi cita?',
      respuesta: 'Sí, puedes hacerlo desde tu cuenta. Revisa la anticipación que pide cada profesional.'
    },
    {
      pregunta: '¿Cómo sé que el servicio es bueno?',
      respuesta: 'Cada servicio cuenta con reseñas de otras clientas, para que elijas con información real.'
    }
  ];

  toggle(indice: number): void {
    this.abierta = this.abierta === indice ? null : indice;
  }
}