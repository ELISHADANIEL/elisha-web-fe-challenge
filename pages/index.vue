<template>
	<div class="flex flex-col gap-y-3 pt-5 w-full px-3">
		<Title-Header
			SectionTitle="To-Do List"
			@action="openAddModal"
			:sortMenu="sortMenu"
			@sortTasks="sortTasks">
		</Title-Header>
		<div class="px-3">
			<!-- Table-Content -->
			<Table
				:tableColumns="tableColumns"
				:currentTasks="currentTasks"
				:pageSize="pageSize"
				@openEditModal="openEditModal"
				@openDeleteModal="openDeleteModal"
				@changePageSize="changePageSize"></Table>
		</div>
	</div>

	<div>
		<Modal
			:isOpen="isModalOpen"
			:modalTitle="
				modalMode === 'add'
					? 'Create Task'
					: modalMode === 'edit'
					? 'Edit Task'
					: 'Delete Task'
			"
			:actionText="
				modalMode === 'add'
					? 'Create'
					: modalMode === 'edit'
					? 'Save'
					: 'Delete'
			"
			:modalMode="modalMode"
			@close="closeModal"
			@action="saveTask">
			<template #content>
				<div v-if="modalMode === 'add' || modalMode === 'edit'">
					<!-- Create/Edit Task -->
					<div class="mb-4 px-5 pt-3">
						<label class="block text-gray-700 text-sm font-bold mb-2"
							>Task Name</label
						>
						<input
							v-model="task.name"
							type="text"
							class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
					</div>
					<div class="mb-4 px-5">
						<label class="block text-gray-700 text-sm font-bold mb-2"
							>Description</label
						>
						<textarea
							v-model="task.description"
							class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
					</div>
					<div class="px-6 flex items-center justify-center gap-x-2">
						<div class="w-1/2">
							<label class="block text-gray-700 text-sm font-bold mb-2"
								>Start Date</label
							>
							<input
								v-model="task.startDate"
								type="datetime-local"
								class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
						</div>
						<div class="w-1/2">
							<label class="block text-gray-700 text-sm font-bold mb-2"
								>End Date</label
							>
							<input
								v-model="task.endDate"
								type="datetime-local"
								class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
						</div>
					</div>
				</div>
				<div
					v-else
					class="flex justify-center pt-5 text-lg">
					Are you sure you want to delete this task?
				</div>
			</template></Modal
		>
	</div>
</template>

<script setup lang="ts">
	import { useTodoStore } from '@/store/todo';

	interface Task {
		name: string;
		description: string;
		startDate: string;
		endDate: string;
		createdAt?: string;
		timeLeft?: string;
		id: number;
	}
	interface TableColumn {
		label: string;
	}
	interface TableProps {
		tableColumns: TableColumn[];
		currentTasks: Task[];
		pageSize: number;
		totalPages: number;
	}

	const todoStore = useTodoStore();

	const isModalOpen = ref(false);
	const modalMode = ref<string>('create');
	const task = computed<Task>({
		get: () => todoStore.task,
		set: (value: Task) => (todoStore.task = value),
	});
	const pageSize = computed<number>({
		get: () => todoStore.pageSize,
		set: (value: number) => (todoStore.pageSize = value),
	});

	const tableColumns: TableColumn[] = [
		{ label: 'Task Name' },
		{ label: 'Description' },
		{ label: 'Time Left' },
		{ label: 'Start Date' },
		{ label: 'End Date' },
		{ label: 'Created At' },
		{ label: 'Actions' },
	];
	const sortMenu = ref([
		{ label: 'Task Name: A-Z', value: 'nameAsc' },
		{ label: 'Task Name: Z-A', value: 'nameDesc' },
		{ label: 'Date Created: ASC', value: 'dateCreatedAsc' },
		{ label: 'Date Created: DESC', value: 'dateCreatedDesc' },
	]);
	// Methods
	function openAddModal(): void {
		modalMode.value = 'add';
		isModalOpen.value = true;
	}

	function openEditModal(index: number): void {
		modalMode.value = 'edit';
		isModalOpen.value = true;
		task.value = { ...todoStore.tasks[index] };
	}

	function openDeleteModal(index: number): void {
		modalMode.value = 'delete';
		isModalOpen.value = true;
		task.value = { ...todoStore.tasks[index] };
	}

	function closeModal(): void {
		isModalOpen.value = false;
		todoStore.resetTask();
	}

	function saveTask(): void {
		if (modalMode.value === 'add') {
			todoStore.create(task.value);
		} else if (modalMode.value === 'edit') {
			todoStore.updateTask(task.value);
		} else {
			todoStore.deleteTask(task.value.id);
		}
		closeModal();
	}

	function sortTasks(sortMode: string): void {
		todoStore.sortTasks(sortMode);
	}

	function changePageSize(size: number): void {
		pageSize.value = size;
	}

	const currentTasks = computed<Task[]>(() => {
		const startIndex = (currentPage.value - 1) * pageSize.value;
		const endIndex = startIndex + pageSize.value;
		return todoStore.tasks.slice(startIndex, endIndex);
	});

	const currentPage = ref(1);
</script>
