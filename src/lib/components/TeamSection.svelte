<script>
  import { fetchTeamMembers } from '$lib/supabase.js';

  let { 
    showViewAll = true,
    title = "THE JULY GRAFFITY ARCHIVE TEAM"
  } = $props();

  let developers = $state([
    { name: 'Cap Labib', location: 'RANGPUR, BANGLADESH', icon: '/icons/person.svg' }
  ]);

  let photographers = $state([
    { name: 'Riazul Alam Rony', location: 'RANGPUR, BANGLADESH', icon: '/icons/person.svg' },
    { name: 'Rafi Ahmed', location: 'THAKURGAON, BANGLADESH', icon: '/icons/person.svg' }
  ]);

  let artists = $state([
    { name: 'Faculty of Fine Arts (Charukala) Student Alliance', location: 'RANGPUR, BANGLADESH', icon: '/icons/groups.svg' },
    { name: 'Begum Rokeya University (BRUR) Youth Collective', location: 'RANGPUR, BANGLADESH', icon: '/icons/groups.svg' }
  ]);

  $effect(() => {
    fetchTeamMembers().then((data) => {
      if (data && data.length > 0) {
        const devs = data.filter((m) => m.roleGroup === 'developers');
        const photos = data.filter((m) => m.roleGroup === 'photographers');
        const arts = data.filter((m) => m.roleGroup === 'artists');

        if (devs.length > 0) developers = devs;
        if (photos.length > 0) photographers = photos;
        if (arts.length > 0) artists = arts;
      }
    });
  });
</script>

<div class="space-y-6 pt-4">
  <h2 class="text-center font-sans text-2xl font-extrabold tracking-widest text-white uppercase sm:text-3xl">
    {title}
  </h2>

  <div class="space-y-8 rounded-3xl border border-emerald-500/40 bg-[#07140b] p-6 shadow-2xl sm:p-10">
    
    <!-- SECTION 1: DEVELOPERS -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="font-sans text-xs font-bold tracking-widest text-zinc-300 uppercase sm:text-sm">
          DEVELOPERS
        </h3>
        {#if showViewAll}
          <a
            href="/contributors"
            class="rounded-full bg-rose-500 px-4 py-1.5 font-sans text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-rose-600/30 transition-all hover:bg-rose-600"
          >
            VIEW ALL
          </a>
        {/if}
      </div>

      <!-- Flex Grid -->
      <div class="flex flex-wrap items-start justify-center gap-8 sm:justify-start sm:gap-12">
        {#each developers as dev}
          <div class="flex max-w-[170px] flex-col items-center text-center sm:max-w-[200px]">
            <div class="mb-3 flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-400/20 bg-[#376b5a] shadow-inner sm:h-28 sm:w-28">
              <img src={dev.icon} alt={dev.name} class="h-16 w-16 brightness-0" />
            </div>
            <p class="mb-1 font-sans text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
              {dev.name}
            </p>
            <p class="font-sans text-[10px] font-medium tracking-widest text-zinc-400 uppercase sm:text-[11px]">
              {dev.location}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <div class="border-b border-emerald-900/60"></div>

    <!-- SECTION 2: PHOTOGRAPHERS & PHOTO EDITORS -->
    <div class="space-y-6">
      <h3 class="font-sans text-xs font-bold tracking-widest text-zinc-300 uppercase sm:text-sm">
        PHOTOGRAPHERS & PHOTO EDITORS
      </h3>

      <!-- Flex Grid -->
      <div class="flex flex-wrap items-start justify-center gap-8 sm:justify-start sm:gap-12">
        {#each photographers as photo}
          <div class="flex max-w-[170px] flex-col items-center text-center sm:max-w-[200px]">
            <div class="mb-3 flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-400/20 bg-[#376b5a] shadow-inner sm:h-28 sm:w-28">
              <img src={photo.icon} alt={photo.name} class="h-16 w-16 brightness-0" />
            </div>
            <p class="mb-1 font-sans text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
              {photo.name}
            </p>
            <p class="font-sans text-[10px] font-medium tracking-widest text-zinc-400 uppercase sm:text-[11px]">
              {photo.location}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <div class="border-b border-emerald-900/60"></div>

    <!-- SECTION 3: PAINTERS & ARTISTS -->
    <div class="space-y-6">
      <h3 class="font-sans text-xs font-bold tracking-widest text-zinc-300 uppercase sm:text-sm">
        PAINTERS & ARTISTS
      </h3>

      <!-- Artists Flex Grid -->
      <div class="flex flex-wrap items-start justify-center gap-8 sm:justify-start sm:gap-12">
        {#each artists as artist}
          <div class="flex max-w-[170px] flex-col items-center text-center sm:max-w-[200px]">
            <div class="mb-3 flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-400/20 bg-[#376b5a] shadow-inner sm:h-28 sm:w-28">
              <img src={artist.icon} alt={artist.name} class="h-16 w-16 brightness-0" />
            </div>
            <p class="mb-1 font-sans text-xs font-bold leading-tight tracking-wider text-white uppercase sm:text-sm">
              {artist.name}
            </p>
            <p class="font-sans text-[10px] font-medium tracking-widest text-zinc-400 uppercase sm:text-[11px]">
              {artist.location}
            </p>
          </div>
        {/each}
      </div>
    </div>

  </div>
</div>
