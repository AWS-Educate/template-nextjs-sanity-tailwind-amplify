import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visita Monástica Bogotá 2024 | SRF Bogotá',
  description:
    'Programación completa de la Visita Monástica Bogotá 2024, del 21 al 24 de marzo. Conferencias, meditaciones guiadas, Iniciación Kriya Yoga y más.',
}

// Figma asset URLs — válidos por 7 días. Reemplazar con assets permanentes en Sanity.
const IMG_HERO = 'https://www.figma.com/api/mcp/asset/ff4f3254-0a6e-4e76-bd3e-ff93ee905631'
const IMG_CONFERENCIA = 'https://www.figma.com/api/mcp/asset/87659eb1-4e1d-49cf-bb44-705123099a13'
const IMG_PROGRAMA = 'https://www.figma.com/api/mcp/asset/6e5d6c3c-2d31-44b3-bde7-368db436cd3a'
const IMG_TESTIMONIAL = 'https://www.figma.com/api/mcp/asset/f9f1199c-62bf-4e73-89f3-64cea184d3fa'

interface EventData {
  title: string
  date: string
  descripcion?: string
  condiciones?: string
  links?: string
  buttonText?: string
  buttonHref?: string
}

function EventCard({ event }: { event: EventData }) {
  return (
    <div className="flex flex-col gap-4">
      {/* H2 Eventos token → olive #696c0e (event titles use Display sm/Semibold en Figma) */}
      <h3 className="text-xl font-bold leading-snug" style={{ color: 'var(--h2-eventos)', fontFamily: 'var(--font-sans)' }}>
        {event.title}
      </h3>
      {/* H3 Eventos token → orange #de6b2f */}
      <p className="font-bold text-base" style={{ color: 'var(--h3-eventos)' }}>{event.date}</p>
      {event.descripcion && (
        <p className="text-neutral-900 text-sm leading-relaxed">
          <strong>Descripción:</strong>&nbsp;{event.descripcion}
        </p>
      )}
      {event.condiciones && (
        <p className="text-neutral-900 text-sm leading-relaxed">
          <strong>Condiciones:</strong> {event.condiciones}
        </p>
      )}
      <p className="text-neutral-900 text-sm leading-relaxed">
        <strong>Links de interés:</strong>
        {event.links ? ' ' + event.links : ''}
      </p>
      {event.buttonText && (
        <div className="mt-2">
          <a
            href={event.buttonHref ?? '#inscripcion'}
            className="inline-block px-5 py-3 rounded-lg font-semibold text-sm bg-secondary-500 hover:bg-secondary-600 transition-colors"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            {event.buttonText}
          </a>
        </div>
      )}
    </div>
  )
}

type EventRow =
  | { type: 'text-image'; event: EventData; image: string }
  | { type: 'two-events'; left: EventData; right: EventData }
  | { type: 'single'; event: EventData }

