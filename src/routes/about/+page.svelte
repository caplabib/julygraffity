<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>About & History | July Graffiti Archive</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <Navbar activeTab="about" />

  <main class="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
    <!-- Header Title -->
    <div class="text-center space-y-4">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
        Digital Archiving & Historical Context
      </span>
      <h1 class="text-4xl sm:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Walls of July: The Visual History
      </h1>
      <p class="text-lg text-zinc-300 max-w-3xl mx-auto font-bengali leading-relaxed">
        জুলাই ২০২৪ এর গণঅভ্যুত্থানে বাংলাদেশ জুড়ে ছাত্র-জনতার আঁকা দেয়ালচিত্র, ক্যালিগ্রাফি এবং গ্রাফিতির ডিজিটাল সংরক্ষণাগার।
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
      
      <!-- Card 1 -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center font-graffiti text-2xl">
          ✊
        </div>
        <h2 class="text-2xl font-bold font-bengali text-white">১. প্রতিরোধ ও গণমানুষের বাকস্বাধীনতা</h2>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          আন্দোলনের সময়ে এবং আন্দোলনের পরবর্তীতে ঢাকা বিশ্ববিদ্যালয়, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়, চট্টগ্রাম, রাজাশাহী ও রংপুরের দেয়ালগুলো প্রতিবাদ ও মুক্তির ক্যানভাসে রূপ নেয়। ছাত্র-জনতা রঙ ও স্প্রে দিয়ে সত্যের বার্তা খোদাই করে রেখেছিল।
        </p>
      </div>

      <!-- Card 2 -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-graffiti text-2xl">
          🎨
        </div>
        <h2 class="text-2xl font-bold font-bengali text-white">২. বাংলা ক্যালিগ্রাফি ও শিল্পধারা</h2>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          বাংলা বর্ণমালার অনন্য ব্যবহারের মাধ্যমে ক্যালিগ্রাফি, গ্রাফিতি ও প্রতীকধর্মী দেয়ালচিত্র ফুটিয়ে তোলা হয়েছে। "বিকল্প কে? আমি, তুমি, আমরা!" এবং "পানি লাগবে কারো?" এর মতো কালজয়ী স্লোগানগুলো চিরস্মরণীয় হয়ে আছে।
        </p>
      </div>

      <!-- Card 3 -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-graffiti text-2xl">
          🏛️
        </div>
        <h2 class="text-2xl font-bold font-bengali text-white">৩. সংরক্ষণাগারের প্রয়োজনীয়তা</h2>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          আবহাওয়া, রোদ-বৃষ্টি ও সময়ের সাথে বহিরাঙ্গনের দেয়ালচিত্র ক্ষয়ে যেতে পারে। এই আর্カイভের মূল উদ্দেশ্য এই মূল্যবান শিল্পকর্মগুলোকে উচ্চমানের ফটোগ্রাফি ও মেট্রিক ডেটা সহ চিরতরে সংরক্ষণ করা।
        </p>
      </div>

      <!-- Card 4 -->
      <div class="glass-card p-8 rounded-3xl border border-zinc-800 space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center font-graffiti text-2xl">
          🤝
        </div>
        <h2 class="text-2xl font-bold font-bengali text-white">৪. উন্মুক্ত ও অলাভজনক উদ্যোগ</h2>
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          জুলাই গ্রাফিতি একটি অলাভজনক উন্মুক্ত নাগরিক উদ্যোগ। গবেষক, শিক্ষার্থী ও সাধারণ নাগরিক সকলেই বিনামূল্যে এই আর্カイভ থেকে তথ্য ও ছবি সংগ্রহ করতে পারবেন।
        </p>
      </div>

    </div>

    <!-- Call to action block -->
    <div class="glass-card p-10 rounded-3xl border border-rose-500/30 text-center space-y-6 bg-gradient-to-b from-zinc-900 to-rose-950/20">
      <h3 class="text-2xl sm:text-3xl font-bold font-bengali text-white">আপনার তোলা জুলাই দেয়ালচিত্র শেয়ার করুন</h3>
      <p class="text-zinc-300 max-w-xl mx-auto text-sm font-bengali">
        সারা দেশের বিভিন্ন প্রান্ত থেকে সংগৃহীত ম্যুরালের ছবি দিয়ে আমাদের আর্কাইভ আরও সমৃদ্ধ করতে আপনার ছবি জমা দিন।
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a 
          href="/submit" 
          class="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-600/40 transition-all"
        >
          Submit Artwork (ছবি জমা দিন)
        </a>
        <a 
          href="/support" 
          class="px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-sm transition-all"
        >
          Support the Project (সহযোগিতা করুন)
        </a>
      </div>
    </div>
  </main>

  <Footer />
</div>
