<template>
  <!-- SEO компонент без визуального отображения -->
</template>

<script setup>
import { computed } from 'vue'

const CANONICAL_DOMAIN = 'https://thearena.show' // TODO: заменить на ваш домен

const props = defineProps({
  title: {
    type: String,
    default: 'The Leads Arena - Платформа для генерации и управления лидами'
  },
  description: {
    type: String,
    default: 'The Leads Arena - современная платформа для эффективной генерации, управления и анализа лидов. Инструменты для роста вашего бизнеса.'
  },
  image: {
    type: String,
    default: `${CANONICAL_DOMAIN}/og-image.jpg`
  },
  keywords: {
    type: String,
    default: 'лиды, генерация лидов, управление лидами, CRM, маркетинг, бизнес, продажи'
  },
  // Дополнительные опции для микроразметки
  schemaType: {
    type: String,
    default: null, // 'organization', 'website', 'article', null
    validator: (value) => !value || ['organization', 'website', 'article'].includes(value)
  },
  // Данные для Article
  articleData: {
    type: Object,
    default: null
  },
  // Данные для BreadcrumbList
  breadcrumbs: {
    type: Array,
    default: null
  }
})

const route = useRoute()

// Используем computed для канонического URL:
// - игнорируем query-параметры (utm, трекинг и т.п.)
// - убираем лишний закрывающий слэш
const canonicalPath = computed(() => {
  const path = route.path || '/'
  if (path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
})

const canonicalUrl = computed(() => `${CANONICAL_DOMAIN}${canonicalPath.value}`)

// Вычисляем скрипты для микроразметки
const schemaScripts = computed(() => {
  const scripts = [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Leads Arena',
        url: CANONICAL_DOMAIN,
        logo: `${CANONICAL_DOMAIN}/favicon-512x512.png`,
        description: props.description,
        contactPoint: [{
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'ask@thearena.show'
        }]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Leads Arena',
        url: CANONICAL_DOMAIN,
        description: props.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${CANONICAL_DOMAIN}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]

  // BreadcrumbList для всех страниц
  if (props.breadcrumbs && props.breadcrumbs.length > 0) {
    scripts.push({
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url || `${CANONICAL_DOMAIN}${crumb.path || route.path}`
        }))
      })
    })
  } else {
    // Автоматические breadcrumbs на основе пути
    const pathSegments = route.path.split('/').filter(Boolean)
    if (pathSegments.length > 0) {
      const breadcrumbItems = [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: CANONICAL_DOMAIN }
      ]
      let currentPath = ''
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const name = segment.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: index + 2,
          name: name,
          item: `${CANONICAL_DOMAIN}${currentPath}`
        })
      })
      scripts.push({
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems
        })
      })
    }
  }

  // Article микроразметка
  if (props.schemaType === 'article' && props.articleData) {
    scripts.push({
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.articleData.headline || props.title,
        description: props.articleData.description || props.description,
        image: props.articleData.image || props.image,
        datePublished: props.articleData.datePublished,
        dateModified: props.articleData.dateModified || props.articleData.datePublished,
        author: {
          '@type': 'Organization',
          name: 'The Leads Arena'
        },
        publisher: {
          '@type': 'Organization',
          name: 'The Leads Arena',
          logo: {
            '@type': 'ImageObject',
            url: `${CANONICAL_DOMAIN}/favicon-512x512.png`
          }
        },
        url: canonicalUrl.value
      })
    })
  }

  return scripts
})

useHead(() => ({
  title: props.title,
  meta: [
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    },
    {
      name: 'googlebot',
      content: 'index, follow'
    },
    {
      name: 'description',
      content: props.description
    },
    {
      property: 'og:url',
      content: canonicalUrl.value
    },
    {
      property: 'og:title',
      content: props.title
    },
    {
      property: 'og:description',
      content: props.description
    },
    {
      property: 'og:image',
      content: props.image
    },
    {
      property: 'og:image:secure_url',
      content: props.image
    },
    {
      property: 'og:image:type',
      content: 'image/png'
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
    },
    {
      property: 'og:image:alt',
      content: props.title
    },
    {
      name: 'keywords',
      content: props.keywords
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:site_name',
      content: 'The Leads Arena'
    },
    {
      property: 'og:locale',
      content: 'ru_RU'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: props.title
    },
    {
      name: 'twitter:description',
      content: props.description
    },
    {
      name: 'twitter:image',
      content: props.image
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value
    }
  ],
  script: schemaScripts.value
}))
</script>


