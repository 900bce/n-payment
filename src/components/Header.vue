<template>
  <header class="header-container">
    <div class="header-main">
      <div class="header-title">Collect Payment</div>
      <button class="reset-payment" @click="resetPayment">Reset Payment</button>
    </div>
    <div class="location-select-wrapper">
      <font-awesome-icon icon="fa-solid fa-location-dot" class="place-icon" />
      <select v-model="selectedLocation" class="location-select">
        <option v-for="location in locations" :key="location.id" :value="location">
          {{ location.name }}
        </option>
      </select>
      <font-awesome-icon icon="fa-solid fa-chevron-down" class="chevron-down-icon" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mockLocations } from 'src/mocks/locations';
import type { Location } from 'src/types/payment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const locations = ref<Location[]>(mockLocations);
const selectedLocation = ref<Location | null>(locations?.value?.[0] || null);

const resetPayment = () => {
  // todo: reset payment
  console.log('resetPayment');
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}
.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  color: var(--color-black);
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.location-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.place-icon {
  position: absolute;
  left: 12px;
  color: #8a8a8a;
  pointer-events: none;
  font-size: 1.1rem;
}

.chevron-down-icon {
  position: absolute;
  right: 12px;
  color: #8a8a8a;
  pointer-events: none;
}

.location-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  background-color: var(--color-gray-100);
  border-radius: 8px;
  padding: 12px 40px;
  border: none;
  font-weight: 500;
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.reset-payment {
  color: var(--color-red-400);
  font-size: var(--font-size-sm);
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>
