import { Injectable } from '@angular/core';

export interface Categoria {
  id: number;
  nombre: string;
  grupo: string;
  icono: string;
  descripcion: string;
  descripcionLarga: string;
  servicios: number;
}

export interface Diseno {
  id: number;
  categoriaId: number;
  nombre: string;
  descripcion: string;
  precio: number;      // "desde" en pesos
  duracion: string;
  tono: number;        // 1 a 4: color del fondo mientras no haya foto
  imagen?: string;     // opcional: ruta de la foto, por ejemplo 'assets/disenos/bob.jpg'
}

@Injectable({ providedIn: 'root' })
export class CategoriasService {

  // Datos de ejemplo: reemplázalos por la respuesta de tu API
  private categorias: Categoria[] = [
    { id: 1, nombre: 'Corte y peinado', grupo: 'Cabello', icono: 'tijeras', descripcion: 'Cortes, peinados y arreglos', descripcionLarga: 'Renueva tu look con cortes y peinados hechos por estilistas profesionales, desde algo clásico hasta lo más de moda.', servicios: 24 },
    { id: 2, nombre: 'Color y mechas', grupo: 'Cabello', icono: 'gota', descripcion: 'Tintes, balayage y mechas', descripcionLarga: 'Cambia tu color o dale luz a tu cabello con técnicas modernas que cuidan la fibra capilar.', servicios: 18 },
    { id: 3, nombre: 'Tratamientos capilares', grupo: 'Cabello', icono: 'destellos', descripcion: 'Keratina, hidratación y más', descripcionLarga: 'Recupera la salud, el brillo y la suavidad de tu cabello con tratamientos a la medida.', servicios: 12 },
    { id: 4, nombre: 'Manicura', grupo: 'Uñas', icono: 'frasco', descripcion: 'Manicura clásica y en gel', descripcionLarga: 'Manos cuidadas y uñas perfectas, con esmaltados que duran semanas.', servicios: 20 },
    { id: 5, nombre: 'Pedicura', grupo: 'Uñas', icono: 'hoja', descripcion: 'Cuidado y diseño de pies', descripcionLarga: 'Consiente tus pies con cuidado profundo, exfoliación y diseños.', servicios: 14 },
    { id: 6, nombre: 'Uñas acrílicas', grupo: 'Uñas', icono: 'gema', descripcion: 'Acrílico, gel y nail art', descripcionLarga: 'Uñas largas, resistentes y con el diseño que imagines: formas, colores y detalles.', servicios: 16 },
    { id: 7, nombre: 'Maquillaje', grupo: 'Rostro', icono: 'labial', descripcion: 'Social, novia y artístico', descripcionLarga: 'Maquillaje para cada ocasión, hecho por profesionales y pensado para realzar tu belleza natural.', servicios: 15 },
    { id: 8, nombre: 'Limpieza facial', grupo: 'Rostro', icono: 'rostro', descripcion: 'Limpieza profunda e hidratación', descripcionLarga: 'Tratamientos para una piel limpia, luminosa e hidratada, según tu tipo de piel.', servicios: 11 },
    { id: 9, nombre: 'Cejas y pestañas', grupo: 'Rostro', icono: 'ojo', descripcion: 'Diseño, lifting y extensiones', descripcionLarga: 'Enmarca tu mirada con diseño de cejas, lifting y extensiones de pestañas.', servicios: 13 },
    { id: 10, nombre: 'Masajes', grupo: 'Cuerpo', icono: 'corazon', descripcion: 'Relajantes y descontracturantes', descripcionLarga: 'Libera la tensión y recupera tu energía con masajes hechos por terapeutas certificados.', servicios: 9 },
    { id: 11, nombre: 'Depilación', grupo: 'Cuerpo', icono: 'rayo', descripcion: 'Cera, láser y más', descripcionLarga: 'Piel suave por más tiempo con métodos seguros y adaptados a cada zona.', servicios: 10 },
    { id: 12, nombre: 'Spa y relajación', grupo: 'Cuerpo', icono: 'luna', descripcion: 'Paquetes de spa y bienestar', descripcionLarga: 'Date un respiro con paquetes de spa que combinan relajación y cuidado personal.', servicios: 8 }
  ];

