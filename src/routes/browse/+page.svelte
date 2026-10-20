<script>
  import { graffitiData, categories } from '$lib/data/graffiti.js';
  import { fetchGraffiti } from '$lib/supabase.js';
  import Navbar from '$lib/components/Navbar.svelte';
  import GraffitiCard from '$lib/components/GraffitiCard.svelte';
  import GraffitiModal from '$lib/components/GraffitiModal.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let searchQuery = $state('');
  let selectedCategory = $state('All');
  let sortBy = $state('featured'); // 'featured', 'likes', 'title'
  let selectedGraffiti = $state(null);
  let currentPage = $state(1);
  const itemsPerPage = 32;
  let graffitiList = $state(graffitiData);

  // Load dynamic graffiti from Supabase on mount
  $effect(() => {
    fetchGraffiti().then((data) => {
      if (data && data.length > 0) {
        graffitiList = data;
      }
    });
  });

  // Filter & Sort Graffiti
  let filteredGraffiti = $derived(
    graffitiList
      .filter((graffiti) => {
        const matchesSearch = 
          !searchQuery.trim() ||
          graffiti.titleBn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          graffiti.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          graffiti.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          graffiti.slogan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          graffiti.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          graffiti.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = 
          selectedCategory === 'All' || 
          graffiti.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
        if (sortBy === 'title') return (a.titleEn || '').localeCompare(b.titleEn || '');
        return 0; // default order
      })
  );

  let totalPages = $derived(Math.max(1, Math.ceil(filteredGraffiti.length / itemsPerPage)));

  let paginatedGraffiti = $derived(
    filteredGraffiti.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  let visiblePages = $derived.by(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  });

  // Reset page to 1 when filters change
  $effect(() => {
    // track dependencies
    searchQuery;
    selectedCategory;
    sortBy;
    currentPage = 1;
  });

  // Clamp current page if total pages decrease
  $effect(() => {
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
  });

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    const galleryEl = document.getElementById('gallerySection');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function resetFilters() {
    searchQuery = '';
    selectedCategory = 'All';
    sortBy = 'featured';
    currentPage = 1;
  }

  function openGraffitiModal(graffiti) {
    selectedGraffiti = graffiti;
  }

  function closeModal() {
    selectedGraffiti = null;
  }

  function nextGraffiti() {
    if (!selectedGraffiti) return;
    const currentIndex = filteredGraffiti.findIndex(m => m.id === selectedGraffiti.id);
    const nextIndex = (currentIndex + 1) % filteredGraffiti.length;
    selectedGraffiti = filteredGraffiti[nextIndex];
  }

  function prevGraffiti() {
    if (!selectedGraffiti) return;
    const currentIndex = filteredGraffiti.findIndex(m => m.id === selectedGraffiti.id);
    const prevIndex = (currentIndex - 1 + filteredGraffiti.length) % filteredGraffiti.length;
    selectedGraffiti = filteredGraffiti[prevIndex];
  }
</script>

