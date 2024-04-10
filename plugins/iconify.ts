import { Icon as IconifyIcon } from '@iconify/vue';
export default defineNuxtPlugin((nuxtApp) => {
	if (!nuxtApp.vueApp.component('Icon')) {
		nuxtApp.vueApp.component('Icon', IconifyIcon);
	}
});
