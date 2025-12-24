export interface ArenaStand {
  id: string
  name: string
  image: string
  targetSection: 'arena1' | 'arena2' | 'arena3'
}

export const ARENA_STANDS: Record<'arena1' | 'arena2' | 'arena3', ArenaStand[]> = {
  arena1: [
    {
      id: 'stand-1',
      name: 'Stand 1',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/stand/stand-1.webp',
      targetSection: 'arena1'
    },
    {
      id: 'stand-2',
      name: 'Stand 2',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/stand/stand-2.webp',
      targetSection: 'arena1'
    }
  ],
  arena2: [
    {
      id: 'stand-1',
      name: 'Stand 1',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/stand/stand-1.webp',
      targetSection: 'arena2'
    },
    {
      id: 'stand-2',
      name: 'Stand 2',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/stand/stand-2.webp',
      targetSection: 'arena2'
    }
  ],
  arena3: [
    {
      id: 'stand-1',
      name: 'Stand 1',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/stand/stand-1.webp',
      targetSection: 'arena3'
    },
    {
      id: 'stand-2',
      name: 'Stand 2',
      image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/stand/stand-2.webp',
      targetSection: 'arena3'
    }
  ]
}


