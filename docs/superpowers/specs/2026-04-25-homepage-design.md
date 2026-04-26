# Creative Tech Studio Homepage Design

## Goal

Build a one-page portfolio homepage for `Creative x Technology` that uses strong visual storytelling to attract inquiries for three service lines:

- Game-related projects
- Brand / portfolio websites
- App UI/UX design

The homepage should prioritize brand memory first, then trust, then conversion to the official LINE account.

## Design Direction

Chosen direction: `品牌敘事型`

This direction uses the homepage as a guided story:

1. Capture attention with a high-impact hero
2. Explain positioning and services clearly
3. Reduce inquiry friction through process clarity
4. Prove quality through portfolio and testimonials
5. Convert consistently through LINE-first CTA placement

## Confirmed Decisions

### Product / architecture

- Tech stack: `Nuxt + Vue 3 + Tailwind CSS + Pinia`
- Site structure: `one-page homepage`
- Main contact path: all CTA flows lead to `LINE 官方帳號`

### Hero / visual system

- Desktop homepage uses a single `Hero carousel`
- Hero left copy changes together with the active slide
- Slides are:
  - `Game`
  - `Website`
  - `App`
- Female character artwork appears only in the `Game` slide
- `Website` and `App` slides use product / layout visuals instead of character art

### Mobile behavior

- Mobile does **not** use the desktop carousel pattern
- Mobile opens with one strongest hero visual
- Below the opening hero, content branches into `Game / Website / App` sections
- Mobile navbar uses a `hamburger menu`

### Contact behavior

- Floating chat entry is **not** a real on-site chat UI in v1
- Floating button opens the `LINE 官方帳號` directly
- Chat widget preview panel is removed from v1 behavior

### Content / section decisions

- Homepage v1 includes:
  - `Navbar`
  - `Hero Carousel`
  - `About`
  - `Services`
  - `Process`
  - `Portfolio`
  - `Testimonials`
  - `Footer CTA`
  - floating LINE button
- `About` uses pure brand typography and geometric visuals
- `Process` uses a horizontal 4-step timeline
- `Testimonials` are fixed 2-3 cards, no carousel
- `Portfolio` cards open a `modal`

### Portfolio modal

Each portfolio modal includes:

- Cover image
- Project type
- Short intro
- Process / design highlights
- CTA leading to LINE

### Brand assets

- Selected logo direction: `方案四`
- First implementation target is a usable `SVG` logo derived from that concept

## Information Architecture

### Desktop page rhythm

1. `Navbar + Hero`
2. `About`
3. `Services`
4. `Process`
5. `Portfolio`
6. `Testimonials`
7. `Footer CTA`

### Mobile page rhythm

1. `Navbar`
2. single opening `Hero`
3. service branching blocks for `Game / Website / App`
4. `About`
5. `Services`
6. `Process`
7. `Portfolio`
8. `Testimonials`
9. `Footer CTA`
10. floating LINE button

## Section Roles

### Navbar

Purpose:

- Keep brand visible
- Enable anchor navigation
- Provide immediate LINE access

Desktop:

- Left: SVG logo
- Center: `Game / Website / App / About / Process / Portfolio / Contact`
- Right: `加 LINE 諮詢`
- Sticky with light glass effect on scroll

Mobile:

- Left: logo
- Right: hamburger trigger
- Menu contains the same section anchors plus LINE CTA

### Hero

Purpose:

- Establish memory and category clarity
- Communicate service scope immediately
- Deliver strongest visual differentiation

Desktop behavior:

- Large horizontal carousel
- Center slide is dominant
- Side edges of adjacent slides remain partially visible
- Left-side text changes with active slide
- Includes arrows and pagination indicators

Slide rules:

- `Game`: female character key visual, lighter supporting UI cards, not overly noisy
- `Website`: brand layout mockups, composition system, premium editorial tone
- `App`: device UI cards, dashboard modules, product-flow feel

CTA behavior:

- All hero CTAs go to LINE

### About

Purpose:

