import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Seccion {
  titulo: string;
  parrafos: string[];
}

interface Documento {
  titulo: string;
  secciones: Seccion[];
}

const ACTUALIZADO = '20 de noviembre de 2026';
const CONTACTO = '[correo de contacto]'; // cámbialo por el correo real del proyecto

const TERMINOS: Documento = {
  titulo: 'Términos de uso',
  secciones: [
    {
      titulo: '1. Aceptación',
      parrafos: [
        'Al crear una cuenta o usar GlamGo aceptas estos términos. Si no estás de acuerdo, no uses la plataforma.'
      ]
    },
    {
      titulo: '2. Qué es GlamGo',
      parrafos: [
        'GlamGo es una plataforma que conecta a negocios de belleza con sus clientas. Los negocios administran su perfil, servicios y citas desde la web, y las clientas reservan desde la app móvil.',
        'GlamGo no presta los servicios de belleza. Cada negocio es responsable de los servicios que ofrece, de sus precios y de su atención.'
      ]
    },
    {
      titulo: '3. Tu cuenta',
      parrafos: [
        'Debes dar información verdadera y mantenerla actualizada. Eres responsable de la actividad que ocurra con tu cuenta, por lo que debes cuidar tu contraseña y no compartirla.'
      ]
    },
    {
      titulo: '4. Uso para negocios',
      parrafos: [
        'Si registras un negocio, te comprometes a publicar servicios, precios, horarios y fotografías reales, y a atender las citas que confirmes.',
        'Puedes confirmar o cancelar citas desde tu panel. Cancelar con frecuencia puede afectar tu reputación en la plataforma.'
      ]
    },
    {
      titulo: '5. Citas y cancelaciones',
      parrafos: [
        'Una cita queda reservada cuando el negocio la confirma. Las políticas de cancelación, retrasos y reembolsos las define cada negocio.'
      ]
    },
    {
      titulo: '6. Pagos',
      parrafos: [
        'Los pagos en línea los procesa un proveedor externo. GlamGo no guarda números de tarjeta ni datos bancarios; solo conserva la referencia del pago.'
      ]
    },
    {
      titulo: '7. Reseñas y contenido',
      parrafos: [
        'Las reseñas deben basarse en una cita realmente completada y ser respetuosas. Los negocios pueden responderlas.',
        'Nos reservamos el derecho de retirar contenido ofensivo, falso o que viole estos términos.'
      ]
    },
    {
      titulo: '8. Conductas no permitidas',
      parrafos: [
        'No está permitido suplantar a otras personas, publicar contenido ilegal u ofensivo, intentar acceder a cuentas ajenas o alterar el funcionamiento de la plataforma.'
      ]
    },
    {
      titulo: '9. Limitación de responsabilidad',
      parrafos: [
        'GlamGo se ofrece tal como está y puede tener interrupciones. No somos responsables por la calidad de los servicios prestados por los negocios ni por acuerdos entre negocios y clientas.'
      ]
    },
    {
      titulo: '10. Cambios a estos términos',
      parrafos: [
        'Podemos actualizar estos términos. Si hay cambios importantes, lo avisaremos en la plataforma. Seguir usando GlamGo implica que aceptas la nueva versión.'
      ]
    },
    {
      titulo: '11. Contacto',
      parrafos: [`Para dudas sobre estos términos, escríbenos a ${CONTACTO}.`]
    }
  ]
};

const PRIVACIDAD: Documento = {
  titulo: 'Política de privacidad',
  secciones: [
    {
      titulo: '1. Responsable',
      parrafos: [
        'GlamGo es responsable del tratamiento de tus datos personales conforme a este aviso.'
      ]
    },
    {
      titulo: '2. Datos que recopilamos',
      parrafos: [
        'Datos de cuenta: nombre, correo electrónico, teléfono (opcional) y contraseña, que se guarda cifrada.',
        'Datos de negocio: nombre comercial, descripción, dirección, ubicación, fotografías, horarios y servicios.',
        'Datos de uso: citas, reseñas, favoritos y notificaciones.',
        'Datos del dispositivo: un identificador para enviarte notificaciones en la app móvil, y tu ubicación aproximada si la autorizas, para mostrarte negocios cercanos.'
      ]
    },
    {
      titulo: '3. Para qué usamos tus datos',
      parrafos: [
        'Para crear y proteger tu cuenta, gestionar citas, mostrar negocios y servicios, enviarte recordatorios y avisos sobre tus citas, y mejorar la plataforma.'
      ]
    },
    {
      titulo: '4. Con quién los compartimos',
      parrafos: [
        'Al reservar una cita, el negocio recibe tu nombre y los datos necesarios para atenderte. Los pagos se procesan con un proveedor externo, y las notificaciones con un servicio de mensajería push.',
        'No vendemos tus datos personales.'
      ]
    },
    {
      titulo: '5. Seguridad',
      parrafos: [
        'Usamos medidas razonables para protegerlos: contraseñas cifradas, sesiones con token y conexión segura. Ningún sistema es completamente infalible, por lo que te recomendamos usar una contraseña única.'
      ]
    },
    {
      titulo: '6. Tus derechos',
      parrafos: [
        'Puedes solicitar el acceso, rectificación o cancelación de tus datos, y oponerte a su uso (derechos ARCO). También puedes pedir que eliminemos tu cuenta.',
        `Para ejercerlos, escríbenos a ${CONTACTO}.`
      ]
    },
    {
      titulo: '7. Conservación',
      parrafos: [
        'Conservamos tus datos mientras tengas una cuenta activa. Al eliminarla, borramos o anonimizamos tu información, salvo la que debamos guardar por obligación legal.'
      ]
    },
    {
      titulo: '8. Almacenamiento en tu navegador',
      parrafos: [
        'La web guarda en tu navegador los datos necesarios para mantener tu sesión iniciada. Puedes borrarlos al cerrar sesión o limpiando los datos del sitio.'
      ]
    },
    {
      titulo: '9. Cambios a esta política',
      parrafos: [
        'Podemos actualizar esta política y publicaremos la nueva versión en esta página, con su fecha de actualización.'
      ]
    }
  ]
};

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent implements OnInit {
  documento: Documento = TERMINOS;
  actualizado = ACTUALIZADO;
  otro: { texto: string; ruta: string } = { texto: 'Política de privacidad', ruta: '/privacidad' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const esPrivacidad = data['tipo'] === 'privacidad';
      this.documento = esPrivacidad ? PRIVACIDAD : TERMINOS;
      this.otro = esPrivacidad
        ? { texto: 'Términos de uso', ruta: '/terminos' }
        : { texto: 'Política de privacidad', ruta: '/privacidad' };
      window.scrollTo({ top: 0 });
    });
  }
}