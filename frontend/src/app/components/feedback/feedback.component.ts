
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ResenaGlamGo {
  id: number;
  negocioId: string;
  cliente: string;
  servicio: string;
  calificacion: number;
  comentario: string;
  fecha: string;
  respuesta: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit, OnChanges {

  @Input() modo: 'cliente' | 'negocio' = 'negocio';
  @Input() negocioId = 'demo';
  @Input() nombreNegocio = 'Mi negocio';
  @Input() clienteActual = 'Cliente';
  @Input() servicioActual = 'Servicio recibido';

  private readonly platformId = inject(PLATFORM_ID);

  private get storageKey(): string {
    return `glamgo-feedback-${this.negocioId}`;
  }

  // RESEÑAS

  resenas: ResenaGlamGo[] = [];

  // FILTROS

  filtro = 'Todas';
  busqueda = '';

  // PAGINACIÓN

  paginaActual = 1;
  readonly porPagina = 5;

  // FORMULARIO DEL CLIENTE

  calificacionNueva = 5;
  comentarioNuevo = '';

  // MENSAJES

  mensaje = '';
  error = '';

  // RESPUESTAS DEL NEGOCIO

  editandoRespuestaId: number | null = null;
  textoRespuesta = '';

  ngOnInit(): void {
    this.cargar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['negocioId'] &&
      !changes['negocioId'].firstChange
    ) {
      this.cargar();
    }
  }

  // ==================================
  // ALMACENAMIENTO LOCAL
  // ==================================

  private cargar(): void {
    this.resenas = [];

    if (isPlatformBrowser(this.platformId)) {
      try {
        const guardadas = JSON.parse(
          localStorage.getItem(this.storageKey) || '[]'
        );

        if (Array.isArray(guardadas)) {
          this.resenas = guardadas;
        }
      } catch {
        this.resenas = [];
      }
    }

    this.paginaActual = 1;
  }

  private guardar(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.resenas)
      );
    } catch {
      this.error = 'No se pudo guardar en este navegador.';
    }
  }

  // ==================================
  // ESTADÍSTICAS
  // ==================================

  get promedio(): number {
    if (this.resenas.length === 0) {
      return 0;
    }

    const suma = this.resenas.reduce(
      (total, resena) => total + resena.calificacion,
      0
    );

    return suma / this.resenas.length;
  }

  get sinResponder(): number {
    return this.resenas.filter(
      resena => !resena.respuesta
    ).length;
  }

  // ==================================
  // FILTROS Y BÚSQUEDA
  // ==================================

  get filtradas(): ResenaGlamGo[] {
    const texto = this.busqueda
      .trim()
      .toLocaleLowerCase('es');

    return this.resenas.filter(resena => {

      const coincideCalificacion =
        this.filtro === 'Todas' ||
        resena.calificacion === Number(this.filtro);

      const contenido = `
        ${resena.cliente}
        ${resena.servicio}
        ${resena.comentario}
      `.toLocaleLowerCase('es');

      const coincideBusqueda =
        !texto || contenido.includes(texto);

      return coincideCalificacion && coincideBusqueda;
    });
  }

  // ==================================
  // PAGINACIÓN
  // ==================================

  get totalPaginas(): number {
    return Math.ceil(
      this.filtradas.length / this.porPagina
    );
  }

  get paginadas(): ResenaGlamGo[] {
    const pagina = Math.min(
      this.paginaActual,
      Math.max(this.totalPaginas, 1)
    );

    const inicio = (pagina - 1) * this.porPagina;
    const fin = inicio + this.porPagina;

    return this.filtradas.slice(inicio, fin);
  }

  get paginas(): number[] {
    return Array.from(
      { length: this.totalPaginas },
      (_, indice) => indice + 1
    );
  }

  get inicioResultados(): number {
    if (this.filtradas.length === 0) {
      return 0;
    }

    return (this.paginaActual - 1) * this.porPagina + 1;
  }

  get finResultados(): number {
    return Math.min(
      this.paginaActual * this.porPagina,
      this.filtradas.length
    );
  }

  cambiarPagina(pagina: number): void {
    if (
      pagina < 1 ||
      pagina > this.totalPaginas
    ) {
      return;
    }

    this.paginaActual = pagina;
    this.cancelarRespuesta();
  }

  reiniciarPagina(): void {
    this.paginaActual = 1;
    this.cancelarRespuesta();
  }

  // ==================================
  // PUBLICAR RESEÑA
  // ==================================

  publicarResena(): void {
    this.error = '';
    this.mensaje = '';

    const comentario = this.comentarioNuevo.trim();

    if (comentario.length < 10) {
      this.error =
        'Escribe un comentario de al menos 10 caracteres.';
      return;
    }

    if (comentario.length > 1000) {
      this.error =
        'El comentario no puede superar 1000 caracteres.';
      return;
    }

    if (
      this.calificacionNueva < 1 ||
      this.calificacionNueva > 5
    ) {
      this.error = 'Selecciona una calificación válida.';
      return;
    }

    const nuevaResena: ResenaGlamGo = {
      id: Date.now(),
      negocioId: this.negocioId,
      cliente: this.clienteActual,
      servicio: this.servicioActual,
      calificacion: this.calificacionNueva,
      comentario,
      fecha: new Date().toISOString(),
      respuesta: ''
    };

    this.resenas = [
      nuevaResena,
      ...this.resenas
    ];

    this.guardar();

    this.comentarioNuevo = '';
    this.calificacionNueva = 5;

    if (!this.error) {
      this.mensaje = 'Tu reseña se publicó correctamente.';
    }

    this.reiniciarPagina();
  }

  // ==================================
  // RESPONDER RESEÑAS
  // ==================================

  responder(resena: ResenaGlamGo): void {
    this.editandoRespuestaId = resena.id;
    this.textoRespuesta = resena.respuesta || '';

    this.error = '';
    this.mensaje = '';
  }

  cancelarRespuesta(): void {
    this.editandoRespuestaId = null;
    this.textoRespuesta = '';
  }

  guardarRespuesta(resena: ResenaGlamGo): void {
    this.error = '';
    this.mensaje = '';

    const texto = this.textoRespuesta.trim();

    if (!texto) {
      this.error =
        'Escribe una respuesta antes de guardar.';
      return;
    }

    if (texto.length > 1000) {
      this.error =
        'La respuesta no puede superar 1000 caracteres.';
      return;
    }

    this.resenas = this.resenas.map(r =>
      r.id === resena.id
        ? { ...r, respuesta: texto }
        : r
    );

    this.guardar();
    this.cancelarRespuesta();

    if (!this.error) {
      this.mensaje =
        'Respuesta guardada correctamente.';
    }
  }
}
