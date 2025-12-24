<template>
  <section
    ref="sectionRef"
    id="arena3"
    class="exhibition-section px-4 md:px-6 lg:px-8"
  >
    <div ref="containerRef">
      <h2 id="arena3-showcase" class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
        Showcase Spot
      </h2>

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
            <img
              src="https://storage.yandexcloud.net/videos-meyou/arena/images/offer/1.webp"
              alt="Showcase interior"
              class="w-full h-full object-contain"
            >
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 md:gap-12 gap-7 mb-8">
        <div>
          <h3 class="md:text-2xl md:mb-5 mb-2 font-bold">Good for:</h3>
          <ul class="text-sm md:text-base xl:text-lg space-y-2">
            <li>• Medical & Aesthetic Clinics – General clinics, plastic surgery, dentistry.</li>
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
                <li>- 10, 11 November (market days)  20 Spots in the corridors + 60 Spots in the main hall</li>
              </ul>
            </li>
            <br><br>
            <li class="font-bold">B) 50 lead chats per day from EFW visitors (Our Matchmaking technology)</li>
            <li><b>C) 50"</b> Display for presentations with a table and 2 bar chairs</li>
            <br><br>
            <li><b>D)</b> VIP invitations to all EFW runway shows on 8–11 November 2025</li>
          </ul>
          <br><br>
          <div class="flex items-start text-sm md:text-base xl:text-lg">
            <svg class="w-6 h-6 text-amber-400 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p class="font-medium mb-2">
                <b>Laptops are not provided.</b>
                Each exhibitor must bring their own laptop and connect it to the display via HDMI to showcase their company's video or presentation.
              </p>
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
            <li>Early Birds / any day</li>
            <li>• <span class="line-through opacity-50">3,600 AED / 1,000$</span></li>
            <li>• 3,000 AED / 800$ / per day</li>
          </ul>
          <WhatsAppButton
            phone-number="971585753302"
            text="Contact us about Showcase spot"
          />
          <a
            href="#join-waitlist"
            class="mt-3 inline-flex items-center gap-2 px-6 py-2.5 text-sm rounded-3xl transition-colors border border-black hover:bg-gray-100 w-fit"
            @click.prevent="emit('open-waitlist')"
          >
            <span>2h Free Trial Spot Waitlist</span>
            <span
              style="background-color: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 12px; font-weight: bold;"
            >
              {{ waitlistCount }}
            </span>
            <span>></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WhatsAppButton from '~/components/ui/WhatsAppButton.vue'

const props = defineProps<{
  waitlistCount: number
}>()

const emit = defineEmits<{
  (e: 'open-waitlist'): void
}>()

const sectionRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

defineExpose({
  sectionRef,
  containerRef
})
</script>


