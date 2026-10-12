<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { fetchSubmissionsFromSupabase, updateSubmissionInSupabase } from '$lib/supabase.js';

  let submissions = $state([]);
  let isLoading = $state(true);
  let errorMessage = $state('');
  let searchQuery = $state('');
  let selectedFilter = $state('all'); // all, pending, approved, rejected, needs_info

  // Admin / Moderator mode state
  let isAdminMode = $state(false);
  let adminPasswordInput = $state('');
  let adminAuthError = $state('');
  let updatingId = $state(null);
  let updateSuccessId = $state(null);

  // Detail / JSON modal
  let selectedModalSubmission = $state(null);
  let copiedModalJson = $state(false);
  let copiedGraffitiJs = $state(false);

  onMount(async () => {
    await loadSubmissions();
  });

  async function loadSubmissions() {
    isLoading = true;
    errorMessage = '';
    const res = await fetchSubmissionsFromSupabase();
    isLoading = false;

    if (res.data && res.data.length > 0) {
      submissions = res.data;
    } else {
      // Default sample if database is empty yet
      submissions = [
        {
          id: 'sample-01',
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          email: 'sample.contributor@julyarchive.org',
          detaillocation: 'Old Auditorium, Townhall Rangpur',
          photographer_name: 'Tanvir Ahmed',
          artist_name: 'DU Fine Arts Collective',
          image_url: 'https://drive.google.com/file/d/sample-view-link/view',
          thoughts: 'Painted during the resistance rally at Rangpur Town Hall. Preserving the memory of youth courage.',
          status: 'approved',
          admin_notes: 'Verified location and clear photography. Added to primary catalog.',
          json_data: {
            image: '/pictures/IMG_20260925_150215.png',
            titleBn: 'জেন জি একত্রিত',
            titleEn: 'United Gen Z',
            detaillocation: 'Old Auditorium, Townhall Rangpur',
            division: 'Rangpur',
            district: 'Rangpur',
            upzila: 'Rangpur Sadar',
            datePainted: 'Some Time in 2024',
            dateCaptured: '25 September, 2026',
            artist: 'DU Fine Arts Collective',
            descriptionBn: 'জেন জি তরুণদের ঐক্যবদ্ধ প্রতিরোধ',
            descriptionEn: 'United Gen Z resistance graffiti',
            slogan: 'We Want Justice'
          }
        }
      ];
    }
  }

  let adminToken = $state('');
  let isAuthenticating = $state(false);

  async function unlockAdmin() {
    if (!adminPasswordInput.trim()) {
      adminAuthError = 'Please enter a passcode.';
      return;
    }
    isAuthenticating = true;
    adminAuthError = '';

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: adminPasswordInput.trim() })
      });
      const data = await res.json();
      isAuthenticating = false;

      if (data.success && data.token) {
        isAdminMode = true;
        adminToken = data.token;
        adminPasswordInput = '';
        adminAuthError = '';
      } else {
        adminAuthError = data.error || 'Invalid moderator passcode.';
      }
    } catch (err) {
      isAuthenticating = false;
      adminAuthError = 'Verification request failed. Please check connection.';
    }
  }

  async function handleStatusUpdate(submission, newStatus, notes) {
    updatingId = submission.id;
    updateSuccessId = null;

    try {
      // 1. Try updating via protected server API with admin token
      const res = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          id: submission.id,
          status: newStatus,
          adminNotes: notes,
          adminToken
        })
      });

      const result = await res.json();
      updatingId = null;

      if (result.success) {
        submission.status = newStatus;
        submission.admin_notes = notes;
        updateSuccessId = submission.id;
        setTimeout(() => {
          updateSuccessId = null;
        }, 3000);
      } else {
        // Fallback update in case using local mock database
        const fb = await updateSubmissionInSupabase(submission.id, {
          status: newStatus,
          adminNotes: notes
        });
        if (!fb.error) {
          submission.status = newStatus;
          submission.admin_notes = notes;
          updateSuccessId = submission.id;
          setTimeout(() => {
            updateSuccessId = null;
          }, 3000);
        } else {
          alert('Could not update status: ' + (result.error || fb.error));
        }
      }
    } catch (err) {
      updatingId = null;
      alert('Error updating submission: ' + err.message);
    }
  }

  // Filtered list
  let filteredSubmissions = $derived(
    submissions.filter((item) => {
      const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesFilter;

      const inEmail = (item.email || '').toLowerCase().includes(query);
      const inLocation = (item.detaillocation || '').toLowerCase().includes(query);
      const inPhotographer = (item.photographer_name || '').toLowerCase().includes(query);
      const inArtist = (item.artist_name || '').toLowerCase().includes(query);
      const inStatus = (item.status || '').toLowerCase().includes(query);

      return matchesFilter && (inEmail || inLocation || inPhotographer || inArtist || inStatus);
    })
  );

  function getStatusBadge(status) {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved & Archived (অনুমোদিত)',
          classes: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
          dot: 'bg-emerald-400',
          icon: ''
        };
      case 'rejected':
        return {
          label: 'Rejected (বাতিল)',
          classes: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
          dot: 'bg-rose-400',
          icon: ''
        };
      case 'needs_info':
        return {
          label: 'Needs Info (অতিরিক্ত তথ্য প্রয়োজন)',
          classes: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
          dot: 'bg-sky-400',
          icon: ''
        };
      case 'pending':
      default:
        return {
          label: 'Under Review (পর্যালোচনাধীন)',
          classes: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
          dot: 'bg-amber-400',
          icon: ''
        };
    }
  }

  function maskEmail(email) {
    if (!email || !email.includes('@')) return 'Protected Email';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `${user[0]}***@${domain}`;
    return `${user.slice(0, 2)}***${user.slice(-1)}@${domain}`;
  }

  function getSafeJsonForDisplay(item) {
    const raw = item?.json_data || item;
    if (!raw) return {};
    if (isAdminMode) return raw;

    const cloned = JSON.parse(JSON.stringify(raw));
    if (cloned.image && (cloned.image.startsWith('http') || cloned.image.includes('drive'))) {
      cloned.image = '[Protected Link - Review only]';
    }
    if (cloned.image_url && (cloned.image_url.startsWith('http') || cloned.image_url.includes('drive'))) {
      cloned.image_url = '[Protected Link - Review only]';
    }
    if (cloned.email) {
      cloned.email = maskEmail(cloned.email);
    }
    return cloned;
  }

  function copyJsonString(obj) {
    const toCopy = getSafeJsonForDisplay(obj);
    navigator.clipboard.writeText(JSON.stringify(toCopy, null, 2));
    copiedModalJson = true;
    setTimeout(() => (copiedModalJson = false), 2000);
  }

  function copyAsGraffitiJsEntry(item) {
    const formatted = `  {
    id: 'graffiti-${item.id.slice(0, 8)}',
    image: '${item.json_data?.image || item.image_url}',
    titleBn: '${item.json_data?.titleBn || 'জুলাই বিপ্লব দেয়ালচিত্র'}',
    titleEn: '${item.json_data?.titleEn || 'July Revolution Graffiti'}',
    location: '${item.detaillocation}',
    division: '${item.json_data?.division || 'Dhaka'}',
    district: '${item.json_data?.district || 'Dhaka'}',
    upzila: '${item.json_data?.upzila || ''}',
    datePainted: '${item.json_data?.datePainted || 'July 2024'}',
    dateCaptured: '${item.json_data?.dateCaptured || new Date(item.created_at).toLocaleDateString()}',
    artist: '${item.artist_name || 'Unknown'}',
    photographer: '${item.photographer_name || 'Anonymous'}',
    descriptionBn: '${item.json_data?.descriptionBn || item.thoughts || '---'}',
    descriptionEn: '${item.json_data?.descriptionEn || '---'}',
    slogan: '${item.json_data?.slogan || '---'}',
    likes: 0,
    tags: ['Community Submission', '${item.json_data?.division || 'July 2024'}'],
    heroLandscape: false,
    heroPortraits: false
  },`;

    navigator.clipboard.writeText(formatted);
    copiedGraffitiJs = true;
    setTimeout(() => (copiedGraffitiJs = false), 2500);
  }
