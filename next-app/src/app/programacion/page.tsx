import type {Metadata} from 'next'
import Container from '@/components/ui/Container'
import SectionRenderer from '@/components/sections/SectionRenderer'
import {getPageBySlug, getCurrentSchedule, getUpcomingEvents} from '@/sanity/lib'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Programación',
  description: 'Horarios de meditación y próximos eventos del Grupo de Meditación SRF Bogotá.',
}

export default async function ProgramacionPage() {
  const page = await getPageBySlug('programacion')
  if (page?.sections?.length) return <SectionRenderer sections={page.sections} />

  const [schedule, events] = await Promise.all([getCurrentSchedule(), getUpcomingEvents()])

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-center mb-4">Programación</h1>
        <p className="text-center text-neutral-500 max-w-xl mx-auto mb-12">
          Horarios de meditación grupal y próximos eventos.
        </p>

        {/* Schedule */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2>Horario de Meditación</h2>
          {schedule?.items?.length ? (
            <div className="grid gap-3">
              {schedule.items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 bg-white rounded-lg shadow-[var(--shadow-soft)]">
                  <div className="font-semibold text-primary-600 sm:w-32 shrink-0">{item.day}</div>
                  <div className="text-secondary-500 font-medium sm:w-24 shrink-0">{item.time}</div>
                  <div>
                    <span className="font-medium">{item.title}</span>
                    {item.description && <span className="text-neutral-500 ml-2 text-sm">— {item.description}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">El horario se actualizará próximamente.</p>
          )}
        </div>

        {/* Events */}
        {events.length > 0 && (
          <div>
            <h2>Próximos Eventos</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map(event => (
                <Card
                  key={event._id}
                  title={event.title}
                  image={event.image}
                  href={event.registrationLink || undefined}
                  date={new Date(event.startDate).toLocaleDateString('es-CO', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                  badge={event.location || 'Virtual'}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
