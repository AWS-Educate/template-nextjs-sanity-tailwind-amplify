'use client'

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import type {ContactFormSection as ContactFormSectionType} from '@/sanity/types'

export default function ContactFormSection({data}: {data: ContactFormSectionType}) {
  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <h2 className="text-center">{data.heading}</h2>
        {data.description && <p className="text-center text-neutral-600 mb-8">{data.description}</p>}
        <form className="space-y-5" onSubmit={e => {e.preventDefault(); alert('Formulario enviado (demo)')}}>
          {data.formFields?.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {field.label}{field.required && <span className="text-error-500"> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea name={field.name} placeholder={field.placeholder} required={field.required} rows={4} className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
              ) : field.type === 'select' ? (
                <select name={field.name} required={field.required} className="w-full rounded-lg border border-neutral-300 px-4 py-2">
                  <option value="">{field.placeholder || 'Seleccionar...'}</option>
                  {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : field.type === 'checkbox' ? (
                <label className="flex items-center gap-2">
                  <input type="checkbox" name={field.name} required={field.required} className="rounded" />
                  <span className="text-sm">{field.placeholder}</span>
                </label>
              ) : (
                <input type={field.type} name={field.name} placeholder={field.placeholder} required={field.required} className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full">Enviar</Button>
        </form>
      </Container>
    </section>
  )
}
