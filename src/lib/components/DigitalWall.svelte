<script>
  let userText = $state('');
  let authorName = $state('');
  let selectedColor = $state('#f43f5e'); // Crimson default
  let selectedFont = $state('font-graffiti');

  const defaultWallMessages = [
    {
      id: 1,
      text: 'বিকল্প কে? আমি, তুমি, আমরা!',
      author: 'ছাত্র-জনতা (TSC)',
      color: '#f43f5e',
      font: 'font-graffiti',
      date: 'August 2024'
    },
    {
      id: 2,
      text: 'পানি লাগবে, পানি?',
      author: 'শহীদ মুগ্ধর স্মরণে',
      color: '#38bdf8',
      font: 'font-bengali',
      date: 'August 2024'
    },
    {
      id: 3,
      text: 'মেধাভিত্তিক নতুন আগামীর স্বপ্ন!',
      author: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
      color: '#10b981',
      font: 'font-bengali',
      date: 'August 2024'
    },
    {
      id: 4,
      text: 'দেয়ালগুলো কথা বলছে স্বাধীনতার সুরগেয়ে!',
      author: 'বুয়েট শিক্ষার্থীবৃন্দ',
      color: '#f59e0b',
      font: 'font-graffiti',
      date: 'August 2024'
    }
  ];

  let wallMessages = $state([]);

  $effect(() => {
    try {
      const saved = localStorage.getItem('july_graffiti_wall_messages');
      if (saved) {
        wallMessages = JSON.parse(saved);
      } else {
        wallMessages = defaultWallMessages;
      }
    } catch (e) {
      wallMessages = defaultWallMessages;
    }
  });

  function addSprayMessage() {
    if (!userText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: userText.trim(),
      author: authorName.trim() || 'Anonymous Artist',
      color: selectedColor,
      font: selectedFont,
      date: 'Just now'
    };

    wallMessages = [newMessage, ...wallMessages];
    try {
      localStorage.setItem('july_graffiti_wall_messages', JSON.stringify(wallMessages));
    } catch (e) {}

    userText = '';
    authorName = '';
  }

  const sprayColors = [
    { name: 'Crimson Red', hex: '#f43f5e' },
    { name: 'Freedom Emerald', hex: '#10b981' },
    { name: 'Uprising Gold', hex: '#f59e0b' },
    { name: 'Electric Sky', hex: '#38bdf8' },
    { name: 'Pure Chalk White', hex: '#f4f4f5' }
  ];
</script>

<section class="py-12 bg-wall-pattern">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-3">
      <span class="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
        Interactive Canvas
      </span>
      <h2 class="text-3xl sm:text-5xl font-extrabold font-graffiti text-white">
        THE PEOPLE'S DIGITAL SPRAY WALL
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base font-bengali">
        আমাদের মুক্ত দেয়াল। আপনার স্বপ্ন, স্লোগান ও শ্রদ্ধার বার্তা স্প্রে দিয়ে আমাদের ডিজিটাল ক্যানভাসে যোগ করুন।
      </p>
    </div>

    <!-- Interactive Spray Station Input Card -->
    <div class="max-w-3xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative">
      <div class="space-y-6">
        <!-- Input Textarea -->
        <div>
          <label for="wallMessageInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Write Your Graffiti Slogan / Message (Bengali or English)
          </label>
          <textarea
            id="wallMessageInput"
            rows="3"
            bind:value={userText}
            placeholder="e.g. নতুন বাংলাদেশে স্বৈরাচারের স্থান নেই / Freedom for All..."
            class="w-full p-4 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-2xl text-white text-base focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-bengali"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Author Name -->
          <div>
            <label for="authorNameInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Your Name / Student Union / Campus
            </label>
            <input
              id="authorNameInput"
              type="text"
              bind:value={authorName}
              placeholder="e.g. Anonym / JU Student"
              class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
            />
          </div>

          <!-- Color Palette Picker -->
          <div>
            <label id="sprayColorLabel" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Spray Paint Color
            </label>
            <div aria-labelledby="sprayColorLabel" class="flex items-center gap-2 pt-1">
              {#each sprayColors as color}
                <button
                  type="button"
                  onclick={() => selectedColor = color.hex}
                  title={color.name}
                  class="w-8 h-8 rounded-full transition-transform border-2 {selectedColor === color.hex ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}"
                  style="background-color: {color.hex};"
                ></button>
              {/each}
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          onclick={addSprayMessage}
          disabled={!userText.trim()}
          class="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-emerald-600 hover:from-rose-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-rose-950/50 transition-all flex items-center justify-center gap-2"
        >
          <span>🎨</span> Spray Message onto the Wall (দেয়ালে আঁকুন)
        </button>
      </div>
    </div>

    <!-- Live Wall Display Grid -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold font-bengali text-white flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
          লাইভ দেয়াল বার্তাচিত্র ({wallMessages.length})
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each wallMessages as msg (msg.id)}
          <div class="glass-card p-6 rounded-3xl border border-zinc-800 relative group overflow-hidden bg-zinc-950/90 shadow-xl">
            <!-- Spray glow accent background -->
            <div 
              class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-30 pointer-events-none"
              style="background-color: {msg.color};"
            ></div>

            <div class="relative z-10 space-y-4">
              <div class="flex items-center justify-between text-xs text-zinc-500">
                <span class="font-bold uppercase tracking-wider text-rose-400">July Uprising Tag</span>
                <span>{msg.date}</span>
              </div>

              <p 
                class="text-xl sm:text-2xl font-bold leading-relaxed font-bengali"
                style="color: {msg.color}; text-shadow: 0 0 12px {msg.color}40;"
              >
                "{msg.text}"
              </p>

              <div class="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span class="font-medium">― {msg.author}</span>
                <span class="text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">Verified Tag</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>
