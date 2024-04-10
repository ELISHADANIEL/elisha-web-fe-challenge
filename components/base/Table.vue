<template>
	<div class="overflow-x-auto">
		<table class="min-w-full">
			<thead>
				<tr class="bg-primary text-white">
					<th
						v-for="(column, columnIndex) in props.tableColumns"
						:key="columnIndex"
						align="left"
						class="px-4 py-4">
						{{ column.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(task, index) in currentTasks"
					:key="index">
					<template
						v-for="(value, key) in task"
						:key="key">
						<td
							class="border-b px-4 py-5"
							v-show="key !== 'id'">
							{{ isDateField(key) ? formatDate(parseDateValue(value)) : value }}
						</td>
					</template>

					<td class="flex border-b px-4 py-5 flex items-center">
						<div class="action-buttons">
							<button
								class="text-slate-900 hover:text-amber-500 px-2"
								@click="openEditModal(index)">
								<Icon
									icon="carbon:edit"
									width="25"
									height="25" />
							</button>
							<button
								class="text-slate-900 hover:text-red-700 px-2"
								@click="openDeleteModal(index)">
								<Icon
									icon="material-symbols:delete-outline"
									width="25"
									height="25" />
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="gap-y-2 px-1">
		<!-- Pagination Control -->
		<div class="py-5">
			<div class="flex gap-x-10 items-center justify-end py-5">
				<div class="flex flex-wrap gap-x-5">
					<span>Rows per page: </span>
					<div class="relative inline-block text-left">
						<button
							@click="toggleDropdownNumber"
							class="flex">
							{{ pageSize }}
							<Icon
								icon="ri:arrow-down-s-line"
								color="gray"
								width="20"
								height="20" />
						</button>
						<div
							v-if="numberDropdownOpen"
							class="absolute mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-40 overflow-y-auto">
							<div
								class="py-1"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="options-menu">
								<button
									v-for="size in pageSizeOptions"
									:key="size"
									@click="changePageSize(size)"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
									role="menuitem">
									{{ size }}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div>
					1-{{ props.pageSize }} of
					{{ totalPages <= 1 ? '1' : totalPages }}
				</div>
				<div class="flex items-center gap-x-[4rem]">
					<button>
						<Icon
							icon="iconamoon:arrow-left-2"
							color="black"
							width="30"
							height="30" />
					</button>
					<button>
						<Icon
							icon="iconamoon:arrow-right-2"
							color="black"
							width="30"
							height="30" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@media (max-width: 768px) {
		.smaller-text {
			font-size: 0.8rem;
		}

		.table-responsive {
			overflow-x: auto;
			display: block;
		}

		.py-5 {
			text-align: center;
		}

		.relative.inline-block.text-left {
			display: inline-block;
			position: relative;
		}

		.absolute.mt-2.w-32.rounded-md.shadow-lg.bg-white.ring-1.ring-black.ring-opacity-5 {
			max-height: 200px;
			overflow-y: auto;
		}

		.table td {
			display: flex;
			align-items: center;
		}

		.action-buttons {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>

<script setup lang="ts">
	import { useTodoStore } from '@/store/todo';

	const todoStore = useTodoStore();
	const { $dayjs, $_ } = useNuxtApp();

	const props = defineProps<{
		tableColumns: { label: string }[];
		currentTasks: Record<string, any>[];
		pageSize: number | string;
	}>();

	const emit = defineEmits([
		'openEditModal',
		'openDeleteModal',
		'changePageSize',
	]);

	function openEditModal(index: number) {
		emit('openEditModal', index);
	}

	function openDeleteModal(index: number) {
		emit('openDeleteModal', index);
	}

	function formatDate(date: string) {
		return $dayjs(date).format('MMMM DD, YYYY, h:mm A');
	}

	const numberDropdownOpen = ref(false);

	function toggleDropdownNumber() {
		numberDropdownOpen.value = !numberDropdownOpen.value;
	}

	function changePageSize(size: number | string) {
		emit('changePageSize', size);
		numberDropdownOpen.value = false;
	}

	const pageSizeOptions = Array.from(
		{ length: 10 },
		(_, index) => (index + 1) * 5
	);

	const currentPage = ref(1);

	function nextPage() {
		if (currentPage.value < totalPages.value) {
			currentPage.value++;
		}
	}

	function prevPage() {
		if (currentPage.value > 1) {
			currentPage.value--;
		}
	}

	const totalTasks = ref(1);

	const totalPages = computed(() =>
		Math.ceil(todoStore.tasks.length / Number(props.pageSize))
	);

	function isDateField(key: string): boolean {
		const dateKeys = ['startDate', 'endDate', 'createdAt'];
		return dateKeys.includes(key);
	}

	function parseDateValue(value: string): string {
		if (typeof value === 'string' && !isNaN(Date.parse(value))) {
			return value;
		}

		return '';
	}
</script>
