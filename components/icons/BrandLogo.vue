<script setup lang="ts">
const instanceId = useId()

const titleId = `brand-logo-title-${instanceId}`
const gradientId = `brand-logo-gradient-${instanceId}`
</script>

<template>
  <svg
    role="img"
    :aria-labelledby="titleId"
    viewBox="0 0 240 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title :id="titleId">Creative Tech Studio</title>
    <defs>
      <linearGradient :id="gradientId" x1="12" y1="8" x2="228" y2="56" gradientUnits="userSpaceOnUse">
        <stop stop-color="#16b8c4" />
        <stop offset="0.56" stop-color="#29d5df" />
        <stop offset="1" stop-color="#ff8a6d" />
      </linearGradient>
    </defs>
    <g>
      <rect x="4" y="4" width="56" height="56" rx="18" :fill="`url(#${gradientId})`" />
      <path
        d="M18 19.5L30.5 14.5L43 19.5V29.5C43 36.9 37.95 43.45 30.5 46.5C23.05 43.45 18 36.9 18 29.5V19.5Z"
        fill="#ffffff"
        fill-opacity="0.92"
      />
      <path
        d="M22.5 24.2L30.5 20.5L38.5 24.2V29.4C38.5 34.7 35.1 39.35 30.5 41.45C25.9 39.35 22.5 34.7 22.5 29.4V24.2Z"
        fill="#16b8c4"
      />
      <circle cx="30.5" cy="30" r="4.5" fill="#ff8a6d" />
      <path
        d="M74 18H84.2L93.5 42.1H86.9L85.1 37H73.1L71.3 42.1H64.8L74 18ZM83.4 32.6L79.1 20.8H78.9L74.7 32.6H83.4Z"
        fill="#062c36"
      />
      <path
        d="M97 18H102.9V42.1H97V18Z"
        fill="#062c36"
      />
      <path
        d="M110.2 18H121.7C128.9 18 133.8 22.9 133.8 30.1C133.8 37.4 128.9 42.1 121.7 42.1H110.2V18ZM121.2 37.1C125.2 37.1 127.7 34.5 127.7 30.1C127.7 25.8 125.2 23 121.2 23H116.2V37.1H121.2Z"
        fill="#062c36"
      />
      <path
        d="M143 18H162.1V23H148.9V27.9H160.2V32.8H148.9V37.1H162.5V42.1H143V18Z"
        fill="#062c36"
      />
      <path
        d="M176.9 23H169.8V18H190.9V23H183.8V42.1H176.9V23Z"
        fill="#062c36"
      />
      <path
        d="M199.2 18H205.1V42.1H199.2V18Z"
        fill="#062c36"
      />
      <path
        d="M214.5 18H220.4L230 33.8V18H235.8V42.1H229.9L220.3 26.3V42.1H214.5V18Z"
        fill="#062c36"
      />
    </g>
  </svg>
</template>
