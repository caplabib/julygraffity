<script>
  import { muralsData, categories } from '../data/murals.js';
  import { fetchHeroMurals } from '$lib/supabase.js';

  let { 
    searchQuery = '', 
    onSearchChange = () => {}, 
    selectedCategory = 'All', 
    onCategoryChange = () => {},
    onSelectTab = () => {},
    onOpenModal = () => {} 
  } = $props();

  let currentIndex = $state(0);
  let isPaused = $state(false);
  let muralsList = $state(muralsData);
  let isTallScreen = $state(false);

  // Touch swipe support
  let touchStartX = $state(0);
  let touchStartY = $state(0);
  let touchMoved = $state(false);
  let isSwiping = $state(false);

  // Helper to check if a database column flag is active
  function isHeroActive(value) {
    if (value === true || value === 1) return true;
    if (typeof value === 'string') {
      const v = value.trim().toLowerCase();
      if (v === 'false' || v === '0' || v === '' || v === 'null' || v === 'undefined') return false;
      return true;
    }
    return false;
  }

  // Helper to get custom image if column has filename/URL, otherwise fallback to mural.image
  function getHeroImageSrc(mural, isPortrait) {
    const specific = isPortrait ? mural.heroPortraits : mural.heroLandscape;
    if (typeof specific === 'string') {
      const trimmed = specific.trim();
      const lower = trimmed.toLowerCase();
      if (['true', 't', '1', 'yes'].includes(lower)) {
        return mural.image;
      }
      if (trimmed.length > 0 && !['false', '0', 'null', 'undefined'].includes(lower)) {
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
          return trimmed;
        }
        return `https://jvxgqflxmumxhjeywmjp.supabase.co/storage/v1/object/public/julytest/${trimmed}`;
      }
    }
    return mural.image;
  }

  // Detect tall screen (mobile / portrait) vs wide screen (PC / landscape)
  $effect(() => {
    function detectScreenRatio() {
      if (typeof window === 'undefined') return;
      const isPortraitByMedia = window.matchMedia('(orientation: portrait)').matches;
      const isTallByRatio = window.innerHeight > window.innerWidth;
      const isMobileWidth = window.innerWidth < 768;
      isTallScreen = isPortraitByMedia || isTallByRatio || isMobileWidth;
    }

    detectScreenRatio();
    window.addEventListener('resize', detectScreenRatio);
    window.addEventListener('orientationchange', detectScreenRatio);
    return () => {
      window.removeEventListener('resize', detectScreenRatio);
      window.removeEventListener('orientationchange', detectScreenRatio);
    };
  });

  // Load dynamic murals from Supabase on mount
  $effect(() => {
    fetchHeroMurals().then((data) => {
      if (data && data.length > 0) {
        muralsList = data;
      }
    });
  });

  // Filter murals separately for tall screen (portraits) vs wide screen (landscape)
  let activeHeroMurals = $derived.by(() => {
    if (isTallScreen) {
      // Tall / mobile screen: use hero-portraits
      const portraitMurals = muralsList.filter(m => isHeroActive(m.heroPortraits));
      if (portraitMurals.length > 0) return portraitMurals;
    } else {
      // Wide / PC screen: use hero-landscape
      const landscapeMurals = muralsList.filter(m => isHeroActive(m.heroLandscape));
      if (landscapeMurals.length > 0) return landscapeMurals;
    }
    // Fallback if no matching records yet
    return muralsList;
  });

  // Ensure current index is within bounds when list shifts
  $effect(() => {
    if (currentIndex >= activeHeroMurals.length) {
      currentIndex = 0;
    }
  });

  // Auto-play interval
  $effect(() => {
    if (isPaused || activeHeroMurals.length === 0) return;
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % activeHeroMurals.length;
    }, 4000);
    return () => clearInterval(timer);
  });

  function nextSlide() {
    if (activeHeroMurals.length === 0) return;
    currentIndex = (currentIndex + 1) % activeHeroMurals.length;
  }

  function prevSlide() {
    if (activeHeroMurals.length === 0) return;
    currentIndex = (currentIndex - 1 + activeHeroMurals.length) % activeHeroMurals.length;
  }

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
    isSwiping = true;
    isPaused = true;
  }

  function handleTouchEnd(e) {
    if (!isSwiping) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      touchMoved = true;
    }

    // Only swipe if horizontal movement > vertical (avoid hijacking scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    isSwiping = false;
    isPaused = false;
  }

  function handleHeroClick() {
    if (touchMoved) {
      touchMoved = false;
      return;
    }
    onOpenModal(currentMural);
  }

  function scrollToContent(e) {
    e.stopPropagation();
    const el = document.getElementById('search-and-filters');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  let currentMural = $derived(activeHeroMurals[currentIndex % activeHeroMurals.length] || activeHeroMurals[0] || muralsList[0]);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  onmouseenter={() => isPaused = true}
  onmouseleave={() => isPaused = false}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
  onclick={handleHeroClick}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenModal(currentMural)}
  role="button"
  tabindex="0"
  aria-label="View artwork details for {currentMural?.titleEn || currentMural?.titleBn}"
  class="hero-viewport-container relative w-full overflow-hidden group select-none border-b border-zinc-800/80 cursor-pointer focus:outline-none"
  class:is-tall={isTallScreen}
  class:is-wide={!isTallScreen}
