<script>
	import { muralsData } from '$lib/data/murals.js';
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import MuralCard from '$lib/components/MuralCard.svelte';
	import MuralModal from '$lib/components/MuralModal.svelte';
	import MapExplorer from '$lib/components/MapExplorer.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let activeTab = $state('gallery');
	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let selectedDistrict = $state('All Districts');
	let selectedMural = $state(null);

	// Derived filtered murals
	let filteredMurals = $derived(
		muralsData.filter((mural) => {
			const matchesSearch =
				!searchQuery.trim() ||
				mural.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mural.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mural.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mural.slogan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mural.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mural.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

			const matchesCategory = selectedCategory === 'All' || mural.category === selectedCategory;

			const matchesDistrict =
				selectedDistrict === 'All Districts' || mural.district === selectedDistrict;

			return matchesSearch && matchesCategory && matchesDistrict;
		})
	);

	// Home page shows max 12 best matching pictures at a time
	let displayedMurals = $derived(filteredMurals.slice(0, 12));

	function openMuralModal(mural) {
		selectedMural = mural;
	}

	function closeModal() {
		selectedMural = null;
	}

	function nextMural() {
		if (!selectedMural) return;
		const currentIndex = muralsData.findIndex((m) => m.id === selectedMural.id);
		const nextIndex = (currentIndex + 1) % muralsData.length;
		selectedMural = muralsData[nextIndex];
	}

	function prevMural() {
		if (!selectedMural) return;
		const currentIndex = muralsData.findIndex((m) => m.id === selectedMural.id);
		const prevIndex = (currentIndex - 1 + muralsData.length) % muralsData.length;
		selectedMural = muralsData[prevIndex];
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
			onOpenModal={openMuralModal}
		/>

		<!-- Gallery Grid Section (Top 12 Results) -->
		<section class="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
			<!-- Gallery Header & Filter Stats -->
			<div
				class="flex flex-col items-start justify-between gap-4 border-b border-zinc-800 pb-4 sm:flex-row sm:items-center"
			>
				<div>
					<h2
						class="font-bengali flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl"
					>
						<span>সংরক্ষিত দেয়ালচিত্রসমূহ</span>
						<span
							class="rounded-full border border-rose-500/30 bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-400"
						>
							Showing {displayedMurals.length} of {filteredMurals.length} Artworks
						</span>
					</h2>
					<p class="mt-1 text-xs text-zinc-400">
						Displaying top {displayedMurals.length} results {searchQuery
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
			{#if displayedMurals.length > 0}
				<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
					{#each displayedMurals as mural (mural.id)}
						<MuralCard {mural} onOpenModal={openMuralModal} />
					{/each}
				</div>

				<!-- View All in Browse CTA Button -->
				<div class="pt-8 text-center">
					<a
						href="/browse"
						class="group inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:border-rose-500 hover:bg-rose-600"
					>
						<span>Browse All {filteredMurals.length} Murals & Advanced Filters</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</a>
				</div>
			{:else}
				<!-- Empty State -->
				<div
					class="glass-card mx-auto max-w-xl space-y-4 rounded-3xl border border-zinc-800 p-12 text-center"
				>
					<div class="text-5xl">🎨</div>
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
						সব ম্যুরাল দেখুন
					</button>
				</div>
			{/if}
		</section>

		<!-- Map Explorer Section Preview -->
		<MapExplorer
			{selectedDistrict}
			onSelectDistrict={(dist) => (selectedDistrict = dist)}
			onSelectMural={openMuralModal}
		/>
	</main>

	<!-- Fullscreen Modal -->
	<MuralModal mural={selectedMural} onClose={closeModal} onNext={nextMural} onPrev={prevMural} />

	<!-- Footer -->
	<Footer onSelectTab={(tab) => (activeTab = tab)} />
</div>
