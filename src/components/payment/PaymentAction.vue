<template>
  <div class="payment-action-container">
    <div class="location-select-wrapper">
      <font-awesome-icon icon="fa-solid fa-location-dot" class="place-icon" />
      <select
        :value="props.selectedLocation?.id"
        class="location-select"
        @change="updateSelectedLocation"
      >
        <option v-for="location in props.locations" :key="location.id" :value="location.id">
          {{ location.name }}
        </option>
      </select>
      <font-awesome-icon icon="fa-solid fa-chevron-down" class="chevron-down-icon" />
    </div>
    <div class="payment-action-button-container">
      <button class="log-payment-button" :disabled="props.isAmountBelowMinimum">
        <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="log-payment-icon" />Log Payment
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { Location } from 'src/types/payment';

const props = defineProps<{
  locations: Location[];
  selectedLocation: Location | null;
  isAmountBelowMinimum: boolean;
}>();

const emit = defineEmits(['update:selectedLocation']);

const updateSelectedLocation = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit('update:selectedLocation', select.value);
};
</script>

<style lang="scss" scoped>
.payment-action-container {
  padding: 16px;
}

.location-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
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
  /* width: 100%; */
  padding: 12px 40px;
  border: none;
  font-weight: 500;
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.payment-action-button-container {
  margin-top: 24px;
}

.log-payment-button {
  background-color: var(--color-orange-400);
  border: none;
  width: 100%;
  color: var(--color-white);
  font-size: var(--font-size-sm);
  height: 36px;
  border-radius: 6px;
}
</style>
