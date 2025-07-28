<template>
  <q-page class="q-pa-md">
    <Header
      :locations="locations"
      :selected-location="selectedLocation"
      @update:selected-location="updateSelectedLocation"
      @reset:payment="resetPayment"
    />
    <div class="page-container">
      <AmountInput
        v-model="amount"
        :description="description"
        @update:description="updateDescription"
      />
      <div class="divider" />
      <Summary
        :amount="amount"
        :tax-rate="taxRate"
        :tax-amount="tax"
        :total="total"
        :locations="locations"
        :selected-location="selectedLocation"
        :is-amount-below-minimum="isAmountBelowMinimum"
        @update:selected-location="updateSelectedLocation"
      />
      <div class="divider" />
      <PaymentAction
        :locations="locations"
        :selected-location="selectedLocation"
        :is-amount-below-minimum="isAmountBelowMinimum"
        @update:selected-location="updateSelectedLocation"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Header from 'src/components/Header.vue';
import AmountInput from 'src/components/payment/AmountInput.vue';
import Summary from 'src/components/payment/Summary.vue';
import PaymentAction from 'src/components/payment/PaymentAction.vue';
import type { Location } from 'src/types/payment';
import { mockLocations } from 'src/mocks/locations';

const locations = ref<Location[]>(mockLocations);
const selectedLocation = ref<Location | null>(locations?.value?.[0] || null);
const amount = ref<number | null>(0);
const description = ref('');

const taxRate = computed(() =>
  selectedLocation.value ? parseFloat(selectedLocation.value?.taxRate ?? '0').toFixed(4) : '0',
);
const tax = computed(() =>
  selectedLocation.value ? ((amount.value ?? 0) * parseFloat(taxRate.value)).toFixed(2) : '0',
);
const total = computed(() => ((amount.value ?? 0) + parseFloat(tax.value)).toFixed(2));

const isAmountBelowMinimum = computed(() => {
  return parseFloat(total.value) < 0.5 && parseFloat(total.value) > 0;
});

const updateDescription = (value: string) => {
  description.value = value;
};

const updateSelectedLocation = (location: string) => {
  selectedLocation.value = locations.value.find((l) => l.id === Number(location)) || null;
};

const resetPayment = () => {
  amount.value = 0;
  description.value = '';
};
</script>

<style lang="scss" scoped>
.page-container {
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
}

.divider {
  border-top: 1px solid var(--color-gray-100);
  height: 0;
}
</style>
