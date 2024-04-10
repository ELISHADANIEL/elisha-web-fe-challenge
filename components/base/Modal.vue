<template>
	<div
		v-show="isOpen"
		class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center">
		<div class="max-w-xl w-full mx-auto">
			<div class="bg-white shadow-lg rounded-lg">
				<div class="modal-header">
					<div class="text-md text-white font-bold">{{ modalTitle }}</div>
					<div>
						<button @click="closeModal">
							<Icon
								icon="material-symbols:close"
								color="white"
								width="20"
								height="20" />
						</button>
					</div>
				</div>
				<div>
					<slot name="content"></slot>
				</div>
				<div class="modal-footer">
					<div class="flex justify-center items-center gap-x-4">
						<div>
							<button
								class="text-slate-400 underline underline-offset-1"
								@click="closeModal">
								Cancel
							</button>
						</div>
						<div>
							<button
								@click="emitAction"
								:class="
									modalMode === `delete`
										? `bg-red-500 hover:bg-red-700`
										: `bg-teal-500 hover:bg-teal-700`
								"
								class="text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring">
								{{ actionText }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineProps, defineEmits, computed } from 'vue';

	interface ModalProps {
		modalTitle: string;
		actionText: string;
		isOpen: boolean;
		modalMode: string;
	}

	const props: ModalProps = defineProps({
		modalTitle: { type: String, default: 'Modal Title' },
		actionText: { type: String, default: 'Action' },
		isOpen: { type: Boolean, default: false },
		modalMode: { type: String, default: 'delete' },
	});

	const emit = defineEmits(['close', 'action']);

	function closeModal() {
		emit('close');
	}

	function emitAction() {
		emit('action');
	}
</script>

<style lang="postcss" scoped>
	.modal-header {
		@apply flex justify-between items-center p-3 rounded-t-md bg-primary;
	}

	.modal-footer {
		@apply flex justify-end px-5 py-3 pt-8;
	}
</style>
