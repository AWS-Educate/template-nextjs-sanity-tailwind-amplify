import {writeClient} from './config.js'
import {generateKey, singletonExists, log} from './utils.js'

// Weekly meditation schedule from home.json hero body + escuela-dominical.json
const SCHEDULE_ITEMS = [
  {
    day: 'Thu',
    time: '18:30',
    title: 'Meditación Guiada',
    description: 'Meditación guiada de los jueves',
    location: 'Centro de Meditación SRF Bogotá',
  },
  {
    day: 'Sat',
    time: '15:00',
    title: 'Oficio de Meditación',
    description: 'Meditación de sábado 3:00 pm a 6:00 pm',
    location: 'Centro de Meditación SRF Bogotá',
  },
  {
    day: 'Sun',
    time: '09:00',
    title: 'Oficio Devocional',
    description: 'Servicio dominical de la mañana',
    location: 'Centro de Meditación SRF Bogotá',
  },
  {
    day: 'Sun',
    time: '11:00',
    title: 'Oficio de Lectura Inspirativa',
    description: 'Servicio dominical de las 11 am',
    location: 'Centro de Meditación SRF Bogotá',
  },
  {
    day: 'Sun',
    time: '10:00',
    title: 'Escuela Dominical',
    description:
      'Clases para niños de 5 a 12 años. El último domingo de cada mes no hay clase por el Oficio de meditación extensa.',
    location: 'Centro de Meditación SRF Bogotá',
  },
]

export async function migrateSchedule() {
  log('06-schedule', 'Migrating schedule...')

  // Use a fixed ID for the active schedule
  const scheduleId = 'schedule-current'
  if (await singletonExists(scheduleId)) {
    log('06-schedule', 'Skip (exists): schedule-current')
    return
  }

  // Current week number
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const week = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7,
  )

  await writeClient.createOrReplace({
    _id: scheduleId,
    _type: 'schedule',
    title: 'Programación Semanal',
    week,
    year: now.getFullYear(),
    isActive: true,
    items: SCHEDULE_ITEMS.map((item) => ({
      _key: generateKey(),
      ...item,
    })),
  })

  log('06-schedule', `Created schedule (week ${week}, ${now.getFullYear()})`)
}
