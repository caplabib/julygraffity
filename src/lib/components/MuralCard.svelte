<script>
  let { mural = {}, onOpenModal = () => {} } = $props();

  let isLiked = $state(false);
  let likeCount = $state(mural.likes || 0);

  $effect(() => {
    likeCount = mural.likes || 0;
    try {
      const savedLikes = localStorage.getItem(`like_${mural.id}`);
      if (savedLikes === 'true') {
        isLiked = true;
      }
    } catch (e) {}
  });

  function toggleLike(e) {
    e.stopPropagation();
    isLiked = !isLiked;
    if (isLiked) {
      likeCount++;
    } else {
      likeCount--;
    }
    try {
      localStorage.setItem(`like_${mural.id}`, isLiked ? 'true' : 'false');
    } catch (e) {}
  }
</script>

<!-- Photo Item with Info Overlay ON TOP of Image (Zero Black Gap) -->
<div 
  role="button"
  tabindex="0"
  onclick={() => onOpenModal(mural)}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenModal(mural)}
  class="group inline-block w-full align-top cursor-pointer break-inside-avoid mb-6 select-none"
>
  <!-- Image Wrapper (Guarantees Overlay is Attached Directly to Image) -->
  <div class="relative w-full overflow-hidden rounded-2xl border border-zinc-800/80 group-hover:border-rose-500/60 shadow-2xl transition-all duration-300">
    
    <!-- Image preserving natural aspect ratio -->
    <img 
      src={mural.image} 
      alt={mural.titleEn}
      loading="lazy"
      class="w-full h-auto block object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
    />

    <!-- Top-Left React Heart Badge -->
    <button 
      onclick={toggleLike}
      aria-label="React to artwork"
      class="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/70 border border-zinc-700/80 backdrop-blur-md text-white hover:border-rose-500 transition-all text-xs font-bold shadow-lg"
    >
      <svg 
        class="w-4 h-4 transition-transform active:scale-125 {isLiked ? 'text-rose-500 fill-rose-500' : 'text-rose-500 fill-rose-500/80'}" 
        viewBox="0 0 24 24" 
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{likeCount}</span>
    </button>

    <!-- Bottom Dark Gradient Overlay (Anchored to Bottom of Image) -->
    <div class="absolute inset-x-0 bottom-0 z-10 pt-16 pb-4 px-4 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent flex flex-col justify-end space-y-1 pointer-events-none">
      
      <!-- Location -->
      <div class="text-xs text-zinc-300 font-bengali font-medium flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <span>{mural.location}</span>
      </div>

      <!-- Main Title -->
      <h3 class="text-xl sm:text-2xl font-extrabold font-bengali text-white group-hover:text-rose-300 transition-colors leading-tight drop-shadow-md">
        {mural.titleBn}
      </h3>

      <!-- Date Painted -->
      <div class="text-[11px] text-zinc-400 font-bengali pt-0.5">
        অঙ্কিত: {mural.date}
      </div>

    </div>
  </div>
</div>
