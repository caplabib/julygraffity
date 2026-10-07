<script>
  let { onSelectTab = () => {} } = $props();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer class="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-sm py-8 sm:py-12 safe-bottom">
  <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
    <div class="flex flex-col items-center gap-5 sm:gap-6 md:flex-row md:justify-between">
      
      <!-- Brand -->
      <div class="flex items-center gap-2 sm:gap-3">
        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-emerald-600 p-0.5 shadow-md shrink-0">
          <div class="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center">
            <span class="font-graffiti text-lg sm:text-xl text-rose-500">জু</span>
          </div>
        </div>
        <div>
          <span class="font-graffiti text-base sm:text-xl text-white tracking-wide">JULY GRAFFITI ARCHIVE</span>
          <p class="text-[10px] sm:text-xs text-zinc-500 font-bengali">জুলাই ২০২৪ দেয়াল চিত্র সংরক্ষণাগার</p>
        </div>
      </div>

      <!-- Quick Nav Links -->
      <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-[11px] sm:text-xs md:text-sm font-medium">
        <a href="/" class="hover:text-rose-400 transition-colors">Home</a>
        <a href="/browse" class="hover:text-rose-400 transition-colors">Browse</a>
        <a href="/submit" class="hover:text-rose-400 transition-colors">Submit</a>
        <a href="/about" class="hover:text-rose-400 transition-colors">About</a>
        <a href="/contributors" class="hover:text-rose-400 transition-colors">Contributors</a>
        <a href="/contact" class="hover:text-rose-400 transition-colors">Contact</a>
        <a href="/support" class="hover:text-rose-400 transition-colors">Support</a>
      </div>

      <!-- Right Side Actions (Community & Top) -->
      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shrink-0">
        <!-- Community Icons -->
        <div class="flex items-center gap-2">
          <a href="#" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-500/50 transition-all" aria-label="YouTube">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#5865F2] hover:border-[#5865F2]/50 transition-all" aria-label="Discord">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
          </a>
        </div>
        
        <!-- Back to Top -->
        <button 
          onclick={scrollToTop}
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-rose-500 text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 transition-all"
        >
          <span>Back to top</span> ↑
        </button>
      </div>

    <!-- Divider & Tribute Message -->
    <div class="pt-4 sm:pt-6 border-t border-zinc-900 flex flex-col items-center justify-between text-[10px] sm:text-xs text-zinc-500 gap-3 sm:gap-4 sm:flex-row">
      <div class="space-y-1 text-center sm:text-left">
        <p class="font-bengali leading-relaxed">
          জুলাই গণঅভ্যুত্থানের সকল বীর শহীদ ও প্রতিরোধ যোদ্ধাদের স্মৃতির প্রতি সশ্রদ্ধ নিবেদন।
        </p>
        <p class="text-[9px] sm:text-[11px] text-zinc-600 font-bengali">
          ঐতিহাসিক দেয়ালচিত্র সংরক্ষণ ও জনসচেতনতার উদ্দেশ্যে নির্মিত অলাভজনক ও নিরপেক্ষ নাগরিক আর্কাইভ।
        </p>
      </div>
      <div class="text-center sm:text-right space-y-1 shrink-0">
        <p>
          Personal & Community-Driven Archival Project
        </p>
        <p class="text-[9px] sm:text-[11px] text-zinc-500">
          Developed & Maintained by <span class="text-zinc-300 font-medium">Cap Labib</span>
        </p>
        <p class="text-[9px] sm:text-[11px] text-zinc-600">
          CC BY 4.0 Open-Access | Preservation Purpose Only
        </p>
      </div>
    </div>
  </div>
</footer>
