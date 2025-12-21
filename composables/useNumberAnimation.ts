import { ref, type Ref } from 'vue'
import gsap from 'gsap'

export interface NumberAnimation {
  displayNumber: Ref<string>
  animateNumber: (startValue: string | number, endValue: string | number) => void
}

export function useNumberAnimation (initialValue: string | number = '0'): NumberAnimation {
  const displayNumber = ref(String(initialValue))

  const animateNumber = (startValue: string | number, endValue: string | number) => {
    const start = Number.parseInt(String(startValue), 10)
    const end = Number.parseInt(String(endValue), 10)

    if (Number.isNaN(start) || Number.isNaN(end)) {
      // Если пришли некорректные данные, просто устанавливаем конечное значение
      displayNumber.value = String(endValue)
      return
    }

    const obj = { value: start }

    gsap.to(obj, {
      value: end,
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



