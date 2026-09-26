<script>
  let { 
    mural = null, 
    onClose = () => {}, 
    onNext = () => {}, 
    onPrev = () => {} 
  } = $props();

  let isZoomed = $state(false);
  let showCopiedToast = $state(false);

  function handleKeydown(e) {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }

  function copyShareLink() {
    if (!mural) return;
    const shareText = `Check out this July Uprising Mural: "${mural.titleEn}" located at ${mural.location} - Bangladesh July 2024 Archive`;
    navigator.clipboard.writeText(window.location.href);
    showCopiedToast = true;
    setTimeout(() => {
      showCopiedToast = false;
    }, 2500);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if mural}
  <!-- Backdrop -->
  <div 
    onclick={onClose}
    class="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
  >
    <!-- Modal Content Container -->
    <div 
      onclick={(e) => e.stopPropagation()}
      class="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
    >
      <!-- Close Button -->
      <button 
        onclick={onClose}
        class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-zinc-950/80 border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md shadow-lg"
        aria-label="Close modal"
      >
        ✕
      </button>

      <!-- Previous & Next Nav Buttons for Desktop -->
      <button 
        onclick={onPrev}
        class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-950/80 border border-zinc-700 text-white hover:bg-rose-600 hover:border-rose-500 items-center justify-center transition-all backdrop-blur-md shadow-lg"
        aria-label="Previous artwork"
      >
        ←
      </button>

      <button 
        onclick={onNext}
        class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-950/80 border border-zinc-700 text-white hover:bg-rose-600 hover:border-rose-500 items-center justify-center transition-all backdrop-blur-md shadow-lg"
        aria-label="Next artwork"
      >
        →
      </button>

      <!-- Image Column -->
      <div class="lg:w-7/12 bg-zinc-950 relative flex items-center justify-center min-h-[300px] lg:min-h-[550px] overflow-hidden group">
        <img 
          src={mural.image} 
          alt={mural.titleEn}
          class="w-full h-full object-contain max-h-[60vh] lg:max-h-[85vh] transition-transform duration-300 {isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}"
          onclick={() => isZoomed = !isZoomed}
        />
        
        <div class="absolute bottom-3 left-3 bg-zinc-950/80 border border-zinc-800 backdrop-blur-md px-3 py-1 rounded-full text-xs text-zinc-400">
          Click image to {isZoomed ? 'zoom out' : 'zoom in'}
        </div>
      </div>

      <!-- Detail Info Column -->
      <div class="lg:w-5/12 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto space-y-6 bg-zinc-900">
        <div class="space-y-4">
          <!-- Category & District Badges -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              {mural.category}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {mural.district} District
            </span>
          </div>

          <!-- Titles -->
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold font-bengali text-white leading-snug">
              {mural.titleBn}
            </h2>
            <p class="text-sm text-zinc-400 font-medium mt-1">
              {mural.titleEn}
            </p>
          </div>

          <!-- Slogan Highlight Box -->
          {#if mural.slogan}
            <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-zinc-950 to-zinc-950 border border-rose-500/30">
              <span class="text-xs uppercase tracking-widest text-rose-400 font-bold block mb-1">Mural Slogan</span>
              <p class="text-base font-bold font-bengali text-amber-300">
                "{mural.slogan}"
              </p>
            </div>
          {/if}

          <!-- Metadata List -->
          <div class="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <div>
              <span class="text-zinc-500 block">Location:</span>
              <span class="text-zinc-200 font-semibold">{mural.location}</span>
            </div>
            <div>
              <span class="text-zinc-500 block">Date Archived:</span>
              <span class="text-zinc-200 font-semibold">{mural.date}</span>
            </div>
            <div class="col-span-2">
              <span class="text-zinc-500 block">Artist / Collective:</span>
              <span class="text-rose-400 font-semibold">{mural.artist}</span>
            </div>
          </div>

          <!-- Bengali Description -->
          <div class="space-y-2">
            <h4 class="text-xs uppercase tracking-wider font-bold text-zinc-400">ঐতিহাসিক প্রেক্ষাপট (Context)</h4>
            <p class="text-sm font-bengali text-zinc-300 leading-relaxed">
              {mural.descriptionBn}
            </p>
          </div>

          <!-- English Description -->
          <div class="space-y-2">
            <p class="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-rose-500 pl-3">
              "{mural.descriptionEn}"
            </p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 pt-2">
            {#each mural.tags as tag}
              <span class="px-2.5 py-0.5 rounded-md bg-zinc-950 text-zinc-400 text-[11px] border border-zinc-800">
                #{tag}
              </span>
            {/each}
          </div>
        </div>

        <!-- Action Footer -->
        <div class="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
          <button 
            onclick={copyShareLink}
            class="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share Mural
          </button>

          <!-- Mobile Prev/Next -->
          <div class="flex sm:hidden gap-2">
            <button onclick={onPrev} class="p-3 bg-zinc-800 rounded-xl text-white">←</button>
            <button onclick={onNext} class="p-3 bg-zinc-800 rounded-xl text-white">→</button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if showCopiedToast}
  <div class="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-semibold text-sm px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-2 animate-bounce">
    ✓ Link copied to clipboard!
  </div>
{/if}
