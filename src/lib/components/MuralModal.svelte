<script>
  let { 
    mural = null, 
    onClose = () => {}, 
    onNext = () => {}, 
    onPrev = () => {} 
  } = $props();

  let isZoomed = $state(false);
  let showDetailsSidebar = $state(true);
  let showCopiedToast = $state(false);

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      if (isZoomed) {
        isZoomed = false;
      } else {
        onClose();
      }
    }
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'f' || e.key === 'F') toggleSidebar();
    if (e.key === 'z' || e.key === 'Z') toggleZoom();
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
  }

  function toggleSidebar() {
    showDetailsSidebar = !showDetailsSidebar;
  }

  function copyShareLink() {
    if (!mural) return;
    navigator.clipboard.writeText(window.location.href);
    showCopiedToast = true;
    setTimeout(() => {
      showCopiedToast = false;
    }, 2500);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if mural}
  <!-- Full-Page Modal Overlay Container -->
  <div 
    role="dialog"
    aria-modal="true"
    aria-label={mural.titleEn || mural.titleBn}
    class="fixed inset-0 z-50 w-screen h-[100dvh] bg-zinc-950 flex flex-col overflow-hidden animate-fadeIn select-none"
  >
    <!-- Top Bar Navigation -->
    <header class="h-16 px-4 sm:px-6 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/80 flex items-center justify-between shrink-0 z-30">
      <!-- Left: Back Button & Title -->
      <div class="flex items-center gap-3 min-w-0">
        <button 
          onclick={onClose}
          class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-rose-600 text-zinc-200 hover:text-white transition-all text-xs sm:text-sm font-medium shrink-0 border border-zinc-700/60"
          aria-label="Back to gallery"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span class="hidden sm:inline">Back</span>
        </button>

        <div class="truncate">
          <div class="flex items-center gap-2">
            <h1 class="text-sm sm:text-base font-bold font-bengali text-white truncate">
              {mural.titleBn}
            </h1>
            {#if mural.category}
              <span class="hidden md:inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {mural.category}
              </span>
            {/if}
            {#if mural.district}
              <span class="hidden lg:inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {mural.district}
              </span>
            {/if}
          </div>
          {#if mural.titleEn}
            <p class="text-xs text-zinc-400 truncate hidden sm:block">
              {mural.titleEn}
            </p>
          {/if}
        </div>
      </div>

      <!-- Right: Action Controls -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Zoom Toggle -->
        <button
          onclick={toggleZoom}
          class="px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all border border-zinc-700/50"
          title={isZoomed ? "Zoom out (Z)" : "Zoom in (Z)"}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {#if isZoomed}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path></svg>
            <span class="hidden md:inline">Zoom Out</span>
          {:else}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path></svg>
            <span class="hidden md:inline">Zoom In</span>
          {/if}
        </button>

        <!-- Toggle Info Sidebar (Desktop) -->
        <button
          onclick={toggleSidebar}
          class="hidden lg:flex px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium items-center gap-1.5 transition-all border border-zinc-700/50 {showDetailsSidebar ? 'bg-zinc-800' : 'bg-rose-950/40 text-rose-300 border-rose-700/50'}"
          title="Toggle info sidebar (F)"
          aria-label="Toggle details sidebar"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="hidden xl:inline">{showDetailsSidebar ? 'Hide Details' : 'Show Details'}</span>
        </button>

        <!-- Share Button -->
        <button
          onclick={copyShareLink}
          class="px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all border border-zinc-700/50"
          title="Copy share link"
          aria-label="Share mural"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          <span class="hidden sm:inline">Share</span>
        </button>

        <!-- Close Button -->
        <button 
          onclick={onClose}
          class="w-9 h-9 rounded-xl bg-zinc-800/90 hover:bg-rose-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all border border-zinc-700/50 ml-1"
          title="Close (Esc)"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </header>

    <!-- Main Full-Page Body -->
    <div class="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">
      <!-- Full Image Stage Area -->
      <main class="flex-1 h-full relative flex items-center justify-center bg-black/90 overflow-hidden group">
        <!-- Floating Prev Button -->
        <button 
          onclick={onPrev}
          class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-2xl bg-zinc-950/80 hover:bg-rose-600 border border-zinc-800 hover:border-rose-500 text-white flex items-center justify-center transition-all backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95"
          aria-label="Previous artwork (Left arrow key)"
          title="Previous artwork (←)"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <!-- Floating Next Button -->
        <button 
          onclick={onNext}
          class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-2xl bg-zinc-950/80 hover:bg-rose-600 border border-zinc-800 hover:border-rose-500 text-white flex items-center justify-center transition-all backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95"
          aria-label="Next artwork (Right arrow key)"
          title="Next artwork (→)"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <!-- Center Image Box -->
        <div 
          class="w-full h-full flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-auto cursor-pointer"
          onclick={toggleZoom}
          onkeydown={(e) => e.key === 'Enter' && toggleZoom()}
          role="button"
          tabindex="0"
          aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
        >
          <img 
            src={mural.image} 
            alt={mural.titleEn || mural.titleBn}
            class="max-w-full max-h-full object-contain transition-transform duration-300 rounded-lg shadow-2xl {isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}"
          />
        </div>

        <!-- Floating Bottom Status Bar / Hint -->
        <div class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950/80 border border-zinc-800 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-zinc-400 flex items-center gap-3 z-10 shadow-lg">
          <span>{isZoomed ? '🔍 Click to zoom out' : '🔍 Click image to zoom in'}</span>
          <span class="text-zinc-600">•</span>
          <span>Use ← → to browse</span>
        </div>
      </main>

      <!-- Details Sidebar (Full Height or Collapsible on Desktop) -->
      {#if showDetailsSidebar}
        <aside class="w-full lg:w-[400px] xl:w-[460px] shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-800/80 bg-zinc-900/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-none z-20">
          <div class="p-6 sm:p-8 space-y-6">
            <!-- Category & District Badges -->
            <div class="flex items-center gap-2 flex-wrap">
              {#if mural.category}
                <span class="px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {mural.category}
                </span>
              {/if}
              {#if mural.district}
                <span class="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {mural.district} District
                </span>
              {/if}
              {#if mural.division}
                <span class="px-3.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  {mural.division} Division
                </span>
              {/if}
            </div>

            <!-- Title Section -->
            <div class="space-y-1">
              <h2 class="text-2xl sm:text-3xl font-extrabold font-bengali text-white leading-snug">
                {mural.titleBn}
              </h2>
              {#if mural.titleEn}
                <p class="text-sm sm:text-base text-zinc-400 font-medium">
                  {mural.titleEn}
                </p>
              {/if}
            </div>

            <!-- Slogan Card (if present) -->
            {#if mural.slogan}
              <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-zinc-950 to-zinc-950 border border-rose-500/30 shadow-inner">
                <span class="text-[11px] uppercase tracking-widest text-rose-400 font-bold block mb-1">Mural Slogan</span>
                <p class="text-base font-bold font-bengali text-amber-300">
                  "{mural.slogan}"
                </p>
              </div>
            {/if}

            <!-- Metadata Details Grid -->
            <div class="grid grid-cols-2 gap-3 text-xs p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-sm">
              <div class="col-span-2">
                <span class="text-zinc-500 block mb-0.5">Location:</span>
                <span class="text-zinc-200 font-semibold text-sm">
                  {mural.location}{mural.upzila ? ` (${mural.upzila})` : ''}
                </span>
              </div>
              
              {#if mural.datePainted || mural.date}
                <div>
                  <span class="text-zinc-500 block mb-0.5">Date Painted:</span>
                  <span class="text-zinc-200 font-medium">{mural.datePainted || mural.date}</span>
                </div>
              {/if}

              {#if mural.dateCaptured}
                <div>
                  <span class="text-zinc-500 block mb-0.5">Date Captured:</span>
                  <span class="text-zinc-200 font-medium">{mural.dateCaptured}</span>
                </div>
              {/if}

              {#if mural.artist}
                <div class="col-span-2 pt-1 border-t border-zinc-900">
                  <span class="text-zinc-500 block mb-0.5">Artist / Collective:</span>
                  <span class="text-rose-400 font-semibold">{mural.artist}</span>
                </div>
              {/if}
            </div>

            <!-- Bengali Description Context -->
            {#if mural.descriptionBn}
              <div class="space-y-1.5">
                <h3 class="text-xs uppercase tracking-wider font-bold text-zinc-400">ঐতিহাসিক প্রেক্ষাপট (Context)</h3>
                <p class="text-sm font-bengali text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/40">
                  {mural.descriptionBn}
                </p>
              </div>
            {/if}

            <!-- English Description Context -->
            {#if mural.descriptionEn}
              <div class="space-y-1.5">
                <p class="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-rose-500 pl-3">
                  "{mural.descriptionEn}"
                </p>
              </div>
            {/if}

            <!-- Tags -->
            {#if mural.tags && mural.tags.length > 0}
              <div class="space-y-2 pt-1">
                <h3 class="text-xs uppercase tracking-wider font-bold text-zinc-400">Tags</h3>
                <div class="flex flex-wrap gap-1.5">
                  {#each mural.tags as tag}
                    <span class="px-2.5 py-1 rounded-lg bg-zinc-950 text-zinc-400 text-xs border border-zinc-800 hover:border-zinc-700">
                      #{tag}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>

          <!-- Action Footer inside sidebar -->
          <div class="p-6 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between gap-3">
            <button 
              onclick={copyShareLink}
              class="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              Share Mural
            </button>

            <!-- Quick Next/Prev for Mobile -->
            <div class="flex sm:hidden gap-2">
              <button onclick={onPrev} class="p-3 bg-zinc-800 rounded-xl text-white hover:bg-zinc-700" aria-label="Previous">←</button>
              <button onclick={onNext} class="p-3 bg-zinc-800 rounded-xl text-white hover:bg-zinc-700" aria-label="Next">→</button>
            </div>
          </div>
        </aside>
      {/if}
    </div>
  </div>
{/if}

<!-- Toast Notification -->
{#if showCopiedToast}
  <div class="fixed bottom-6 right-6 z-[60] bg-emerald-600 text-white font-semibold text-sm px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-2 animate-bounce">
    ✓ Link copied to clipboard!
  </div>
{/if}
