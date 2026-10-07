<script>
  import { muralsData, categories } from '../data/murals.js';
  import { fetchMurals } from '$lib/supabase.js';
  import { dragScroll } from '$lib/utils/dragScroll.js';

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

  // Touch swipe support
  let touchStartX = $state(0);
  let touchStartY = $state(0);
  let isSwiping = $state(false);

  // Load dynamic murals from Supabase on mount
  $effect(() => {
    fetchMurals().then((data) => {
      if (data && data.length > 0) {
        muralsList = data;
      }
    });
  });

  // Auto-play interval
  $effect(() => {
    if (isPaused || muralsList.length === 0) return;
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % muralsList.length;
    }, 3000);
    return () => clearInterval(timer);
  });

  function nextSlide() {
    if (muralsList.length === 0) return;
    currentIndex = (currentIndex + 1) % muralsList.length;
  }

  function prevSlide() {
    if (muralsList.length === 0) return;
    currentIndex = (currentIndex - 1 + muralsList.length) % muralsList.length;
  }

  let touchMoved = $state(false);

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
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
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

  let currentMural = $derived(muralsList[currentIndex] || muralsList[0]);
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
  class="relative w-full bg-zinc-950 overflow-hidden group select-none border-b border-zinc-800/80 cursor-pointer focus:outline-none"
  style="height: clamp(360px, 68svh, 820px);"
>
  <!-- Background Image Carousel with Crossfade -->
  {#each muralsList as mural, idx (mural.id)}
    <div 
      class="absolute inset-0 transition-opacity duration-700 ease-in-out {idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}"
    >
      <img 
        src={mural.image} 
        alt={mural.titleEn} 
        class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-linear will-change-transform"
        style={idx === currentIndex ? 'transform: scale(1.0);' : ''}
        loading={idx < 3 ? 'eager' : 'lazy'}
      />
      <!-- Dark Gradient Overlay for optimal readability across any screen -->
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-zinc-950/30"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/30 to-transparent"></div>
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

  <!-- Bottom Left Text Overlay -->
  <div class="absolute bottom-6 sm:bottom-10 lg:bottom-14 left-3 sm:left-8 lg:left-16 z-30 max-w-[calc(100%-4.5rem)] sm:max-w-xl lg:max-w-2xl space-y-2 sm:space-y-3 pointer-events-none">
    
    <!-- Location Badge -->
    <div class="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full bg-zinc-950/75 backdrop-blur-md border border-zinc-700/80 text-zinc-300 text-[11px] sm:text-xs font-medium max-w-full">
      <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      <span class="truncate">{currentMural.location}, {currentMural.district}</span>
    </div>

    <!-- Main Title -->
    <div>
      <h1 class="font-bold font-serif-hero text-rose-100 tracking-tight leading-none drop-shadow-lg" style="font-size: clamp(1.6rem, 5vw, 4.25rem);">
        Walls of July
      </h1>
      <h2 class="font-bold font-bengali text-amber-300 mt-1 sm:mt-2 truncate drop-shadow-md" style="font-size: clamp(0.95rem, 2.5vw, 1.75rem);">
        {currentMural.titleBn}
      </h2>
    </div>

    <!-- Description Subtitle -->
    <p class="text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-xl leading-relaxed drop-shadow-md line-clamp-2">
      A photographic record of the graffiti left behind after the July Revolution.
    </p>
  </div>
</div>

<!-- Search & Category Filters Bar (Below Carousel) -->
<section class="py-4 sm:py-8 bg-wall-pattern border-b border-zinc-800/80">
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
        use:dragScroll
        class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 custom-h-scrollbar scroll-smooth justify-start sm:justify-center cursor-grab active:cursor-grabbing select-none -mx-2 px-2"
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