</script>

<svelte:head>
  <title>Submissions Status & Tracking | July Graffiti Archive</title>
  <meta name="description" content="Check the status of submitted July Revolution graffities, view pending/approved contributions, or manage entries." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white bg-wall-pattern">
  <Navbar activeTab="submissions" />

  <main class="flex-1 py-10 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 sm:space-y-12 w-full">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
      <div class="space-y-3 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase tracking-widest shadow-sm">
          Archival Submissions Hub
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-serif-hero text-white tracking-tight">
          Track Graffiti Submissions
        </h1>
        <p class="text-sm sm:text-base text-zinc-300 font-bengali leading-relaxed">
          নাগরিকদের পাঠানো প্রতিটি দেয়ালচিত্রের বর্তমান অবস্থা (রিভিউ, অনুমোদন বা সংশোধন) ট্র্যাক করুন।
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center gap-3">
        <a
          href="/submit"
          class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
        >
          Submit New Graffity
        </a>

        <button
          onclick={() => loadSubmissions()}
          class="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
          title="Refresh List"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Admin / Moderator Bar -->
    <div class="glass-card p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div>
          <h3 class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            Moderator & Backend Update Tools
            {#if isAdminMode}
              <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                Active (সক্রিয়)
              </span>
            {/if}
          </h3>
          <p class="text-[11px] text-zinc-400 font-bengali">
            {isAdminMode ? 'স্ট্যাটাস ও অ্যাডমিন নোট সরাসরি আপডেট করতে নিচের বাটনগুলো ব্যবহার করুন।' : 'সাবমিশন স্ট্যাটাস অনুমোদন বা বাতিল করতে মডারেটর মোড সক্রিয় করুন।'}
          </p>
        </div>
      </div>

      {#if !isAdminMode}
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="password"
            bind:value={adminPasswordInput}
            placeholder="Passcode"
            class="px-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-36 font-mono"
            onkeydown={(e) => e.key === 'Enter' && unlockAdmin()}
          />
          <button
            onclick={unlockAdmin}
            disabled={isAuthenticating}
            class="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-60 text-zinc-200 hover:text-white text-xs font-semibold shrink-0 transition-all border border-zinc-700 flex items-center gap-1.5"
          >
            {#if isAuthenticating}
              <span class="animate-spin">⏳</span> Verifying...
            {:else}
              Unlock Mode
            {/if}
          </button>
        </div>
      {:else}
        <button
          onclick={() => (isAdminMode = false)}
          class="px-3 py-1 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors border border-zinc-700"
        >
          Lock Admin Mode
        </button>
      {/if}
    </div>

    {#if adminAuthError}
      <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
        {adminAuthError}
      </div>
    {/if}

    <!-- Search & Status Filter Pills -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Filter Tabs -->
      <div class="flex flex-wrap items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 w-full md:w-auto">
        <button
          onclick={() => (selectedFilter = 'all')}
          class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all {selectedFilter === 'all' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white'}"
        >
          All ({submissions.length})
        </button>
        <button
          onclick={() => (selectedFilter = 'pending')}
          class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 {selectedFilter === 'pending' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'text-zinc-400 hover:text-white'}"
        >
          <span class="w-2 h-2 rounded-full bg-amber-400"></span> Under Review ({submissions.filter((s) => s.status === 'pending').length})
        </button>
        <button
          onclick={() => (selectedFilter = 'approved')}
          class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 {selectedFilter === 'approved' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-zinc-400 hover:text-white'}"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Approved ({submissions.filter((s) => s.status === 'approved').length})
        </button>
        <button
          onclick={() => (selectedFilter = 'needs_info')}
          class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 {selectedFilter === 'needs_info' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'text-zinc-400 hover:text-white'}"
        >
          <span class="w-2 h-2 rounded-full bg-sky-400"></span> Needs Info ({submissions.filter((s) => s.status === 'needs_info').length})
        </button>
        <button
          onclick={() => (selectedFilter = 'rejected')}
          class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 {selectedFilter === 'rejected' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-zinc-400 hover:text-white'}"
        >
          <span class="w-2 h-2 rounded-full bg-rose-400"></span> Rejected ({submissions.filter((s) => s.status === 'rejected').length})
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-72">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by email, wall, artist..."
          class="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors pr-8 font-bengali"
        />
        {#if searchQuery}
          <button
            onclick={() => (searchQuery = '')}
            class="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300 text-xs"
          >
            ✕
          </button>
        {/if}
      </div>
    </div>

    <!-- Submissions Cards Grid -->
    {#if isLoading}
      <div class="py-20 text-center space-y-3">
        <svg class="animate-spin w-8 h-8 mx-auto text-rose-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <p class="text-sm text-zinc-400 font-bengali">লোড হচ্ছে... ডাটাবেজ থেকে তথ্য আনা হচ্ছে</p>
      </div>
    {:else if filteredSubmissions.length === 0}
      <div class="glass-card p-12 text-center rounded-3xl border border-zinc-800 space-y-4">
        <div class="w-12 h-12 mx-auto rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
        </div>
        <h3 class="text-lg font-bold text-white font-bengali">কোনো সাবমিশন খুঁজে পাওয়া যায়নি</h3>
        <p class="text-xs text-zinc-400 max-w-sm mx-auto font-bengali">
          আপনার অনুসন্ধানের সাথে মিল রেখে কোনো দেয়ালচিত্র পাওয়া যায়নি অথবা এখনো কোনো এন্ট্রি জমা হয়নি।
        </p>
        <a
          href="/submit"
          class="inline-block px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all"
        >
          Submit the First Graffiti ➔
        </a>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-5">
        {#each filteredSubmissions as item (item.id)}
          {@const badge = getStatusBadge(item.status)}
          <div class="glass-card p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-5 relative overflow-hidden group">
            
            <!-- Top Row: Status & Timestamp -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div class="flex items-center gap-2.5 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border {badge.classes}">
                  <span class="w-2 h-2 rounded-full {badge.dot} animate-pulse"></span>
                  {badge.label}
                </span>

                <span class="text-xs text-zinc-500 font-mono">
                  ID: #{String(item.id).slice(0, 8)}
                </span>
              </div>

              <div class="text-xs text-zinc-400 font-mono flex items-center gap-2">
                <span>{new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Column 1: Detailed Location & Contact -->
              <div class="space-y-3">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    Wall & Location (সুনির্দিষ্ট দেয়াল / স্থান)
                  </span>
                  <p class="text-sm font-semibold text-white font-bengali">
                    {item.detaillocation || 'Location not specified'}
                  </p>
                </div>

                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Submitter Email
                  </span>
                  {#if isAdminMode}
                    <p class="text-xs font-mono text-zinc-200 truncate select-all" title={item.email}>
                      {item.email}
                    </p>
                  {:else}
                    <p class="text-xs font-mono text-zinc-400 truncate flex items-center gap-1.5" title="Email hidden for contributor privacy">
                      <span class="text-[10px] text-zinc-500">🔒</span>
                      <span>{maskEmail(item.email)}</span>
                    </p>
                  {/if}
                </div>

                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Drive / Cloud Media Link
                  </span>
                  {#if isAdminMode}
                    <a
                      href={item.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs text-rose-400 hover:text-rose-300 font-medium underline flex items-center gap-1 break-all"
                    >
                      <span>🔗</span> Open Photo Link ➔
                    </a>
                  {:else}
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
                      <span class="text-emerald-400">✓</span>
                      <span>Attached (Moderators Only)</span>
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Column 2: Credits & Reflections -->
              <div class="space-y-3">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Photographer
                    </span>
                    <p class="text-xs text-zinc-200 font-bengali">
                      {item.photographer_name || 'Anonymous'}
                    </p>
                  </div>

                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Artist Credit
                    </span>
                    <p class="text-xs text-zinc-200 font-bengali">
                      {item.artist_name || 'Unknown'}
                    </p>
                  </div>
                </div>

                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    Thoughts / Context
                  </span>
                  <p class="text-xs text-zinc-300 font-bengali line-clamp-3 leading-relaxed">
                    {item.thoughts || 'No personal reflection provided.'}
                  </p>
                </div>
              </div>

              <!-- Column 3: Actions & JSON Data Preview -->
              <div class="flex flex-col justify-between space-y-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-zinc-400 font-medium">Database JSON:</span>
                    <span class="font-mono text-[11px] {item.json_data ? 'text-emerald-400' : 'text-zinc-500'}">
                      {item.json_data ? '✓ Schema Attached' : 'Auto-structured'}
                    </span>
                  </div>

                  {#if item.admin_notes}
                    <div class="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-bengali">
                      <strong class="text-amber-400 block mb-0.5">Admin Note:</strong>
                      {item.admin_notes}
                    </div>
                  {/if}
                </div>

                {#if isAdminMode}
                  <div class="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onclick={() => (selectedModalSubmission = item)}
                      class="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      View Full Details
                    </button>

                    <button
                      onclick={() => copyAsGraffitiJsEntry(item)}
                      class="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors border border-rose-500/30 flex items-center gap-1.5"
                      title="Export formatted object ready to paste into graffiti.js"
                    >
                      {#if copiedGraffitiJs}
                        <span>✓ Copied entry!</span>
                      {:else}
                        <span>Copy for graffiti.js</span>
                      {/if}
                    </button>
                  </div>
                {:else}
                  <div class="pt-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-500 font-mono">
                      <span>🔒</span> Full Details & Code Restricted to Moderators
                    </span>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Inline Moderator Controls (When Admin Mode is Unlocked) -->
            {#if isAdminMode}
              <div class="pt-4 border-t border-zinc-800/80 bg-zinc-950/70 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-4 sm:p-5 rounded-b-2xl sm:rounded-b-3xl space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Quick Status Action:
                    </span>
                    {#if updateSuccessId === item.id}
                      <span class="text-xs text-emerald-400 font-bold animate-fadeIn">
                        ✓ Status updated successfully!
                      </span>
                    {/if}
                  </div>

                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      disabled={updatingId === item.id}
                      onclick={() => handleStatusUpdate(item, 'approved', item.admin_notes || 'Approved for archiving')}
                      class="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1"
                    >
                      ✓ Approve
                    </button>
                    <button
                      disabled={updatingId === item.id}
                      onclick={() => handleStatusUpdate(item, 'needs_info', item.admin_notes || 'Please provide clear wall photo or location')}
                      class="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1"
                    >
                      Needs Info
                    </button>
                    <button
                      disabled={updatingId === item.id}
                      onclick={() => handleStatusUpdate(item, 'rejected', item.admin_notes || 'Not verified as July revolution graffiti')}
                      class="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1"
                    >
                      ✕ Reject
                    </button>
                    <button
                      disabled={updatingId === item.id}
                      onclick={() => handleStatusUpdate(item, 'pending', item.admin_notes || '')}
                      class="px-3 py-1 rounded-lg bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-zinc-200 text-xs font-bold transition-all"
                    >
                      Reset to Review
                    </button>
                  </div>
                </div>

                <!-- Admin Notes Input -->
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    bind:value={item.admin_notes}
                    placeholder="Add moderator remarks or reason (e.g. Verified from DU campus, high resolution photo)..."
                    class="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-rose-500 font-bengali"
                  />
                  <button
                    disabled={updatingId === item.id}
                    onclick={() => handleStatusUpdate(item, item.status, item.admin_notes)}
                    class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold shrink-0"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </main>

  <!-- Detailed Modal for Viewing Submission JSON & Information (Moderators Only) -->
  {#if selectedModalSubmission && isAdminMode}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
      <div class="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 relative custom-h-scrollbar">
        <!-- Close Button -->
        <button
          onclick={() => (selectedModalSubmission = null)}
          class="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-rose-400">Submission Details</span>
            <span class="text-xs font-mono text-zinc-500">#{selectedModalSubmission.id}</span>
          </div>
          <h2 class="text-xl font-bold font-serif-hero text-white">
            {selectedModalSubmission.detaillocation}
          </h2>
        </div>

        <!-- Metadata Summary Table -->
        <div class="grid grid-cols-2 gap-4 text-xs bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
          <div>
            <span class="text-zinc-500 block">Current Status:</span>
            <span class="font-bold text-white capitalize">{selectedModalSubmission.status}</span>
          </div>
          <div>
            <span class="text-zinc-500 block">Submitted Email:</span>
            {#if isAdminMode}
              <span class="font-mono text-zinc-200 select-all">{selectedModalSubmission.email}</span>
            {:else}
              <span class="font-mono text-zinc-400 inline-flex items-center gap-1.5" title="Email hidden for contributor privacy">
                <span class="text-[10px]">🔒</span>
                <span>{maskEmail(selectedModalSubmission.email)}</span>
              </span>
            {/if}
          </div>
          <div>
            <span class="text-zinc-500 block">Photographer Credit:</span>
            <span class="text-zinc-200">{selectedModalSubmission.photographer_name || 'Anonymous'}</span>
          </div>
          <div>
            <span class="text-zinc-500 block">Artist Credit:</span>
            <span class="text-zinc-200">{selectedModalSubmission.artist_name || 'Unknown'}</span>
          </div>
          <div class="col-span-2">
            <span class="text-zinc-500 block">Image URL / Drive Link:</span>
            {#if isAdminMode}
              <a
                href={selectedModalSubmission.image_url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-rose-400 underline font-mono text-[11px] break-all"
              >
                {selectedModalSubmission.image_url}
              </a>
            {:else}
              <div class="font-mono text-[11px] text-zinc-400 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800 inline-flex items-center gap-2">
                <span>🔒</span>
                <span>Protected Link (Visible to verified moderators only)</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- Raw JSON Data Viewer -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold uppercase tracking-wider text-zinc-400">Attached Database JSON:</span>
            <button
              onclick={() => copyJsonString(selectedModalSubmission)}
              class="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
            >
              {copiedModalJson ? '✓ Copied JSON' : 'Copy JSON'}
            </button>
          </div>

          <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs overflow-x-auto max-h-56 custom-h-scrollbar">
            <pre class="text-zinc-300"><code>{JSON.stringify(getSafeJsonForDisplay(selectedModalSubmission), null, 2)}</code></pre>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            onclick={() => (selectedModalSubmission = null)}
            class="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  {/if}

  <Footer />
</div>
