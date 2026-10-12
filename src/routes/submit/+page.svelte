<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { submitGraffitiToSupabase } from '$lib/supabase.js';

  // Primary form fields requested
  let email = $state('');
  let location = $state(''); // detaillocation: on which wall the graffiti was painted
  let photographerName = $state('');
  let artistName = $state('');
  let imageUrl = $state('');
  let thoughts = $state('');

  // Database JSON file & content fields
  let jsonFile = $state(null);
  let jsonFileName = $state('');
  let jsonContent = $state('');
  let jsonError = $state('');
  let copiedJson = $state(false);

  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let submissionErrorMessage = $state('');
  let submittedSummary = $state(null);

  const sampleJsonObject = {
    image: '/pictures/IMG_20260925_150215.png',
    titleBn: 'জেন জি একত্রিত',
    titleEn: 'United Gen Z',
    detaillocation: 'Old Auditorium, Townhall Rangpur',
    division: 'Rangpur',
    district: 'Rangpur',
    upzila: 'Rangpur Sadar',
    datePainted: 'Some Time in 2024',
    dateCaptured: '25 September, 2026',
    artist: 'Unknown',
    descriptionBn: '---',
    descriptionEn: '---',
    slogan: '---'
  };

  const sampleJsonString = JSON.stringify(sampleJsonObject, null, 2);

  function copyTemplate() {
    navigator.clipboard.writeText(sampleJsonString);
    copiedJson = true;
    setTimeout(() => {
      copiedJson = false;
    }, 2500);
  }

  function downloadTemplate() {
    const blob = new Blob([sampleJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'graffiti_database_sample.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      jsonError = 'Please upload a valid .json file (শুধুমাত্র .json ফাইল আপলোড করুন)';
      return;
    }

    jsonError = '';
    jsonFile = file;
    jsonFileName = file.name;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const parsed = JSON.parse(text);
        jsonContent = JSON.stringify(parsed, null, 2);

        // Auto-fill form fields if JSON provides them
        if (parsed.detaillocation && !location) location = parsed.detaillocation;
        if (parsed.artist && parsed.artist !== 'Unknown' && !artistName) artistName = parsed.artist;
        if (parsed.image && !imageUrl) imageUrl = parsed.image;
        if (parsed.descriptionBn && parsed.descriptionBn !== '---' && !thoughts) thoughts = parsed.descriptionBn;
      } catch (err) {
        jsonError = 'Invalid JSON format in the uploaded file. (ফাইলটির JSON ফরম্যাট সঠিক নয়)';
      }
    };
    reader.readAsText(file);
  }

  function generateJsonFromFields() {
    const generated = {
      image: imageUrl.trim() || '/pictures/your_image.png',
      titleBn: 'শিরোনাম (বাংলা)',
      titleEn: 'Title (English)',
      detaillocation: location.trim() || 'Specific Wall / Spot Details',
      division: 'Division',
      district: 'District',
      upzila: 'Upazila',
      datePainted: 'July/August 2024',
      dateCaptured: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      artist: artistName.trim() || 'Unknown',
      descriptionBn: thoughts.trim() || '---',
      descriptionEn: '---',
      slogan: '---'
    };
    jsonContent = JSON.stringify(generated, null, 2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !location.trim() || !imageUrl.trim()) return;

    isSubmitting = true;
    submissionErrorMessage = '';

    let parsedJson = null;
    if (jsonContent.trim()) {
      try {
        parsedJson = JSON.parse(jsonContent.trim());
      } catch (err) {
        console.warn('Could not parse JSON content:', err);
      }
    }

    const payload = {
      email: email.trim(),
      detaillocation: location.trim(),
      photographerName: photographerName.trim() || 'Anonymous',
      artistName: artistName.trim() || 'Unknown',
      imageUrl: imageUrl.trim(),
      thoughts: thoughts.trim(),
      jsonData: parsedJson
    };

    try {
      const res = await submitGraffitiToSupabase(payload);
      isSubmitting = false;

      submittedSummary = {
        ...payload,
        id: res.data?.[0]?.id || 'submitted-' + Date.now(),
        hasJson: Boolean(jsonContent || jsonFile),
        isFallback: res.isFallback
      };

      isSubmitted = true;
    } catch (err) {
      isSubmitting = false;
      submissionErrorMessage = err.message || 'Submission failed. Please try again.';
    }
  }

  function resetForm() {
    isSubmitted = false;
    isSubmitting = false;
    submissionErrorMessage = '';
    submittedSummary = null;
    email = '';
    location = '';
    photographerName = '';
    artistName = '';
    imageUrl = '';
    thoughts = '';
    jsonFile = null;
    jsonFileName = '';
    jsonContent = '';
    jsonError = '';
  }
