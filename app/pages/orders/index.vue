<script setup lang="ts">
const perPage = Number(5);

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

const { data } = useAsyncData(
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
        <span v-if="meta?.total">Total: {{ meta.total }}</span>
      </div>
      <UTable :data="orders as Order[]" class="flex-1 min-h-[320px]" />
      <div class="flex justify-center border-t border-default pt-4">
        <UPagination v-model:page="page" :items-per-page="perPage" :total="meta?.total || 0" show-edges />
      </div>
    </template>
  </UDashboardPanel>
</template>
