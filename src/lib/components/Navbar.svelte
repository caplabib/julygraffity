<script>
  let { activeTab = 'gallery' } = $props();
  let isMobileMenuOpen = $state(false);

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
</script>

<header class="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md safe-top">
  <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
    <!-- Brand Logo -->
    <a href="/" class="flex items-center gap-2 sm:gap-3 cursor-pointer text-left group shrink-0" onclick={closeMobileMenu}>
      <div class="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-600 to-emerald-600 p-0.5 shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform">
        <div class="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
          <span class="font-graffiti text-xl sm:text-2xl text-rose-500 tracking-wider">জু</span>
        </div>
      </div>
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-graffiti text-base sm:text-xl md:text-2xl text-white tracking-wide truncate">JULY GRAFFITI</span>
        </div>
        <p class="text-[10px] sm:text-xs text-zinc-400 font-bengali hidden sm:block truncate">জুলাই গণঅভ্যুত্থান দেয়াল চিত্রকথা</p>
      </div>
    </a>

    <!-- Desktop Navigation Links -->
    <nav class="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-full border border-zinc-800">
      <a
        href="/"
        class="px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 {activeTab === 'home' || activeTab === 'gallery' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        Home
      </a>

      <a
        href="/browse"
        class="px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 {activeTab === 'browse' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        Browse
      </a>

      <a
        href="/submit"
        class="px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 {activeTab === 'submit' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        Submit
      </a>

      <a
        href="/about"
        class="px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 {activeTab === 'about' || activeTab === 'contributors' || activeTab === 'contact' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}"
      >
        About
      </a>

      <!-- Support CTA Pill Button -->
      <a
        href="/support"
        class="ml-1 lg:ml-2 px-4 lg:px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-1.5"
      >
        <span>Support</span> ♥
      </a>

      <!-- Social Links (Youtube & Discord) -->
      <div class="flex items-center gap-1 ml-1 lg:ml-2 border-l border-zinc-700/60 pl-2 lg:pl-3">
        <a href="#" target="_blank" rel="noopener noreferrer" class="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-red-500 hover:bg-zinc-800/80 transition-all" aria-label="YouTube Channel">
          <svg class="w-4 h-4 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-[#5865F2] hover:bg-[#5865F2]/15 transition-all" aria-label="Discord Community">
          <svg class="w-4 h-4 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
        </a>
      </div>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
      class="md:hidden p-2 sm:p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
      aria-label="Toggle menu"
      aria-expanded={isMobileMenuOpen}
    >
      <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div class="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-3 sm:px-4 py-3 sm:py-4 space-y-1.5 sm:space-y-2 animate-slideDown safe-bottom">
      <a
        href="/"
        onclick={closeMobileMenu}
        class="block px-4 py-3 rounded-xl text-sm sm:text-base font-medium {activeTab === 'home' || activeTab === 'gallery' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        Home
      </a>

      <a
        href="/browse"
        onclick={closeMobileMenu}
        class="block px-4 py-3 rounded-xl text-sm sm:text-base font-medium {activeTab === 'browse' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        Browse All Graffiti
      </a>

      <a
        href="/submit"
        onclick={closeMobileMenu}
        class="block px-4 py-3 rounded-xl text-sm sm:text-base font-medium {activeTab === 'submit' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        Submit Artwork
      </a>

      <a
        href="/about"
        onclick={closeMobileMenu}
        class="block px-4 py-3 rounded-xl text-sm sm:text-base font-medium {activeTab === 'about' ? 'bg-zinc-900 text-rose-400 font-bold' : 'text-zinc-300 hover:bg-zinc-900'}"
      >
        About & History
      </a>

      <a
        href="/support"
        onclick={closeMobileMenu}
        class="block px-4 py-3 rounded-xl text-sm sm:text-base font-bold bg-rose-600 text-white text-center shadow-md shadow-rose-600/30"
      >
        Support Project ♥
      </a>

      <!-- Mobile Social Links -->
      <div class="flex items-center gap-2 pt-2 pb-1 px-1 border-t border-zinc-800/80 mt-2">
        <a href="#" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-sm transition-colors">
          <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YouTube
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#5865F2] hover:border-[#5865F2]/50 font-medium text-sm transition-colors">
          <svg class="w-4 h-4 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
          Discord
        </a>
      </div>
    </div>
  {/if}
</header>
