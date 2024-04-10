<template>
	<div
		class="flex flex-wrap justify-center place-content-center gap-y-2 lg:gap-x-[9rem] bg-primary py-10 text-slate-100">
		<div class="mx-2">
			<img
				src="~/assets/images/ecv_white.png"
				alt="EcloudValley"
				class="w-32 h-auto lg:w-48 lg:h-15" />
		</div>
		<div class="Menu px-20 flex flex-col gap-y-3 mx-2 lg:mx-0">
			<a class="text-lg lg:text-xl">Sitemap</a><a>Home</a><a>About</a
			><a>Contact</a>
		</div>
		<div class="Social-Media px-10 flex flex-col gap-y-3 mx-2 lg:mx-0">
			<a class="text-lg lg:text-xl">Socials</a><a>Facebook</a><a>Linkedin</a
			><a>Instagram</a><a>Twitter</a>
		</div>
		<div class="Info flex flex-col gap-y-[4rem] mx-2 lg:mx-0">
			<div class="flex flex-col gap-y-2">
				<a class="text-lg lg:text-xl">Head Office</a>
				<a class="whitespace-pre-wrap pl-0">
					Xilliams Corner Wine © 2017. 1112 A Market St # <br />
					Ste B22, Charlottesville, CA 45565
				</a>
			</div>
			<div class="flex flex-col gap-y-2">
				<a class="text-lg lg:text-xl">Newsletter</a>
				<div class="relative flex items-center">
					<input
						class="bg-secondary text-white pl-10 pr-3 py-2 placeholder-slate-300 border-b-2 border-solid focus:border-none w-48 lg:w-64"
						type="text"
						placeholder="Enter your email address" />
					<Icon
						icon="material-symbols-light:mail-outline"
						color="white"
						class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@media (max-width: 1023px) {
		.Menu a,
		.Social-Media a,
		.Info a {
			font-size: 0.875rem;
		}

		.Info a {
			font-size: 0.75rem;
		}

		.Info input {
			font-size: 0.75rem;
		}
	}
</style>
