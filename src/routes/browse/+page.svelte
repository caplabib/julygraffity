<script>
  import { muralsData, categories, districts } from '$lib/data/murals.js';
  import { fetchMurals } from '$lib/supabase.js';
  import Navbar from '$lib/components/Navbar.svelte';
  import MuralCard from '$lib/components/MuralCard.svelte';
  import MuralModal from '$lib/components/MuralModal.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { dragScroll } from '$lib/utils/dragScroll.js';

  let searchQuery = $state('');
  let selectedCategory = $state('All');
  let selectedDistrict = $state('All Districts');
  let sortBy = $state('featured'); // 'featured', 'likes', 'title'
  let selectedMural = $state(null);
  let currentPage = $state(1);
  const itemsPerPage = 32;
  let muralsList = $state(muralsData);

  // Load dynamic murals from Supabase on mount
  $effect(() => {
    fetchMurals().then((data) => {
      if (data && data.length > 0) {
        muralsList = data;
      }
    });
  });

  // Filter & Sort Murals
  let filteredMurals = $derived(
    muralsList
      .filter((mural) => {
        const matchesSearch = 
          !searchQuery.trim() ||
          mural.titleBn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.slogan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = 
          selectedCategory === 'All' || 
          mural.category === selectedCategory;

        const matchesDistrict = 
          selectedDistrict === 'All Districts' || 
          mural.district === selectedDistrict;

        return matchesSearch && matchesCategory && matchesDistrict;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
        if (sortBy === 'title') return (a.titleEn || '').localeCompare(b.titleEn || '');
        return 0; // default order
      })
  );

  let totalPages = $derived(Math.max(1, Math.ceil(filteredMurals.length / itemsPerPage)));

  let paginatedMurals = $derived(
    filteredMurals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
    selectedDistrict;
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
    selectedDistrict = 'All Districts';
    currentPage = 1;
  }

  function openMuralModal(mural) {
    selectedMural = mural;
  }

  function closeModal() {
    selectedMural = null;
  }

  function nextMural() {
    if (!selectedMural) return;
    const currentIndex = filteredMurals.findIndex(m => m.id === selectedMural.id);
    const nextIndex = (currentIndex + 1) % filteredMurals.length;
    selectedMural = filteredMurals[nextIndex];
  }

  function prevMural() {
    if (!selectedMural) return;
    const currentIndex = filteredMurals.findIndex(m => m.id === selectedMural.id);
    const prevIndex = (currentIndex - 1 + filteredMurals.length) % filteredMurals.length;
    selectedMural = filteredMurals[prevIndex];
  }
</script>

<svelte:head>
  <title>Browse All Murals | July Graffiti Archive</title>
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
        Browse All July Murals
      </h1>
      <p class="text-xs sm:text-base text-zinc-400 font-bengali leading-relaxed px-2">
        জুলাই বিপ্লবের সংগৃহীত সকল দেয়ালচিত্র অনুসন্ধান করুন, ক্যাটাগরি ও জেলা ফিল্টার প্রয়োগ করে আপনার পছন্দের শিল্পকর্মগুলো বিস্তারিত দেখুন।
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
          use:dragScroll
          class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 custom-h-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none -mx-1 px-1"
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

      <!-- Third Row: District & Sort Dropdowns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-zinc-800/80">
        <div>
          <label for="districtSelectBrowse" class="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
            Filter by District / Region:
          </label>
          <select
            id="districtSelectBrowse"
            bind:value={selectedDistrict}
            class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {#each districts as dist}
              <option value={dist}>{dist}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="sortSelectBrowse" class="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
            Sort Murals By:
          </label>
          <select
            id="sortSelectBrowse"
            bind:value={sortBy}
            class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
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
            <span>সকল ম্যুরাল ক্যাটালগ</span>
            <span class="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Showing {filteredMurals.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredMurals.length)} of {filteredMurals.length} Artworks
            </span>
          </h2>
        </div>

        {#if searchQuery || selectedCategory !== 'All' || selectedDistrict !== 'All Districts'}
          <button
            onclick={resetFilters}
            class="text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
          >
            Reset All Filters ✕
          </button>
        {/if}
      </div>

      {#if paginatedMurals.length > 0}
        <!-- Masonry Grid -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-2">
          {#each paginatedMurals as mural (mural.id)}
            <MuralCard 
              {mural} 
              onOpenModal={openMuralModal} 
            />
          {/each}
        </div>

        <!-- Pagination Bar -->
        <nav aria-label="Murals pagination" class="pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80">
          <div class="text-xs text-zinc-400 text-center sm:text-left">
            Page <span class="text-white font-semibold">{currentPage}</span> of <span class="text-white font-semibold">{totalPages}</span> ({filteredMurals.length} murals total)
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
          <div class="text-5xl">🎨</div>
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
  <MuralModal 
    mural={selectedMural} 
    onClose={closeModal} 
    onNext={nextMural} 
    onPrev={prevMural} 
  />

  <Footer />
</div>
