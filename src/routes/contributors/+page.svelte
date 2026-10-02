<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let selectedCategory = $state('all');

  const stats = [
    { label: 'Total Contributors', value: '48+', labelBn: 'সর্বমোট অবদানকারী' },
    { label: 'Photographers & Archivists', value: '32+', labelBn: 'চিত্রগ্রাহক ও সংগ্রাহক' },
    { label: 'Mural Collectives', value: '12+', labelBn: 'দেয়ালচিত্র দল' },
    { label: 'Tech & Metadata Volunteers', value: '4+', labelBn: 'আইটি ও ডেটা স্বেচ্ছাসেবক' }
  ];

  const contributors = [
    {
      id: 1,
      name: 'Cap Labib',
      role: 'Lead Developer & Maintainer',
      roleBn: 'প্রধান ওয়েবসাইট ডেভেলপার ও টেকনিক্যাল পরিচালক',
      category: 'tech',
      location: 'Dhaka, Bangladesh',
      contributions: 'Platform Architecture, SvelteKit 5 UI, Metadata System, CC BY 4.0 Archive',
      avatar: '💻',
      badge: 'Maintainer'
    },
    {
      id: 2,
      name: 'Dhaka University Student Photographers',
      role: 'Core Photo Archivists',
      roleBn: 'ফটোগ্রাফার ও নাগরিক সংগ্রাহক দল',
      category: 'photo',
      location: 'Dhaka (TSC, Shaheed Minar, Curzon Hall)',
      contributions: 'High-res photographic record of 45+ murals created during August 2024',
      avatar: '📸',
      badge: 'Verified Archivist'
    },
    {
      id: 3,
      name: 'Begum Rokeya University (BRUR) Youth Collective',
      role: 'Regional Archivists',
      roleBn: 'রংপুর আঞ্চলিক সংরক্ষণকারী দল',
      category: 'artists',
      location: 'Rangpur',
      contributions: 'Documentation of Shaheed Abu Sayed memorial artwork & campus gates',
      avatar: '🎨',
      badge: 'Art Collective'
    },
    {
      id: 4,
      name: 'Faculty of Fine Arts (Charukala) Student Alliance',
      role: 'Mural Artists & Calligraphers',
      roleBn: 'চারুকলা ছাত্র জোট ও ক্যালিগ্রাফার দল',
      category: 'artists',
      location: 'Dhaka (Shahbagh & DU Campus)',
      contributions: 'Original calligraphy compositions ("পানি লাগবে কারো?", "বিকল্প কে?")',
      avatar: '🖌️',
      badge: 'Mural Creator'
    },
    {
      id: 5,
      name: 'Chittagong Street Photographers Guild',
      role: 'Regional Photo Archivists',
      roleBn: 'চট্টগ্রাম পথ-আলোকচিত্রী দল',
      category: 'photo',
      location: 'Chittagong (GEC, Tigerpass, City Gate)',
      contributions: 'Photographic documentation of port city resistance graffiti',
      avatar: '📸',
      badge: 'Verified Archivist'
    },
    {
      id: 6,
      name: 'Jahangirnagar University (JU) Cultural Collective',
      role: 'Campus Mural Archivists',
      roleBn: 'জাবি সাংস্কৃতিক ও দেয়ালচিত্র সংগ্রাহক',
      category: 'artists',
      location: 'Savar, Dhaka',
      contributions: 'Preservation of JU Amphitheater & Battala resistance murals',
      avatar: '✊',
      badge: 'Campus Chapter'
    },
    {
      id: 7,
      name: 'Rajshahi & Sylhet Citizen Volunteers',
      role: 'Regional Citizen Photographers',
      roleBn: 'রাজশাহী ও সিলেট নাগরিক চিত্রগ্রাহক',
      category: 'photo',
      location: 'Rajshahi & Sylhet',
      contributions: 'Community submitted photography of northern and eastern divisional street art',
      avatar: '📍',
      badge: 'Citizen Contributor'
    },
    {
      id: 8,
      name: 'Open Source Community Contributors',
      role: 'Metadata Tagging & Translation Volunteers',
      roleBn: 'ওপেন সোর্স ডেটা ও অনুবাদ স্বেচ্ছাসেবক',
      category: 'tech',
      location: 'Global / Bangladesh',
      contributions: 'English context translations, district map tagging, and bug reporting',
      avatar: '🌐',
      badge: 'Open Source'
    }
  ];

  let filteredContributors = $derived(
    selectedCategory === 'all' 
      ? contributors 
      : contributors.filter(c => c.category === selectedCategory)
  );
