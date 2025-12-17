import { ref } from 'vue'
import gsap from 'gsap'

export function useNumberAnimation (initialValue = '0') {
  const displayNumber = ref(initialValue)

  const animateNumber = (startValue, endValue) => {
    const obj = { value: parseInt(startValue) }
    gsap.to(obj, {
      value: parseInt(endValue),
      duration: 2,
      ease: 'power1.out',
      onUpdate: () => {
        displayNumber.value = Math.round(obj.value).toString()
      }
    })
  }

  return {
    displayNumber,
    animateNumber
  }
}
