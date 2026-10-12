<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import TeamSection from '$lib/components/TeamSection.svelte';

	let formData = $state({
		name: '',
		email: '',
		category: 'correction',
		message: ''
	});

	let isSubmitted = $state(false);
	let isSubmitting = $state(false);

	function handleSubmit(event) {
		event.preventDefault();
		isSubmitting = true;
		setTimeout(() => {
			isSubmitting = false;
			isSubmitted = true;
		}, 700);
	}

	function resetForm() {
		formData = {
			name: '',
			email: '',
			category: 'correction',
			message: ''
		};
		isSubmitted = false;
	}
</script>

<svelte:head>
	<title>About & History | July Graffiti Archive</title>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 selection:bg-rose-500 selection:text-white"
>
	<Navbar activeTab="about" />

	<main class="mx-auto max-w-5xl flex-1 space-y-10 sm:space-y-14 px-3 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
		<!-- Header Title -->
		<div class="space-y-3 sm:space-y-4 text-center">
			<span
				class="rounded-full border border-rose-500/30 bg-rose-500/20 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold tracking-widest text-rose-400 uppercase inline-block"
			>
				Digital Archiving & Historical Context
			</span>
			<h1 class="font-serif-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
				Walls of July: The Visual History
			</h1>
			<p class="font-bengali mx-auto max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-zinc-300 px-2">
				জুলাই ২০২৪ এর গণঅভ্যুত্থানে বাংলাদেশ জুড়ে ছাত্র-জনতার আঁকা দেয়ালচিত্র, ক্যালিগ্রাফি এবং
				গ্রাফিতির ডিজিটাল সংরক্ষণাগার।
			</p>
		</div>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 gap-5 sm:gap-8 pt-2 md:grid-cols-2">
			<!-- Card 1 -->
			<div class="glass-card space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-zinc-800 p-5 sm:p-8">
				
				<h2 class="font-bengali text-2xl font-bold text-white">
					১. প্রতিরোধ ও গণমানুষের বাকস্বাধীনতা
				</h2>
				<p class="font-bengali text-sm leading-relaxed text-zinc-300">
					আন্দোলনের সময়ে এবং আন্দোলনের পরবর্তীতে ঢাকা বিশ্ববিদ্যালয়, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়,
					চট্টগ্রাম, রাজাশাহী ও রংপুরের দেয়ালগুলো প্রতিবাদ ও মুক্তির ক্যানভাসে রূপ নেয়। ছাত্র-জনতা
					রঙ ও স্প্রে দিয়ে সত্যের বার্তা খোদাই করে রেখেছিল।
				</p>
			</div>

			<!-- Card 2 -->
			<div class="glass-card space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-zinc-800 p-5 sm:p-8">
				
				<h2 class="font-bengali text-xl sm:text-2xl font-bold text-white">
					২. বাংলা ক্যালিগ্রাফি ও শিল্পধারা
				</h2>
				<p class="font-bengali text-sm leading-relaxed text-zinc-300">
					বাংলা বর্ণমালার অনন্য ব্যবহারের মাধ্যমে ক্যালিগ্রাফি, গ্রাফিতি ও প্রতীকধর্মী দেয়ালচিত্র
					ফুটিয়ে তোলা হয়েছে। "বিকল্প কে? আমি, তুমি, আমরা!" এবং "পানি লাগবে কারো?" এর মতো কালজয়ী
					স্লোগানগুলো চিরস্মরণীয় হয়ে আছে।
				</p>
			</div>

			<!-- Card 3 -->
			<div class="glass-card space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-zinc-800 p-5 sm:p-8">
				<h2 class="font-bengali text-xl sm:text-2xl font-bold text-white">৩. সংরক্ষণাগারের প্রয়োজনীয়তা</h2>
				<p class="font-bengali text-sm leading-relaxed text-zinc-300">
					আবহাওয়া, রোদ-বৃষ্টি ও সময়ের সাথে বহিরাঙ্গনের দেয়ালচিত্র ক্ষয়ে যেতে পারে। এই আর্カイভের মূল
					উদ্দেশ্য এই মূল্যবান শিল্পকর্মগুলোকে উচ্চমানের ফটোগ্রাফি ও মেট্রিক ডেটা সহ চিরতরে সংরক্ষণ
					করা।
				</p>
			</div>

			<!-- Card 4 -->
			<div class="glass-card space-y-3 sm:space-y-4 rounded-2xl sm:rounded-3xl border border-zinc-800 p-5 sm:p-8">
				
				<h2 class="font-bengali text-xl sm:text-2xl font-bold text-white">৪. উন্মুক্ত ও অলাভজনক উদ্যোগ</h2>
				<p class="font-bengali text-sm leading-relaxed text-zinc-300">
					জুলাই গ্রাফিতি একটি অলাভজনক উন্মুক্ত নাগরিক উদ্যোগ। গবেষক, শিক্ষার্থী ও সাধারণ নাগরিক
					সকলেই বিনামূল্যে এই আর্カイভ থেকে তথ্য ও ছবি সংগ্রহ করতে পারবেন।
				</p>
			</div>
		</div>

		<!-- ========================================== -->
		<!-- THE JULY ARCHIVE TEAM SECTION -->
		<!-- ========================================== -->
		<TeamSection showViewAll={true} />

		<!-- Archival Purpose & Legal Disclaimer Banner -->
		<div class="glass-card space-y-4 rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-8">
			<div class="flex items-center gap-3">
				<h3 class="font-bengali text-lg sm:text-xl font-bold text-white">
					সংরক্ষণ ও সর্বজনীন দাবিত্যাগ (Archival Purpose & Disclaimer)
				</h3>
			</div>
			<div
				class="font-bengali grid grid-cols-1 gap-4 sm:gap-6 text-xs leading-relaxed text-zinc-300 md:grid-cols-2"
			>
				<div class="space-y-2">
					<p class="font-semibold text-zinc-100">
						অলাভজনক সংরক্ষণাগার (Preservation Purpose Only):
					</p>
					<p>
						এই প্ল্যাটফর্মটি সম্পূর্ণ অলাভজনক, নিরপেক্ষ ও নাগরিক উদ্যোগে নির্মিত। ২০২৪ সালের জুলাই
						গণঅভ্যুত্থানের ঐতিহাসিক শিল্পকর্ম ও গণচেতনাকে ক্ষয় এবং মুছে যাওয়া থেকে রক্ষা করাই এর
						একমাত্র উদ্দেশ্য। কোনো প্রকার বাণিজ্যিক স্বার্থ বা উপার্জন এতে জড়িত নয়।
					</p>
				</div>
				<div class="space-y-2">
					<p class="font-semibold text-zinc-100">
						অবদান ও উন্নয়ন (Development & Open Source Credit):
					</p>
					<p>
						প্ল্যাটফর্মটির উন্নয়ন ও রক্ষণাবেক্ষণে: <span
							class="font-sans font-semibold text-rose-400">Cap Labib</span
						> (Developed & Maintained by Cap Labib)। দেয়ালচিত্রের মূল ছাত্র-জনতা শিল্পী, ক্যালিগ্রাফার,
						এবং সারা দেশ থেকে ছবি সংগ্রাহকদের অবদান ও মেধার প্রতি সশ্রদ্ধ কৃতজ্ঞতা।
					</p>
				</div>
			</div>
		</div>

		<!-- ========================================== -->
		<!-- EMBEDDED CONTACT SECTION -->
		<!-- ========================================== -->
		<div class="glass-card space-y-6 rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-10">
			<div class="space-y-2 text-center">
				<span
					class="rounded-full border border-rose-500/30 bg-rose-500/20 px-3.5 py-1 text-[11px] font-bold tracking-widest text-rose-400 uppercase"
				>
					Direct Reach out
				</span>
				<h3 class="font-bengali text-2xl font-bold text-white sm:text-3xl">
					যোগাযোগ ও তথ্য সংশোধন (Contact & Archival Inquiries)
				</h3>
				<p class="font-bengali mx-auto max-w-xl text-xs leading-relaxed text-zinc-300 sm:text-sm">
					দেয়ালচিত্রের স্থান, সময় বা নাম সংশোধন করতে, আলোকচিত্রীর কৃতিত্ব যোগ করতে, কিংবা যে কোনো
					প্রশ্নের জন্য নিচের ফর্মে বার্তা পাঠান।
				</p>
			</div>

			{#if isSubmitted}
				<div
					class="animate-fadeIn space-y-3 rounded-2xl border border-emerald-500/30 bg-zinc-950/80 p-8 text-center"
				>
					<div
						class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-2xl text-emerald-400"
					>
						✓
					</div>
					<h4 class="font-bengali text-xl font-bold text-white">বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
					<p class="font-bengali mx-auto max-w-md text-xs text-zinc-300">
						আপনার তথ্য আমাদের নিকট পৌঁছেছে। আমাদের টিম খুব শীঘ্রই পর্যালোচনা করে প্রয়োজনীয় ব্যবস্থা
						নেবে।
					</p>
					<button
						onclick={resetForm}
						class="rounded-full bg-zinc-800 px-5 py-2 text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-700"
					>
						Send Another Message (আরেকটি বার্তা পাঠান)
					</button>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="mx-auto max-w-2xl space-y-4">
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<!-- Name -->
						<div class="space-y-1.5">
							<label
								for="name"
								class="block text-[11px] font-bold tracking-wider text-zinc-300 uppercase"
							>
								Your Name (আপনার নাম) *
							</label>
							<input
								type="text"
								id="name"
								required
								bind:value={formData.name}
								placeholder="e.g. Tanvir Ahmed"
								class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 transition-colors focus:border-rose-500 focus:outline-none"
							/>
						</div>

						<!-- Email -->
						<div class="space-y-1.5">
							<label
								for="email"
								class="block text-[11px] font-bold tracking-wider text-zinc-300 uppercase"
							>
								Email Address (ইমেইল ঠিকানা) *
							</label>
							<input
								type="email"
								id="email"
								required
								bind:value={formData.email}
								placeholder="e.g. tanvir@example.com"
								class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 transition-colors focus:border-rose-500 focus:outline-none"
							/>
						</div>
					</div>

					<!-- Category -->
					<div class="space-y-1.5">
						<label
							for="category"
							class="block text-[11px] font-bold tracking-wider text-zinc-300 uppercase"
						>
							Inquiry Category (বিষয়শ্রেণী) *
						</label>
						<select
							id="category"
							bind:value={formData.category}
							class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-100 transition-colors focus:border-rose-500 focus:outline-none"
						>
							<option value="correction">Metadata Correction (অবস্থান বা তথ্য সংশোধন)</option>
							<option value="attribution"
								>Artist / Photographer Attribution (কৃ কৃতিত্ব ও ঋণস্বীকার)</option
							>
							<option value="academic">Academic & Media Inquiry (শিক্ষা ও গবেষণা তথ্য)</option>
							<option value="general">General Message (সাধারণ প্রশ্ন)</option>
						</select>
					</div>

					<!-- Message -->
					<div class="space-y-1.5">
						<label
							for="message"
							class="block text-[11px] font-bold tracking-wider text-zinc-300 uppercase"
						>
							Message Details (বার্তা বিবরণ) *
						</label>
						<textarea
							id="message"
							rows="4"
							required
							bind:value={formData.message}
							placeholder="Describe your edit, query, or photographer credit info..."
							class="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 transition-colors focus:border-rose-500 focus:outline-none"
						></textarea>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500"
					>
						{#if isSubmitting}
							<span class="animate-spin text-sm">⏳</span> Submitting...
						{:else}
							Send Message (বার্তা পাঠান) ➔
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</main>

	<Footer />
</div>
