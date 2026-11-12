import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
Chart.register(...registerables);

type Seccion = 'dashboard' | 'citas' | 'servicios' | 'feedback' | 'perfil';
type Estado = 'Confirmada' | 'Pendiente' | 'Cancelada';
type FiltroEstado = Estado | 'Todas';

interface Cita {
  id: number;
  cliente: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado: Estado;
}

interface Servicio {
  id: number;
  nombre: string;
  precio: number;
  duracion: number;
  imagen: string | null;
}

@Component({
  selector: 'app-panel-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BaseChartDirective, FeedbackComponent],
  templateUrl: './panel-negocio.component.html',
  styleUrl: './panel-negocio.component.scss'
})
export class PanelNegocioComponent {
  seccion: Seccion = 'dashboard';

  nombreNegocio = 'Barber Zone';
  tipoNegocio = 'Barbería';

  // Perfil del negocio (datos temporales en memoria)
  editandoPerfil = false;
  telefonoNegocio = '';
  direccionNegocio = '';
  descripcionNegocio = '';
  fotoNegocio: string | null = null;
  portadaNegocio: string | null = null;
  mensajePerfil = '';
  errorPerfil = '';

  perfilFormulario = {
    nombre: '',
    tipo: '',
    telefono: '',
    direccion: '',
    descripcion: ''
  };


  // Filtros de citas
  busquedaCitas = '';
  estadoFiltro: FiltroEstado = 'Todas';
  fechaCitas = '';

  // Paginación de listados (5 elementos por página)
  readonly elementosPorPagina = 5;
  paginaCitas = 1;
  paginaServicios = 1;
  paginaActividad = 1;

  get totalPaginasCitas(): number {
    return Math.ceil(this.citasGestion.length / this.elementosPorPagina);
  }

  get citasPaginadas(): Cita[] {
    const pagina = Math.min(this.paginaCitas, Math.max(1, this.totalPaginasCitas));
    return this.citasGestion.slice((pagina - 1) * this.elementosPorPagina, pagina * this.elementosPorPagina);
  }

  get totalPaginasServicios(): number {
    return Math.ceil(this.servicios.length / this.elementosPorPagina);
  }

  get serviciosPaginados(): Servicio[] {
    const pagina = Math.min(this.paginaServicios, Math.max(1, this.totalPaginasServicios));
    return this.servicios.slice((pagina - 1) * this.elementosPorPagina, pagina * this.elementosPorPagina);
  }

  get totalPaginasActividad(): number {
    return Math.ceil(this.citas.length / this.elementosPorPagina);
  }

  get actividadPaginada(): Cita[] {
    const pagina = Math.min(this.paginaActividad, Math.max(1, this.totalPaginasActividad));
    return this.citas.slice((pagina - 1) * this.elementosPorPagina, pagina * this.elementosPorPagina);
  }

  paginas(total: number): number[] {
    return Array.from({ length: total }, (_, indice) => indice + 1);
  }

  cambiarPagina(tipo: 'citas' | 'servicios' | 'actividad', pagina: number): void {
    const total = tipo === 'citas' ? this.totalPaginasCitas
      : tipo === 'servicios' ? this.totalPaginasServicios : this.totalPaginasActividad;
    if (pagina < 1 || pagina > total) return;
    if (tipo === 'citas') this.paginaCitas = pagina;
    else if (tipo === 'servicios') this.paginaServicios = pagina;
    else this.paginaActividad = pagina;
  }

  reiniciarPaginacionCitas(): void {
    this.paginaCitas = 1;
  }

  // Formulario de servicios
  editandoServicioId: number | null = null;
  imagenServicio: string | null = null;
  errorImagen = '';
  nuevoServicio = '';
  nuevoPrecio: number | null = null;
  nuevaDuracion: number | null = 30;

