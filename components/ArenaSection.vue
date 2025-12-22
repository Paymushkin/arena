<template>
  <section
    id="arena"
    class="arena-section w-full min-h-screen bg-[#f9fafb] relative"
  >
    <div class="flex flex-row w-full relative container mx-auto">
      <!-- Sidebar -->
      <aside
        ref="sidebarRef"
        class="sidebar z-10"
        :class="currentSection === 'arena1' ? 'hidden md:block' : ''"
      >
        <div class="md:p-3 py-2 lg:p-6">
          <!-- Forum 1 Sidebar Content -->
          <div v-if="activeSidebarType === 'forum1'" class="space-y-4 md:space-y-6">
            <!-- Speakers Block -->
            <div>
              <h3 class="text-xs md:text-sm lg:text-base font-bold mb-2 md:mb-3 lg:mb-4 uppercase">FORUM</h3>
              <div class="flex flex-col items-start space-y-2 md:space-y-3 lg:space-y-4">
                <TransitionGroup name="fade" tag="div" class="flex flex-col gap-2 md:gap-3 lg:gap-4">
                <div
                    v-for="speaker in displayedSpeakers"
                  :key="speaker.id"
                  class="speaker-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
                  @click="scrollToSection('forum1')"
                >
                  <img
                      :src="speaker.photo || 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'"
                    :alt="speaker.name"
                    class="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-full"
                  />
                  <div class="flex flex-col items-start">
                      <span class="text-xs md:text-sm font-semibold">{{ speaker.name }}</span>
                      <span v-if="speaker.company" class="text-xs md:text-sm text-gray-600">{{ speaker.company }}</span>
                  </div>
                </div>
                </TransitionGroup>
              </div>
            </div>

            <!-- Info Blocks for Forum -->
            <div class="flex flex-col space-y-2 md:space-y-3">
              <div
                v-for="(stat, index) in sidebarStats"
                :key="`sidebar-stat-${stat.type}-${index}`"
                class="info-block"
              >
                <p class="text-xs md:text-sm font-bold text-black break-words">
                  {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
                </p>
                <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
                  {{ stat.subtitle }}
                </p>
              </div>
            </div>
          </div>


          <!-- Arena 1 Sidebar Content -->
          <div v-else-if="activeSidebarType === 'arena1'" class="space-y-4 md:space-y-6">
            <!-- Stands Block -->
            <div>
              <h3 class="text-base md:text-lg lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
              <div class="flex flex-col items-start space-y-2 md:space-y-3 lg:space-y-4">
                <div
                  v-for="stand in arena1Stands"
                  :key="stand.id"
                  class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
                  @click="scrollToSection('arena1')"
                >
                  <img
                    :src="stand.image"
                    :alt="stand.name"
                    class="w-14 h-14 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 aspect-square object-cover rounded-lg"
                  />
                  <div class="flex flex-col items-start">
                    <span class="text-xs md:text-sm font-semibold">{{ stand.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Blocks for Arena -->
            <div class="flex flex-col items-start space-y-2 md:space-y-3">

              <BaseButton
                variant="primary"
                size="sm"
                @click="scrollToSection('arena2')"
                class="rounded-lg md:rounded-xl"
              >
                TRIAL STAND
              </BaseButton>
              <div
                v-for="(stat, index) in sidebarStats"
                :key="`sidebar-stat-${stat.type}-${index}`"
                class="info-block"
              >
                <p class="text-xs md:text-sm font-bold text-black break-words">
                  {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
                </p>
                <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
                  {{ stat.subtitle }}
                </p>
              </div>
            </div>
          </div>

          <!-- Arena 2 Sidebar Content -->
          <div v-else-if="activeSidebarType === 'arena2'" class="space-y-4 md:space-y-6">
            <!-- Stands Block -->
            <div>
              <h3 class="text-base md:text-lg lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
              <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
                <div
                  v-for="stand in arena2Stands"
                  :key="stand.id"
                  class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
                  @click="scrollToSection('arena2')"
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
              <div
                v-for="(stat, index) in sidebarStats"
                :key="`sidebar-stat-${stat.type}-${index}`"
                class="info-block"
              >
                <p class="text-xs md:text-sm font-bold text-black break-words">
                  {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
                </p>
                <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-600 break-words mt-1">
                  {{ stat.subtitle }}
                </p>
              </div>
            </div>
          </div>

          <!-- Arena 3 Sidebar Content -->
          <div v-else-if="activeSidebarType === 'arena3'" class="space-y-4 md:space-y-6">
            <!-- Stands Block -->
            <div>
              <h3 class="text-base md:text-lg lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4 uppercase">ARENA</h3>
              <div class="flex flex-col space-y-2 md:space-y-3 lg:space-y-4">
                <div
                  v-for="stand in arena3Stands"
                  :key="stand.id"
                  class="stand-item cursor-pointer transition-opacity hover:opacity-70 flex flex-col md:flex-row items-center gap-2 md:gap-3"
                  @click="scrollToSection('arena3')"
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
              <div
                v-for="(stat, index) in sidebarStats"
                :key="`sidebar-stat-${stat.type}-${index}`"
                class="info-block bg-black rounded-lg p-2 md:p-3"
              >
                <p class="text-xs md:text-sm font-bold text-white break-words">
                  {{ stat.number }}{{ stat.plus ? '+' : '' }} <br> {{ stat.title }}
                </p>
                <p v-if="stat.subtitle" class="text-[10px] md:text-xs text-gray-300 break-words mt-1">
                  {{ stat.subtitle }}
                </p>
              </div>
              </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content flex-1 min-h-screen bg-white py-4 md:py-6">
        <!-- Arena 1 Section -->
        <section
          ref="exhibitionSection1Ref"
          class="exhibition-section"
        >
          <div ref="exhibitionContainer1Ref" class="px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
            <h2 id="arena1-offers" class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">Arena Participants' offers</h2>
            <h3 class="text-base md:text-lg lg:text-xl text-black-70 mb-4 md:mb-6">Markets are built by those who show up</h3>

            <!-- Molecule Carousel -->
            <div class="relative md:mt-[100px] mt-14 lg:mb-12 mb-8">
              <Transition
                v-if="molecules.length > 0"
                name="fade"
                mode="out-in"
              >
                <MoleculeCard
                  :key="molecules[currentMoleculeIndex].id"
                  :id="molecules[currentMoleculeIndex].id"
                  :left-text="molecules[currentMoleculeIndex].leftText"
                  :right-text="molecules[currentMoleculeIndex].rightText"
                  :avatar="molecules[currentMoleculeIndex].avatar"
                  :name="molecules[currentMoleculeIndex].name"
                  :company="molecules[currentMoleculeIndex].company"
                />
              </Transition>
            </div>

            <!-- Show Your Offer Button -->
            <BaseButton
              variant="primary"
              size="md"
              class="mx-auto"
              @click="scrollToEmptyMolecule"
            >
              Show your offer
            </BaseButton>

            <!-- Show Your Offer Section -->
            <div class="mt-8 md:mt-12">
              <h2 id="arena1-trial" class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">Trial Showcase stand
              </h2>
              <h3 class="text-base md:text-lg lg:text-xl text-black-70 mb-4 md:mb-6">
                Trial 1 hour Showcase Spot (FREE) +5 leads (FREE)
              </h3>
              <p class="text-sm md:text-base">
                Need only representative + laptop with presentation
              </p>
            </div>

            <!-- Empty Molecule -->
            <div ref="emptyMoleculeRef" class="mt-12 md:mt-16">
              <div class="molecule-block mb-8 md:mb-12 relative max-w-[600px] mx-auto">
                <!-- Top Section (Light Gray) -->
                <div class="bg-gray-100 rounded-tl-lg md:rounded-tl-2xl rounded-tr-lg md:rounded-tr-2xl">
                  <div class="flex flex-row justify-between items-start gap-2 md:gap-4 lg:gap-6">
                    <!-- Left Text Block -->
                    <div class="flex-1 max-w-[40%] relative py-2 md:py-4 px-2">
                      <p class="absolute top-[-16px] md:top-[-20px] left-0 text-[10px] md:text-xs text-black-70 mb-1 md:mb-2">Useful</p>
                      <p class="text-xs md:text-sm font-medium text-black leading-tight md:leading-normal">
                        I am useful...
                      </p>
                    </div>

                    <!-- Right Text Block -->
                    <div class="flex-1 max-w-[40%] text-right py-2 md:py-4 px-2">
                      <p class="absolute top-[-16px] md:top-[-20px] right-0 text-[10px] md:text-xs text-black-70 mb-1 md:mb-2">Offer</p>
                      <p class="text-xs md:text-sm font-medium text-black leading-tight md:leading-normal">
                        I offer...
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Avatar (Centered, overlapping both sections) -->
                <div class="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div class="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-full bg-white p-0.5 md:p-1 shadow-lg flex items-center justify-center">
                    <img
                      :src="defaultProfileIcon"
                      alt="Default profile"
                      class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                    />
                  </div>
                </div>

                <!-- Bottom Section (Yellow) -->
                <div class="bg-yellow-400 px-2 py-2 md:py-3 relative rounded-bl-lg md:rounded-bl-2xl rounded-br-lg md:rounded-br-2xl">
                  <div class="flex items-center justify-center">
                    <BaseButton
                      variant="primary"
                      size="sm"
                      @click="scrollToSection('arena1')"
                    >
                      You are usefull with...
                    </BaseButton>
                  </div>
                </div>

              </div>
            </div>

            <div class="flex flex-col md:flex-row justify-center gap-4">
            <!-- WhatsApp Button -->
              <WhatsAppButton
                phone-number="971585753302"
                text="Contact us about Showcase spot"
              />
              <a 
                href="#join-waitlist"
                class="inline-flex items-center gap-2 px-6 py-2.5 text-sm rounded-3xl transition-colors border border-black hover:bg-gray-100 w-fit"
                @click.prevent="scrollToSection('arena1')"
              >
                <span>2h Free Trial Spot Waitlist</span>
                <span 
                  id="trial-waitlist-count-arena" 
                  style="background-color: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 12px; font-weight: bold;"
                >
                  {{ waitlistCount }}
                </span>
                <span>></span>
              </a>

            </div>

            
          </div>
        </section>

        <!-- Forum 1 Section -->
        <section
          ref="forumSection1Ref"
          id="forum1"
          class="forum-section px-4 md:px-6 lg:px-8"
        >
          <div ref="forumContainer1Ref">
            <div class="flex flex-row justify-between items-center mb-4 md:mb-6">
              <h2 id="forum-speakers" class="text-xl md:text-2xl lg:text-3xl font-bold">Speakers</h2>
              <div v-if="showViewAllButton"  class="view-all-button-wrapper hidden md:block">
                <BaseButton variant="primary" @click="scrollToSection('forum1')">
                  <span>View all speakers</span>
                </BaseButton>
              </div>
            </div>

            <!-- Speakers Grid -->
            <div class="mb-6 md:mb-8">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <div
                  v-for="speaker in gridSpeakers"
                  :key="speaker.id"
                  class="speaker-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="aspect-[3/4] overflow-hidden">
                    <img
                      :src="speaker.photo || 'https://storage.yandexcloud.net/videos-meyou/arena/images/1.png'"
                      :alt="speaker.name"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
            </div>
                  <div class="p-3 md:p-4">
                    <h3 class="text-sm md:text-base font-semibold mb-1">{{ speaker.name }}</h3>
                    <p v-if="speaker.company" class="text-xs md:text-sm text-gray-600">{{ speaker.company }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref="forumContainer2Ref" class="mb-12 md:mb-16">
            <ClientOnly>
              <ProgramSection
                id="forum-program"
                title="15<sup>th</sup> Fall Winter 2026"
                visit-button-link="https://docs.google.com/forms/d/11I7bcoDEzErBszt2UfZqf04LAjljlpkBhdRTD6CrC7g/edit?fbclid=PAZXh0bgNhZW0CMTEAAabTXlVnA-8uMswE4mM1iOQkULaorR2fFi9eZsVZlgEe1jMJH0Kb7OcDJJk_aem_LIewtA-gbtt6seDB3ZE4pw"
                :tabs="programTabs"
              />
            </ClientOnly>
          </div>

          <div ref="forumContainer3Ref" class="mb-12 md:mb-16">
            <h2 id="forum-partners" class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Partners & Media</h2>
            <div class="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-9 gap-4 justify-items-center md:justify-items-start">
              <div 
                v-for="(partner, index) in partners"
                :key="partner.id"
                class="flex justify-center items-center"
              >
                <img  
                  :src="partner.image" 
                  :alt="partner.name" 
                  class="object-center" 
                />
              </div>
            </div>
          </div>

        </section>


        <!-- Arena 2 Section -->
        <section
          ref="exhibitionSection2Ref"
          id="arena2"
          class="exhibition-section md:px-6 lg:px-8"
        >
          <div ref="exhibitionContainer2Ref" class="mb-12 md:mb-16 px-4 md:px-6 lg:px-8">
            <h2 id="arena2-trial" class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Arena. Trial 1 Hour Spot</h2>

            <div class="space-y-6 mb-8">
              <!-- Первое фото и текст на одной строке -->
              <div class="flex flex-col md:flex-row gap-6">
                <div class="rounded-2xl overflow-hidden md:w-1/2">
                  <img src="https://storage.yandexcloud.net/videos-meyou/arena/images/trial/1.webp" alt="Trial showcase spots" class="w-full object-contain">
                </div>
                <div class="md:w-1/2">
                  <p class="text-base md:text-xl xl:text-2xl mb-6">
                    Trial Showcase Spots — How it Works
                  </p>
                  
                  <ul class="text-sm md:text-base xl:text-lg space-y-2 mb-6">
                   <li>• Each day offers 20 Showcase Spots, divided into 4 sessions of 2 hours each — that's 80 trial slots per day.</li>
                   <li>• Each selected participant also receives 10 lead chats with EFW Market visitors.</li>
                   <li>• Allocation is not automatic. From the waitlist, participants are chosen at the organizers' discretion, to ensure a balanced mix of services for our audience.</li>
                   <li>• These trial spots are subsidized by Dubai Departments and Emirates Fashion Week as a goodwill initiative to support SMEs in Dubai's beauty and design industries.</li>
                   <li>• Important: if all 60 full-day paid spots are taken, the 20 trial spots may also be sold, which reduces the chances for waitlist applicants.</li>
                   <li>• You can always skip the waitlist and secure a guaranteed full-day spot (3,000 AED) — just as 60+ companies already have</li>
                  </ul>
                </div>
            </div>

              <!-- Второе и третье фото в ряд -->
              <div class="flex flex-col md:flex-row gap-6">
                <div class="rounded-2xl overflow-hidden">
                  <img src="https://storage.yandexcloud.net/videos-meyou/arena/images/trial/2.webp" alt="Trial showcase spots" class="object-contain">
            </div>

                <div class="rounded-2xl overflow-hidden">
                  <img src="https://storage.yandexcloud.net/videos-meyou/arena/images/trial/3.webp" alt="Trial showcase spots" class="object-contain">
                </div>
              </div>
            </div>

            <p class="text-sm md:text-base xl:text-lg text-gray-600 mt-2 text-center">
              competition with other waitlist companies; trial slots reduced if full-day spots are purchased
            </p>
            
            <div class="flex flex-col items-end gap-3 mb-8">
              <BaseButton
                id="join-waitlist"
                variant="primary"
                @click="showWaitlistForm = true">
                <span>Join Waitlist</span>
                <span>></span>
              </BaseButton>
            </div>

            <!-- Companies List -->
            <div class="mt-12">
              <CompaniesList ref="companiesListRef" @companies-count-updated="updateCompaniesCount" />
            </div>
          </div>
        </section>

  <!-- Arena 3 Section -->      
        <section
          ref="exhibitionSection3Ref"
          id="arena3"
          class="exhibition-section px-4 md:px-6 lg:px-8"
        >
          <div ref="exhibitionContainer3Ref">
            <h2 id="arena3-showcase" class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Showcase Spot</h2>
            
            <div class="relative -mx-4 md:mx-0 mb-8">
              <div class="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto pb-4 md:pb-0 px-4 md:px-0 snap-x snap-mandatory">
                <div class="relative aspect-[907/1030] bg-gray-100 rounded-2xl overflow-hidden min-w-[85%] md:min-w-0 snap-center">
                  <video 
                    class="w-full h-full object-cover"
                    muted
                    autoplay
                    loop
                    playsinline
                    poster="https://storage.yandexcloud.net/videos-meyou/arena/images/stand-1.webp"
                  >
                    <source src="https://storage.yandexcloud.net/videos-meyou/efw2025/promo.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div class="relative aspect-[907/1030] bg-gray-100 rounded-2xl overflow-hidden min-w-[85%] md:min-w-0 snap-center">
                  <img src="https://storage.yandexcloud.net/videos-meyou/arena/images/offer/1.webp" alt="Showcase interior" class="w-full h-full object-contain">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 md:gap-12 gap-7 mb-8">
              <div>
                <h3 class="md:text-2xl md:mb-5 mb-2 font-bold">Good for:</h3>
                <ul class="text-sm md:text-base xl:text-lg space-y-2">
                  <li>• Medical & Aesthetic Clinics – General clinics, plastic surgery, dentistry.   </li>
                  <li>• Health & Wellness – Nutritionists, dietitians, medical & wellness tourism.</li>
                  <br><br>
                  <li>• Beauty & Cosmetics – Cosmetic brands, makeup artists, brow & lash services, nail care.</li>
                  <li>• Personal Care & Wellness – Cosmetology, massage, salons, spas, barbershops.</li>
                  <br><br>
                  <li>• Fitness & Events – Gyms, wellness studios, wedding makeup & beauty services.</li>
                  <li>• Education & Training – Schools and courses for makeup, cosmetology, and nail services.</li>
                  <br><br>
                  <li>• Beauty Tech & Software – CRM, online booking, payment solutions for salons.</li>
                  <li>• Salon & Clinic Equipment – Furniture and professional tools for beauty salons & medical clinics.</li>
                </ul>
              </div>
              <div class="border border-gray-300 rounded-lg p-4">
                <h3 class="md:text-2xl md:mb-5 mb-2 font-bold">What's Included:</h3>
                <ul class="text-sm md:text-base xl:text-lg space-y-2 mb-4">
                  <li><b>A)</b> One of the 80 Showcase Spots:
                    <ul class="pl-4 space-y-2 mt-2">
                      <li>- 8, 9 November (runway days) 20 Spots in the corridors</li>
                      <li>- 10, 11 November (market days)  20 Spots in the corridors + 60 Spots in the main hall </li>
                    </ul>
                  </li>
                  <br><br>
                  <li class="font-bold">B) 50 lead chats per day from EFW visitors (Our Matchmaking technology)</li>
                  <li><b>C) 50"</b>  Display for presentations with a table and 2 bar chairs </li>
                  <br><br>
                  <li><b>D)</b> VIP invitations to all EFW runway shows on 8–11 November 2025</li>
                </ul>
                <br><br>
                <div class="flex items-start text-sm md:text-base xl:text-lg">
                  <svg class="w-6 h-6 text-amber-400 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p class="font-medium mb-2"><b>Laptops are not provided.</b> Each exhibitor must bring their own laptop and connect it to the display via HDMI to showcase their company's video or presentation.</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col md:gap-4 gap-2">
                <h3 class="md:text-2xl font-bold">Total</h3>
                <ul class="text-sm md:text-base xl:text-lg space-y-2">
                  <li>• 60 Spots</li>
                </ul>
                <br><br>
                <h3 class="md:text-2xl font-bold">Prices</h3>
                <ul class="text-sm md:text-base xl:text-lg space-y-2">
                  <li> Early Birds / any day</li>
                  <li>•<span class="line-through opacity-50"> 3,600 AED / 1,000$ </span> </li>
                  <li>• 3,000 AED / 800$ / per day</li>
                </ul>
                <WhatsAppButton 
                  phone-number="971585753302"
                  text="Contact us about Showcase spot"
                />
                <a 
                  href="#join-waitlist"
                  class="mt-3 inline-flex items-center gap-2 px-6 py-2.5 text-sm rounded-3xl transition-colors border border-black hover:bg-gray-100 w-fit"
                  @click.prevent="showWaitlistForm = true"
                >
                  <span>2h Free Trial Spot Waitlist</span>
                  <span style="background-color: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 12px; font-weight: bold;">{{ waitlistCount }}</span>
                  <span>></span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Waitlist Form Modal -->
    <WaitlistForm
      :is-open="showWaitlistForm" 
      @close="showWaitlistForm = false"
      @success="handleWaitlistSuccess"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide, watch, computed, TransitionGroup } from 'vue'
import { useMolecules } from '~/composables/useMolecules'
import { useWaitlistCount } from '~/composables/useWaitlistCount'
import { useArenaStats } from '~/composables/useArenaStats'
import { useSpeakers } from '~/composables/useSpeakers'
import { usePartners } from '~/composables/usePartners'
import BaseButton from '~/components/ui/BaseButton.vue'
import WhatsAppButton from '~/components/ui/WhatsAppButton.vue'
import ProgramSection from '~/components/ProgramSection.vue'
import WaitlistForm from '~/components/WaitlistForm.vue'
import CompaniesList from '~/components/CompaniesList.vue'
import defaultProfileIcon from '~/assets/images/et_profile-male.svg?url'
import { CURRENT_PROGRAM_TABS } from '~/constants/currentProgram'

// Используем composable для загрузки данных молекул из Google Sheets
const { molecules, loading: moleculesLoading, error: moleculesError, fetchMolecules } = useMolecules()

// Используем composable для подсчета офферов из waitlist таблицы
const { waitlistCount, loading: waitlistLoading, fetchWaitlistCount } = useWaitlistCount()

// Используем composable для загрузки статистики из Google Sheets
const { stats: arenaStats, loading: statsLoading, fetchStats, getStatsByType } = useArenaStats()

// Используем composable для загрузки спикеров из Google Sheets
const { speakers, loading: speakersLoading, error: speakersError, fetchSpeakers } = useSpeakers()

// Используем composable для загрузки партнеров из Google Sheets
const { partners, loading: partnersLoading, error: partnersError, fetchPartners } = usePartners()

// Локальные данные по умолчанию для спикеров
const defaultSpeakers = [
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

// Отображаем только первых 3 спикеров для sidebar, используя загруженные данные или локальные по умолчанию
const displayedSpeakers = computed(() => {
  const speakersToShow = speakers.value.length > 0 ? speakers.value : defaultSpeakers
  return speakersToShow.slice(0, 3)
})

// Отображаем максимум 8 спикеров для основного грида
const gridSpeakers = computed(() => {
  const speakersToShow = speakers.value.length > 0 ? speakers.value : defaultSpeakers
  return speakersToShow.slice(0, 8)
})

// Показываем кнопку "Смотреть всех", если есть спикеры
const showViewAllButton = computed(() => {
  const speakersToShow = speakers.value.length > 0 ? speakers.value : defaultSpeakers
  return speakersToShow.length > 0
})

// Получаем статистику для sidebar в зависимости от активного типа
const sidebarStats = computed(() => {
  // Определяем тип на основе activeSidebarType
  let type = 1 // По умолчанию type 1 для forum1
  switch (activeSidebarType.value) {
    case 'forum1':
      type = 1
      break
    case 'arena1':
      type = 2
      break
    case 'arena2':
      type = 3
      break
    case 'arena3':
      type = 4
      break
  }
  
  // Получаем статистики для текущего типа и сортируем по типу
  return getStatsByType(type).sort((a, b) => a.type - b.type)
})

const currentMoleculeIndex = ref(0)
let moleculeInterval: NodeJS.Timeout | null = null
const isCarouselStopped = ref(false) // Флаг для отслеживания ручной остановки

function startMoleculeCarousel () {
  if (molecules.value.length === 0) {
    return
  }
  // Если карусель была остановлена вручную, не запускаем автоматически
  if (isCarouselStopped.value) {
    return
  }
  // Очищаем предыдущий интервал, если он есть
  if (moleculeInterval) {
    clearInterval(moleculeInterval)
  }
  moleculeInterval = setInterval(() => {
    currentMoleculeIndex.value = (currentMoleculeIndex.value + 1) % molecules.value.length
  }, 5000) // Меняем каждые 5 секунд
}

function stopMoleculeCarousel () {
  if (moleculeInterval) {
    clearInterval(moleculeInterval)
    moleculeInterval = null
  }
  isCarouselStopped.value = true // Помечаем, что карусель остановлена вручную
}

function resumeMoleculeCarousel () {
  isCarouselStopped.value = false // Сбрасываем флаг
  startMoleculeCarousel() // Запускаем карусель
}

type SidebarType = 'forum1' | 'arena1' | 'arena2' | 'arena3'

const activeSidebarType = ref<SidebarType>('forum1')
const currentSection = ref<'arena1' | 'forum1' | 'arena2' | 'arena3'>('arena1')
const exhibitionSection1Ref = ref<HTMLElement | null>(null)
const exhibitionSection2Ref = ref<HTMLElement | null>(null)
const exhibitionSection3Ref = ref<HTMLElement | null>(null)
const forumSection1Ref = ref<HTMLElement | null>(null)
const exhibitionContainer1Ref = ref<HTMLElement | null>(null)
const exhibitionContainer2Ref = ref<HTMLElement | null>(null)
const exhibitionContainer3Ref = ref<HTMLElement | null>(null)
const forumContainer1Ref = ref<HTMLElement | null>(null)
const sidebarRef = ref<HTMLElement | null>(null)
const emptyMoleculeRef = ref<HTMLElement | null>(null)
const agendaSection1Ref = ref<HTMLElement | null>(null)
const agendaContainer1Ref = ref<HTMLElement | null>(null)

// Waitlist form state
const showWaitlistForm = ref(false)
const companiesListRef = ref<InstanceType<typeof CompaniesList> | null>(null)

// Данные программы
const programTabs = CURRENT_PROGRAM_TABS

const arena1Stands = [
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
]

const arena2Stands = [
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
]

const arena3Stands = [
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

function scrollToSection (section: 'arena1' | 'arena2' | 'arena3' | 'forum1') {
  let targetRef: HTMLElement | null = null

  switch (section) {
    case 'arena1':
      targetRef = exhibitionContainer1Ref.value
      break
    case 'arena2':
      targetRef = exhibitionContainer2Ref.value
      break
    case 'arena3':
      targetRef = exhibitionContainer3Ref.value
      break
    case 'forum1':
      targetRef = forumContainer1Ref.value
      break
  }

  if (!targetRef) {
    return
  }

  const containerTop = targetRef.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: containerTop,
    behavior: 'smooth'
  })

  // После скролла обновляем sidebar
  setTimeout(() => {
    updateSidebarByScroll()
  }, 500)
}

function updateSidebarByScroll () {
  if (!exhibitionSection1Ref.value || !exhibitionSection2Ref.value || !exhibitionSection3Ref.value || !forumSection1Ref.value) {
    return
  }

  const windowHeight = window.innerHeight
  const centerY = window.scrollY + windowHeight / 2

  const arena1Rect = exhibitionSection1Ref.value.getBoundingClientRect()
  const arena1Top = arena1Rect.top + window.scrollY
  const arena1Bottom = arena1Top + arena1Rect.height

  const forum1Rect = forumSection1Ref.value.getBoundingClientRect()
  const forum1Top = forum1Rect.top + window.scrollY
  const forum1Bottom = forum1Top + forum1Rect.height

  const arena2Rect = exhibitionSection2Ref.value.getBoundingClientRect()
  const arena2Top = arena2Rect.top + window.scrollY
  const arena2Bottom = arena2Top + arena2Rect.height

  const arena3Rect = exhibitionSection3Ref.value.getBoundingClientRect()
  const arena3Top = arena3Rect.top + window.scrollY
  const arena3Bottom = arena3Top + arena3Rect.height

  // Логика: sidebar показывает противоположное тому, что в центре экрана
  // Последовательность: arena1, forum1, arena2, arena3
  // Если центр экрана в области arena1 - показываем forum1 в sidebar
  // Если центр экрана в области forum1 - показываем arena1 в sidebar
  // Если центр экрана в области arena2 - показываем forum1 в sidebar
  // Если центр экрана в области arena3 - показываем forum1 в sidebar
  if (centerY >= arena1Top && centerY <= arena1Bottom) {
    activeSidebarType.value = 'forum1'
    currentSection.value = 'arena1'
  } else if (centerY >= forum1Top && centerY <= forum1Bottom) {
    activeSidebarType.value = 'arena1'
    currentSection.value = 'forum1'
  } else if (centerY >= arena2Top && centerY <= arena2Bottom) {
    activeSidebarType.value = 'forum1'
    currentSection.value = 'arena2'
  } else if (centerY >= arena3Top && centerY <= arena3Bottom) {
    activeSidebarType.value = 'forum1'
    currentSection.value = 'arena3'
  } else {
    // По умолчанию (когда видна arena1) показываем forum1 в sidebar
    activeSidebarType.value = 'forum1'
    currentSection.value = 'arena1'
  }
}

function handleScroll () {
  updateSidebarByScroll()
}

function scrollToEmptyMolecule () {
  if (!emptyMoleculeRef.value) {
    return
  }

  const targetTop = emptyMoleculeRef.value.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: targetTop,
    behavior: 'smooth'
  })
}

