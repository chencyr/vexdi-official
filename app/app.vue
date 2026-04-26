<template>
  <div class="min-h-screen bg-site text-slate-900 antialiased">
    <NuxtLoadingIndicator color="#16b8c4" />
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="shell">
      <span class="shell-orb shell-orb--left" aria-hidden="true" />
      <span class="shell-orb shell-orb--right" aria-hidden="true" />
      <div id="main-content" class="shell-main" tabindex="-1">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