const eventRows: EventRow[] = [
  {
    type: 'text-image',
    image: IMG_HERO,
    event: {
      title: 'Almuerzo y salida con monjes y devotos',
      date: 'Miércoles, Marzo 20 de 2024 | 12:00 - 17:00',
      descripcion: 'Espacio informal para compartir y dar la bienvenida a los monásticos.',
      condiciones:
        'Se requiere previa inscripción. Los detalles serán publicados pronto. Por favor comunicarse al correo centrobogota.srf@gmail.com ya que las inscripciones',
      buttonText: 'Asiste',
    },
  },
  {
    type: 'text-image',
    image: IMG_CONFERENCIA,
    event: {
      title: 'Conferencia: Meditación, el arte de encontrar la paz interior y el gozo.',
      date: 'Jueves 21 de Marzo 19:00 h',
      descripcion:
        'Conferencia gratuita con el Hermano Prafullananda, destacado miembro de la Orden Monástica de Self Realization Fellowship.',
      condiciones: 'Abierta a todo público',
      links: 'Charla Hermano Prafullananda. "Cómo los pensamientos cotidianos pueden cambiar nuestras vidas | Convocatoria Mundial SRF 2022"',
      buttonText: 'Asiste',
    },
  },
  {
    type: 'two-events',
    left: {
      title: 'Recepción',
      date: 'Jueves, Marzo 21 de 2024 | 20:00 - 21:00',
      descripcion:
        'Espacio informal de encuentro entre devotos, simpatizantes y monásticos a realizarse en el primer piso del centro de meditación.',
      condiciones: 'Abierta a todo público',
      buttonText: 'Inscríbete',
    },
    right: {
      title: 'Repaso de los ejercicios energéticos *',
      date: 'Viernes, Marzo 22 de 2024 | 17:30 - 18:30',
      descripcion: 'Clase dirigida por un monástico',
      condiciones: 'Solo para estudiantes de las lecciones de SRF',
      buttonText: 'Inscríbete',
    },
  },
  {
    type: 'two-events',
    left: {
      title: 'Repaso de la técnica de Hong-So con meditación guiada *',
      date: 'Viernes, Marzo 22 de 2024 | 18:30 - 20:30',
      descripcion: 'Clase dirigida por un monástico',
      condiciones: 'Solo para estudiantes de las lecciones de SRF',
      buttonText: 'Inscríbete',
    },
    right: {
      title: 'Repaso de la técnica de Om con meditación guiada *',
      date: 'Sábado, Marzo 23 de 2024 | 9:00 - 11:00',
      descripcion: 'Clase dirigida por un monástico',
      condiciones: 'Solo para estudiantes de las lecciones de SRF',
      buttonText: 'Inscríbete',
    },
  },
  {
    type: 'two-events',
    left: {
      title: 'Iniciación en Kriya Yoga **',
      date: 'Sábado, Marzo 23 de 2024 | 16:00 - 19:30',
      descripcion: 'Ceremonia dirigida por un monástico.',
      condiciones:
        'Solo para devotos Iniciados en Kriya Yoga impartida por SRF. Si es usted Kriyaban y no ha asistido a una ceremonia de Kriya Yoga, por favor comunicarse al correo centrobogota.srf@gmail.com ya que las inscripciones ya vencieron. Si ha asistido anteriormente a una ceremonia de Kriya Yoga, no necesita inscribirse; sin embargo, para ser admitido deberá presentar la tarjeta que le acredite como kriyaban.',
      links: '[botón que dirige a la información sobre el evento]',
      buttonText: 'Inscríbete',
    },
    right: {
      title: 'Meditación y Kirtan',
      date: 'Domingo, Marzo 24 de 2024 | 8:30 - 9:15',
      descripcion:
        'Espacio de meditación silenciosa y cantos devocionales, dirigidos por un monástico.',
      condiciones: 'Abierto a todo público',
      buttonText: 'Inscríbete',
    },
  },
  {
    type: 'two-events',
    left: {
      title: 'Oficio inspirativo',
      date: 'Domingo, Marzo 24 de 2024 | 9:30 - 10:30',
      descripcion:
        'Espacio con periodos cortos de silencio, explicaciones sobre algún tema espiritual definido por el monástico y oración por la paz mundial.',
      condiciones: 'Abierto a todo público',
      buttonText: 'Inscríbete',
    },
    right: {
      title: 'Reunión con niños de escuela dominical',
      date: 'Domingo, Marzo 24 de 2024 | 9:30 - 10:30',
      descripcion: 'Encuentro de un monástico con niños(as) y sus cuidadores.',
      condiciones: 'Abierto a todo público',
      links: 'Abierto para niños y niñas entre 5 a 14 años.',
      buttonText: 'Inscríbete',
    },
  },
  {
    type: 'two-events',
    left: {
      title: 'Clase de repaso de Kriya Yoga **',
      date: 'Domingo, Marzo 24 de 2024 | 9:30 - 10:30',
      descripcion: 'Espacio de encuentro con un monástico para reforzar la técnica y resolver dudas.',
      condiciones:
        'Solo para devotos iniciados en Kriya Yoga impartida por SRF. Para ingresar deberá presentar la tarjeta que le acredite como kriyaban.',
      buttonText: 'Inscríbete',
    },
    right: {
      title: 'Bautizos',
      date: 'Domingo, Marzo 24 de 2024 | 13:15 a 13:50',
      descripcion: 'Ceremonia dirigida por un monástico a niños(as) y sus cuidadores.',
      condiciones:
        'Los plazos de inscripción ya vencieron. Cualquier duda, favor comunicarse al correo centrobogota.srf@gmail.com',
      links: 'Abierto para niños y niñas entre 5 a 14 años.',
      buttonText: 'Inscríbete',
    },
  },
  {
    type: 'two-events',
    left: {
      title: 'Bodas',
      date: 'Domingo, Marzo 24 de 2024 | 14:00 a 14:30',
      descripcion: 'Ceremonia dirigida por un monástico para bendecir a las parejas.',
      condiciones:
        'Los plazos de inscripción ya vencieron. Cualquier duda, favor comunicarse al correo centrobogota.srf@gmail.com',
      buttonText: 'Inscríbete',
    },
    right: {
      title: 'Programa de despedida y proyección de video',
      date: 'Domingo, Marzo 24 de 2024 | 15:00 a 16:00',
      descripcion:
        'Espacio informal de encuentro entre devotos, simpatizantes y monásticos a realizarse en el primer piso del centro de meditación.',
      condiciones: 'Abierta a todo público.',
      buttonText: 'Inscríbete',
    },
  },
  {
    type: 'single',
    event: {
      title: 'Cena de despedida',
      date: 'Domingo, Marzo 24 de 2024 | 18:00',
      descripcion:
        'Espacio informal de encuentro entre devotos, simpatizantes y monásticos a realizarse en el primer piso del centro de meditación.',
      condiciones:
        'Abierta a todo público. Previa inscripción. Favor comunicarse al correo centrobogota.srf@gmail.com',
      buttonText: 'Inscríbete',
    },
  },
]

