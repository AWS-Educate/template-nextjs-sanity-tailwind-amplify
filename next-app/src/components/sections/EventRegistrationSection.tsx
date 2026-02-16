'use client'

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import type {EventRegistrationSection as EventRegistrationSectionType} from '@/sanity/types'

export default function EventRegistrationSection({data}: {data: EventRegistrationSectionType}) {
  return (
    <section className="py-16 bg-accent-sage-50">
      <Container className="max-w-2xl text-center">
        <h2>{data.heading}</h2>
        {data.description && <p className="text-neutral-600 mb-8">{data.description}</p>}
        {data.eventLink ? (
          <Button href={data.eventLink} variant="primary" size="lg">Registrarse</Button>
        ) : data.formFields?.length ? (
          <form className="space-y-4 text-left" onSubmit={e => {e.preventDefault(); alert('Registro enviado (demo)')}}>
            {data.formFields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">{field.label}{field.required && <span className="text-error-500"> *</span>}</label>
                <input type={field.type === 'email' ? 'email' : 'text'} name={field.name} placeholder={field.placeholder} required={field.required} className="w-full rounded-lg border border-neutral-300 px-4 py-2" />
              </div>
            ))}
            <Button type="submit" className="w-full">Registrarse</Button>
          </form>
        ) : null}
      </Container>
    </section>
  )
}
