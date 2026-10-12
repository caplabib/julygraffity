<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import TeamSection from '$lib/components/TeamSection.svelte';

	let selectedCategory = $state('all');

	const stats = [
		{ label: 'Total Contributors', value: '48+', labelBn: 'সর্বমোট অবদানকারী' },
		{ label: 'Photographers & Archivists', value: '32+', labelBn: 'চিত্রগ্রাহক ও সংগ্রাহক' },
		{ label: 'Graffity Collectives', value: '12+', labelBn: 'দেয়ালচিত্র দল' },
		{ label: 'Tech & Metadata Volunteers', value: '4+', labelBn: 'আইটি ও ডেটা স্বেচ্ছাসেবক' }
	];

	const extendedContributors = [
		{
			id: 1,
			name: 'Cap Labib',
			role: 'Lead Developer & Maintainer',
			roleBn: 'প্রধান ওয়েবসাইট ডেভেলপার ও টেকনিক্যাল পরিচালক',
			category: 'tech',
			location: 'RANGPUR, BANGLADESH',
			contributions: 'Platform Architecture, SvelteKit 5 UI, Metadata System, CC BY 4.0 Archive',
			icon: '/icons/person.svg',
			badge: 'Developer'
		},
		{
			id: 2,
			name: 'Riazul Alam Rony',
			role: 'Core Photo Archivist & Photographer',
			roleBn: 'চিত্রগ্রাহক ও কোর ফটো আর্কাইভ ভলান্টিয়ার',
			category: 'photo',
			location: 'RANGPUR, BANGLADESH',
			contributions: 'High-definition photography documentation of Rangpur division street graffities',
			icon: '/icons/person.svg',
			badge: 'Photographer'
		},
		{
			id: 3,
			name: 'Rafi Ahmed',
			role: 'Photo Editor & Regional Archivist',
			roleBn: 'ফটো এডিটর ও আঞ্চলিক চিত্র সংগ্রাহক',
			category: 'photo',
			location: 'THAKURGAON, BANGLADESH',
			contributions: 'Digital image editing, color correction, and metadata cataloging',
			icon: '/icons/person.svg',
			badge: 'Editor'
		},
		{
			id: 4,
			name: 'Faculty of Fine Arts (Charukala) Student Alliance',
			role: 'Graffity Artists & Calligraphers',
			roleBn: 'চারুকলা ছাত্র জোট ও দেয়ালচিত্র শিল্পী দল',
			category: 'artists',
			location: 'DHAKA / RANGPUR, BANGLADESH',
			contributions: 'Original calligraphy compositions ("পানি লাগবে কারো?", "বিকল্প কে?")',
			icon: '/icons/groups.svg',
			badge: 'Art Collective'
		},
		{
			id: 5,
			name: 'Begum Rokeya University (BRUR) Youth Collective',
			role: 'Regional Graffity Collectives',
			roleBn: 'রংপুর তরুণ সংগ্রাহক ও দেয়ালচিত্র শিল্পী দল',
			category: 'artists',
			location: 'RANGPUR, BANGLADESH',
			contributions: 'Shaheed Abu Sayed memorial gate graffities & campus boundary artwork',
			icon: '/icons/groups.svg',
			badge: 'Art Collective'
		},
		{
			id: 6,
			name: 'Chittagong & Jahangirnagar Student Photographers',
			role: 'Divisional Photo Archivists',
			roleBn: 'চট্টগ্রাম ও জাবি ছাত্র আলোকচিত্রী দল',
			category: 'photo',
			location: 'CHITTAGONG / SAVAR, BANGLADESH',
			contributions: 'Photographic documentation of port city & JU campus resistance graffities',
			icon: '/icons/groups.svg',
			badge: 'Photographers'
		}
	];

	let filteredContributors = $derived(
		selectedCategory === 'all'
			? extendedContributors
			: extendedContributors.filter((c) => c.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Contributors & Team | July Graffiti Archive</title>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 selection:bg-rose-500 selection:text-white"
>
	<Navbar activeTab="contributors" />

	<main class="mx-auto max-w-5xl flex-1 space-y-8 sm:space-y-12 px-3 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
		<!-- Header Title -->
		<div class="space-y-3 sm:space-y-4 text-center">
			<span
				class="rounded-full border border-rose-500/30 bg-rose-500/20 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold tracking-widest text-rose-400 uppercase inline-block"
			>
				Community Honor Roll & Credits
			</span>
			<h1 class="font-serif-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
				Contributors & Team
			</h1>
			<p class="font-bengali mx-auto max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-zinc-300 px-2">
				জুলাই ২০২৪ এর দেয়ালচিত্র, ক্যালিগ্রাফি এবং আলোকচিত্র সংরক্ষণকারী আলোকচিত্রী, ছাত্র-শিল্পী
				এবং প্রযুক্তি স্বেচ্ছাসেবকদের প্রতি আন্তরিক শ্রদ্ধা।
			</p>
		</div>

		<!-- Stats Bar -->
		<div class="grid grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4 md:grid-cols-4">
			{#each stats as stat}
				<div
					class="glass-card space-y-1 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 sm:p-6 text-center"
				>
					<p class="font-sans text-2xl font-extrabold text-rose-400 sm:text-4xl">{stat.value}</p>
					<p class="text-[11px] sm:text-xs font-bold text-white">{stat.label}</p>
					<p class="font-bengali text-[10px] sm:text-[11px] text-zinc-400">{stat.labelBn}</p>
				</div>
			{/each}
		</div>

		<!-- Category Filter Buttons -->
		<div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
			<button
				onclick={() => (selectedCategory = 'all')}
				class="rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all {selectedCategory === 'all'
					? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
					: 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'}"
			>
				All Contributors (সকলের অবদান)
			</button>
			<button
				onclick={() => (selectedCategory = 'tech')}
				class="rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all {selectedCategory === 'tech'
					? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
					: 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'}"
			>
				Developers
			</button>
			<button
				onclick={() => (selectedCategory = 'photo')}
				class="rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all {selectedCategory === 'photo'
					? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
					: 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'}"
			>
				Photographers & Editors
			</button>
			<button
				onclick={() => (selectedCategory = 'artists')}
				class="rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all {selectedCategory ===
				'artists'
					? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
					: 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'}"
			>
				Student Artists & Collectives
			</button>
		</div>

		<!-- Extended Team Grid with Emerald Styling -->
		<div
			class="space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl border border-emerald-500/40 bg-[#07140b] p-4 sm:p-10 shadow-2xl"
		>
			<h2 class="font-sans text-xs font-bold tracking-widest text-zinc-300 uppercase sm:text-sm">
				DETAILED CONTRIBUTOR DIRECTORY
			</h2>

			<div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
				{#each filteredContributors as contributor (contributor.id)}
					<div
						class="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-emerald-400/20 bg-[#376b5a]/20 p-3.5 sm:p-5"
					>
						<div
							class="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-[#376b5a]"
						>
							<img src={contributor.icon} alt={contributor.name} class="h-7 w-7 sm:h-10 sm:w-10 brightness-0" />
						</div>
						<div class="space-y-1">
							<div class="flex flex-wrap items-center gap-2">
								<h4 class="font-sans text-sm font-bold tracking-wide text-white uppercase">
									{contributor.name}
								</h4>
								<span
									class="rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400"
								>
									{contributor.badge}
								</span>
							</div>
							<p class="text-xs font-medium text-emerald-400">{contributor.role}</p>
							<p class="font-bengali text-xs leading-relaxed text-zinc-300">
								{contributor.contributions}
							</p>
							<p class="pt-1 font-sans text-[10px] tracking-widest text-zinc-400 uppercase">
								{contributor.location}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Call to Action Banner -->
		<div
			class="glass-card space-y-4 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-zinc-900 to-rose-950/20 p-8 text-center"
		>
			<h3 class="font-bengali text-2xl font-bold text-white">আপনিও অবদান রাখতে চান?</h3>
			<p class="font-bengali mx-auto max-w-xl text-sm text-zinc-300">
				আপনার তোলা দেয়ালচিত্রের ছবি, সঠিক তথ্য বা প্রযুক্তিগত সহায়তা দিয়ে এই উন্মুক্ত সংরক্ষণাগারকে
				আরও সমৃদ্ধ করুন।
			</p>
			<div class="flex flex-wrap items-center justify-center gap-4 pt-2">
				<a
					href="/submit"
					class="rounded-full bg-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500"
				>
					Submit Photos (ছবি পাঠান)
				</a>
				<a
					href="/contact"
					class="rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-800"
				>
					Get in Touch (যোগাযোগ করুন)
				</a>
			</div>
		</div>
	</main>

	<Footer />
</div>
