// Datos editables de la landing. Ajusta los PLACEHOLDER antes de publicar.
export const site = {
  name: 'AutoNexus',
  url: 'https://autonexus.mx', // PLACEHOLDER
  whatsapp: '525574989093', // PLACEHOLDER: código país + número, sin +
  email: 'hola@autonexus.mx', // PLACEHOLDER
  // Si defines un endpoint (p. ej. Formspree), el formulario hará POST ahí además de abrir WhatsApp.
  formEndpoint: '',
  title: 'AutoNexus | Software para taller mecánico con seguimiento en tiempo real',
  description:
    'Sistema para talleres mecánicos: órdenes de servicio, inspección con fotos, presupuestos aprobados por el cliente y seguimiento del vehículo en tiempo real. Evita reclamos y mejora la comunicación. Solicita tu demo.',
};

export const waLink = (text = 'Hola, quiero una demo de AutoNexus para mi taller.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const estados = [
  { n: 'Recibido', d: 'Inspección de ingreso con fotos, gasolina y accesorios.' },
  { n: 'Diagnóstico', d: 'El mecánico documenta fallas con evidencia.' },
  { n: 'Esperando aprobación', d: 'Presupuesto enviado al cliente.' },
  { n: 'Presupuesto aprobado', d: 'El cliente autoriza desde su celular.' },
  { n: 'Esperando refacciones', d: 'El cliente sabe por qué se retrasa.' },
  { n: 'En reparación', d: 'Fotos y videos del avance.' },
  { n: 'Control de calidad', d: 'Revisión final antes de entregar.' },
  { n: 'Listo', d: 'Notificación push: “Tu auto está listo”.' },
  { n: 'Entregado', d: 'Evidencia de entrega y historial cerrado.' },
];

export const planes = [
  {
    nombre: 'Básico',
    precio: 1299, // PLACEHOLDER MXN/mes
    desc: 'Para talleres que inician su digitalización.',
    destacado: false,
    items: ['1 sucursal', 'Hasta 3 usuarios', 'Órdenes y presupuestos ilimitados', 'Portal y tracking para clientes', 'Notificaciones push', 'Soporte por WhatsApp'],
  },
  {
    nombre: 'Profesional',
    precio: 2199, // PLACEHOLDER
    desc: 'El favorito de talleres en crecimiento.',
    destacado: true,
    items: ['1 sucursal', 'Hasta 10 usuarios', 'Todo lo de Básico', 'Evidencias foto y video', 'Chat por orden con el cliente', 'Panel de métricas del dueño', 'Soporte prioritario'],
  },
  {
    nombre: 'Multisucursal',
    precio: 4599, // PLACEHOLDER
    desc: 'Para cadenas y grupos de talleres.',
    destacado: false,
    items: ['Sucursales múltiples', 'Usuarios ilimitados', 'Todo lo de Profesional', 'Cuenta única, datos aislados por taller', 'Onboarding y migración asistida', 'Gerente de cuenta dedicado'],
  },
];

export const faqs = [
  {
    q: '¿Qué es AutoNexus?',
    a: 'AutoNexus es un sistema en la nube para talleres mecánicos. Incluye una app para el taller (órdenes, inspecciones, presupuestos, evidencias) y una app para tus clientes, que ven en tiempo real el estatus de su vehículo.',
  },
  {
    q: '¿Mis clientes necesitan descargar una app?',
    a: 'No. Son PWA: se abren desde el navegador y se pueden instalar en el celular con un toque. Además, pueden consultar su orden con solo un enlace de seguimiento, sin crear cuenta.',
  },
  {
    q: '¿Cómo evita reclamos y disputas?',
    a: 'Cada ingreso queda con inspección fotográfica (nivel de gasolina, accesorios, carrocería) confirmada por el cliente. Las evidencias de cada etapa se bloquean al avanzar y los presupuestos solo se autorizan con la aprobación del cliente, quedando todo en el historial.',
  },
  {
    q: '¿Funciona sin internet?',
    a: 'La app del taller es instalable y mantiene en caché órdenes y clientes para consultarlos si se cae la conexión. Los cambios en tiempo real requieren conexión.',
  },
  {
    q: '¿Cómo me notifica el sistema?',
    a: 'Con notificaciones push al celular del cliente cuando cambia el estatus, se agrega un diagnóstico, cambia la fecha de entrega, hay un presupuesto por aprobar o llega un mensaje nuevo.',
  },
  {
    q: '¿Qué tan seguros están mis datos?',
    a: 'Cada taller tiene sus datos aislados, acceso por roles (dueño, administrador, recepción y mecánico), sesiones con tokens seguros, archivos en almacenamiento en la nube con URLs firmadas y protección contra abuso.',
  },
  {
    q: '¿Puedo usarlo en varias sucursales?',
    a: 'Sí. Una cuenta puede agrupar varias sucursales, cada una con su equipo y datos separados. Un mismo cliente ve todos sus vehículos y órdenes con un solo acceso.',
  },
  {
    q: '¿Cuánto tarda la puesta en marcha?',
    a: 'Creamos tu taller y tu usuario administrador, invitas a tu equipo y a tus clientes por correo, y puedes registrar tu primera orden el mismo día.',
  },
];
