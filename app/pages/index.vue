<script setup lang="ts">
const { list: listOrders } = useOrders();
const { list: listProducts } = useProducts();

const { data: ordersRes } = useAsyncData('home-orders', () => listOrders({ page: 1, per_page: 5 }), {
  lazy: true,
  server: false,
  default: () => ({ data: [], meta: {} }),
});

const { data: productsRes } = useAsyncData('home-products', () => listProducts({ page: 1, per_page: 5 }), {
  lazy: true,
  server: false,
  default: () => ({ data: [], meta: {} }),
});

const orders = computed(() => ordersRes.value?.data || []);
const products = computed(() => productsRes.value?.data || []);
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <section class="grid md:grid-cols-2 gap-4">
        <UTable :data="orders as Order[]" class="shrink-0" />
        <UTable :data="products as Product[]" class="shrink-0" />
      </section>
    </template>
  </UDashboardPanel>
</template>
