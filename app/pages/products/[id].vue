<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
const id = useRoute().params.id as string;
const { getById } = useProducts();

const { data: productRes } = useAsyncData(() => getById(id), { lazy: true, server: false, default: () => ({ data: null }) });
const product = computed(() => productRes.value?.data);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Products',
    to: '/products',
  },
  {
    label: `#${product.value?.id ?? ''}`,
    to: `/products/${product.value?.id ?? ''}`,
  },
]);
</script>

<template>
  <UDashboardPanel v-if="product" id="product-details">
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
      <section class="space-y-6">
        <!-- Images -->
        <UCard>
          <template #header>Images</template>
          <div class="flex gap-3 overflow-x-auto py-1">
            <template v-if="product.images?.length">
              <img
                v-for="img in product.images"
                :key="img.id || img.src"
                :src="img.src"
                :alt="img.alt || product.name"
                class="border rounded-md"
                style="width: 120px; height: 120px; object-fit: cover" />
            </template>
            <div v-else class="text-sm text-muted-foreground">No image</div>
          </div>
        </UCard>

        <!-- Two columns -->
        <div class="grid md:grid-cols-2 gap-4">
          <!-- Basics -->
          <UCard>
            <template #header>Basics</template>
            <div class="text-sm space-y-2">
              <div class="flex items-center justify-between">
                <span>Name</span>
                <span class="font-medium truncate max-w-[60%]" :title="product.name">{{ product.name || '—' }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span>Price</span>
                <span class="font-semibold">
                  {{ product.price }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span>Created</span>
                <span class="font-medium">
                  {{ useTimeAgo(product.date_created) }}
                </span>
              </div>
            </div>
          </UCard>

          <!-- Meta -->
          <UCard>
            <template #header>Meta</template>
            <div class="text-sm space-y-2">
              <div class="flex items-center justify-between">
                <span>Stock status</span>
                <span class="font-medium">{{ product.stock_status }}</span>
              </div>
            </div>
          </UCard>
        </div>
        <!-- Descriptions -->
        <UCard>
          <template #header>Description</template>
          <div class="prose prose-invert max-w-none">
            <div v-html="product.description" />
          </div>
          <template #footer>
            <div class="text-xs text-muted-foreground">ID: {{ product.id }}</div>
          </template>
        </UCard>
      </section>
    </template>
  </UDashboardPanel>
</template>
