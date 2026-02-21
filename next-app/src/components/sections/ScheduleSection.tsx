import Container from '@/components/ui/Container'
import {getCurrentSchedule} from '@/sanity/lib'
import type {ScheduleSection as ScheduleSectionType} from '@/sanity/types'

export default async function ScheduleSection({data}: {data: ScheduleSectionType}) {
  const schedule = await getCurrentSchedule()

  // Use inline items from the section if available, otherwise fetch from schedule document
  const items = data.items?.length ? data.items : schedule?.items

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <h2 className="text-center mb-10">Horario de Meditación</h2>
        {items?.length ? (
          <div className="grid gap-4 max-w-3xl mx-auto">
            {items.map((item, i) => (
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
          <p className="text-center text-neutral-500">No hay horario disponible actualmente.</p>
        )}
      </Container>
    </section>
  )
}
