/* =========================================================================
   Vexdi 維思迪 — Shared partials & interactions
   - Auto-injects <nav> + <footer> into placeholders
   - Wires reveal-on-scroll, FAQ accordion exclusivity, mobile drawer
   - Boots hero canvas (paper-particle flow) when #heroFlow exists
   Usage:
     <body data-base="">     ← homepage
     <body data-base="../">  ← subpage
     <div data-vexdi-nav data-active="services|cases|about|process|founding|blog|contact"></div>
     <div data-vexdi-footer></div>
   ========================================================================= */

(function(){
  'use strict';

  const base = document.body.getAttribute('data-base') || '';
  const isHome = !base; // empty string == homepage
  const url = (path) => {
    if (path.startsWith('mailto:') || path.startsWith('http') || path.startsWith('#')) return path;
    return base + path;
  };
  // Anchor links: on homepage they're #anchor; on subpages they need to point at homepage.
  const anchor = (id) => isHome ? `#${id}` : `${base}index.html#${id}`;

  /* ---------- NAV ---------- */
  function renderNav(active){
    const items = [
      { key:'services', href: `${base}services/index.html`, label:'服務' },
      { key:'cases',    href: `${base}cases/index.html`,    label:'概念作品' },
      { key:'about',    href: `${base}about/index.html`,    label:'關於' },
      { key:'process',  href: `${base}process/index.html`,  label:'合作流程' },
      { key:'founding', href: `${base}founding/index.html`, label:'創始客戶', cta:true },
      { key:'blog',     href: `${base}blog/index.html`,     label:'觀點' },
    ];
    const links = items.map(i => {
      const cls = [
        active === i.key ? 'active' : '',
        i.cta ? 'cta-link' : '',
      ].filter(Boolean).join(' ');
      return `<a href="${i.href}"${cls?` class="${cls}"`:''}>${i.label}</a>`;
    }).join('');

    const drawerLinks = items.map(i => {
      const cls = active === i.key ? 'active' : '';
      return `<a href="${i.href}"${cls?` class="${cls}"`:''}>${i.label}</a>`;
    }).join('');

    return `
<nav class="nav" role="navigation">
  <div class="wrap nav-inner">
    <a href="${url('index.html')}" class="brand" aria-label="Vexdi 維思迪 首頁">
      <img src="${url('monbyw53-header-logo-pic-font-white.png')}" alt="VEXDi"/>
      <span class="brand-cn">維思迪</span>
    </a>
    <div class="nav-links">${links}</div>
    <div class="nav-cta">
      <a href="mailto:hi@vexdi.com" class="nav-mail">hi@vexdi.com</a>
      <a href="${anchor('contact')}" class="btn btn-primary" style="padding:10px 18px;font-size:14px">聊聊你的專案 <span class="arr">→</span></a>
      <button class="nav-burger" aria-label="開啟選單" aria-expanded="false" aria-controls="navDrawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="nav-drawer" id="navDrawer" aria-hidden="true">
  ${drawerLinks}
  <a href="${anchor('contact')}" class="btn btn-primary">聊聊你的專案 <span class="arr">→</span></a>
  <a href="mailto:hi@vexdi.com" class="btn btn-ghost">hi@vexdi.com</a>
</div>`;
  }

  /* ---------- FOOTER ---------- */
  function renderFooter(){
    return `
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="${url('index.html')}" class="brand">
          <img src="${url('monbyw53-header-logo-pic-font-white.png')}" alt="VEXDi"/>
        </a>
        <p>替客戶量身打造官網、微型 SaaS 與 AI 自動化的產品工作室。<br/>2026 年由 Rex Chen 創辦於台北 · 10+ 年 SaaS 實戰經驗。</p>
      </div>
      <div class="foot-col">
        <h4>服務</h4>
        <ul>
          <li><a href="${base}services/index.html">官方網站開發</a></li>
          <li><a href="${base}services/index.html">微型 SaaS 開發</a></li>
          <li><a href="${base}services/index.html">AI 自動化整合</a></li>
          <li><a href="${base}services/index.html#aftercare">後續維運</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>資源</h4>
        <ul>
          <li><a href="${base}cases/index.html">概念作品</a></li>
          <li><a href="${base}blog/index.html">觀點文章</a></li>
          <li><a href="${base}process/index.html">合作流程</a></li>
          <li><a href="${anchor('faq')}">常見問題</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>公司</h4>
        <ul>
          <li><a href="${base}about/index.html">關於我們</a></li>
          <li><a href="${base}founding/index.html">創始客戶</a></li>
          <li><a href="mailto:hi@vexdi.com">聯絡</a></li>
          <li><a href="mailto:hi@vexdi.com?subject=媒體聯繫">媒體聯繫</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>條款</h4>
        <ul>
          <li><a href="${base}legal/terms.html">服務條款</a></li>
          <li><a href="${base}legal/privacy.html">隱私政策</a></li>
          <li><a href="${base}legal/security.html">資安宣告</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bot">
      <span>© 2026 Vexdi 維思迪 Co., Ltd. All rights reserved.</span>
      <span class="foot-status"><span class="dot"></span>創始客戶餘額 3 / 3 · 截止 2026.08</span>
    </div>
  </div>
</footer>`;
  }

  /* ---------- INJECT ---------- */
  function inject(){
    const navSlot = document.querySelector('[data-vexdi-nav]');
    if (navSlot) {
      const active = navSlot.getAttribute('data-active') || '';
      navSlot.outerHTML = renderNav(active);
    }
    const footSlot = document.querySelector('[data-vexdi-footer]');
    if (footSlot) {
      footSlot.outerHTML = renderFooter();
    }
  }

  /* ---------- INTERACTIONS ---------- */
  function wireMobileDrawer(){
    const burger = document.querySelector('.nav-burger');
    const drawer = document.getElementById('navDrawer');
    if (!burger || !drawer) return;
    const close = () => {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', () => {
      const open = !drawer.classList.contains('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  function wireReveal(){
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>io.observe(el));
  }

  function wireFaq(){
    const items = document.querySelectorAll('.faq-item');
    items.forEach(d => d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.removeAttribute('open'); });
    }));
  }

  /* ---------- HERO PARTICLES ---------- */
  function bootHero(){
    const canvas = document.getElementById('heroFlow');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = document.getElementById('hero');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W=0, H=0, particles=[], running=true;
    let mx=-9999, my=-9999, mActive=false;
    let entranceT = 0;
    const ENTRANCE_LEN = 70;
    let burstX=0, burstY=0;

    function resize(){
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W*dpr; canvas.height = H*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      burstX = W < 980 ? W*0.18 : W*0.12;
      burstY = W < 980 ? H*0.85 : H*0.88;
      seed();
    }
    function seed(){
      const target = Math.min(260, Math.floor(W*H/5200));
      particles = [];
      for(let i=0;i<target;i++){
        const p = spawn(true);
        const ang = -Math.PI*0.42 + Math.random()*Math.PI*0.36;
        const r = Math.random()*18;
        p.x = burstX + Math.cos(ang)*r;
        p.y = burstY + Math.sin(ang)*r;
        const burstSpd = 5 + Math.random()*8;
        p.vx = Math.cos(ang)*burstSpd;
        p.vy = Math.sin(ang)*burstSpd;
        p.ang = ang;
        p.life = Math.floor(Math.random()*40);
        particles.push(p);
      }
      particles = particles.slice(-target);
      entranceT = 0;
    }
    function spawn(rand){
      const cyan = Math.random() < 0.45;
      const long = 6 + Math.random()*10;
      return {
        x: rand ? Math.random()*W : (Math.random() < 0.6 ? Math.random()*W*0.55 : -10),
        y: rand ? Math.random()*H : (Math.random() < 0.6 ? H + 10 : H*0.45 + Math.random()*H*0.55),
        vx: 0, vy: 0,
        w: long,
        h: 1.2 + Math.random()*1.6,
        ang: Math.random()*Math.PI*2,
        roll: Math.random()*Math.PI*2,
        rollSpeed: 0.04 + Math.random()*0.06,
        life: 0,
        maxLife: 220 + Math.random()*220,
        seed: Math.random()*1000,
        color: cyan ? [0,229,255] : [123,97,255],
        baseAlpha: 0.45 + Math.random()*0.45,
        angBias: (Math.random()-0.5)*1.2,
        speedBias: 0.8 + Math.random()*0.7,
        driftX: 0.40 + Math.random()*0.55,
        driftY: -(0.25 + Math.random()*0.40),
      };
    }

    let t = 0;
    function flowAt(x,y,time){
      const nx = x*0.0042;
      const ny = y*0.0055;
      const a = Math.sin(nx + time*0.6) + Math.cos(ny*1.4 - time*0.4);
      const b = Math.sin((nx+ny)*0.9 + time*0.35);
      const c = Math.sin(nx*3.1 - ny*2.3 + time*0.9) * 0.6;
      const d = Math.cos(nx*5.7 + ny*4.1 - time*1.1) * 0.35;
      const turbulence = ((a + b)*0.55 + c + d) * 0.55;
      return turbulence - Math.PI*0.20;
    }

    function step(){
      if(!running) return;
      t += 0.012;
      ctx.fillStyle = 'rgba(13,17,23,0.10)';
      ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation = 'lighter';

      const mix = Math.min(1, entranceT / ENTRANCE_LEN);
      const ease = mix*mix*(3-2*mix);
      entranceT++;

      for(let i=0;i<particles.length;i++){
        const p = particles[i];
        const flowAng = flowAt(p.x, p.y, t + p.seed*0.001) + p.angBias;
        const speed = (0.55 + Math.sin(t*0.5 + p.seed)*0.25 + 0.6) * p.speedBias;
        const flowVx = Math.cos(flowAng)*speed + p.driftX;
        const flowVy = Math.sin(flowAng)*speed*0.9 + p.driftY;

        p.vx = p.vx*(1-ease)*0.92 + flowVx*ease;
        p.vy = p.vy*(1-ease)*0.92 + flowVy*ease;

        if(mActive){
          const dx = mx - p.x, dy = my - p.y;
          const dist2 = dx*dx + dy*dy;
          const R = 180;
          if(dist2 < R*R && dist2 > 1){
            const dist = Math.sqrt(dist2);
            const pull = (1 - dist/R) * 0.55;
            p.vx += (dx/dist) * pull;
            p.vy += (dy/dist) * pull;
          }
        }

        p.x += p.vx; p.y += p.vy;
        p.life++;

        const targetAng = Math.atan2(p.vy, p.vx);
        let d = targetAng - p.ang;
        while(d > Math.PI) d -= Math.PI*2;
        while(d < -Math.PI) d += Math.PI*2;
        p.ang += d * 0.18;

        p.roll += p.rollSpeed + Math.abs(d)*0.3;
        const fore = 0.25 + 0.75*Math.abs(Math.cos(p.roll));

        const lifeRatio = p.life/p.maxLife;
        const fade = lifeRatio < 0.15
          ? lifeRatio/0.15
          : lifeRatio > 0.85 ? (1-lifeRatio)/0.15 : 1;
        const alpha = p.baseAlpha * fade;
        const [r,g,b] = p.color;

        const wL = p.w * fore;
        const hL = p.h;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.ang);

        const glowLen = wL + 6, glowH = hL + 5;
        const grd = ctx.createLinearGradient(-glowLen, 0, glowLen, 0);
        grd.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grd.addColorStop(0.5, `rgba(${r},${g},${b},${alpha*0.55})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(-glowLen, -glowH/2, glowLen*2, glowH);

        const facing = 0.55 + 0.45*Math.cos(p.roll);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1,alpha*1.5*facing+0.15)})`;
        ctx.fillRect(-wL/2, -hL/2, wL, hL);
        ctx.restore();

        if(p.x > W+20 || p.y < -20 || p.y > H+20 || p.life > p.maxLife){
          particles[i] = spawn(false);
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(resize); ro.observe(canvas);
    resize();

    if (hero){
      hero.addEventListener('mousemove', (e)=>{
        const rect = canvas.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
        mActive = true;
      });
      hero.addEventListener('mouseleave', ()=>{ mActive = false; });
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches){
      for(let k=0;k<60;k++){ t+=0.012; }
      step(); running=false;
    } else {
      requestAnimationFrame(step);
    }
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(step);
    });
  }

  /* ---------- BOOT ---------- */
  function boot(){
    inject();
    wireMobileDrawer();
    wireReveal();
    wireFaq();
    bootHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
