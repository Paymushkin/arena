<template>
  <section
    id="arena"
    class="arena-section w-full min-h-screen bg-white relative"
  >
    <div class="flex flex-row w-full relative">
      <!-- Sidebar -->
      <aside
        ref="sidebarRef"
        class="sidebar z-10"
      >
        <div class="p-2 md:p-3 lg:p-6">
          <!-- Forum Sidebar Content -->
          <div v-if="activeSidebarType === 'forum'" class="space-y-4 md:space-y-6">
            <!-- Speakers Block -->
            <div>
              <h3 class="text-base md:text-lg lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 uppercase">FORUM</h3>
              <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
                <div
                  v-for="speaker in forumSpeakers"
                  :key="speaker.id"
                  class="speaker-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
                  @click="scrollToForumSection()"
                >
                  <img
                    :src="speaker.avatar"
                    :alt="speaker.name"
                    class="w-14 h-14 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-full"
                  />
                  <div class="flex flex-col items-start">
                    <span class="text-xs md:text-sm font-semibold">{{ speaker.name.split(' ')[0] }}</span>
                    <span class="text-xs md:text-sm font-semibold">{{ speaker.name.split(' ')[1] }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Blocks for Forum -->
            <div class="flex flex-col space-y-2 md:space-y-3">
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">50 speakers</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">200 delegates expected</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">30 nominee</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">40 brand spots</p>
              </div>
            </div>
          </div>

          <!-- Exhibition Sidebar Content -->
          <div v-else class="space-y-4 md:space-y-6">
            <!-- Stands Block -->
            <div>
              <h3 class="text-base md:text-lg lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
              <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
                <div
                  v-for="stand in exhibitionStands"
                  :key="stand.id"
                  class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
                  @click="scrollToExhibitionContainer()"
                >
                  <img
                    :src="stand.image"
                    :alt="stand.name"
                    class="w-14 h-14 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-full"
                  />
                  <div class="flex flex-col items-start">
                    <span class="text-xs md:text-sm font-semibold">{{ stand.name.split(' ')[0] }}</span>
                    <span class="text-xs md:text-sm font-semibold">{{ stand.name.split(' ')[1] || '' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Blocks for Arena -->
            <div class="flex flex-col space-y-2 md:space-y-3">
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">TRIAL STAND</p>
                <p class="text-[10px] md:text-xs text-white opacity-70 break-words">Join Waitlist</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">1000 visitors</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">40 showcase spots</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">100 TV interviews</p>
              </div>
              <div class="info-block bg-black rounded-lg p-2 md:p-3">
                <p class="text-xs md:text-sm font-bold text-white break-words">1000 reportage photos</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content flex-1 min-h-screen">
        <!-- Exhibition Section -->
        <section
          ref="exhibitionSectionRef"
          id="exhibition"
          class="exhibition-section md:px-6 lg:px-8"
        >
          <div ref="exhibitionContainerRef" class="container mx-auto py-4 md:py-6">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Arena</h2>

            <!-- Intro Block -->
            <div class="mb-8 md:mb-12 border border-black rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <h3 class="text-lg md:text-2xl font-bold mb-3 md:mb-4">Intro</h3>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                Scroll down to Arena Trial Stand. When Trial reaches the top, the sidebar appears.
              </p>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                In Arena mode: you see John Ivanov tiles while Trial is active. When Trial fully goes up, you see STAND A/B/C.
              </p>
              <p class="text-sm md:text-base text-black-70">
                In Forum mode: sidebar is always visible and shows STAND A/B/C as the exit back.
              </p>
            </div>

            <!-- Arena Trial Stand -->
            <div
              id="exhibition-stand-1"
              class="stand-block mb-8 md:mb-12 border border-black rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h3 class="text-lg md:text-2xl font-bold mb-3 md:mb-4">Arena Trial Stand</h3>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                This is a long test block to create scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                Another paragraph… Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
              </p>
              <p class="text-sm md:text-base text-black-70">
                More text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>

            <!-- Arena Paid Stand -->
            <div
              id="exhibition-stand-2"
              class="stand-block mb-8 md:mb-12 border border-black rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h3 class="text-lg md:text-2xl font-bold mb-3 md:mb-4">Arena Paid Stand</h3>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                This is a long test block to create scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="text-sm md:text-base text-black-70">
                More text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        </section>

        <!-- Forum Section -->
        <section
          ref="forumSectionRef"
          id="forum"
          class="forum-section md:px-6 lg:px-8"
        >
          <div ref="forumContainerRef" class="container mx-auto py-4 md:py-6">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Forum</h2>

            <!-- Forum Agenda -->
            <div
              id="forum-speaker-1"
              class="speaker-block mb-8 md:mb-12 border border-black rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h3 class="text-lg md:text-2xl font-bold mb-3 md:mb-4">Forum Agenda</h3>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                Long test content B1.
              </p>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="text-sm md:text-base text-black-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>

            <!-- Forum Buy Ticket -->
            <div
              id="forum-speaker-2"
              class="speaker-block mb-8 md:mb-12 border border-black rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h3 class="text-lg md:text-2xl font-bold mb-3 md:mb-4">Forum Buy Ticket</h3>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                Long test content B2.
              </p>
              <p class="text-sm md:text-base text-black-70 mb-3 md:mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="text-sm md:text-base text-black-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

type SidebarType = 'forum' | 'exhibition'

const activeSidebarType = ref<SidebarType>('forum')
const exhibitionSectionRef = ref<HTMLElement | null>(null)
const forumSectionRef = ref<HTMLElement | null>(null)
const exhibitionContainerRef = ref<HTMLElement | null>(null)
const forumContainerRef = ref<HTMLElement | null>(null)
const sidebarRef = ref<HTMLElement | null>(null)

const forumSpeakers = [
  {
    id: 'speaker-1',
    name: 'Donald Trump',
    avatar: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'
  },
  {
    id: 'speaker-2',
    name: 'Donald Trump',
    avatar: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'
  },
  {
    id: 'speaker-3',
    name: 'Donald Trump',
    avatar: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'
  }
]

const exhibitionStands = [
  {
    id: 'stand-1',
    name: 'Dubai Trial',
    image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
    targetId: 'exhibition-stand-1'
  },
  {
    id: 'stand-2',
    name: 'Arena Paid',
    image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
    targetId: 'exhibition-stand-2'
  },
  {
    id: 'stand-3',
    name: 'Arena Trial',
    image: 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png',
    targetId: 'exhibition-stand-1'
  }
]

function updateSidebarByScroll () {
  if (!exhibitionSectionRef.value || !forumSectionRef.value) {
    return
  }

  const windowHeight = window.innerHeight
  const centerY = window.scrollY + windowHeight / 2

  const forumRect = forumSectionRef.value.getBoundingClientRect()
  const forumTop = forumRect.top + window.scrollY
  const forumBottom = forumTop + forumRect.height

  // Логика: sidebar показывает противоположное тому, что в центре экрана
  // Если центр экрана в области форума - показываем выставку в sidebar
  // Если центр экрана в области выставки - показываем форум в sidebar
  if (centerY >= forumTop && centerY <= forumBottom) {
    activeSidebarType.value = 'exhibition'
  } else {
    // По умолчанию (когда видна выставка) показываем форум в sidebar
    activeSidebarType.value = 'forum'
  }
}

function scrollToExhibitionContainer () {
  if (!exhibitionContainerRef.value) {
    return
  }

  const containerTop = exhibitionContainerRef.value.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: containerTop,
    behavior: 'smooth'
  })

  // После скролла обновляем sidebar
  setTimeout(() => {
    updateSidebarByScroll()
  }, 500)
}

function scrollToForumSection () {
  if (!forumSectionRef.value) {
    return
  }

  const sectionTop = forumSectionRef.value.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: sectionTop,
    behavior: 'smooth'
  })

  // После скролла обновляем sidebar
  setTimeout(() => {
    updateSidebarByScroll()
  }, 500)
}

function handleScroll () {
  updateSidebarByScroll()
}

onMounted(() => {
  updateSidebarByScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.arena-section {
  font-family: 'Inter', system-ui, sans-serif;
}

.sidebar {
  width: 120px;
  flex-shrink: 0;
  align-self: flex-start;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: visible;
  position: sticky;
  top: 0;
  background-color: #f9fafb;
}

@media (min-width: 640px) {
  .sidebar {
    width: 180px;
    border-right: 1px solid black;
  }
}

@media (min-width: 768px) {
  .sidebar {
    width: 200px;
  }
}

@media (min-width: 1024px) {
  .sidebar {
    width: 280px;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .sidebar {
    width: 240px;
  }
}

.content {
  min-height: 100vh;
  background-color: white;
  flex: 1;
  min-width: 0;
}

.speaker-item img,
.stand-item img {
  transition: transform 0.2s;
}

.speaker-item:hover img,
.stand-item:hover img {
  transform: scale(1.02);
}

.info-block {
  transition: opacity 0.2s;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.info-block p {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.info-block:hover {
  opacity: 0.9;
}
</style>
