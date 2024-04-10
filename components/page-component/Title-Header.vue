<template>
	<!-- Title-Header-Container -->
	<div class="bg-slate-100 flex justify-between p-4 items-center shadow-md">
		<!-- Title-Header-Contents -->
		<div class="text-2xl font-bold">{{ SectionTitle }}</div>
		<div class="flex gap-x-2">
			<div class="relative inline-block text-left">
				<button
					@click="toggleDropdown"
					class="border-solid border-2 border-secondary rounded-full bg-slate-100 text-secondary px-4 py-2 flex items-center gap-x-2">
					Sort By
					<Icon
						icon="ri:arrow-down-s-line"
						color="secondary"
						width="20"
						height="20" />
				</button>
				<!-- Dropdown menu -->
				<div
					v-if="dropdownOpen"
					class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
					<button
						v-for="sortOption in props.sortMenu"
						:key="sortOption.value"
						@click="handleSortClick(sortOption.value)"
						class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
						{{ sortOption.label }}
					</button>
				</div>
			</div>
			<button
				class="rounded-full bg-secondary text-white px-4 py-2 flex items-center gap-x-2"
				@click="emitAction">
				<Icon
					icon="material-symbols:add"
					color="white"
					width="20"
					height="20" />
				<span>Add Task</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref } from 'vue';

	const props = defineProps({
		SectionTitle: { type: String, default: 'SectionTitle' },
		sortMenu: { type: Object },
	});

	const emit = defineEmits(['sort', 'action', 'sortTasks']);

	const dropdownOpen = ref(false);

	function toggleDropdown() {
		dropdownOpen.value = !dropdownOpen.value;
	}

	function handleSortClick(sortMode: string) {
		sortMode = sortMode.trim();

		sortTasks(sortMode);
		dropdownOpen.value = false;
	}

	function sortTasks(sortMode: string) {
		emit('sortTasks', sortMode);
	}

	function emitAction() {
		emit('action');
	}
</script>