// Функция для обновления счетчика компаний
const updateCompaniesCount = (count: number) => {
  // Можно добавить логику обновления глобального счетчика, если нужно
  console.log('Companies count updated:', count)
}

// Функция для обработки успешной отправки формы
const handleWaitlistSuccess = async (newCompanyData: any) => {
  // Обновляем список компаний с подсветкой новой компании
  if (companiesListRef.value) {
    companiesListRef.value.refresh(newCompanyData)
  }
}

// Provide functions for child components to control carousel
provide('stopMoleculeCarousel', stopMoleculeCarousel)
provide('startMoleculeCarousel', resumeMoleculeCarousel) // Используем resume вместо start

// Загружаем данные молекул при монтировании
onMounted(async () => {
  updateSidebarByScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Загружаем данные молекул из Google Sheets
  await fetchMolecules()
  
  // Загружаем количество офферов из waitlist таблицы
  await fetchWaitlistCount()
  
  // Загружаем статистику для sidebar
  await fetchStats()
  
  // Загружаем спикеров
  await fetchSpeakers()
  
  // Загружаем партнеров
  await fetchPartners()
  
  // Запускаем карусель после загрузки данных
  if (molecules.value.length > 0) {
  startMoleculeCarousel()
  }
})

// Перезапускаем карусель при изменении данных молекул (только если не была остановлена вручную)
watch(molecules, (newMolecules) => {
  if (newMolecules.length > 0 && !moleculeInterval && !isCarouselStopped.value) {
    startMoleculeCarousel()
  }
}, { immediate: true })

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  stopMoleculeCarousel()
})
</script>

<style scoped>
.arena-section {
  font-family: 'Inter', system-ui, sans-serif;
}

.sidebar {
  width: 80px;
  flex-shrink: 0;
  align-self: flex-start;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: visible;
  position: sticky;
  top: 0;
  /* background-color: #f9fafb; */
}

@media (min-width: 640px) {
  .sidebar {
    width: 180px;
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

/* Fade transition для молекул */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hover эффект для кнопки "View all speakers" */
.view-all-button-wrapper :deep(button) {
  transition: background-color 0.3s ease;
}

.view-all-button-wrapper :deep(button:hover) {
  background-color: rgba(0, 0, 0, 0.85) !important;
}

.view-all-button-wrapper :deep(button:active) {
  background-color: rgba(0, 0, 0, 0.75) !important;
}
</style>
