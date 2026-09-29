<script>
  import { muralsData, districts } from '../data/murals.js';
  import { dragScroll } from '$lib/utils/dragScroll.js';

  let { selectedDistrict = 'All Districts', onSelectDistrict = () => {} } = $props();

  // Dynamically compute mural counts per district from actual db data
  let districtLocationsMap = $derived.by(() => {
    const counts = {};
    for (const m of muralsData) {
      if (m.district) {
        counts[m.district] = (counts[m.district] || 0) + 1;
      }
    }

    const districtList = districts.filter(d => d !== 'All Districts');

    return districtList.map(name => ({
      name,
      count: counts[name] || 0
    }));
  });
</script>

<section class="py-12 bg-zinc-950 border-t border-zinc-800/60">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
    <!-- Header with clean flex vertical spacing to prevent overlap -->
    <div class="text-center max-w-3xl mx-auto flex flex-col items-center gap-3.5">
      <div>
        <span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
          Geographic Map & Districts
        </span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-extrabold font-bengali text-white leading-normal pt-1">
        স্থান ও জেলাভিত্তিক দেয়ালচিত্র পরিক্রমা
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-bengali leading-relaxed">
        ঢাকা বিশ্ববিদ্যালয়, জাহাঙ্গীরনগর, রাজশাহী, চট্টগ্রাম ও রংপুরের শহীদ স্মারক ও আন্দোলনের চিত্রশিল্প।
      </p>
    </div>

    <!-- District Selection Cards -->
    <div 
      use:dragScroll
      class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 select-none"
    >
      {#each districtLocationsMap as dist}
        <button
          onclick={() => onSelectDistrict(selectedDistrict === dist.name ? 'All Districts' : dist.name)}
          class="p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 {selectedDistrict === dist.name ? 'bg-rose-600 border-rose-500 text-white shadow-xl shadow-rose-600/30 scale-105' : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'}"
        >
          <div>
            <span class="text-xs uppercase tracking-wider font-bold block opacity-70">District</span>
            <span class="text-lg font-bold font-bengali block">{dist.name}</span>
          </div>
          <div class="flex items-center justify-between text-xs pt-2 border-t border-white/10">
            <span>{dist.count} Mural{dist.count === 1 ? '' : 's'}</span>
            <span class="text-rose-400 font-bold">📍</span>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>