- Build trust quickly without turning into a personal biography

Visual style:

- Strong typography
- Logo-derived geometry
- No personal portrait, no character portrait

Content focus:

- Cross-domain capability
- Design + implementation thinking
- Why one person can handle Website / Game / App work coherently

### Services

Purpose:

- Help potential clients self-identify their project type quickly

Structure:

- 3 cards
  - `形象網站`
  - `遊戲專案`
  - `App 設計`

### Process

Purpose:

- Lower inquiry anxiety
- Show that collaboration is structured and predictable

Desktop:

- Horizontal 4-step timeline

Mobile:

- Vertical stacked version of the same 4 steps

Steps:

1. `需求諮詢`
2. `提案與排程`
3. `設計與製作`
4. `交付與優化`

### Portfolio

Purpose:

- Be the core proof section
- Show not only outcomes but also thinking

Behavior:

- Cards are clickable
- Clicking opens a modal

Modal contents:

- Large project image
- Project type / category
- Intro summary
- Process or key design highlights
- CTA to LINE

Initial data approach:

- Use `示意專案` in v1

### Testimonials

Purpose:

- Add social proof after portfolio

Behavior:

- Fixed 2-3 cards
- No slider in v1

### Footer CTA

Purpose:

- Final conversion push

Behavior:

- Strong closing copy
- Primary CTA to LINE

### Floating LINE button

Purpose:

- Persistent conversion path across the page

Behavior:

- Fixed bottom corner entry
- Directly opens LINE
- No intermediate chat preview UI

## Visual Language

- Tone: lively, creative, youthful, but commercially trustworthy
- Main color: teal / cyan family
- Accent colors: coral orange, bright yellow
- Backgrounds: gradients + soft geometry, never flat plain color
- Card style: large radius, soft shadow, light glass feel where appropriate
- Typography: clean, readable traditional Chinese
- Constraint: avoid letting Game aesthetics overpower the whole site

## Interaction Notes

- Desktop hero uses carousel interaction
- Mobile removes carousel complexity in favor of a simpler top-down reading flow
- Portfolio modals are the main interactive detail layer in v1
- All conversion interaction paths collapse to one target: LINE

## V1 Scope

Included in v1:

- Full homepage layout
- Responsive desktop + mobile implementation
- SVG logo implementation from concept direction
- Desktop hero carousel
- Mobile single-hero opening
- Portfolio modal interaction
- Fixed testimonials section
- LINE-first CTA flow

Not included in v1:

- Real WebSocket chat
- Admin / CMS
- Portfolio inner pages
- Backend API
- Real-time customer service system

## Recommended File / Component Shape

- `pages/index.vue`
- `components/layout/AppNavbar.vue`
- `components/hero/HeroCarousel.vue`
- `components/hero/HeroSlideGame.vue`
- `components/hero/HeroSlideWebsite.vue`
- `components/hero/HeroSlideApp.vue`
- `components/sections/AboutSection.vue`
- `components/sections/ServicesSection.vue`
- `components/sections/ProcessSection.vue`
- `components/sections/PortfolioSection.vue`
- `components/sections/TestimonialsSection.vue`
- `components/sections/FooterCtaSection.vue`
- `components/overlay/PortfolioModal.vue`
- `components/floating/LineFab.vue`

Suggested stores:

- `stores/ui.ts`
- `stores/hero.ts`
- `stores/portfolio.ts`

## Reference Assets

- Mobile reference:
  `assets/references/mobile-final-with-chat.png`
- Desktop reference:
  `assets/references/desktop-hero-carousel-final.png`
- Logo concept board:
  `assets/references/logo-concept-board-v1.png`

## Spec Self-Review

Checked:

- No unresolved contradiction between desktop and mobile behavior
- CTA flow is consistent: LINE only
- Chat widget behavior is simplified and no longer conflicts with WebSocket v1 scope
- Portfolio interaction is clearly defined as modal, not anchor jump
- Logo direction is defined for implementation, though SVG art still needs to be created
