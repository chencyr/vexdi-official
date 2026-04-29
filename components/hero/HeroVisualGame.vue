<template>
  <div class="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#e9fbff_0%,#f7fbff_46%,#c6f5f7_100%)]">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(255,255,255,0.95),transparent_22%),radial-gradient(circle_at_72%_68%,rgba(0,153,174,0.24),transparent_34%)]" />
    <div class="absolute left-[45%] top-8 h-[25rem] w-[14rem] -rotate-3 rounded-[7rem_7rem_4rem_4rem] bg-[linear-gradient(180deg,#102744_0%,#1fb7c3_46%,#f8fbff_47%,#1a2c4c_100%)] shadow-2xl">
      <div class="absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-[#f6d5c9] shadow-[0_0_0_18px_rgba(12,31,58,0.92)]" />
      <div class="absolute -left-10 top-24 h-44 w-20 rotate-12 rounded-full bg-[#102744]" />
      <div class="absolute -right-10 top-24 h-44 w-20 -rotate-12 rounded-full bg-[#102744]" />
      <div class="absolute left-1/2 top-[9.5rem] h-28 w-28 -translate-x-1/2 rounded-[2rem] border-4 border-white/80 bg-white/70" />
      <div class="absolute left-8 top-[18rem] h-24 w-10 rounded-full bg-[#101f38]" />
      <div class="absolute right-8 top-[18rem] h-24 w-10 rounded-full bg-[#101f38]" />
    </div>
    <div class="absolute left-4 top-16 w-56 rotate-6 rounded-3xl bg-slate-900 p-3 text-white shadow-2xl">
      <div class="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
        <span>Game UI</span>
        <span>LV.28</span>
      </div>
      <div class="grid grid-cols-5 gap-2">
        <span v-for="item in 10" :key="item" class="aspect-square rounded-lg bg-white/15" />
      </div>
    </div>
    <div class="absolute bottom-10 right-5 w-64 -rotate-3 rounded-2xl bg-slate-900 p-3 text-white shadow-2xl">
      <div class="grid grid-cols-4 gap-2">
        <div v-for="item in 4" :key="item" class="rounded-xl border border-cyan-200/30 bg-white/10 p-2">
          <div class="aspect-square rounded-lg bg-[linear-gradient(135deg,#d8fbff,#7788ff)]" />
          <div class="mt-2 h-1.5 rounded-full bg-amber-300" />
        </div>
      </div>
    </div>
    <div class="absolute right-8 top-16 w-32 rounded-[2rem] bg-slate-950 p-2 shadow-2xl">
      <div class="h-56 rounded-[1.6rem] bg-[linear-gradient(180deg,#dffcff,#1d6379)] p-3">
        <div class="h-16 rounded-2xl bg-slate-900/50" />
        <div class="mt-4 grid grid-cols-3 gap-2">
          <span v-for="item in 6" :key="item" class="h-7 rounded-lg bg-white/45" />
        </div>
      </div>
    </div>
    <span class="absolute left-[39%] top-12 h-4 w-4 rotate-45 bg-brand-coral" />
    <span class="absolute right-[14%] top-10 h-3 w-3 rotate-45 bg-brand-coral/70" />
    <span class="absolute left-[34%] bottom-24 h-5 w-5 rounded-full border-2 border-brand-teal" />
  </div>
</template>
