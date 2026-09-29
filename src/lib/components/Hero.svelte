<script>
  import { muralsData, categories } from '../data/murals.js';
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

  // Auto-play interval
  $effect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % muralsData.length;
    }, 5000);
    return () => clearInterval(timer);
  });

  function nextSlide() {
    currentIndex = (currentIndex + 1) % muralsData.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + muralsData.length) % muralsData.length;
  }

  let currentMural = $derived(muralsData[currentIndex]);
</script>

<div 
  onmouseenter={() => isPaused = true}
  onmouseleave={() => isPaused = false}
  class="relative w-full h-[75vh] sm:h-[82vh] md:h-[88vh] min-h-[520px] max-h-[900px] bg-zinc-950 overflow-hidden group select-none border-b border-zinc-800/80"
>
  <!-- Background Image Carousel with Crossfade -->
  {#each muralsData as mural, idx (mural.id)}
    <div 
      class="absolute inset-0 transition-opacity duration-700 ease-in-out {idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}"
    >
      <img 
        src={mural.image} 
        alt={mural.titleEn} 
        class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-linear"
        style={idx === currentIndex ? 'transform: scale(1.0); transition: transform 6s ease-out;' : ''}
      />
      <!-- Dark Gradient Overlay for optimal readability (matched to reference design) -->
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/40"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/40"></div>
    </div>
  {/each}

  <!-- Left Carousel Arrow Button -->
  <button 
    onclick={prevSlide}
    aria-label="Previous slide"
    class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
  </button>

  <!-- Right Carousel Arrow Button -->
  <button 
    onclick={nextSlide}
    aria-label="Next slide"
    class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
  </button>

  <!-- Bottom Left Text Overlay (Matching exact reference layout!) -->
  <div class="absolute bottom-10 sm:bottom-16 left-6 sm:left-12 lg:left-16 z-30 max-w-2xl space-y-3">
    
    <!-- Location Badge -->
    <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950/70 backdrop-blur-md border border-zinc-700/80 text-zinc-300 text-xs sm:text-sm font-medium">
      <svg class="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      <span>{currentMural.location}, {currentMural.district}</span>
    </div>

    <!-- Main Title in Elegant Playfair Serif -->
    <div>
      <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-hero text-rose-100 tracking-tight leading-none drop-shadow-lg">
        Walls of July
      </h1>
      <h2 class="text-xl sm:text-3xl font-bold font-bengali text-amber-300 mt-2">
        {currentMural.titleBn}
      </h2>
    </div>

    <!-- Description Subtitle -->
    <p class="text-sm sm:text-lg text-zinc-300 font-sans max-w-xl leading-relaxed drop-shadow-md">
      A photographic record of the graffiti left behind after the July Revolution.
    </p>

    <!-- Slide Details Action Button -->
    <div class="pt-2 flex items-center gap-3">
      <button 
        onclick={() => onOpenModal(currentMural)}
        class="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-xl shadow-rose-600/40 transition-all flex items-center gap-2"
      >
        <span>Inspect Artwork</span> →
      </button>
      <span class="text-xs text-zinc-400 font-mono">
        Slide {currentIndex + 1} of {muralsData.length}
      </span>
    </div>
  </div>

  <!-- Bottom Right Carousel Slide Indicators / Dots -->
  <div 
    use:dragScroll
    class="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-30 flex items-center gap-2 bg-zinc-950/60 backdrop-blur-md px-3 py-2 rounded-full border border-zinc-800/80 max-w-[80vw] overflow-x-auto custom-h-scrollbar cursor-grab active:cursor-grabbing select-none"
  >
    {#each muralsData as _, idx}
      <button 
        onclick={() => currentIndex = idx}
        aria-label="Go to slide {idx + 1}"
        class="h-2 rounded-full transition-all duration-300 shrink-0 {idx === currentIndex ? 'w-8 bg-rose-500 shadow-md shadow-rose-500/50' : 'w-2 bg-zinc-600 hover:bg-zinc-400'}"
      ></button>
    {/each}
  </div>
</div>

<!-- Search & Category Filters Bar (Below Carousel) -->
<section class="py-8 bg-wall-pattern border-b border-zinc-800/80">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
    <div class="max-w-3xl mx-auto space-y-4 text-center">
      
      <!-- Search Box -->
      <div class="relative flex items-center">
        <svg class="w-5 h-5 absolute left-4 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search murals by slogan, location, tag or artist (e.g. TSC, Mugdha, Mirpur)..."
          value={searchQuery}
          oninput={(e) => onSearchChange(e.target.value)}
          class="w-full pl-12 pr-10 py-4 bg-zinc-900/90 border border-zinc-700/80 focus:border-rose-500 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-xl transition-all"
        />
        {#if searchQuery}
          <button 
            onclick={() => onSearchChange('')}
            class="absolute right-4 text-zinc-400 hover:text-white text-sm bg-zinc-800 rounded-full w-6 h-6 flex items-center justify-center"
            aria-label="Clear search"
          >
            ✕
          </button>
        {/if}
      </div>

      <!-- Categories Pill Filter -->
      <div 
        use:dragScroll
        class="flex items-center gap-2 overflow-x-auto pb-2 pt-2 custom-h-scrollbar scroll-smooth justify-start sm:justify-center cursor-grab active:cursor-grabbing select-none"
      >
        {#each categories as cat}
          <button
            onclick={() => onCategoryChange(cat)}
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 {selectedCategory === cat ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30 scale-105' : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}"
          >
            {cat}
          </button>
        {/each}
      </div>

    </div>
  </div>
</section>
