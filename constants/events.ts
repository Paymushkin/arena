// Event-related constants and helpers for The Arena

export interface Event {
  name: string
  date: string
  url?: string // optional URL for link
  isCurrent?: boolean // current event flag
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
    isCurrent: true // current event
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

// Helpers
export const getCurrentEvent = (): Event | undefined => events.find(event => event.isCurrent)

export const getUpcomingEvents = (): Event[] => events.filter(event => !event.isCurrent)
