<script>
  let { onSelectTab = () => {} } = $props();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer class="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-sm py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      
      <!-- Brand -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-emerald-600 p-0.5 shadow-md">
          <div class="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center">
            <span class="font-graffiti text-xl text-rose-500">জু</span>
          </div>
        </div>
        <div>
          <span class="font-graffiti text-xl text-white tracking-wide">JULY GRAFFITI ARCHIVE</span>
          <p class="text-xs text-zinc-500 font-bengali">জুলাই ২০২৪ দেয়াল চিত্র সংরক্ষণাগার</p>
        </div>
      </div>

      <!-- Quick Nav Links -->
      <div class="flex items-center gap-6 text-xs sm:text-sm font-medium">
        <a href="/" class="hover:text-rose-400 transition-colors">Home</a>
        <a href="/browse" class="hover:text-rose-400 transition-colors">Browse</a>
        <a href="/submit" class="hover:text-rose-400 transition-colors">Submit</a>
        <a href="/about" class="hover:text-rose-400 transition-colors">About</a>
        <a href="/support" class="hover:text-rose-400 transition-colors">Support</a>
      </div>

      <!-- Back to Top -->
      <button 
        onclick={scrollToTop}
        class="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-rose-500 text-xs flex items-center gap-2 transition-all"
      >
        <span>Back to top</span> ↑
      </button>
    </div>

    <!-- Divider & Tribute Message -->
    <div class="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
      <p class="font-bengali text-center sm:text-left">
        জুলাই গণঅভ্যুত্থানের সকল বীর শহীদ ও প্রতিরোধ যোদ্ধাদের স্মৃতির প্রতি সশ্রদ্ধ নিবেদন।
      </p>
      <p class="text-center sm:text-right">
        Non-commercial open-access digital preservation project.
      </p>
    </div>
  </div>
</footer>
