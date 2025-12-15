<template>
  <section ref="sectionRef" class=" bg-black text-white 2xl:py-16 xl:py-12 py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-3 gap-8">
        <div
          v-for="(stat, index) in statistics"
          :key="index"
          class="text-left"
        >
          <h2 class="text-3xl xl:text-5xl 2xl:text-6xl font-light mb-2">
            {{ displayNumbers[index].displayNumber }}
            <span v-if="index !== 0">+</span> 
          </h2>
          <p class="text-white text-base xl:text-xl 2xl:text-2xl">{{ stat.label }}</p>
          <p class="text-white text-sm xl:text-lg 2xl:text-xl">{{ stat.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNumberAnimation } from '~/composables/useNumberAnimation';

const sectionRef = ref(null);
const statistics = [
  { startNumber: '1', endNumber: '1', label: 'SEASON', text: 'Dubai Arena' },
  { startNumber: '50', endNumber: '100', label: 'DESIGNERS', text: 'expected' },
  { startNumber: '500', endNumber: '1000', label: 'VISITORS', text: 'anticipated' },
];

// Создаем массив анимированных чисел
const displayNumbers = statistics.map((stat) =>
  useNumberAnimation(stat.startNumber)
);

const animateNumbers = () => {
  statistics.forEach((stat, index) => {
    displayNumbers[index].animateNumber(stat.startNumber, stat.endNumber);
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  observer.observe(sectionRef.value);
});
</script>