</script>

<svelte:head>
  <title>Submit Graffiti | July Revolution Archive</title>
  <meta name="description" content="Submit July Revolution graffities and street art with high-resolution links, detailed wall locations, credits, and database JSON files to help preserve history." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white bg-wall-pattern">
  <Navbar activeTab="submit" />

  <main class="flex-1 py-10 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 sm:space-y-14 w-full">
    <!-- Header -->
    <div class="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase tracking-widest shadow-sm">
        <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        Community Archival Contribution
      </div>
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-hero text-white tracking-tight">
        Submit July Revolution Graffiti
      </h1>
      <p class="text-sm sm:text-base lg:text-lg text-zinc-300 font-bengali leading-relaxed px-2">
        জুলাই বিপ্লবের রক্তঝরা দিনগুলোর ঐতিহাসিক দেয়ালচিত্র, স্লোগান ও গ্রাফিতি সংরক্ষণ করতে আপনার তোলা ছবি ও প্রামাণ্য তথ্য জমা দিন।
      </p>

      <!-- Link to Submissions Status Page -->
      <div class="pt-1 sm:pt-2 px-2 flex justify-center">
        <a
          href="/submissions"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium sm:font-semibold bg-blue-900/80 hover:bg-blue-800/90 border border-zinc-700/80 hover:border-rose-500 text-zinc-200 hover:text-white transition-all shadow-md group text-center max-w-full"
        >
          <span>Check Submission Status <span class="text-zinc-400 group-hover:text-zinc-200 text-[11px] sm:text-xs font-bengali">(আগের সাবমিশন ট্র্যাক করুন)</span></span>
          <span class="text-rose-400 group-hover:translate-x-0.5 transition-transform shrink-0">➔</span>
        </a>
      </div>
    </div>

    <!-- 1. IMPORTANT DISCLAIMERS (প্রথমেই ডিসক্লেইমার) -->
    <section class="space-y-4">
      <div class="flex items-center gap-3">
        <h2 class="text-xl sm:text-2xl font-bold font-serif-hero text-white flex items-center gap-2">
          Important Submission Disclaimers <span class="text-xs sm:text-sm font-normal text-zinc-400 font-bengali">(জমা দেওয়ার শর্তাবলী ও ঘোষণা)</span>
        </h2>
      </div>

      <div class="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-950/20 via-zinc-900/60 to-zinc-950 shadow-xl space-y-4">
        <p class="text-xs sm:text-sm text-zinc-300 font-bengali leading-relaxed">
          ছবি ও তথ্য পাঠানোর পূর্বে অনুগ্রহ করে নিচের নীতিমালা ও শর্তসমূহ সতর্কতার সাথে পড়ুন। ছবি জমা দেওয়ার মাধ্যমে আপনি এই শর্তাবলীতে সম্মতি প্রদান করছেন:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          <!-- Disclaimer 1: Rights & Ownership -->
          <div class="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div class="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
              <span>Image Ownership & Originality (ছবির স্বত্ব)</span>
            </div>
            <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-bengali">
              আপনি নিশ্চিত করছেন যে ছবিটি আপনার নিজের তোলা অথবা আপনি এর মূল আলোকচিত্রীর কাছ থেকে প্রকাশের সুস্পষ্ট অনুমতি পেয়েছেন। অন্যের ছবি অনুমতি ব্যতিরেকে জমা দেওয়া সম্পূর্ণ নিষিদ্ধ।
            </p>
          </div>

          <!-- Disclaimer 2: Non-Commercial License -->
          <div class="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div class="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
              <span>Open Archival License (সংরক্ষণের অনুমতি)</span>
            </div>
            <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-bengali">
              জমা দেওয়া ছবিসমূহ একটি অলাভজনক ও উন্মুক্ত গণ-আর্কাইভে সংরক্ষিত হবে। গবেষণা, শিক্ষা ও ইতিহাসের দলিল হিসেবে ছবিটির কৃতিত্ব (Credit) মূল আলোকচিত্রী ও শিল্পীকে প্রদান করা হবে।
            </p>
          </div>

          <!-- Disclaimer 3: Authenticity & Truthfulness -->
          <div class="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div class="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
              <span>Authenticity & No AI/Fakes (সত্যতা ও কৃত্রিমতাহীনতা)</span>
            </div>
            <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-bengali">
              ছবিটি জুলাই-আগস্ট ২০২৪ ছাত্র-জনতার গণঅভ্যুত্থানের প্রকৃত দেয়ালচিত্রের হতে হবে। কোনো প্রকার কৃত্রিম বুদ্ধিমত্তা (AI) দ্বারা তৈরি ভুয়া ছবি বা বিতর্কিত বিকৃত ছবি গ্রহণযোগ্য নয়।
            </p>
          </div>

          <!-- Disclaimer 4: Privacy & Review -->
          <div class="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div class="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
              <span>Privacy & Editorial Verification (যাচাই-বাছাই)</span>
            </div>
            <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-bengali">
              নিরাপত্তা রক্ষার্থে আপনি চাইলে ফটোগ্রাফারের নাম গোপন (Anonymous) রাখতে পারেন। আর্কাইভে যুক্ত করার পূর্বে আমাদের ভেরিফিকেশন টিম প্রতিটি এন্ট্রি যাচাই করার অধিকার সংরক্ষণ করে।
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. DETAILED DESCRIPTION OF HOW TO SUBMIT (কিভাবে জমা দেবেন এবং কি কি তথ্য লাগবে) -->
    <section class="space-y-4">
      <div class="flex items-center gap-3">
        <h2 class="text-xl sm:text-2xl font-bold font-serif-hero text-white flex items-center gap-2">
          How to Submit & What We Need on the Site <span class="text-xs sm:text-sm font-normal text-zinc-400 font-bengali">(কীভাবে জমা দেবেন ও প্রয়োজনীয় তথ্যাবলী)</span>
        </h2>
      </div>

      <div class="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800 space-y-6">
        <p class="text-sm text-zinc-300 font-bengali leading-relaxed">
          আর্কাইভে প্রতিটি দেয়ালচিত্র যথাযথভাবে তালিকাভুক্ত ও মানচিত্রে প্রদর্শন করতে আমাদের নিম্নলিখিত উপাদানগুলো প্রয়োজন। অনুগ্রহ করে নিচের ধাপগুলো অনুসরণ করুন:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Step 1 -->
          <div class="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 relative overflow-hidden">
            <div class="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 font-extrabold flex items-center justify-center text-sm border border-rose-500/30">
              1
            </div>
            <h3 class="text-base font-bold text-white">Upload to Cloud / Drive</h3>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed font-bengali">
              আপনার তোলা আসল রেজোলিউশনের ছবিটি Google Drive, Dropbox, iCloud বা Imgur-এ আপলোড করুন। লিংকটির অ্যাক্সেস অবশ্যই <strong>"Anyone with the link can view"</strong> রাখা নিশ্চিত করুন।
            </p>
          </div>

          <!-- Step 2 -->
          <div class="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 relative overflow-hidden">
            <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-sm border border-amber-500/30">
              2
            </div>
            <h3 class="text-base font-bold text-white">Specify Exact Wall & Spot</h3>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed font-bengali">
              গ্রাফিতিটি কোন বিভাগের কোন জেলার <strong>নির্দিষ্ট কোন দেয়ালে বা ভবনে</strong> আঁকা হয়েছিল (যেমন: 'রংপুর টাউন হল অডিটোরিয়াম উত্তর দেয়াল' বা 'টিএসসি লাইব্রেরি প্রাচীর') তা বিস্তারিত উল্লেখ করুন।
            </p>
          </div>

          <!-- Step 3 -->
          <div class="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 relative overflow-hidden">
            <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-sm border border-emerald-500/30">
              3
            </div>
            <h3 class="text-base font-bold text-white">Include Database JSON</h3>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed font-bengali">
              আমাদের আর্কাইভে সরাসরি অন্তর্ভুক্তি দ্রুত করতে নিচে দেওয়া অবজেক্ট ফরম্যাট অনুযায়ী একটি ডাটাবেজ <strong>.json</strong> ফাইল যুক্ত করুন অথবা কোডটি পেস্ট করুন।
            </p>
          </div>
        </div>

        <!-- Required Elements Checklist -->
        <div class="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3">
          <h4 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            Checklist of Required Details for Site Entry:
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-zinc-300 font-bengali">
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✓</span> ব্যবহারকারীর সচল ইমেইল (User Email)
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✓</span> দেয়ালের বিস্তারিত অবস্থান (Detailed Location)
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✓</span> আলোকচিত্রীর নাম (Photographer Name)
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✓</span> শিল্পীর নাম/গ্রুপ (Artist Name if known)
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✓</span> ছবির ড্রাইভ/ক্লাউড লিংক (Drive/Cloud Link)
            </div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">✓</span> স্মৃতি বা ব্যক্তিগত অনুভূতি (Thoughts/Story)
            </div>
            <div class="flex items-center gap-2 sm:col-span-2 lg:col-span-3">
              <span class="text-rose-400 font-bold">✓</span> ডাটাবেজ JSON অবজেক্ট ফাইল (Database JSON File with detailed schema)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SUBMISSION FORM WITH DATABASE JSON FILE (রিওয়ার্কড সাবমিট ফর্ম ও ডাটাবেজ JSON) -->
    <section class="space-y-4">
      <div class="flex items-center gap-3">
        <h2 class="text-xl sm:text-2xl font-bold font-serif-hero text-white flex items-center gap-2">
          Complete Submission Form <span class="text-xs sm:text-sm font-normal text-zinc-400 font-bengali">(ফর্ম পূরণ ও ডাটাবেজ ফাইল সাবমিশন)</span>
        </h2>
      </div>

      <div class="glass-card p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-zinc-800 shadow-2xl relative">
        {#if isSubmitted && submittedSummary}
          <div class="p-6 sm:p-10 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-5 animate-fadeIn">
            <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl text-emerald-400 shadow-lg shadow-emerald-500/10">
              ✓
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl sm:text-3xl font-bold font-bengali text-emerald-400">ধন্যবাদ! দেয়ালচিত্র জমা সম্পন্ন হয়েছে।</h3>
              <p class="text-sm text-zinc-300 font-bengali max-w-lg mx-auto">
                আপনার প্রেরিত তথ্য ও ড্রাইভ লিংক আমাদের রিভিউ টিমের কাছে সংরক্ষিত হয়েছে। যাচাই শেষে এটি মূল ডিজিটাল দেয়ালচিত্র আর্কাইভে অন্তর্ভুক্ত করা হবে।
              </p>
            </div>

            <!-- Summary Card -->
            <div class="max-w-md mx-auto p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-left text-xs space-y-2 text-zinc-300">
              <div class="flex justify-between border-b border-zinc-800 pb-1.5">
                <span class="text-zinc-500">Contact Email:</span>
                <span class="font-mono text-zinc-200">{submittedSummary.email}</span>
              </div>
              <div class="flex justify-between border-b border-zinc-800 pb-1.5">
                <span class="text-zinc-500">Wall / Location:</span>
                <span class="text-zinc-200">{submittedSummary.location}</span>
              </div>
              <div class="flex justify-between border-b border-zinc-800 pb-1.5">
                <span class="text-zinc-500">Photographer:</span>
                <span class="text-zinc-200">{submittedSummary.photographerName}</span>
              </div>
              <div class="flex justify-between border-b border-zinc-800 pb-1.5">
                <span class="text-zinc-500">Artist Credit:</span>
                <span class="text-zinc-200">{submittedSummary.artistName}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-500">Database JSON Attached:</span>
                <span class={submittedSummary.hasJson ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                  {submittedSummary.hasJson ? "Yes ✓" : "No (Auto-catalogued)"}
                </span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="/submissions"
                class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30"
              >
                Track on Submissions Page (স্ট্যাটাস ট্র্যাক করুন) ➔
              </a>
              <button
                onclick={resetForm}
                class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-all"
              >
                Submit Another Graffiti (আরেকটি জমা দিন)
              </button>
            </div>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-6 sm:space-y-8">

            <!-- Primary Contact & Media Link -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <!-- User Email -->
              <div>
                <label for="emailInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Your Email (আপনার ইমেইল ঠিকানা) *
                </label>
                <input
                  id="emailInput"
                  type="email"
                  required
                  bind:value={email}
                  placeholder="e.g. contributor@example.com"
                  class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
                <span class="text-[11px] text-zinc-400 mt-1 block">ছবির সত্যতা যাচাই ও প্রয়োজনে যোগাযোগের জন্য ব্যবহৃত হবে।</span>
              </div>

              <!-- Image Drive or Cloud Link -->
              <div>
                <label for="imageUrlInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Image Drive / Cloud Link (ছবির ড্রাইভ বা ক্লাউড লিংক) *
                </label>
                <input
                  id="imageUrlInput"
                  type="url"
                  required
                  bind:value={imageUrl}
                  placeholder="https://drive.google.com/... or Dropbox / Imgur"
                  class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-mono text-xs"
                />
                <span class="text-[11px] text-zinc-400 mt-1 block">লিংক পারমিশন 'Anyone with link can view' নিশ্চিত করুন।</span>
              </div>
            </div>

            <!-- Location & Wall Details -->
            <div class="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div class="flex items-center justify-between">
                <label for="locationInput" class="block text-xs font-bold uppercase tracking-wider text-rose-400">
                  Location & Specific Wall (দেয়ালচিত্রের স্থান ও সুনির্দিষ্ট দেয়াল) *
                </label>
                <span class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                  detaillocation
                </span>
              </div>
              <input
                id="locationInput"
                type="text"
                required
                bind:value={location}
                placeholder="e.g. Old Auditorium, Townhall Rangpur / TSC North Wall, Dhaka University"
                class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
              />
              <p class="text-xs text-amber-400/90 flex items-start gap-1.5 font-bengali">
                <span><strong>জরুরি দ্রষ্টব্য:</strong> এই তথ্যটি দিয়ে আমাদের জানাতে হবে গ্রাফিতিটি ঠিক কোন দেয়ালে বা ভবনে আঁকা হয়েছিল (যেমন: অমুক লাইব্রেরির সম্মুখ দেয়াল, অডিটোরিয়াম প্রাচীর ইত্যাদি)।</span>
              </p>
            </div>

            <!-- Credits Grid: Photographer & Artist Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <!-- Photographer Name -->
              <div>
                <label for="photographerNameInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Photographer Name (ফটোগ্রাফারের নাম / ক্রেডিট)
                </label>
                <input
                  id="photographerNameInput"
                  type="text"
                  bind:value={photographerName}
                  placeholder="e.g. Tanvir Ahmed (বা Anonymous রাখুন)"
                  class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
                />
              </div>

              <!-- Artist Name If Known -->
              <div>
                <label for="artistNameInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Artist Name if Known (শিল্পীর নাম জানা থাকলে)
                </label>
                <input
                  id="artistNameInput"
                  type="text"
                  bind:value={artistName}
                  placeholder="e.g. DU Fine Arts Collective / জানা না থাকলে ফাঁকা রাখুন"
                  class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali"
                />
              </div>
            </div>

            <!-- Thoughts / Personal Reflections -->
            <div>
              <label for="thoughtsInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Some Thoughts / Context (আপনার কোনো চিন্তা বা স্মৃতি শেয়ার করতে চাইলে)
              </label>
              <textarea
                id="thoughtsInput"
                rows="3"
                bind:value={thoughts}
                placeholder="দেয়ালচিত্রটি দেখার মুহূর্তের অভিজ্ঞতা, স্লোগানের প্রেক্ষাপট বা কোনো বিশেষ স্মৃতি থাকলে শেয়ার করুন..."
                class="w-full p-4 bg-zinc-950 border border-zinc-700 focus:border-rose-500 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-bengali leading-relaxed"
              ></textarea>
            </div>

            <!-- DATABASE JSON FILE SECTION (ডাটাবেজ JSON ফাইল সেকশন) -->
            <div class="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-zinc-700 space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <h3 class="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      Database JSON File / Schema (ডাটাবেজ JSON ফাইল)
                    </h3>
                  </div>
                  <p class="text-xs text-zinc-400 font-bengali">
                    আর্কাইভে যুক্ত করার জন্য নিচে উল্লিখিত ফরম্যাটের JSON ফাইল আপলোড করুন অথবা কোডটি পেস্ট করুন।
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    onclick={copyTemplate}
                    class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all flex items-center gap-1.5 border border-zinc-700"
                  >
                    {#if copiedJson}
                      <span class="text-emerald-400">✓ Copied!</span>
                    {:else}
                      <span>Copy Template</span>
                    {/if}
                  </button>

                  <button
                    type="button"
                    onclick={downloadTemplate}
                    class="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold transition-all flex items-center gap-1.5 border border-rose-500/30"
                  >
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              <!-- JSON Schema Explanation & Preview -->
              <div class="space-y-3">
                <div class="flex items-center justify-between text-xs text-zinc-400">
                  <span class="font-mono text-[11px] text-rose-400">Schema Template (নির্ধারিত অবজেক্ট স্ট্রাকচার):</span>
                  <button
                    type="button"
                    onclick={generateJsonFromFields}
                    class="text-xs text-rose-400 hover:text-rose-300 underline font-bengali"
                  >
                    ওপরের তথ্য থেকে JSON তৈরি করুন
                  </button>
                </div>

                <!-- Syntax Highlighted JSON Preview Box -->
                <div class="relative bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs overflow-x-auto max-h-56 custom-h-scrollbar">
                  <pre class="text-zinc-300 leading-relaxed font-mono"><code>&#123;
  <span class="text-rose-400">"image"</span>: <span class="text-emerald-400">"/pictures/IMG_20260925_150215.png"</span>,
  <span class="text-rose-400">"titleBn"</span>: <span class="text-emerald-400">"জেন জি একত্রিত"</span>,
  <span class="text-rose-400">"titleEn"</span>: <span class="text-emerald-400">"United Gen Z"</span>,
  <span class="text-rose-400 font-bold">"detaillocation"</span>: <span class="text-amber-300">"Old Auditorium, Townhall Rangpur"</span>, <span class="text-zinc-400">// Informs on which wall painted</span>
  <span class="text-rose-400">"division"</span>: <span class="text-emerald-400">"Rangpur"</span>,
  <span class="text-rose-400">"district"</span>: <span class="text-emerald-400">"Rangpur"</span>,
  <span class="text-rose-400">"upzila"</span>: <span class="text-emerald-400">"Rangpur Sadar"</span>,
  <span class="text-rose-400">"datePainted"</span>: <span class="text-emerald-400">"Some Time in 2024"</span>,
  <span class="text-rose-400">"dateCaptured"</span>: <span class="text-emerald-400">"25 September, 2026"</span>,
  <span class="text-rose-400">"artist"</span>: <span class="text-emerald-400">"Unknown"</span>,
  <span class="text-rose-400">"descriptionBn"</span>: <span class="text-emerald-400">"---"</span>,
  <span class="text-rose-400">"descriptionEn"</span>: <span class="text-emerald-400">"---"</span>,
  <span class="text-rose-400">"slogan"</span>: <span class="text-emerald-400">"---"</span>
&#125;</code></pre>
                </div>
              </div>

              <!-- Upload or Paste JSON Area -->
              <div class="space-y-4 pt-2">
                <!-- File Upload Input -->
                <div>
                  <label for="jsonFileInput" class="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Option A: Upload Database .json File (ফাইল আপলোড করুন)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      id="jsonFileInput"
                      type="file"
                      accept=".json"
                      onchange={handleFileUpload}
                      class="block w-full text-xs text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-500/20 file:text-rose-300 hover:file:bg-rose-500/30 file:cursor-pointer cursor-pointer bg-zinc-950 p-2 rounded-xl border border-zinc-800"
                    />
                  </div>
                  {#if jsonFileName}
                    <div class="text-xs text-emerald-400 mt-1.5 flex items-center gap-1.5">
                      <span>✓ Loaded file:</span> <strong class="font-mono">{jsonFileName}</strong>
                    </div>
                  {/if}
                  {#if jsonError}
                    <div class="text-xs text-rose-400 mt-1.5">
                      {jsonError}
                    </div>
                  {/if}
                </div>

                <!-- Paste JSON Code Box -->
                <div>
                  <label for="jsonTextarea" class="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Option B: Or Paste JSON Content Directly (অথবা সরাসরি JSON কোড পেস্ট করুন)
                  </label>
                  <textarea
                    id="jsonTextarea"
                    rows="5"
                    bind:value={jsonContent}
                    placeholder={`{\n  "image": "...",\n  "titleBn": "...",\n  "detaillocation": "Old Auditorium, Townhall Rangpur",\n  ...\n}`}
                    class="w-full p-3.5 bg-zinc-950 border border-zinc-800 focus:border-rose-500 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 custom-h-scrollbar"
                  ></textarea>
                </div>
              </div>
            </div>

            {#if submissionErrorMessage}
              <div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
                {submissionErrorMessage}
              </div>
            {/if}

            <!-- Submit Action Button -->
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 transition-all font-bengali flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              {#if isSubmitting}
                <svg class="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Submitting to Database (ডাটাবেজে পাঠানো হচ্ছে)...</span>
              {:else}
                <span>Submit Graffiti for Digital Archiving (আর্কাইভে জমা দিন)</span>
              {/if}
            </button>
          </form>
        {/if}
      </div>
    </section>
  </main>

  <Footer />
</div>