>
  <!-- Background Image Carousel with Crossfade & Responsive Image Sources -->
  {#each activeHeroMurals as mural, idx (mural.id)}
    <div 
      class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out {idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}"
    >
      <div 
        class="absolute inset-0 w-full h-full bg-cover bg-center transform scale-105 transition-transform duration-[7000ms] ease-linear will-change-transform"
        style="background-image: url('{getHeroImageSrc(mural, isTallScreen)}'); {idx === currentIndex ? 'transform: scale(1.0);' : ''}"
      ></div>
      <!-- Dark Gradient Overlay tuned separately for portrait vs landscape -->
      {#if isTallScreen}
        <!-- Tall / Mobile Screen Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/25"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent"></div>
      {:else}
        <!-- Wide / PC Screen Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/30 to-transparent"></div>
      {/if}
    </div>
  {/each}

  <!-- Left Carousel Arrow Button -->
  <button 
    onclick={(e) => { e.stopPropagation(); prevSlide(); }}
    aria-label="Previous slide"
    class="absolute left-2.5 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-zinc-950/60 sm:bg-white/20 hover:bg-zinc-900 sm:hover:bg-white/40 border border-white/20 sm:border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
  >
    <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
  </button>

  <!-- Right Carousel Arrow Button -->
  <button 
    onclick={(e) => { e.stopPropagation(); nextSlide(); }}
    aria-label="Next slide"
    class="absolute right-2.5 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-zinc-950/60 sm:bg-white/20 hover:bg-zinc-900 sm:hover:bg-white/40 border border-white/20 sm:border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
  >
    <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
  </button>

  <!-- Slide Counter Pill (Top-Right or Bottom-Right) -->
  <div class="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-none">
    <div class="px-3 py-1 rounded-full bg-zinc-950/70 border border-zinc-700/70 backdrop-blur-md text-[11px] sm:text-xs text-zinc-300 font-mono shadow-lg">
      {currentIndex + 1} / {activeHeroMurals.length}
    </div>
  </div>

  <!-- Text Overlay: Configured separately for Tall Screen (Mobile) vs Wide Screen (PC) -->
  {#if isTallScreen}
    <!-- TALL SCREEN (Mobile / Portrait) OVERLAY -->
    <div class="absolute bottom-12 left-3 right-3 z-30 pointer-events-none space-y-2">
      <!-- Location Badge -->
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-zinc-300 text-[11px] font-medium max-w-full">
        <svg class="w-3 h-3 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <span class="truncate">{currentMural.location || currentMural.district}</span>
      </div>

      <!-- Main Titles for Tall Screen -->
      <div>
        <h1 class="font-bold font-serif-hero text-rose-100 tracking-tight leading-none drop-shadow-xl text-3xl sm:text-4xl">
          Walls of July
        </h1>
        <h2 class="font-bold font-bengali text-amber-300 mt-1 truncate drop-shadow-md text-base sm:text-lg">
          {currentMural.titleBn}
        </h2>
      </div>

      <!-- Slogan / Subtitle for Tall Screen -->
      {#if currentMural.slogan}
        <p class="text-xs text-zinc-200 font-bengali font-semibold line-clamp-1 drop-shadow-md">
          "{currentMural.slogan}"
        </p>
      {:else}
        <p class="text-xs text-zinc-300 font-sans line-clamp-2 drop-shadow-md">
          A photographic record of the graffiti left behind after the July Revolution.
        </p>
      {/if}
    </div>
  {:else}
    <!-- WIDE / PC SCREEN (Desktop / Landscape) OVERLAY -->
    <div class="absolute bottom-12 lg:bottom-16 left-8 lg:left-16 z-30 max-w-2xl xl:max-w-3xl space-y-3 pointer-events-none">
      <!-- Location Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/75 backdrop-blur-md border border-zinc-700/80 text-zinc-300 text-xs font-medium max-w-full shadow-lg">
        <svg class="w-3.5 h-3.5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <span class="truncate">{currentMural.location}, {currentMural.district}</span>
      </div>

      <!-- Main Titles for Wide Screen -->
      <div>
        <h1 class="font-bold font-serif-hero text-rose-100 tracking-tight leading-none drop-shadow-2xl text-5xl lg:text-7xl">
          Walls of July
        </h1>
        <h2 class="font-bold font-bengali text-amber-300 mt-2 truncate drop-shadow-md text-xl lg:text-3xl">
          {currentMural.titleBn}
        </h2>
      </div>

      <!-- Description Subtitle for Wide Screen -->
      <p class="text-sm lg:text-base text-zinc-300 font-sans max-w-xl leading-relaxed drop-shadow-md">
        {#if currentMural.slogan}
          <span class="text-amber-200/90 font-bengali font-semibold">"{currentMural.slogan}"</span> — 
        {/if}
        A photographic record of the graffiti left behind after the July Revolution.
      </p>
    </div>
  {/if}

  <!-- Subtle Scroll / Explore Down Indicator -->
  <button 
    onclick={scrollToContent}
    class="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white transition-all hover:scale-105 active:scale-95"
    aria-label="Scroll to search and explore artworks"
  >
    <span class="text-[10px] uppercase tracking-widest font-mono opacity-80">Explore</span>
    <svg class="w-4 h-4 animate-bounce text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
</div>

<!-- Search & Category Filters Bar (Below Full-Height Carousel) -->
<section id="search-and-filters" class="py-5 sm:py-8 bg-wall-pattern border-b border-zinc-800/80 scroll-mt-20">
  <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-3 sm:space-y-6">
    <div class="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-center">
      
      <!-- Search Box -->
      <div class="relative flex items-center">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search by slogan, location, tag or artist..."
          value={searchQuery}
          oninput={(e) => onSearchChange(e.target.value)}
          class="w-full pl-9 sm:pl-12 pr-10 py-3 sm:py-4 bg-zinc-900/90 border border-zinc-700/80 focus:border-rose-500 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-xl transition-all"
        />
        {#if searchQuery}
          <button 
            onclick={() => onSearchChange('')}
            class="absolute right-3 sm:right-4 text-zinc-400 hover:text-white text-xs sm:text-sm bg-zinc-800 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
            aria-label="Clear search"
          >
            ✕
          </button>
        {/if}
      </div>

      <!-- Categories Pill Filter -->
      <div 
        class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 px-2 mx-auto custom-h-scrollbar scroll-smooth"
      >
        {#each categories as cat}
          <button
            onclick={() => onCategoryChange(cat)}
            class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 {selectedCategory === cat ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30 scale-105' : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}"
          >
            {cat}
          </button>
        {/each}
      </div>

    </div>
  </div>
</section>

<style>
  .hero-viewport-container {
    width: 100%;
    /* Default to mobile/tall screen height */
    height: calc(100dvh - 4rem);
    min-height: 520px;
  }

  /* WIDE / PC SCREEN VIEW: Whole height of screen minus desktop navbar (80px) */
  @media (min-width: 768px) and (orientation: landscape) {
    .hero-viewport-container {
      height: calc(100dvh - 5rem);
      min-height: 640px;
    }
  }
</style>