export default function VisitaMonasticaPage() {
  return (
    <div className="bg-neutral-50">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row">
        {/* Imagen izquierda (~41% del ancho) */}
        <div className="relative w-full lg:w-[41%] min-h-[320px] lg:min-h-[506px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG_HERO}
            alt="Almuerzo con monjes y devotos, Visita Monástica Bogotá 2024"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Contenido derecho — fondo azul primario */}
        <div className="flex-1 bg-primary-500 flex items-center px-8 md:px-16 py-16">
          <div className="max-w-xl">
            <p
              className="font-bold mb-5 text-2xl font-[family-name:var(--font-heading)]"
              style={{ color: '#fdca36' }}
            >
              Próximos eventos:
            </p>
            <h1
              className="leading-tight mb-6 italic"
              style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', letterSpacing: '-0.02em' }}
            >
              Visita monástica Bogotá
            </h1>
            <p className="font-bold text-white text-2xl mb-10 font-[family-name:var(--font-heading)]">
              Del 21 al 24 de marzo de 2024
            </p>
            <a
              href="#programacion"
              className="inline-block px-6 py-3 rounded-lg font-semibold bg-secondary-500 hover:bg-secondary-600 transition-colors text-base"
            style={{ color: 'white', textDecoration: 'none' }}
            >
              Ver programación
            </a>
          </div>
        </div>
      </section>

      {/* ── PROGRAMACIÓN ─────────────────────────────────────────── */}
      <section id="programacion" className="bg-neutral-100">
        {/* Encabezado */}
        <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8 text-center">
          {/* H1 Eventos token: Bitter Bold, naranja #de6b2f — sección heading */}
          <h2
            className="font-bold leading-snug"
            style={{ color: 'var(--h1-eventos)', fontSize: 'clamp(1.4rem, 2.5vw, 2.25rem)', fontFamily: 'var(--font-heading)' }}
          >
            Programación Visita Monástica, Bogotá.
            <br className="hidden sm:block" /> 21 al 24 de marzo 2024.
          </h2>
        </div>

        {/* Filas de eventos */}
        <div className="max-w-[1280px] mx-auto px-8 pb-16 divide-y divide-neutral-200">
          {eventRows.map((row, i) => {
            if (row.type === 'text-image') {
              return (
                <div
                  key={i}
                  className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
                >
                  <EventCard event={row.event} />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={row.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
            }

            if (row.type === 'two-events') {
              return (
                <div
                  key={i}
                  className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
                >
                  <EventCard event={row.left} />
                  <EventCard event={row.right} />
                </div>
              )
            }

            return (
              <div key={i} className="py-12">
                <div className="max-w-xl">
                  <EventCard event={row.event} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── DESCARGA EL PROGRAMA ─────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col items-center gap-10">
          <div className="w-full max-w-[870px] bg-white rounded-3xl overflow-hidden shadow-[var(--shadow-card)] flex items-center justify-center p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG_PROGRAMA}
              alt="Programa impreso de la Visita Monástica Bogotá 2024"
              className="max-h-[560px] w-full object-contain"
            />
          </div>
          <a
            href="#"
            className="inline-block px-6 py-3 rounded-lg font-semibold bg-secondary-500 hover:bg-secondary-600 transition-colors text-base"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Descarga el programa de la Visita Monástica
          </a>
        </div>
      </section>

      {/* ── CITA / TESTIMONIAL ───────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#f0f0e6' }}>
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-stretch rounded-3xl overflow-hidden bg-white shadow-[var(--shadow-card)]">
            {/* Texto */}
            <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center gap-8">
              <blockquote
                className="text-xl leading-relaxed text-neutral-800 font-[family-name:var(--font-heading)]"
              >
                «Aquellos que buscan sinceramente a Dios seguro que le encontrarán. Aquellos que
                quieren amar al Señor y anhelan entrar en su reino, y que desean sinceramente
                conocerle en su corazón, le encontrarán. Debes tener un deseo cada vez mayor por
                Él, día y noche. Él reconocerá tu amor mediante el cumplimiento de su promesa por
                toda la eternidad, y tú conocerás el gozo y la felicidad sin fin»
              </blockquote>
              <cite className="font-bold not-italic text-lg text-neutral-800 font-[family-name:var(--font-heading)]">
                — Paramahansa Yogananda
              </cite>
            </div>

            {/* Imagen */}
            <div className="relative w-full lg:w-[480px] min-h-[320px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_TESTIMONIAL}
                alt="Paramahansa Yogananda"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--text-primary)' }}>
            Contáctenos
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">
            {/* Info */}
            <div className="flex flex-col gap-8 pt-4">
              <div>
                <p className="font-bold text-neutral-900 mb-1">Dirección</p>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  Centro de Meditación SRF Bogotá
                  <br />
                  Calle 99 # 15-17
                  <br />
                  Bogotá D.C., Colombia
                </p>
              </div>
              <div>
                <p className="font-bold text-neutral-900 mb-1">Horario de atención</p>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  Martes a viernes: 9:00 a.m. – 5:00 p.m.
                  <br />
                  Sábados y domingos: 7:30 a.m. – 12:00 m.
                </p>
              </div>
              <div>
                <p className="font-bold text-neutral-900 mb-1">Correo electrónico</p>
                <a
                  href="mailto:centrobogota.srf@gmail.com"
                  className="text-secondary-500 hover:text-secondary-600 text-sm transition-colors"
                >
                  centrobogota.srf@gmail.com
                </a>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden h-[480px] shadow-[var(--shadow-card)]">
              <iframe
                title="Centro de Meditación SRF Bogotá"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.4547196839936!2d-74.04883492413776!3d4.685940541749698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a3c9c9b5a5b%3A0x4f4a4a4a4a4a4a4a!2sSelf-Realization%20Fellowship%20Center%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1708000000000"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