<svelte:head>
  <title>Browse All Graffiti | July Graffiti Archive</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <!-- Navbar -->
  <Navbar activeTab="browse" />

  <main class="flex-1 py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10 w-full">
    
    <!-- Page Header -->
    <div class="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto">
      <span class="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest inline-block">
        Complete Digital Collection
      </span>
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Browse All July Graffiti
      </h1>
      <p class="text-xs sm:text-base text-zinc-400 font-bengali leading-relaxed px-2">
        জুলাই বিপ্লবের সংগৃহীত সকল দেয়ালচিত্র অনুসন্ধান করুন, ক্যাটাগরি ও ফিল্টার প্রয়োগ করে আপনার পছন্দের শিল্পকর্মগুলো বিস্তারিত দেখুন।
      </p>
    </div>

    <!-- Search & Multi-Filter Control Panel -->
    <div class="glass-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800 space-y-4 sm:space-y-6">
      
      <!-- Top Row: Search Input -->
      <div class="relative flex items-center">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 sm:left-4 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search by slogan, location, campus or artist..."
          bind:value={searchQuery}
          class="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 bg-zinc-950 border border-zinc-700/80 focus:border-rose-500 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-xl transition-all"
        />
        {#if searchQuery}
          <button 
            onclick={() => searchQuery = ''}
            class="absolute right-3.5 sm:right-4 text-zinc-400 hover:text-white text-xs bg-zinc-800 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
            aria-label="Clear search"
          >
            ✕
          </button>
        {/if}
      </div>

      <!-- Second Row: Categories Pills -->
      <div class="space-y-2">
        <span class="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
          Filter by Category:
        </span>
        <div 
          class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 custom-h-scrollbar scroll-smooth -mx-1 px-1"
        >
          {#each categories as cat}
            <button
              onclick={() => selectedCategory = cat}
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 {selectedCategory === cat ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}"
            >
              {cat}
            </button>
          {/each}
        </div>
      </div>

      <!-- Third Row: Sort Controls -->
      <div class="flex items-center justify-between gap-3 pt-2 border-t border-zinc-800/80">
        <span class="text-xs text-zinc-400">
          Showing <strong class="text-white">{filteredGraffiti.length}</strong> artworks
        </span>

        <div class="flex items-center gap-2">
          <label for="sortSelectBrowse" class="text-xs font-bold uppercase tracking-wider text-zinc-400 shrink-0">
            Sort By:
          </label>
          <select
            id="sortSelectBrowse"
            bind:value={sortBy}
            class="px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="featured">Featured Order</option>
            <option value="likes">Most Popular (Likes)</option>
            <option value="title">Alphabetical (Title)</option>
          </select>
        </div>
      </div>

    </div>

    <!-- Gallery Grid Results -->
    <div id="gallerySection" class="space-y-6 scroll-mt-20">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 class="text-lg sm:text-2xl font-bold font-bengali text-white flex items-center gap-2 sm:gap-3 flex-wrap">
            <span>সকল গ্রাফিতি ক্যাটালগ</span>
            <span class="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Showing {filteredGraffiti.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredGraffiti.length)} of {filteredGraffiti.length} Artworks
            </span>
          </h2>
        </div>

        {#if searchQuery || selectedCategory !== 'All' || sortBy !== 'featured'}
          <button
            onclick={resetFilters}
            class="text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
          >
            Reset All Filters ✕
          </button>
        {/if}
      </div>

      {#if paginatedGraffiti.length > 0}
        <!-- Masonry Grid -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {#each paginatedGraffiti as graffiti (graffiti.id)}
            <GraffitiCard 
              {graffiti} 
              onOpenModal={openGraffitiModal} 
            />
          {/each}
        </div>

        <!-- Pagination Bar -->
        <nav aria-label="Graffity pagination" class="pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80">
          <div class="text-xs text-zinc-400 text-center sm:text-left">
            Page <span class="text-white font-semibold">{currentPage}</span> of <span class="text-white font-semibold">{totalPages}</span> ({filteredGraffiti.length} artworks total)
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            <!-- Previous Page -->
            <button
              onclick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1 active:scale-95"
              aria-label="Go to previous page"
            >
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              <span>Prev</span>
            </button>

            <!-- Responsive Page Number Buttons -->
            {#each visiblePages as item}
              {#if item === '...'}
                <span class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-zinc-500 text-xs">...</span>
              {:else}
                <button
                  onclick={() => goToPage(item)}
                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all border {currentPage === item ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30 scale-105' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}"
                  aria-label="Go to page {item}"
                  aria-current={currentPage === item ? 'page' : undefined}
                >
                  {item}
                </button>
              {/if}
            {/each}

            <!-- Next Page -->
            <button
              onclick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1 active:scale-95"
              aria-label="Go to next page"
            >
              <span>Next</span>
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </nav>

      {:else}
        <div class="glass-card p-12 rounded-3xl text-center max-w-xl mx-auto space-y-4 border border-zinc-800">
          <div class="w-14 h-14 mx-auto rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h3 class="text-xl font-bold font-bengali text-white">কোনো ফলাফল পাওয়া যায়নি</h3>
          <p class="text-sm text-zinc-400 font-bengali">
            আপনার ফিল্টার অনুযায়ী কোনো দেয়ালচিত্র পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
          <button
            onclick={resetFilters}
            class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-600/30 transition-all"
          >
            ফিল্টার রিকভার করুন
          </button>
        </div>
      {/if}
    </div>

  </main>

  <!-- Fullscreen Modal -->
  <GraffitiModal 
    graffiti={selectedGraffiti} 
    onClose={closeModal} 
    onNext={nextGraffiti} 
    onPrev={prevGraffiti} 
  />

  <Footer />
</div>
