<script>
  let isSubmitted = $state(false);
  let muralUrl = $state('');
  let muralLocation = $state('');

  function handleSubmitMural(e) {
    e.preventDefault();
    if (!muralLocation) return;
    isSubmitted = true;
    setTimeout(() => {
      isSubmitted = false;
      muralUrl = '';
      muralLocation = '';
    }, 4000);
  }
</script>

<section class="py-16 bg-wall-pattern border-t border-zinc-800/80">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
    
    <!-- Hero Article -->
    <div class="text-center space-y-4">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-wider">
        Historic Overview & Mission
      </span>
      <h2 class="text-3xl sm:text-5xl font-extrabold font-bengali text-white">
        জুলাই বিপ্লবের দেয়ালচিত্র: স্বাধীনতার চিত্রকল্প
      </h2>
      <p class="text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-bengali">
        ২০২৪ সালের জুলাই মাসে বাংলাদেশে সংঘটিত ঐতিহাসিক ছাত্র-জনতার অভ্যুত্থান সারা দেশের দেয়ালগুলোকে বদলে দিয়েছিল। রং, স্প্রে এবং তুলির ছোঁয়ায় রাজপথ ও ক্যাম্পাসের দেয়াল হয়ে উঠেছিল গণতন্ত্র, প্রতিরোধ ও শহীদের প্রতি শ্রদ্ধার জীবন্ত দলিল।
      </p>
    </div>

    <!-- 4 Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="glass-card p-6 rounded-3xl border border-zinc-800 space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center font-graffiti text-2xl">
          ✊
        </div>
        <h3 class="text-xl font-bold font-bengali text-white">১. প্রতিরোধ ও সাহসের প্রতীক</h3>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          আবু সাঈদের প্রসারিত বাহু এবং শহীদ মুগ্ধর পানির বোতল সম্বলিত গ্রাফিতিগুলো অবিচার ও নিপীড়নের বিরুদ্ধে তরুণের অকুতোভয় প্রতিরোধের প্রতীক হয়ে উঠেছে।
        </p>
      </div>

      <div class="glass-card p-6 rounded-3xl border border-zinc-800 space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-graffiti text-2xl">
          🎨
        </div>
        <h3 class="text-xl font-bold font-bengali text-white">২. বাংলা ক্যালিগ্রাফি ও স্লোগান</h3>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          দেয়ালে দেয়ালে আঁকা "বিকল্প কে? আমি, তুমি, আমরা!", "কথা বলা বন্ধ করা যাবে না" ইত্যাদি বাংলা টাইপোগ্রাফি ও ক্যালিগ্রাফি গণমানুষের কণ্ঠস্বরকে ভাস্বর করে রেখেছে।
        </p>
      </div>

      <div class="glass-card p-6 rounded-3xl border border-zinc-800 space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-graffiti text-2xl">
          🕊️
        </div>
        <h3 class="text-xl font-bold font-bengali text-white">৩. জাতীয় ঐক্য ও সাম্য</h3>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          ছাত্র, শিক্ষক, চিত্রশিল্পী এবং সর্বস্তরের নাগরিকেরা একত্রিত হয়ে ঢাকা, রাজশাহী, চট্টগ্রাম ও রংপুরের প্রতিটি ফ্লাইওভার ও দেয়ালকে নতুন বাংলাদেশের ক্যানভাস বানিয়েছেন।
        </p>
      </div>

      <div class="glass-card p-6 rounded-3xl border border-zinc-800 space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center font-graffiti text-2xl">
          🏛️
        </div>
        <h3 class="text-xl font-bold font-bengali text-white">৪. ডিজিটাল সংরক্ষণ উদ্যোগ</h3>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          আবহাওয়া ও সময়ের সাথে সাথে বহিরাঙ্গনের দেয়ালচিত্র ক্ষয়প্রাপ্ত হতে পারে। আমাদের লক্ষ্য উচ্চমানের ফটোগ্রাফি ও আর্কাইভের মাধ্যমে এই শিল্পকে চিরস্থায়ী করা।
        </p>
      </div>
    </div>

    <!-- Submit Photo Section -->
    <div class="glass-card p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/30 via-zinc-900 to-zinc-900 space-y-6">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <h3 class="text-2xl font-bold font-bengali text-white">আপনার এলাকার গ্রাফিতির ছবি জমা দিন</h3>
        <p class="text-xs sm:text-sm text-zinc-400 font-bengali">
          আপনার তোলা জুলাই বিপ্লবের কোনো ম্যুরাল বা দেয়ালচিত্রের ছবি থাকলে আর্カイভে যুক্ত করতে পাঠাতে পারেন।
        </p>
      </div>

      {#if isSubmitted}
        <div class="p-4 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-center font-bengali text-sm animate-fadeIn">
          ✓ আপনার জমা দেয়া তথ্য সফলভাবে গ্রহণ করা হয়েছে! পর্যালোচনার পর আর্カイভে যুক্ত হবে। ধন্যবাদ।
        </div>
      {:else}
        <form onsubmit={handleSubmitMural} class="max-w-xl mx-auto space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              bind:value={muralLocation}
              placeholder="স্থান/এলাকা (e.g. TSC, Mirpur 10)"
              class="px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-bengali"
            />
            <input
              type="url"
              bind:value={muralUrl}
              placeholder="ছবি বা ড্রাইভ লিংক (Drive / Imgur URL)"
              class="px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all font-bengali"
          >
            ছবি জমা দিন (Submit Artwork)
          </button>
        </form>
      {/if}
    </div>

  </div>
</section>
