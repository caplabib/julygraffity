<script>
  let { activeTab = 'gallery' } = $props();
  let isMobileMenuOpen = $state(false);
</script>

<header class="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
    <!-- Brand Logo -->
    <a href="/" class="flex items-center gap-3 cursor-pointer text-left group">
      <div class="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-600 to-emerald-600 p-0.5 shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform">
        <div class="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
          <span class="font-graffiti text-2xl text-rose-500 tracking-wider">জু</span>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-graffiti text-xl sm:text-2xl text-white tracking-wide">JULY GRAFFITI</span>
        </div>
        <p class="text-xs text-zinc-400 font-bengali hidden sm:block">জুলাই গণঅভ্যুত্থান দেয়াল চিত্রকথা</p>
      </div>
    </a>

    <!-- Desktop Navigation Links -->
    <nav class="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-full border border-zinc-800">
      <a
        href="/"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {activeTab === 'home' || activeTab === 'gallery' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        Home
      </a>

      <a
        href="/browse"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {activeTab === 'browse' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        Browse
      </a>

      <a
        href="/submit"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {activeTab === 'submit' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        Submit
      </a>

      <a
        href="/about"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {activeTab === 'about' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        About
      </a>

      <!-- Support CTA Pill Button -->
      <a
        href="/support"
        class="ml-2 px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-1.5"
      >
        <span>Support</span> ♥
      </a>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
      class="md:hidden p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {#if isMobileMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        {/if}
      </svg>
    </button>
  </div>

  <!-- Mobile Dropdown -->
  {#if isMobileMenuOpen}
    <div class="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-fadeIn">
      <a
        href="/"
        class="block px-4 py-3 rounded-xl text-base font-medium {activeTab === 'home' || activeTab === 'gallery' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        Home
      </a>

      <a
        href="/browse"
        class="block px-4 py-3 rounded-xl text-base font-medium {activeTab === 'browse' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        Browse All Murals
      </a>

      <a
        href="/submit"
        class="block px-4 py-3 rounded-xl text-base font-medium {activeTab === 'submit' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        Submit Artwork
      </a>

      <a
        href="/about"
        class="block px-4 py-3 rounded-xl text-base font-medium {activeTab === 'about' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        About & History
      </a>

      <a
        href="/support"
        class="block px-4 py-3 rounded-xl text-base font-bold bg-rose-600 text-white text-center shadow-md shadow-rose-600/30"
      >
        Support Project ♥
      </a>
    </div>
  {/if}
</header>