  readonly menu: {
    id: Seccion;
    label: string;
    icono: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icono: '▦' },
    { id: 'citas', label: 'Citas', icono: '◷' },
    { id: 'servicios', label: 'Servicios', icono: '✂' },
    { id: 'feedback', label: 'Feedback', icono: '★' },
    { id: 'perfil', label: 'Mi perfil', icono: '♙' }
  ];

  // Citas de demostración
  citas: Cita[] = [
    {
      id: 1,
      cliente: 'Ana Parras',
      servicio: 'Corte de cabello',
      fecha: '2026-11-13',
      hora: '10:00',
      estado: 'Confirmada'
    },
    {
      id: 2,
      cliente: 'Carlos Méndez',
      servicio: 'Corte y barba',
      fecha: '2026-11-13',
      hora: '15:20',
      estado: 'Pendiente'
    },
    {
      id: 3,
      cliente: 'Lucía Pérez',
      servicio: 'Arreglo de barba',
      fecha: '2026-11-14',
      hora: '16:00',
      estado: 'Pendiente'
    },
    {
      id: 4,
      cliente: 'Luis Ramírez',
      servicio: 'Corte de cabello',
      fecha: '2026-11-14',
      hora: '12:30',
      estado: 'Confirmada'
    }
  ];

  // Servicios de demostración
  servicios: Servicio[] = [
    {
      id: 1,
      nombre: 'Corte de cabello',
      precio: 180,
      duracion: 40,
      imagen: null
    },
    {
      id: 2,
      nombre: 'Arreglo de barba',
      precio: 100,
      duracion: 25,
      imagen: null
    },
    {
      id: 3,
      nombre: 'Corte y barba',
      precio: 250,
      duracion: 60,
      imagen: null
    }
  ];

  readonly meses = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'];
  readonly ingresosMensuales = [
    9600, 12300, 11500, 14800, 16300, 18450
  ];

  // Configuración de las gráficas
  readonly opcionesGrafica: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#907b86' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#907b86' }
      }
    }
  };

  readonly opcionesLinea: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#907b86' }
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0, color: '#907b86' }
      }
    }
  };

  readonly opcionesDona: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 16
        }
      }
    }
  };

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  get inicialesNegocio(): string {
    return this.inicialesCliente(this.nombreNegocio);
  }

  inicialesCliente(nombre: string): string {
    return nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(parte => parte.charAt(0).toUpperCase())
      .join('');
  }

  get tituloSeccion(): string {
    const titulos: Record<Seccion, string> = {
      dashboard: 'Resumen del negocio',
      citas: 'Gestión de citas',
      servicios: 'Mis servicios',
      feedback: 'Opiniones y reseñas',
      perfil: 'Mi perfil'
    };

    return titulos[this.seccion];
  }

  irA(seccion: Seccion): void {
    this.seccion = seccion;
    this.paginaCitas = 1;
    this.paginaServicios = 1;
    this.paginaActividad = 1;
  }

  // ================================
  // GESTIÓN DE CITAS
  // ================================

  get citasGestion(): Cita[] {
    const busqueda = this.busquedaCitas
      .trim()
      .toLocaleLowerCase('es');

    return this.citas
      .filter(cita => {
        const coincideBusqueda =
          !busqueda ||
          cita.cliente.toLocaleLowerCase('es').includes(busqueda) ||
          cita.servicio.toLocaleLowerCase('es').includes(busqueda);

        const coincideEstado =
          this.estadoFiltro === 'Todas' ||
          cita.estado === this.estadoFiltro;

        const coincideFecha =
          !this.fechaCitas ||
          cita.fecha === this.fechaCitas;

        return coincideBusqueda && coincideEstado && coincideFecha;
      })
      .sort((a, b) =>
        `${a.fecha}T${a.hora}`.localeCompare(
          `${b.fecha}T${b.hora}`
        )
      );
  }

  limpiarFiltrosCitas(): void {
    this.busquedaCitas = '';
    this.estadoFiltro = 'Todas';
    this.fechaCitas = '';
    this.paginaCitas = 1;
  }

  cambiarEstado(cita: Cita, estado: Estado): void {
    cita.estado = estado;
    this.paginaCitas = 1;
  }

  get confirmadas(): number {
    return this.citas.filter(c => c.estado === 'Confirmada').length;
  }

  get pendientes(): number {
    return this.citas.filter(c => c.estado === 'Pendiente').length;
  }

  get canceladas(): number {
    return this.citas.filter(c => c.estado === 'Cancelada').length;
  }

  get totalActivas(): number {
    return this.citas.length - this.canceladas;
  }

  get tasaConfirmacion(): number {
    return this.totalActivas
      ? Math.round(this.confirmadas / this.totalActivas * 100)
      : 0;
  }

  precioDeServicio(nombre: string): number | null {
    return this.servicios.find(
      servicio => servicio.nombre === nombre
    )?.precio ?? null;
  }

  duracionDeServicio(nombre: string): number | null {
    return this.servicios.find(
      servicio => servicio.nombre === nombre
    )?.duracion ?? null;
  }

  // ================================
  // DASHBOARD
  // ================================

  get ingresoMesDemo(): number {
    return this.ingresosMensuales.at(-1) ?? 0;
  }

  get ticketPromedioDemo(): number {
    return 215;
  }

  get graficaIngresos(): ChartConfiguration<'bar'>['data'] {
    return {
      labels: this.meses,
      datasets: [{
        data: this.ingresosMensuales,
        backgroundColor: '#d4608a',
        borderRadius: 8,
        maxBarThickness: 42
      }]
    };
  }

  get graficaCitas(): ChartConfiguration<'line'>['data'] {
    const fechas = [
      ...new Set(this.citas.map(c => c.fecha))
    ].sort();

    return {
      labels: fechas.map(fecha => fecha.slice(5)),
      datasets: [{
        data: fechas.map(fecha =>
          this.citas.filter(c =>
            c.fecha === fecha && c.estado !== 'Cancelada'
          ).length
        ),
        borderColor: '#c14b79',
        backgroundColor: 'rgba(212,96,138,.12)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#c14b79',
        pointRadius: 5
      }]
    };
  }

  get graficaServicios(): ChartConfiguration<'doughnut'>['data'] {
    const nombres = [
      ...new Set(
        this.citas
          .filter(c => c.estado !== 'Cancelada')
          .map(c => c.servicio)
      )
    ];

    return {
      labels: nombres,
      datasets: [{
        data: nombres.map(nombre =>
          this.citas.filter(c =>
            c.servicio === nombre &&
            c.estado !== 'Cancelada'
          ).length
        ),
        backgroundColor: [
          '#d4608a',
          '#e4ab71',
          '#a58ad1',
          '#8cc8b2',
          '#92a9d9'
        ],
        borderWidth: 0
      }]
    };
  }

  // ================================
  // GESTIÓN DE SERVICIOS
  // ================================

  agregarServicio(): void {
    const nombre = this.nuevoServicio.trim();
    const precio = Number(this.nuevoPrecio);
    const duracion = Number(this.nuevaDuracion);

    if (
      !nombre ||
      this.nuevoPrecio === null ||
      this.nuevaDuracion === null ||
      !Number.isFinite(precio) ||
      !Number.isFinite(duracion) ||
      precio <= 0 ||
      duracion <= 0
    ) {
      return;
    }

    if (this.editandoServicioId !== null) {
      const servicio = this.servicios.find(
        s => s.id === this.editandoServicioId
      );

      if (!servicio) return;

      servicio.nombre = nombre;
      servicio.precio = precio;
      servicio.duracion = duracion;
      servicio.imagen = this.imagenServicio;
    } else {
      this.servicios.push({
        id: Math.max(0, ...this.servicios.map(s => s.id)) + 1,
        nombre,
        precio,
        duracion,
        imagen: this.imagenServicio
      });
    }

    this.cancelarEdicion();
  }

  editarServicio(servicio: Servicio): void {
    this.editandoServicioId = servicio.id;
    this.nuevoServicio = servicio.nombre;
    this.nuevoPrecio = servicio.precio;
    this.nuevaDuracion = servicio.duracion;
    this.imagenServicio = servicio.imagen;
    this.errorImagen = '';

    document.getElementById('formulario-servicios')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  subirImagenServicio(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) return;

    this.errorImagen = '';

    const formatosPermitidos = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!formatosPermitidos.includes(archivo.type)) {
      this.errorImagen = 'Solo se permiten imágenes JPG, PNG o WEBP.';
      input.value = '';
      return;
    }

    if (archivo.size > 2 * 1024 * 1024) {
      this.errorImagen = 'La imagen debe pesar máximo 2 MB.';
      input.value = '';
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      this.imagenServicio = lector.result as string;
    };

    lector.onerror = () => {
      this.errorImagen = 'No se pudo leer la imagen.';
    };

    lector.readAsDataURL(archivo);
    input.value = '';
  }

  quitarImagenServicio(): void {
    this.imagenServicio = null;
  }

  cancelarEdicion(): void {
    this.editandoServicioId = null;
    this.nuevoServicio = '';
    this.nuevoPrecio = null;
    this.nuevaDuracion = 30;
    this.imagenServicio = null;
    this.errorImagen = '';
  }

  eliminarServicio(id: number): void {
    if (this.editandoServicioId === id) {
      this.cancelarEdicion();
    }

    this.servicios = this.servicios.filter(
      servicio => servicio.id !== id
    );
    this.paginaServicios = Math.min(this.paginaServicios, Math.max(1, this.totalPaginasServicios));
  }

  // ================================
  // PERFIL DEL NEGOCIO
  // ================================

  editarPerfil(): void {
    this.perfilFormulario = {
      nombre: this.nombreNegocio,
      tipo: this.tipoNegocio,
      telefono: this.telefonoNegocio,
      direccion: this.direccionNegocio,
      descripcion: this.descripcionNegocio
    };
    this.errorPerfil = '';
    this.mensajePerfil = '';
    this.editandoPerfil = true;
  }

  guardarPerfil(): void {
    const nombre = this.perfilFormulario.nombre.trim();
    const tipo = this.perfilFormulario.tipo.trim();
    if (!nombre || !tipo) {
      this.errorPerfil = 'El nombre y la categoría son obligatorios.';
      return;
    }

    this.nombreNegocio = nombre;
    this.tipoNegocio = tipo;
    this.telefonoNegocio = this.perfilFormulario.telefono.trim();
    this.direccionNegocio = this.perfilFormulario.direccion.trim();
    this.descripcionNegocio = this.perfilFormulario.descripcion.trim();
    this.editandoPerfil = false;
    this.errorPerfil = '';
    this.mensajePerfil = 'Información del negocio actualizada correctamente.';
  }

  cancelarEdicionPerfil(): void {
    this.editandoPerfil = false;
    this.errorPerfil = '';
  }

  cambiarImagenPerfil(event: Event, tipo: 'foto' | 'portada'): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;
    this.errorPerfil = '';
    this.mensajePerfil = '';

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(archivo.type)) {
      this.errorPerfil = 'Solo se permiten imágenes JPG, PNG o WEBP.';
      input.value = '';
      return;
    }
    if (archivo.size > 2 * 1024 * 1024) {
      this.errorPerfil = 'La imagen no puede superar los 2 MB.';
      input.value = '';
      return;
    }

    const lector = new FileReader();
    lector.onload = () => {
      if (typeof lector.result !== 'string') return;
      if (tipo === 'foto') {
        this.fotoNegocio = lector.result;
      } else {
        this.portadaNegocio = lector.result;
      }
      this.mensajePerfil = 'Imagen actualizada correctamente.';
    };
    lector.onerror = () => {
      this.errorPerfil = 'No se pudo leer la imagen.';
    };
    lector.readAsDataURL(archivo);
    input.value = '';
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}