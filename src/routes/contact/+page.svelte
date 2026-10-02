<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let formData = $state({
    name: '',
    email: '',
    category: 'correction',
    subject: '',
    message: ''
  });

  let isSubmitted = $state(false);
  let isSubmitting = $state(false);

  function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;
    
    // Simulate submission delay
    setTimeout(() => {
      isSubmitting = false;
      isSubmitted = true;
    }, 800);
  }

  function resetForm() {
    formData = {
      name: '',
      email: '',
      category: 'correction',
      subject: '',
      message: ''
    };
    isSubmitted = false;
  }
</script>

<svelte:head>
  <title>Contact & Inquiries | July Graffiti Archive</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
  <Navbar activeTab="contact" />

  <main class="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center space-y-4">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest">
        Direct Archival Channel
      </span>
      <h1 class="text-4xl sm:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Contact & Inquiries
      </h1>
      <p class="text-lg text-zinc-300 max-w-2xl mx-auto font-bengali leading-relaxed">
        দেয়ালচিত্রের তথ্য সংশোধন, আলোকচিত্রীর কৃতিত্ব যোগ, বা যে কোনো অনুসন্ধানের জন্য আমাদের সাথে যোগাযোগ করুন।
      </p>
    </div>

    <!-- Main Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Contact Form -->
      <div class="lg:col-span-2 glass-card p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 space-y-6">
        {#if isSubmitted}
          <div class="p-8 text-center space-y-4 animate-fadeIn">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-3xl flex items-center justify-center mx-auto">
              ✓
            </div>
            <h3 class="text-2xl font-bold text-white font-bengali">বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
            <p class="text-xs text-zinc-300 font-bengali max-w-md mx-auto leading-relaxed">
              আপনার মতামত/তত্ত্ব আমাদের নিকট পৌঁছেছে। আমাদের টিম খুব শীঘ্রই পর্যালোচনা করে প্রয়োজনীয় পদক্ষেপ নেবে।
            </p>
            <button
              onclick={resetForm}
              class="px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all"
            >
              Send Another Message (আরেকটি বার্তা পাঠান)
            </button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name -->
              <div class="space-y-2">
                <label for="name" class="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Your Name (আপনার নাম) *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  bind:value={formData.name}
                  placeholder="e.g. Tanvir Ahmed"
                  class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500 text-xs transition-colors"
                />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label for="email" class="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Email Address (ইমেইল ঠিকানা) *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  bind:value={formData.email}
                  placeholder="e.g. tanvir@example.com"
                  class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500 text-xs transition-colors"
                />
              </div>
            </div>

            <!-- Inquiry Category -->
            <div class="space-y-2">
              <label for="category" class="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Inquiry Category (বিষয়শ্রেণী) *
              </label>
              <select
                id="category"
                bind:value={formData.category}
                class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-rose-500 text-xs transition-colors"
              >
                <option value="correction">Metadata Correction (অবস্থান বা তথ্য সংশোধন)</option>
                <option value="attribution">Artist / Photographer Attribution (কৃ কৃতিত্ব ও ঋণস্বীকার)</option>
                <option value="submission">Photo Submission Inquiry (ছবি জমা দেওয়ার তথ্য)</option>
                <option value="academic">Academic & Media Inquiry (শিক্ষা ও গবেষণা তথ্য)</option>
                <option value="takedown">Takedown Request (ছবি সরানো বা পরিমার্জন)</option>
                <option value="general">General Feedback (সাধারণ বক্তব্য)</option>
              </select>
            </div>

            <!-- Subject -->
            <div class="space-y-2">
              <label for="subject" class="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Subject (বিষয়) *
              </label>
              <input
                type="text"
                id="subject"
                required
                bind:value={formData.subject}
                placeholder="e.g. Location correction for Mural #04 in TSC"
                class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500 text-xs transition-colors"
              />
            </div>

            <!-- Message Body -->
            <div class="space-y-2">
              <label for="message" class="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Detailed Message (বিস্তারিত বিবরণ) *
              </label>
              <textarea
                id="message"
                rows="5"
                required
                bind:value={formData.message}
                placeholder="Please describe your suggestion, metadata edit, or inquiry..."
                class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500 text-xs transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              {#if isSubmitting}
                <span class="animate-spin text-sm">⏳</span> Sending Message...
              {:else}
                Send Message (বার্তা পাঠান) ➔
              {/if}
            </button>
          </form>
        {/if}
      </div>

      <!-- Info Sidebar -->
      <div class="space-y-6">
        
        <!-- Archival Policy Card -->
        <div class="glass-card p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 space-y-3">
          <div class="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <span>🛡️</span> Correction & Takedown Policy
          </div>
          <p class="text-xs text-zinc-300 font-bengali leading-relaxed">
            আমরা প্রতিটি ম্যুরাল ও আলোকচিত্রের মূল স্রষ্টা এবং চিত্রগ্রাহকের অধিকারকে সম্মান করি। কোনো তথ্য ভুল থাকলে বা নাম যুক্ত করতে চাইলে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <!-- Direct Info Card -->
        <div class="glass-card p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 space-y-4">
          <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span>💻</span> Open Source Maintainer
          </div>
          <div class="text-xs space-y-2 text-zinc-300">
            <p><strong class="text-zinc-100">Project Lead:</strong> Cap Labib</p>
            <p><strong class="text-zinc-100">License:</strong> Creative Commons BY 4.0</p>
            <p><strong class="text-zinc-100">Scope:</strong> Non-commercial digital preservation</p>
          </div>
        </div>

        <!-- Quick Links Card -->
        <div class="glass-card p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 space-y-3">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
          <ul class="text-xs space-y-2 text-zinc-400">
            <li><a href="/contributors" class="hover:text-rose-400 transition-colors">➔ View Contributors Honor Roll</a></li>
            <li><a href="/submit" class="hover:text-rose-400 transition-colors">➔ Submit New Mural Photo</a></li>
            <li><a href="/about" class="hover:text-rose-400 transition-colors">➔ Read Historical Mission</a></li>
          </ul>
        </div>

      </div>

    </div>
  </main>

  <Footer />
</div>
