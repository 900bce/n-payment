<template>
  <header class="header-container">
    <div class="header-main">
      <div class="header-title">Collect Payment</div>
      <button v-if="props.amount > 0" class="reset-payment" @click="resetPayment">
        Reset Payment
      </button>
    </div>
    <div class="location-select-wrapper">
      <font-awesome-icon icon="fa-solid fa-location-dot" class="place-icon" />
      <select
        :value="props.selectedLocationId"
        class="location-select"
        @change="updateSelectedLocation"
      >
        <option v-for="location in props.locations" :key="location.id" :value="location.id">
          {{ location.name }}
        </option>
      </select>
      <font-awesome-icon icon="fa-solid fa-chevron-down" class="chevron-down-icon" />
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Location } from 'src/types/payment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  locations: Location[];
  selectedLocationId: number | null;
  amount: number;
}>();

const emit = defineEmits(['update:selectedLocation', 'reset:payment']);

const updateSelectedLocation = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit('update:selectedLocation', select.value);
};

const resetPayment = () => {
  emit('reset:payment');
};
</script>

<style scoped>
.header-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
  margin-bottom: 8px;
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

@media (min-width: 768px) {
  .header-container {
    flex-direction: row;
  }

  .reset-payment {
    position: absolute;
    right: 16px;
    top: 16px;
  }

  .location-select {
    padding: 6px 40px;
  }
}
</style>
