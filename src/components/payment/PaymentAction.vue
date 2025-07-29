<template>
  <div class="payment-action-container">
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

    <div v-if="props.currentPaymentType === 'card'" class="reader-select-wrapper">
      <div class="reader-select-label">Device Reader</div>
      <select :value="props.currentReaderId" class="reader-select" @change="updateSelectedReader">
        <option
          v-for="reader in props.readers"
          :key="reader.id"
          :value="reader.id"
          :disabled="reader.locationId !== props.selectedLocationId"
        >
          {{ reader.label }}
        </option>
      </select>
      <font-awesome-icon icon="fa-solid fa-chevron-down" class="chevron-down-icon" />
    </div>

    <div class="payment-action-button-container">
      <button
        v-if="props.currentPaymentType === 'cash'"
        class="log-payment-button"
        :disabled="props.isAmountBelowMinimum"
      >
        <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="log-payment-icon" />Log Payment
      </button>

      <div v-if="props.currentPaymentType === 'card'" class="card-payment-wrapper">
        <button
          class="card-payment-button card-payment-button-reader"
          @click="emit('initiate-payment')"
        >
          <font-awesome-icon icon="fa-solid fa-tablet-screen-button" class="card-payment-icon" />
          Initiate Payment on Reader
        </button>
        <button
          class="card-payment-button card-payment-button-manual"
          @click="emit('input-card-manually')"
        >
          <font-awesome-icon icon="fa-solid fa-credit-card" class="card-payment-icon" /> Input Card
          Number Manually
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { Location, Reader } from 'src/types/payment';

const props = defineProps<{
  locations: Location[];
  selectedLocationId: number | null;
  isAmountBelowMinimum: boolean;
  currentPaymentType: 'cash' | 'card';
  readers: Reader[];
  currentReaderId: number | null;
}>();

const emit = defineEmits([
  'update:selectedLocation',
  'update:currentReaderId',
  'initiate-payment',
  'input-card-manually',
]);

const updateSelectedLocation = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit('update:selectedLocation', select.value);
};

const updateSelectedReader = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit('update:currentReaderId', select.value);
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

.reader-select-wrapper {
  position: relative;
  background: var(--color-gray-0);
  border-radius: 8px;
  padding: 11px 16px;

  .reader-select-label {
    font-size: var(--font-size-xxs);
    color: var(--color-gray-600);
  }

  .reader-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: transparent;
    font-weight: 500;
    font-size: var(--font-size-md);
    cursor: pointer;
    width: 100%;
  }
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

.card-payment-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-payment-button {
  width: 100%;
  height: 36px;
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  border: none;

  &-reader {
    background-color: var(--color-orange-400);
    color: var(--color-white);
  }

  &-manual {
    background-color: var(--color-orange-50);
    color: var(--color-orange-400);
  }
}
</style>