</script>

<svelte:head>
  <title>Community Contributors | July Graffiti Archive</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <Navbar activeTab="contributors" />

  <main class="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
    <!-- Page Header -->
    <div class="text-center space-y-4">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
        Community Honor Roll & Open Credits
      </span>
      <h1 class="text-4xl sm:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Contributors & Archivists
      </h1>
      <p class="text-lg text-zinc-300 max-w-3xl mx-auto font-bengali leading-relaxed">
        জুলাই ২০২৪ এর দেয়ালচিত্র, ক্যালিগ্রাফি এবং আলোকচিত্র সংরক্ষণকারী আলোকচিত্রী, ছাত্র-শিল্পী এবং প্রযুক্তি স্বেচ্ছাসেবকদের প্রতি আন্তরিক শ্রদ্ধা।
      </p>
    </div>

    <!-- Stats Bar -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each stats as stat}
        <div class="glass-card p-6 rounded-2xl border border-zinc-800 text-center space-y-1 bg-zinc-900/40">
          <p class="text-3xl sm:text-4xl font-extrabold text-rose-400 font-sans">{stat.value}</p>
          <p class="text-xs font-bold text-white">{stat.label}</p>
          <p class="text-[11px] text-zinc-400 font-bengali">{stat.labelBn}</p>
        </div>
      {/each}
    </div>

    <!-- Category Filter Chips -->
    <div class="flex flex-wrap items-center justify-center gap-2 pt-4">
      <button
        onclick={() => selectedCategory = 'all'}
        class="px-5 py-2 rounded-full text-xs font-bold transition-all {selectedCategory === 'all' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}"
      >
        All Contributors (সকলের অবদান)
      </button>
      <button
        onclick={() => selectedCategory = 'tech'}
        class="px-5 py-2 rounded-full text-xs font-bold transition-all {selectedCategory === 'tech' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}"
      >
        💻 Tech & Maintainers
      </button>
      <button
        onclick={() => selectedCategory = 'photo'}
        class="px-5 py-2 rounded-full text-xs font-bold transition-all {selectedCategory === 'photo' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}"
      >
        📸 Photographers & Archivists
      </button>
      <button
        onclick={() => selectedCategory = 'artists'}
        class="px-5 py-2 rounded-full text-xs font-bold transition-all {selectedCategory === 'artists' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}"
      >
        🎨 Student Artists & Collectives
      </button>
    </div>

    <!-- Contributors Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each filteredContributors as contributor (contributor.id)}
        <div class="glass-card p-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700 transition-all space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-2xl flex items-center justify-center shrink-0">
                  {contributor.avatar}
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white leading-snug">{contributor.name}</h3>
                  <p class="text-xs text-rose-400 font-medium">{contributor.role}</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full text-[10px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 shrink-0">
                {contributor.badge}
              </span>
            </div>

            <p class="text-xs font-bengali text-zinc-400 font-medium">
              {contributor.roleBn}
            </p>

            <p class="text-xs text-zinc-300 leading-relaxed pt-1">
              {contributor.contributions}
            </p>
          </div>

          <div class="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
            <span class="flex items-center gap-1.5">
              <span class="text-rose-500">📍</span> {contributor.location}
            </span>
            <span class="text-emerald-400 font-medium">CC BY 4.0 Verified</span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Call to Action Banner -->
    <div class="glass-card p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-zinc-900 to-rose-950/20 text-center space-y-4">
      <h3 class="text-2xl font-bold font-bengali text-white">আপনিও অবদান রাখতে চান?</h3>
      <p class="text-sm text-zinc-300 max-w-xl mx-auto font-bengali">
        আপনার তোলা দেয়ালচিত্রের ছবি, সঠিক তথ্য বা প্রযুক্তিগত সহায়তা দিয়ে এই উন্মুক্ত সংরক্ষণাগারকে আরও সমৃদ্ধ করুন।
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
        <a 
          href="/submit" 
          class="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
        >
          Submit Photos (ছবি পাঠান)
        </a>
        <a 
          href="/contact" 
          class="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs transition-all"
        >
          Get in Touch (যোগাযোগ করুন)
        </a>
      </div>
    </div>
  </main>

  <Footer />
</div>
