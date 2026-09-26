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

  <main class="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
    <!-- Title -->
    <div class="text-center space-y-4">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
        Support & Preserve History
      </span>
      <h1 class="text-4xl sm:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Support the July Archive Project
      </h1>
      <p class="text-lg text-zinc-300 max-w-3xl mx-auto font-bengali leading-relaxed">
        আমাদের মুক্ত নাগরিক আর্কাইভ সমৃদ্ধ করতে এবং ইতিহাস সংরক্ষণে আপনি কীভাবে সাহায্য করতে পারেন।
      </p>
    </div>

    <!-- Support Options Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Option 1: Share Archive -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl font-bold">
            📢
          </div>
          <h2 class="text-2xl font-bold font-bengali text-white">১. আর্カイভ শেয়ার করুন</h2>
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
            🔗 Copy Website Link
          {/if}
        </button>
      </div>

      <!-- Option 2: Submit Photos -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-2xl font-bold">
            📷
          </div>
          <h2 class="text-2xl font-bold font-bengali text-white">২. ম্যুরাল ছবি প্রদান</h2>
          <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
            আপনার বিশ্ববিদ্যালয় বা জেলা শহরের আঁকা গ্রাফিতির ছবি ও বিস্তারিত স্থান সম্পর্কিত তথ্য দিয়ে আমাদের আর্カイভ সমৃদ্ধ করুন।
          </p>
        </div>

        <a
          href="/submit"
          class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all text-center block"
        >
          Submit High-Res Photos
        </a>
      </div>

      <!-- Option 3: Volunteer & Archiving -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl font-bold">
            💻
          </div>
          <h2 class="text-2xl font-bold font-bengali text-white">৩. ভলান্টিয়ার আর্カイভিং</h2>
          <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
            মেটাডেটা এন্ট্রি, অনুবাদ, ক্যালিগ্রাফি সংগ্রহ এবং প্রযুক্তিগত উন্নয়নে স্বেচ্ছাসেবী হিসেবে কাজ করতে যোগ দিন।
          </p>
        </div>

        <a
          href="/about"
          class="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs sm:text-sm transition-all text-center block"
        >
          Join Archiving Team
        </a>
      </div>

    </div>

    <!-- Non-Profit Statement -->
    <div class="glass-card p-8 rounded-3xl border border-zinc-800/80 text-center space-y-3 bg-zinc-950">
      <h3 class="text-xl font-bold font-bengali text-white">অলাভজনক নাগরিক সংরক্ষণাগার (Open Citizen Archive)</h3>
      <p class="text-xs sm:text-sm text-zinc-400 font-bengali max-w-2xl mx-auto">
        এই ডিজিটাল প্ল্যাটফর্মটি কোনো বাণিজ্য উদ্দেশ্যে ব্যবহার করা হয় না। এটি ২০২৪ সালের জুলাই গণঅভ্যুত্থানের সকল বীর শহীদ ও ছাত্র-জনতার প্রতি গভীর শ্রদ্ধা জানাতে সম্পূর্ণ বিনামূল্যে পরিবেশিত।
      </p>
    </div>
  </main>

  <Footer />
</div>
