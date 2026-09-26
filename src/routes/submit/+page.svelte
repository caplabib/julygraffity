<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let location = $state('');
  let district = $state('Dhaka');
  let photographerName = $state('');
  let artistGroup = $state('');
  let imageUrl = $state('');
  let description = $state('');
  let isSubmitted = $state(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!location.trim()) return;
    isSubmitted = true;
    setTimeout(() => {
      isSubmitted = false;
      location = '';
      photographerName = '';
      artistGroup = '';
      imageUrl = '';
      description = '';
    }, 5000);
  }
</script>

<svelte:head>
  <title>Submit Artwork | July Graffiti Archive</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <Navbar activeTab="submit" />

  <main class="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
    <!-- Header -->
    <div class="text-center space-y-3">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
        Community Contribution
      </span>
      <h1 class="text-4xl sm:text-5xl font-extrabold font-serif-hero text-white tracking-tight">
        Submit July Revolution Murals
      </h1>
      <p class="text-base text-zinc-300 max-w-2xl mx-auto font-bengali">
        আপনার এলাকার জুলাই বিপ্লবের দেয়ালচিত্রের ছবি ও বিস্তারিত তথ্য জমা দিয়ে ডিজিটাল আর্カイভ রক্ষায় সাহায্য করুন।
      </p>
    </div>

    <!-- Submission Form -->
    <div class="glass-card p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl relative">
      {#if isSubmitted}
        <div class="p-8 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
          <div class="text-4xl">✓</div>
          <h2 class="text-2xl font-bold font-bengali text-emerald-400">ধন্যবাদ! ছবি জমা সম্পন্ন হয়েছে।</h2>
          <p class="text-sm text-zinc-300 font-bengali max-w-md mx-auto">
            আমাদের দল আপনার পাঠানো ছবি ও তথ্য পর্যালোচনা করে মূল আর্カイভে অন্তর্ভুক্ত করবে।
          </p>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Location -->
            <div>
              <label for="locationInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Mural Location / Spot (স্থান) *
              </label>
              <input
                id="locationInput"
                type="text"
                required
                bind:value={location}
                placeholder="e.g. TSC, Dhaka University / Mirpur 10"
                class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
              />
            </div>

            <!-- District -->
            <div>
              <label for="districtSelect" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                District / Region (জেলা)
              </label>
              <select
                id="districtSelect"
                bind:value={district}
                class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              >
                <option value="Dhaka">Dhaka (ঢাকা)</option>
                <option value="Rangpur">Rangpur (রংপুর)</option>
                <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                <option value="Sylhet">Sylhet (সিলেট)</option>
                <option value="Khulna">Khulna (খুলনা)</option>
                <option value="Savar">Savar (সাভার)</option>
                <option value="Other">Other District</option>
              </select>
            </div>

            <!-- Photographer Credit -->
            <div>
              <label for="photoCreditInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Photographer Name (ফটোগ্রাফারের নাম)
              </label>
              <input
                id="photoCreditInput"
                type="text"
                bind:value={photographerName}
                placeholder="e.g. Tanvir Ahmed / Anonymous"
                class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
              />
            </div>

            <!-- Artist / Student Group -->
            <div>
              <label for="artistGroupInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Artist / Student Collective (শিল্পীদের পরিচয়)
              </label>
              <input
                id="artistGroupInput"
                type="text"
                bind:value={artistGroup}
                placeholder="e.g. DU Fine Arts Students / JU Youth"
                class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
              />
            </div>
          </div>

          <!-- Image Link -->
          <div>
            <label for="imageUrlInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Image Drive / Cloud URL (ছবির ড্রাইভ লিংক বা ফাইল URL) *
            </label>
            <input
              id="imageUrlInput"
              type="url"
              required
              bind:value={imageUrl}
              placeholder="e.g. https://drive.google.com/... or https://i.imgur.com/..."
              class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <!-- Description / Context -->
          <div>
            <label for="descriptionInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Mural Description & Slogans (দেয়ালচিত্রের বিবরণ ও স্লোগান)
            </label>
            <textarea
              id="descriptionInput"
              rows="4"
              bind:value={description}
              placeholder="দেয়ালে কি স্লোগান বা ছবি আঁকা আছে, তার বিবরণ লিখুন..."
              class="w-full p-4 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-base shadow-xl shadow-rose-600/30 transition-all font-bengali flex items-center justify-center gap-2"
          >
            <span>📷</span> Submit Artwork for Archiving (আর্কাইভে জমা দিন)
          </button>
        </form>
      {/if}
    </div>
  </main>

  <Footer />
</div>
