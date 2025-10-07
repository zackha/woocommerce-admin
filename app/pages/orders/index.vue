<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

const perPage = 20;
const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page || 1));
const search = ref(String(route.query.search || ''));
const status = ref(String(route.query.status || 'any'));

const statuses = [
  { value: 'any', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On hold' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'failed', label: 'Failed' },
  { value: 'trash', label: 'Trash' },
];

const { list } = useOrders();
const { data, status: fetchStatus } = useAsyncData(
  () =>
    list({
      page: page.value,
      per_page: perPage,
      search: search.value || undefined,
      status: status.value === 'any' ? undefined : status.value,
    }),
  { watch: [page, search, status], lazy: true, server: false, default: () => ({ data: [], meta: {} }) }
);

watch([page, search, status], () => {
  router.replace({
    query: {
      page: String(page.value),
      ...(search.value && { search: search.value }),
      ...(status.value !== 'any' && { status: status.value }),
    },
  });
});

const orders = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta || {});

function statusColor(s: string) {
  switch (s) {
    case 'completed':
      return 'success';
    case 'processing':
      return 'primary';
    case 'pending':
    case 'on-hold':
      return 'warning';
    case 'cancelled':
    case 'failed':
      return 'error';
    case 'refunded':
      return 'purple';
    default:
      return 'neutral';
  }
}

const NuxtLink = resolveComponent('NuxtLink');
const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');

const columns: TableColumn<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Order',
    cell: ({ row }) =>
      h(
        NuxtLink,
        { to: `/orders/${row.original.id}`, class: 'font-medium', target: '_blank' },
        () => `#${row.original.id} ${row.original.billing?.first_name} ${row.original.billing?.last_name}`
      ),
  },
  {
    accessorKey: 'date_created',
    header: 'Date',
    cell: ({ row }) => useTimeAgo(row.original.date_created).value,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UBadge, { color: statusColor(row.original.status), variant: 'subtle', class: 'capitalize' }, () => row.original.status),
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => row.original.total,
    meta: { class: { td: 'text-right', th: 'text-right' } },
  },
];
</script>

<template>
  <UDashboardPanel id="orders">
    <template #header>
      <UDashboardNavbar title="Orders">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-4">
        <!-- Toolbar -->
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <UInput v-model="search" icon="i-lucide-search" placeholder="Search orders…" :ui="{ base: 'w-full sm:w-72' }" />
          <USelect v-model="status" :items="statuses" :ui="{ base: 'w-40' }" />
          <UButton
            variant="ghost"
            icon="i-lucide-rotate-ccw"
            :disabled="!search && status === 'any'"
            @click="
              () => {
                search = '';
                status = 'any';
                page = 1;
              }
            ">
            Reset
          </UButton>
        </div>
        <!-- Table with expandable rows -->
        <UTable
          :data="orders"
          :columns="columns"
          :loading="fetchStatus === 'pending'"
          class="shrink-0"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default',
          }" />

        <!-- Pagination -->
        <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
          <div class="text-sm text-muted" v-if="meta?.total">Total: {{ meta.total }}</div>
          <UPagination v-model:page="page" :items-per-page="perPage" :total="meta?.total" />
        </div>
        <pre class="mt-4 p-4 bg-neutral-800/60 rounded text-xs overflow-auto"><code>{{ orders }}</code></pre>
      </div>
    </template>
  </UDashboardPanel>
</template>
