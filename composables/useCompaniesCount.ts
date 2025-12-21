import { ref, readonly } from 'vue'

// Глобальное состояние для счетчика компаний
const companiesCount = ref(0)
const trialWaitlistCount = ref(0)

export const useCompaniesCount = () => {
  const updateCompaniesCount = (count: number) => {
    companiesCount.value = count
  }

  const updateTrialWaitlistCount = (count: number) => {
    trialWaitlistCount.value = count
  }

  const getCompaniesCount = () => {
    return companiesCount.value
  }

  const getTrialWaitlistCount = () => {
    return trialWaitlistCount.value
  }

  return {
    companiesCount: readonly(companiesCount),
    trialWaitlistCount: readonly(trialWaitlistCount),
    updateCompaniesCount,
    updateTrialWaitlistCount,
    getCompaniesCount,
    getTrialWaitlistCount
  }
}
