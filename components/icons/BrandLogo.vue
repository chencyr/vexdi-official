<script setup lang="ts">
const instanceId = useId()

const titleId = `brand-logo-title-${instanceId}`
const gradientId = `brand-logo-gradient-${instanceId}`
const darkGradientId = `brand-logo-dark-gradient-${instanceId}`
</script>

<template>
  <svg
    role="img"
    :aria-labelledby="titleId"
    data-logo-option="4"
    viewBox="0 0 260 72"
    class="h-12 w-[174px] sm:w-[190px]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title :id="titleId">Creative Tech Studio</title>
    <defs>
      <linearGradient :id="gradientId" x1="5" y1="10" x2="80" y2="58" gradientUnits="userSpaceOnUse">
        <stop stop-color="#20bfc8" />
        <stop offset="0.52" stop-color="#0f8d9c" />
        <stop offset="1" stop-color="#086d81" />
      </linearGradient>
      <linearGradient :id="darkGradientId" x1="104" y1="18" x2="248" y2="54" gradientUnits="userSpaceOnUse">
        <stop stop-color="#15294f" />
        <stop offset="1" stop-color="#061d3a" />
      </linearGradient>
    </defs>

    <g aria-hidden="true">
      <path
        d="M7.5 57.5L32.1 13.5C33.3 11.4 36.4 11.6 37.3 13.8L55.6 57.5H43.6L34.5 34.7L22.1 57.5H7.5Z"
        :fill="`url(#${gradientId})`"
      />
      <path
        d="M42.4 12.2H53.8C65.1 12.2 73.4 21.1 73.4 34.7C73.4 48.8 65.1 57.5 53.8 57.5H42.4V46.6H53.1C58.7 46.6 62.3 42.1 62.3 34.8C62.3 27.7 58.7 23.1 53.1 23.1H42.4V12.2Z"
        :fill="`url(#${gradientId})`"
      />
      <path
        d="M38.4 47.2L45.2 57.5H29.7L38.4 47.2Z"
        fill="#ffffff"
        fill-opacity="0.92"
      />
      <path
        d="M57.6 18.8C61.1 21.6 63.2 27.2 63.2 34.7C63.2 42.2 61.1 47.9 57.6 50.6"
        stroke="#ffffff"
        stroke-width="4.8"
        stroke-linecap="round"
        opacity="0.9"
      />
      <circle cx="61.6" cy="43.5" r="4.2" fill="#ff6f45" />

      <text
        x="92"
        y="40"
        :fill="`url(#${darkGradientId})`"
        class="hidden sm:block"
        font-family="'Noto Sans TC', 'Segoe UI', sans-serif"
        font-size="24"
        font-weight="800"
        letter-spacing="4"
      >
        創意
      </text>
      <text
        x="157"
        y="40"
        fill="#ff6f45"
        class="hidden sm:block"
        font-family="'Noto Sans TC', 'Segoe UI', sans-serif"
        font-size="20"
        font-weight="700"
      >
        ×
      </text>
      <text
        x="184"
        y="40"
        :fill="`url(#${darkGradientId})`"
        class="hidden sm:block"
        font-family="'Noto Sans TC', 'Segoe UI', sans-serif"
        font-size="24"
        font-weight="800"
        letter-spacing="4"
      >
        技術
      </text>
      <path class="hidden sm:block" d="M140 52H168" stroke="#0f8d9c" stroke-width="2.4" stroke-linecap="round" />
      <circle class="hidden sm:block" cx="174" cy="52" r="2.2" fill="#0f8d9c" />
    </g>
  </svg>
</template>
