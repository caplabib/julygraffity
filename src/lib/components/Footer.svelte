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

      <!-- Back to Top -->
      <button 
        onclick={scrollToTop}
        class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-rose-500 text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 transition-all shrink-0"
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
