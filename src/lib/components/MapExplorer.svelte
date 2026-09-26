<script>
  import { muralsData, districts } from '../data/murals.js';

  let { selectedDistrict = 'All Districts', onSelectDistrict = () => {}, onSelectMural = () => {} } = $props();

  let filteredMurals = $derived(
    selectedDistrict === 'All Districts' 
      ? muralsData 
      : muralsData.filter(m => m.district === selectedDistrict)
  );

  const districtLocationsMap = [
    { name: 'Dhaka', count: 9, hotspots: ['TSC (Dhaka University)', 'Shaheed Minar', 'Mirpur 10', 'Science Lab', 'Rampura', 'Uttara', 'Azimpur', 'Dhanmondi', 'Parliament'] },
    { name: 'Rangpur', count: 1, hotspots: ['Begum Rokeya University (BRUR)'] },
    { name: 'Chittagong', count: 1, hotspots: ['GEC Circle'] },
    { name: 'Rajshahi', count: 1, hotspots: ['Rajshahi University (RU)'] },
    { name: 'Sylhet', count: 1, hotspots: ['Shahjalal University (SUST)'] },
    { name: 'Khulna', count: 1, hotspots: ['Khulna University Gate'] },
    { name: 'Savar', count: 1, hotspots: ['Jahangirnagar University Gate'] }
  ];
</script>

<section class="py-12 bg-zinc-950">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-3">
      <span class="px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
        Geographic Map & Districts
      </span>
      <h2 class="text-3xl sm:text-5xl font-extrabold font-bengali text-white">
        স্থান ও জেলাভিত্তিক দেয়ালচিত্র পরিক্রমা
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-bengali">
        ঢাকা বিশ্ববিদ্যালয়, জাহাঙ্গীরনগর, রাজশাহী, চট্টগ্রাম ও রংপুরের শহীদ স্মারক ও আন্দোলনের চিত্রশিল্প।
      </p>
    </div>

    <!-- District Selection Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {#each districtLocationsMap as dist}
        <button
          onclick={() => onSelectDistrict(dist.name)}
          class="p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 {selectedDistrict === dist.name ? 'bg-rose-600 border-rose-500 text-white shadow-xl shadow-rose-600/30 scale-105' : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'}"
        >
          <div>
            <span class="text-xs uppercase tracking-wider font-bold block opacity-70">District</span>
            <span class="text-lg font-bold font-bengali block">{dist.name}</span>
          </div>
          <div class="flex items-center justify-between text-xs pt-2 border-t border-white/10">
            <span>{dist.count} Mural{dist.count > 1 ? 's' : ''}</span>
            <span class="text-rose-400 font-bold">📍</span>
          </div>
        </button>
      {/each}
    </div>

    <!-- Mapped Murals Showcase -->
    <div class="space-y-4 pt-4">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold font-bengali text-white">
          {selectedDistrict} এর সংরক্ষিত ম্যুরালসমূহ ({filteredMurals.length})
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredMurals as mural}
          <button 
            onclick={() => onSelectMural(mural)}
            class="glass-card rounded-2xl p-4 border border-zinc-800/80 hover:border-rose-500/50 cursor-pointer flex gap-4 items-center group transition-all text-left w-full"
          >
            <img 
              src={mural.image} 
              alt={mural.titleEn} 
              class="w-24 h-24 rounded-xl object-cover group-hover:scale-105 transition-transform"
            />
            <div class="space-y-1 flex-1 min-w-0">
              <span class="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20 inline-block">
                {mural.location}
              </span>
              <h4 class="text-base font-bold font-bengali text-white group-hover:text-rose-400 truncate">
                {mural.titleBn}
              </h4>
              <p class="text-xs text-zinc-400 truncate">
                {mural.artist}
              </p>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>
