<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
const id = useRoute().params.id as string;
const { getById, getNotes, updateStatus, addNote } = useOrders();

const { data: orderRes } = useAsyncData(() => getById(id), { lazy: true, server: false, default: () => ({ data: null }) });
const order = computed(() => orderRes.value?.data || null);

const { data: notesRes, refresh: refreshNotes } = useAsyncData(() => getNotes(id), { lazy: true, server: false, default: () => ({ data: [] }) });
const notes = computed(() =>
  [...(notesRes.value?.data || [])].reverse().map(n => ({
    date: useTimeAgo(n.date_created).value,
    description: n.note,
  }))
);
const statuses = ['pending', 'processing', 'completed', 'on-hold', 'cancelled', 'refunded', 'failed'];
const newStatus = ref('processing');
watch(order, o => {
  if (o?.status) newStatus.value = o.status;
});
const noteText = ref('');
const updatingStatus = ref(false);
const addingNote = ref(false);

async function handleStatusUpdate() {
  if (!order.value) return;
  try {
    updatingStatus.value = true;
    await updateStatus(id, newStatus.value);
    if (orderRes.value?.data) orderRes.value = { ...orderRes.value, data: { ...orderRes.value.data, status: newStatus.value } };
    await refreshNotes();
  } finally {
    updatingStatus.value = false;
  }
}

async function handleAddNote() {
  const v = noteText.value.trim();
  if (!v) return;
  try {
    addingNote.value = true;
    await addNote(id, v);
    noteText.value = '';
    await refreshNotes();
  } finally {
    addingNote.value = false;
  }
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Orders',
    to: '/orders',
  },
  {
    label: `#${order.value?.id ?? ''}`,
    to: `/orders/${order.value?.id ?? ''}`,
  },
]);
</script>

<template>
  <UDashboardPanel v-if="order" id="order-details">
    <template #header>
      <UDashboardNavbar>
        <template #leading>
          <UDashboardSidebarCollapse />
          <UBreadcrumb :items="breadcrumbItems" :ui="{ link: 'text-base' }">
            <template #separator>
              <span class="mx-2 text-muted">/</span>
            </template>
          </UBreadcrumb>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="gap-6 grid grid-cols-4">
        <div class="col-span-4 lg:col-span-3 space-y-6">
          <!-- Title card -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <h1 class="text-lg font-semibold">Order #{{ order.id }}</h1>
                  <UBadge variant="subtle" class="capitalize">
                    {{ order.status }}
                  </UBadge>
                </div>
                <div class="text-sm text-muted-foreground">
                  <span>Created: {{ useTimeAgo(order.date_created) }}</span>
                </div>
              </div>
            </template>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- SUMMARY -->
              <UCard class="border-dashed">
                <template #header>Summary</template>
                <div class="text-sm space-y-1">
                  <div class="flex items-center justify-between">
                    <span>Status</span>
                    <span class="font-medium capitalize">{{ order.status }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Total</span>
                    <span class="font-semibold">{{ order.total }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Currency</span>
                    <span class="font-medium">{{ order.currency }}</span>
                  </div>
                </div>
              </UCard>

              <!-- CUSTOMER -->
              <UCard class="border-dashed">
                <template #header>Customer</template>
                <div class="text-sm space-y-1">
                  <div class="font-medium capitalize">
                    {{ [order.billing?.first_name, order.billing?.last_name].filter(Boolean).join(' ') || '—' }}
                  </div>
                  <div>{{ order.billing?.email || '—' }}</div>
                  <div>{{ order.billing?.phone || '—' }}</div>
                </div>
              </UCard>
            </div>
          </UCard>
          <!-- LINE ITEMS -->
          <UCard>
            <template #header>Items</template>
            <UTable :data="order.line_items" class="min-h-[240px]" :empty-state="{ icon: 'i-lucide-package-x', label: 'No items' }" />
            <template #footer>
              <div class="flex justify-end">
                <div class="w-full sm:w-80 space-y-1 text-sm">
                  <div class="border-t pt-2 flex items-center justify-between">
                    <span class="font-semibold">Total</span>
                    <span class="font-semibold">{{ order.total }}</span>
                  </div>
                </div>
              </div>
            </template>
          </UCard>
        </div>
        <div class="col-span-4 lg:col-span-1 space-y-6">
          <!-- UPDATE STATUS -->
          <UCard>
            <template #header>Update status</template>
            <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
              <USelect v-model="newStatus" :items="statuses.map(s => ({ label: s.replace('-', ' ').toUpperCase(), value: s }))" :disabled="updatingStatus" :ui="{ base: 'w-56' }" />
              <UButton :loading="updatingStatus" :disabled="updatingStatus" icon="i-lucide-check" @click="handleStatusUpdate">Update</UButton>
            </div>
          </UCard>
          <!-- NOTES -->
          <UCard>
            <template #header>Activity</template>

            <UTimeline :items="notes" size="xs">
              <template #description="{ item }">
                <span v-html="item.description"></span>
              </template>
            </UTimeline>

            <template #footer>
              <div class="space-y-2 w-full">
                <UTextarea v-model="noteText" :rows="3" placeholder="Internal note…" :disabled="addingNote" :ui="{ root: 'w-full' }" />
                <div class="flex justify-end">
                  <UButton :disabled="addingNote || !noteText.trim()" :loading="addingNote" icon="i-lucide-plus" @click="handleAddNote">Add</UButton>
                </div>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
