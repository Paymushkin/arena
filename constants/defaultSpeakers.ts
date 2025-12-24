export interface DefaultSpeaker {
  id: string
  name: string
  company?: string
  photo?: string
  order: number
}

export const DEFAULT_SPEAKERS: DefaultSpeaker[] = [
  {
    id: 'speaker-1',
    name: 'Speaker 1',
    company: '',
    photo: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
    order: 1
  },
  {
    id: 'speaker-2',
    name: 'Speaker 2',
    company: '',
    photo: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
    order: 2
  },
  {
    id: 'speaker-3',
    name: 'Speaker 3',
    company: '',
    photo: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
    order: 3
  }
]


