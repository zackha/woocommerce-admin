<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { DropdownMenuItem } from '@nuxt/ui';

const open = ref(false);
const colorMode = useColorMode();

const links = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/',
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: 'Orders',
      icon: 'i-lucide-shopping-cart',
      to: '/orders',
      badge: '4',
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: 'Products',
      icon: 'i-lucide-tag',
      to: '/products',
      onSelect: () => {
        open.value = false;
      },
    },
  ],
  [
    {
      label: 'Open Source',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/zackha/nuxtcommerce-admin',
      target: '_blank',
    },
  ],
]);

const user = ref({
  name: 'Nuxtcommerce',
  avatar: {
    src: 'https://commerce.nuxt.dev/logo.svg',
    alt: 'Nuxtcommerce',
  },
});

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value.name,
      avatar: user.value.avatar,
    },
  ],
  [
    {
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onSelect(e: Event) {
            e.preventDefault();
            colorMode.preference = 'light';
          },
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.preference = 'dark';
            }
          },
          onSelect(e: Event) {
            e.preventDefault();
          },
        },
      ],
    },
  ],
]);
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar id="default" v-model:open="open" collapsible resizable class="bg-elevated/25">
      <template #header="{ collapsed }">
        <Logo :class="collapsed ? 'h-2' : 'h-6'" />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />
        <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" tooltip class="mt-auto" />
      </template>

      <template #footer="{ collapsed }">
        <UDropdownMenu :items="items" :content="{ align: 'center', collisionPadding: 12 }" :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }">
          <UButton
            v-bind="{
              ...user,
              label: collapsed ? undefined : user?.name,
              trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
            }"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="data-[state=open]:bg-elevated"
            :ui="{
              trailingIcon: 'text-dimmed',
            }" />

          <template #chip-leading="{ item }">
            <span
              :style="{
          '--chip-light': `var(--color-${(item as any).chip}-500)`,
          '--chip-dark': `var(--color-${(item as any).chip}-400)`
        }"
              class="ms-0.5 size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)" />
          </template>
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>
    <slot />
  </UDashboardGroup>
</template>
