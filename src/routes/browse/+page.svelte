<script>
  import { muralsData, categories, districts } from '$lib/data/murals.js';
  import Navbar from '$lib/components/Navbar.svelte';
  import MuralCard from '$lib/components/MuralCard.svelte';
  import MuralModal from '$lib/components/MuralModal.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let searchQuery = $state('');
  let selectedCategory = $state('All');
  let selectedDistrict = $state('All Districts');
  let sortBy = $state('featured'); // 'featured', 'likes', 'title'
  let selectedMural = $state(null);

  // Filter & Sort Murals
  let filteredMurals = $derived(
    muralsData
      .filter((mural) => {
        const matchesSearch = 
          !searchQuery.trim() ||
          mural.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.slogan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mural.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

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
        if (sortBy === 'title') return a.titleEn.localeCompare(b.titleEn);
        return 0; // default order
      })
  );

  function openMuralModal(mural) {
    selectedMural = mural;
  }

  function closeModal() {
    selectedMural = null;
  }

  function nextMural() {
    if (!selectedMural) return;
    const currentIndex = muralsData.findIndex(m => m.id === selectedMural.id);
    const nextIndex = (currentIndex + 1) % muralsData.length;
    selectedMural = muralsData[nextIndex];
  }

  function prevMural() {
    if (!selectedMural) return;
    const currentIndex = muralsData.findIndex(m => m.id === selectedMural.id);
    const prevIndex = (currentIndex - 1 + muralsData.length) % muralsData.length;
    selectedMural = muralsData[prevIndex];
  }
</script>

<svelte:head>
  <title>Browse All Murals | July Graffiti Archive</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <!-- Navbar -->
  <Navbar activeTab="browse" />

  <main class="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
    
    <!-- Page Header -->
    <div class="space-y-4 text-center max-w-3xl mx-auto">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
        Complete Digital Collection
      </span>
      <h1 class="text-4xl sm:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Browse All July Murals
      </h1>
      <p class="text-sm sm:text-base text-zinc-400 font-bengali">
        জুলাই বিপ্লবের সংগৃহীত সকল দেয়ালচিত্র অনুসন্ধান করুন, ক্যাটাগরি ও জেলা ফিল্টার প্রয়োগ করে আপনার পছন্দের শিল্পকর্মগুলো বিস্তারিত দেখুন।
      </p>
    </div>

    <!-- Search & Multi-Filter Control Panel -->
    <div class="glass-card p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
      
      <!-- Top Row: Search Input -->
      <div class="relative flex items-center">
        <svg class="w-5 h-5 absolute left-4 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search by slogan, location, campus or artist (e.g. TSC, Mugdha, Mirpur, Sust)..."
          bind:value={searchQuery}
          class="w-full pl-12 pr-10 py-4 bg-zinc-950 border border-zinc-700/80 focus:border-rose-500 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-xl transition-all"
        />
        {#if searchQuery}
          <button 
            onclick={() => searchQuery = ''}
            class="absolute right-4 text-zinc-400 hover:text-white text-sm bg-zinc-800 rounded-full w-6 h-6 flex items-center justify-center"
          >
            ✕
          </button>
        {/if}
      </div>

      <!-- Second Row: Categories Pills -->
      <div class="space-y-2">
        <label class="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          Filter by Category:
        </label>
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {#each categories as cat}
            <button
              onclick={() => selectedCategory = cat}
              class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border {selectedCategory === cat ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}"
            >
              {cat}
            </button>
          {/each}
        </div>
      </div>

      <!-- Third Row: District & Sort Dropdowns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
        <div>
          <label for="districtSelectBrowse" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Filter by District / Region:
          </label>
          <select
            id="districtSelectBrowse"
            bind:value={selectedDistrict}
            class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {#each districts as dist}
              <option value={dist}>{dist}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="sortSelectBrowse" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Sort Murals By:
          </label>
          <select
            id="sortSelectBrowse"
            bind:value={sortBy}
            class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="featured">Featured Order</option>
            <option value="likes">Most Popular (Likes)</option>
            <option value="title">Alphabetical (Title)</option>
          </select>
        </div>
      </div>

    </div>

    <!-- Gallery Grid Results -->
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold font-bengali text-white flex items-center gap-3">
            <span>সকল ম্যুরাল ক্যাটালগ</span>
            <span class="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Showing {filteredMurals.length} of {muralsData.length} Artworks
            </span>
          </h2>
        </div>

        {#if searchQuery || selectedCategory !== 'All' || selectedDistrict !== 'All Districts'}
          <button
            onclick={() => { searchQuery = ''; selectedCategory = 'All'; selectedDistrict = 'All Districts'; }}
            class="text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
          >
            Reset All Filters ✕
          </button>
        {/if}
      </div>

      {#if filteredMurals.length > 0}
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-2">
          {#each filteredMurals as mural (mural.id)}
            <MuralCard 
              {mural} 
              onOpenModal={openMuralModal} 
            />
          {/each}
        </div>
      {:else}
        <div class="glass-card p-12 rounded-3xl text-center max-w-xl mx-auto space-y-4 border border-zinc-800">
          <div class="text-5xl">🎨</div>
          <h3 class="text-xl font-bold font-bengali text-white">কোনো ফলাফল পাওয়া যায়নি</h3>
          <p class="text-sm text-zinc-400 font-bengali">
            আপনার ফিল্টার অনুযায়ী কোনো দেয়ালচিত্র পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
          <button
            onclick={() => { searchQuery = ''; selectedCategory = 'All'; selectedDistrict = 'All Districts'; }}
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