  private disenos: Diseno[] = [
    // 1. Corte y peinado
    { id: 1, categoriaId: 1, nombre: 'Corte bob', descripcion: 'Corte limpio y moderno a la altura de la barbilla.', precio: 350, duracion: '45 min', tono: 1 },
    { id: 2, categoriaId: 1, nombre: 'Capas largas', descripcion: 'Movimiento y volumen conservando el largo.', precio: 400, duracion: '1 h', tono: 2 },
    { id: 3, categoriaId: 1, nombre: 'Peinado de fiesta', descripcion: 'Recogidos y ondas para eventos especiales.', precio: 450, duracion: '1 h 15 min', tono: 3 },
    // 2. Color y mechas
    { id: 4, categoriaId: 2, nombre: 'Balayage', descripcion: 'Degradado natural con efecto de luz solar.', precio: 1500, duracion: '3 h', tono: 4 },
    { id: 5, categoriaId: 2, nombre: 'Mechas californianas', descripcion: 'Raíz oscura y puntas claras, muy suaves.', precio: 1300, duracion: '2 h 30 min', tono: 1 },
    { id: 6, categoriaId: 2, nombre: 'Tinte fantasía', descripcion: 'Rosas, azules y tonos vivos para atreverte.', precio: 1800, duracion: '3 h', tono: 2 },
    // 3. Tratamientos capilares
    { id: 7, categoriaId: 3, nombre: 'Keratina', descripcion: 'Alisa, controla el frizz y da brillo.', precio: 1200, duracion: '2 h', tono: 3 },
    { id: 8, categoriaId: 3, nombre: 'Hidratación profunda', descripcion: 'Devuelve suavidad al cabello seco.', precio: 500, duracion: '1 h', tono: 4 },
    { id: 9, categoriaId: 3, nombre: 'Botox capilar', descripcion: 'Repara y rellena la fibra del cabello dañado.', precio: 900, duracion: '1 h 30 min', tono: 1 },
    // 4. Manicura
    { id: 10, categoriaId: 4, nombre: 'Francesa clásica', descripcion: 'Elegante, limpia y atemporal.', precio: 250, duracion: '45 min', tono: 2 },
    { id: 11, categoriaId: 4, nombre: 'Esmaltado en gel', descripcion: 'Color intenso que dura hasta tres semanas.', precio: 300, duracion: '1 h', tono: 3 },
    { id: 12, categoriaId: 4, nombre: 'Nude minimalista', descripcion: 'Tonos neutros para un acabado natural.', precio: 280, duracion: '45 min', tono: 4 },
    // 5. Pedicura
    { id: 13, categoriaId: 5, nombre: 'Pedicura spa', descripcion: 'Exfoliación, masaje y esmaltado.', precio: 350, duracion: '1 h', tono: 1 },
    { id: 14, categoriaId: 5, nombre: 'Pedicura en gel', descripcion: 'Esmaltado duradero y brillante.', precio: 400, duracion: '1 h 10 min', tono: 2 },
    { id: 15, categoriaId: 5, nombre: 'Diseño floral', descripcion: 'Flores pintadas a mano en tus uñas.', precio: 450, duracion: '1 h 15 min', tono: 3 },
    // 6. Uñas acrílicas
    { id: 16, categoriaId: 6, nombre: 'Almendra con brillo', descripcion: 'Forma estilizada con acabado glossy.', precio: 600, duracion: '2 h', tono: 4 },
    { id: 17, categoriaId: 6, nombre: 'Cuadradas largas', descripcion: 'Largo extra con líneas rectas y modernas.', precio: 650, duracion: '2 h 15 min', tono: 1 },
    { id: 18, categoriaId: 6, nombre: 'Nail art con piedras', descripcion: 'Detalles con cristales y piedras.', precio: 750, duracion: '2 h 30 min', tono: 2 },
    // 7. Maquillaje
    { id: 19, categoriaId: 7, nombre: 'Glam de noche', descripcion: 'Ojos marcados y labios intensos.', precio: 700, duracion: '1 h', tono: 3 },
    { id: 20, categoriaId: 7, nombre: 'Natural glow', descripcion: 'Piel luminosa con aspecto fresco.', precio: 550, duracion: '45 min', tono: 4 },
    { id: 21, categoriaId: 7, nombre: 'Maquillaje de novia', descripcion: 'Duradero, elegante y con prueba previa.', precio: 1500, duracion: '1 h 30 min', tono: 1 },
    // 8. Limpieza facial
    { id: 22, categoriaId: 8, nombre: 'Limpieza profunda', descripcion: 'Elimina impurezas y puntos negros.', precio: 500, duracion: '1 h', tono: 2 },
    { id: 23, categoriaId: 8, nombre: 'Hidratación con vitamina C', descripcion: 'Luminosidad y unificación del tono.', precio: 650, duracion: '1 h', tono: 3 },
    { id: 24, categoriaId: 8, nombre: 'Facial antiedad', descripcion: 'Firmeza y suavidad para tu rostro.', precio: 800, duracion: '1 h 15 min', tono: 4 },
    // 9. Cejas y pestañas
    { id: 25, categoriaId: 9, nombre: 'Diseño con henna', descripcion: 'Cejas definidas y de larga duración.', precio: 300, duracion: '45 min', tono: 1 },
    { id: 26, categoriaId: 9, nombre: 'Lifting de pestañas', descripcion: 'Curvatura natural sin extensiones.', precio: 550, duracion: '1 h', tono: 2 },
    { id: 27, categoriaId: 9, nombre: 'Extensiones pelo a pelo', descripcion: 'Mirada más larga y definida.', precio: 700, duracion: '1 h 45 min', tono: 3 },
    // 10. Masajes
    { id: 28, categoriaId: 10, nombre: 'Masaje relajante', descripcion: 'Movimientos suaves para soltar el estrés.', precio: 600, duracion: '1 h', tono: 4 },
    { id: 29, categoriaId: 10, nombre: 'Descontracturante', descripcion: 'Alivia tensión en espalda y cuello.', precio: 700, duracion: '1 h', tono: 1 },
    { id: 30, categoriaId: 10, nombre: 'Piedras calientes', descripcion: 'Calor profundo para relajar los músculos.', precio: 850, duracion: '1 h 15 min', tono: 2 },
    // 11. Depilación
    { id: 31, categoriaId: 11, nombre: 'Cera en piernas', descripcion: 'Piel suave hasta por cuatro semanas.', precio: 400, duracion: '45 min', tono: 3 },
    { id: 32, categoriaId: 11, nombre: 'Axilas y bikini', descripcion: 'Zonas delicadas con cera hipoalergénica.', precio: 350, duracion: '30 min', tono: 4 },
    { id: 33, categoriaId: 11, nombre: 'Láser (sesión)', descripcion: 'Reducción progresiva del vello.', precio: 900, duracion: '40 min', tono: 1 },
    // 12. Spa y relajación
    { id: 34, categoriaId: 12, nombre: 'Día de spa', descripcion: 'Masaje, facial y tiempo para ti.', precio: 1800, duracion: '3 h', tono: 2 },
    { id: 35, categoriaId: 12, nombre: 'Ritual de relajación', descripcion: 'Exfoliación corporal y masaje.', precio: 1200, duracion: '2 h', tono: 3 },
    { id: 36, categoriaId: 12, nombre: 'Aromaterapia', descripcion: 'Aceites esenciales para calmar mente y cuerpo.', precio: 950, duracion: '1 h 30 min', tono: 4 }
  ];

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  getCategoria(id: number): Categoria | undefined {
    return this.categorias.find(c => c.id === id);
  }

  getDisenos(categoriaId: number): Diseno[] {
    return this.disenos.filter(d => d.categoriaId === categoriaId);
  }
}