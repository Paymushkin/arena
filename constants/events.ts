// События (ивенты)
export interface Event {
  name: string
  date: string
  url?: string // опциональный URL для ссылки
  isCurrent?: boolean // текущий ивент
}

export const events: Event[] = [
  {
    name: 'Abu Dhabi Fashion Week',
    date: 'December, 1-2, 2025',
    url: 'https://abudhabifashionweek.com',
    isCurrent: false
  },
  {
    name: 'Dubai. Fashion & Beauty Arena + Forum',
    date: 'January 20-21, 2026',
    isCurrent: true // Текущий ивент
  },
  {
    name: 'Emirates Fashion Week Spring/Summer',
    date: 'April 2026',
    url: 'https://emiratesfashionweek.com',
    isCurrent: false
  },
  {
    name: 'Dubai Fashion Market',
    date: 'June 2026',
    url: 'https://emiratesfashionweek.com',
    isCurrent: false
  }
]

// Получить текущий ивент
export const getCurrentEvent = () => events.find(event => event.isCurrent)

// Получить будущие/другие ивенты (не текущий)
export const getUpcomingEvents = () => events.filter(event => !event.isCurrent)

// Остальные константы
export const marqueeText1 = 'Dubai. Fashion & Beauty Arena + Forum / 20-21 January 2026'
export const marqueeText2 = 'This event is organized by Emirates Fashion Week'

export const hashtag = ['#DUBAIARENA', 'https://www.instagram.com']

export const instagram = 'https://www.instagram.com'
export const youtube = 'https://www.youtube.com'

export const designerRegistration = 'https://docs.google.com/forms'
export const visitorsRegistration = 'https://docs.google.com/forms'
export const modelRegistration = 'https://docs.google.com/forms'
export const phototVideoRegistration = 'https://docs.google.com/forms'

