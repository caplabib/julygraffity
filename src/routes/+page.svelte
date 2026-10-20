<script>
	import { graffitiData } from '$lib/data/graffiti.js';
	import { fetchGraffiti } from '$lib/supabase.js';
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import GraffitiCard from '$lib/components/GraffitiCard.svelte';
	import GraffitiModal from '$lib/components/GraffitiModal.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let activeTab = $state('gallery');
	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let selectedDistrict = $state('All Districts');
	let selectedGraffiti = $state(null);
	let graffitiList = $state(graffitiData);

	// Load dynamic graffiti from Supabase on mount
	$effect(() => {
		fetchGraffiti().then((data) => {
			if (data && data.length > 0) {
				graffitiList = data;
			}
		});
	});

	// Derived filtered graffiti
	let filteredGraffiti = $derived(
		graffitiList.filter((graffiti) => {
			const matchesSearch =
				!searchQuery.trim() ||
				graffiti.titleBn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				graffiti.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				graffiti.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				graffiti.slogan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				graffiti.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				graffiti.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

			const matchesCategory = selectedCategory === 'All' || graffiti.category === selectedCategory;

			const matchesDistrict =
				selectedDistrict === 'All Districts' || graffiti.district === selectedDistrict;

			return matchesSearch && matchesCategory && matchesDistrict;
		})
	);

	// Home page shows max 12 best matching pictures at a time
	let displayedGraffiti = $derived(filteredGraffiti.slice(0, 12));

	function openGraffitiModal(graffiti) {
		selectedGraffiti = graffiti;
	}

	function closeModal() {
		selectedGraffiti = null;
	}

	function nextGraffiti() {
		if (!selectedGraffiti) return;
		const currentIndex = graffitiList.findIndex((m) => m.id === selectedGraffiti.id);
		const nextIndex = (currentIndex + 1) % graffitiList.length;
		selectedGraffiti = graffitiList[nextIndex];
	}

	function prevGraffiti() {
		if (!selectedGraffiti) return;
		const currentIndex = graffitiList.findIndex((m) => m.id === selectedGraffiti.id);
		const prevIndex = (currentIndex - 1 + graffitiList.length) % graffitiList.length;
		selectedGraffiti = graffitiList[prevIndex];
	}
</script>

<div
	class="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-rose-500 selection:text-white"
>
	<!-- Navigation Header -->
	<Navbar activeTab="home" />

	<main class="flex-1">
		<!-- Hero Carousel Header -->
		<Hero
			{searchQuery}
			onSearchChange={(q) => (searchQuery = q)}
			{selectedCategory}
			onCategoryChange={(cat) => (selectedCategory = cat)}
			onOpenModal={openGraffitiModal}
		/>

		<!-- Gallery Grid Section (Top 12 Results) -->
		<section class="mx-auto max-w-7xl space-y-6 sm:space-y-8 px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
			<!-- Gallery Header & Filter Stats -->
			<div
				class="flex flex-col items-start justify-between gap-3 sm:gap-4 border-b border-zinc-800 pb-4 sm:flex-row sm:items-center"
			>
				<div>
					<h2
						class="font-bengali flex flex-wrap items-center gap-2 sm:gap-3 text-xl font-bold text-white sm:text-3xl"
					>
						<span>সংরক্ষিত দেয়ালচিত্রসমূহ</span>
						<span
							class="rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-rose-400"
						>
							Showing {displayedGraffiti.length} of {filteredGraffiti.length} Artworks
						</span>
					</h2>
					<p class="mt-1 text-xs text-zinc-400">
						Displaying top {displayedGraffiti.length} results {searchQuery
							? `matching "${searchQuery}"`
							: ''}
					</p>
				</div>

				<!-- Reset Filter Button if active -->
				{#if searchQuery || selectedCategory !== 'All' || selectedDistrict !== 'All Districts'}
					<button
						onclick={() => {
							searchQuery = '';
							selectedCategory = 'All';
							selectedDistrict = 'All Districts';
						}}
						class="flex items-center gap-1 text-xs font-semibold text-rose-400 underline hover:text-rose-300"
					>
						Reset Filters ✕
					</button>
				{/if}
			</div>

			<!-- Photos Masonry Columns (Natural Aspect Ratio) -->
			{#if displayedGraffiti.length > 0}
				<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
					{#each displayedGraffiti as graffiti (graffiti.id)}
						<GraffitiCard {graffiti} onOpenModal={openGraffitiModal} />
					{/each}
				</div>

				<!-- View All in Browse CTA Button -->
				<div class="pt-6 sm:pt-8 text-center px-2">
					<a
						href="/browse"
						class="group inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-300 hover:border-rose-500 hover:bg-rose-600 max-w-full"
					>
						<span class="truncate">Browse All {filteredGraffiti.length} Graffity & Advanced Filters</span>
						<span class="transition-transform group-hover:translate-x-1 shrink-0">→</span>
					</a>
				</div>
			{:else}
				<!-- Empty State -->
				<div
					class="glass-card mx-auto max-w-xl space-y-4 rounded-3xl border border-zinc-800 p-12 text-center"
				>
					<div class="w-14 h-14 mx-auto rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400">
						<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
					</div>
					<h3 class="font-bengali text-xl font-bold text-white">
						কোনো দেয়ালচিত্র খুঁজে পাওয়া যায়নি
					</h3>
					<p class="font-bengali text-sm text-zinc-400">
						আপনার অনুসন্ধান "{searchQuery}" এর সাথে মিলে এমন কোনো ফলাফল নেই। অনুগ্রহ করে অন্য
						কি-ওয়ার্ড বা ক্যাটাগরি চেষ্টা করুন।
					</p>
					<button
						onclick={() => {
							searchQuery = '';
							selectedCategory = 'All';
						}}
						class="rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500"
					>
						সব গ্রাফিতি দেখুন
					</button>
				</div>
			{/if}
		</section>
	</main>

	<!-- Fullscreen Modal -->
	<GraffitiModal graffiti={selectedGraffiti} onClose={closeModal} onNext={nextGraffiti} onPrev={prevGraffiti} />

	<!-- Footer -->
	<Footer onSelectTab={(tab) => (activeTab = tab)} />
</div>
