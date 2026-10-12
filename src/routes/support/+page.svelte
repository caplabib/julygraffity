<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let copied = $state(false);

  function copyShareLink() {
    navigator.clipboard.writeText(window.location.origin);
    copied = true;
    setTimeout(() => copied = false, 2500);
  }
</script>

<svelte:head>
  <title>Support July Graffiti Archive | সহযোগিতা করুন</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <Navbar activeTab="support" />

  <main class="flex-1 py-10 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 sm:space-y-12 w-full">
    <!-- Title -->
    <div class="text-center space-y-3 sm:space-y-4">
      <span class="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest inline-block">
        Support & Preserve History
      </span>
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Support the July Archive Project
      </h1>
      <p class="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-3xl mx-auto font-bengali leading-relaxed px-2">
        আমাদের মুক্ত নাগরিক আর্কাইভ সমৃদ্ধ করতে এবং ইতিহাস সংরক্ষণে আপনি কীভাবে সাহায্য করতে পারেন।
      </p>
    </div>

    <!-- Support Options Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
      
      <!-- Option 1: Share Archive -->
      <div class="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800 space-y-4 flex flex-col justify-between">
        <div class="space-y-3 sm:space-y-4">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold font-bengali text-white">১. আর্কাইভ শেয়ার করুন</h2>
          <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
            সামাজিক যোগাযোগ মাধ্যমে জুলাই বিপ্লবের এই ডিজিটাল দেয়ালচিত্র আর্কাইভ শেয়ার করে সর্বস্তরের মানুষের কাছে পৌঁছে দিন।
          </p>
        </div>

        <button
          onclick={copyShareLink}
          class="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
        >
          {#if copied}
            ✓ Link Copied!
          {:else}
            Copy Website Link
          {/if}
        </button>
      </div>

      <!-- Option 2: Submit Photos -->
      <div class="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800 space-y-4 flex flex-col justify-between">
        <div class="space-y-3 sm:space-y-4">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold font-bengali text-white">২. গ্রাফিতি ছবি প্রদান</h2>
          <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
            আপনার বিশ্ববিদ্যালয় বা জেলা শহরের আঁকা গ্রাফিতির ছবি ও বিস্তারিত স্থান সম্পর্কিত তথ্য দিয়ে আমাদের আর্কাইভ সমৃদ্ধ করুন।
          </p>
        </div>

        <a
          href="/submit"
          class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all text-center block"
        >
          Submit High-Res Photos
        </a>
      </div>

      <!-- Option 3: Volunteer & Archiving (Discord) -->
      <div class="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800 space-y-4 flex flex-col justify-between">
        <div class="space-y-3 sm:space-y-4">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#5865F2] flex items-center justify-center text-xl sm:text-2xl font-bold">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold font-bengali text-white">৩. ভলান্টিয়ার আর্কাইভিং</h2>
          <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
            মেটাডেটা এন্ট্রি, অনুবাদ, ক্যালিগ্রাফি সংগ্রহ এবং প্রযুক্তিগত উন্নয়নে স্বেচ্ছাসেবী হিসেবে কাজ করতে আমাদের ডিসকর্ড কমিউনিটিতে যোগ দিন।
          </p>
        </div>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#5865F2]/30 transition-all flex items-center justify-center gap-2"
        >
          Join Discord Community
        </a>
      </div>

    </div>

    <!-- Financial Support Banner -->
    <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-rose-500/30 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 sm:p-10 shadow-2xl">
      <!-- Decorative background glows -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-rose-600/10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div class="text-center md:text-left flex-1 space-y-2 sm:space-y-3">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif-hero">
            Keep the Archive Alive
          </h2>
          <p class="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl">
            Help us keep the archive ad-free and online forever. Your contributions go directly towards our Supabase database, hosting, and server costs.
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto shrink-0">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all text-center flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            SupportKori
          </a>
        </div>
      </div>
    </div>

    <!-- Non-Profit Statement -->
    <div class="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800/80 text-center space-y-3 bg-zinc-950">
      <h3 class="text-lg sm:text-xl font-bold font-bengali text-white">অলাভজনক নাগরিক সংরক্ষণাগার (Open Citizen Archive)</h3>
      <p class="text-xs sm:text-sm text-zinc-400 font-bengali max-w-2xl mx-auto leading-relaxed px-2">
        এই ডিজিটাল প্ল্যাটফর্মটি কোনো বাণিজ্য উদ্দেশ্যে ব্যবহার করা হয় না। এটি ২০২৪ সালের জুলাই গণঅভ্যুত্থানের সকল বীর শহীদ ও ছাত্র-জনতার প্রতি গভীর শ্রদ্ধা জানাতে সম্পূর্ণ বিনামূল্যে পরিবেশিত।
      </p>
    </div>
  </main>

  <Footer />
</div>
