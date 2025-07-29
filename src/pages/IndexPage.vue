<template>
  <q-page class="q-pa-md">
    <Header
      :locations="locations"
      :selected-location-id="selectedLocationId"
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
        :selected-location-id="selectedLocationId"
        :is-amount-below-minimum="isAmountBelowMinimum"
        :current-payment-type="currentPaymentType"
        :patient-card-processing-fee="patientCardProcessingFee"
        @update:selected-location="updateSelectedLocation"
        @update:current-payment-type="updateCurrentPaymentType"
        @edit-card-processing-fee="showProcessingFeeModal = true"
      />
      <div class="divider" />
      <PaymentAction
        :locations="locations"
        :selected-location-id="selectedLocationId"
        :is-amount-below-minimum="isAmountBelowMinimum"
        :current-payment-type="currentPaymentType"
        :readers="readers"
        :current-reader-id="currentReaderId"
        @update:selected-location="updateSelectedLocation"
      />

      <EditProcessingFeeModal
        v-model="showProcessingFeeModal"
        :transaction-amount="Number(amount)"
        :total-processing-fee-fixed="organization.totalProcessingFeeFixed"
        :total-processing-fee-percentage="Number(organization.totalProcessingFeePercentage)"
        :patient-share-percentage="patientSharePercentage"
        :patient-fee-fixed="patientFeeFixed"
        @confirm="onProcessingFeeConfirm"
        @cancel="onProcessingFeeCancel"
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
import EditProcessingFeeModal from 'src/components/payment/EditProcessingFeeModal.vue';
import type { Location, Reader } from 'src/types/payment';
import { mockLocations } from 'src/mocks/locations';
import { mockReaders } from 'src/mocks/readers';
import { mockOrganization as organization } from 'src/mocks/organization';

const locations = ref<Location[]>(mockLocations);
const readers = ref<Reader[]>(mockReaders);
const selectedLocationId = ref<number | null>(locations?.value?.[0]?.id || null);
const amount = ref<number | null>(0);
const description = ref('');
const currentPaymentType = ref<'cash' | 'card'>('cash');
const currentReaderId = ref<number | null>(
  readers.value.find((reader) => reader.locationId === selectedLocationId.value)?.id || null,
);
const patientSharePercentage = ref(Number(organization.totalProcessingFeePercentage) / 2);
const patientFeeFixed = ref(organization.totalProcessingFeeFixed / 2);
const showProcessingFeeModal = ref(false);

const taxRate = computed(() =>
  selectedLocationId.value
    ? parseFloat(
        locations.value.find((l) => l.id === selectedLocationId.value)?.taxRate ?? '0',
      ).toFixed(4)
    : '0',
);
const tax = computed(() =>
  selectedLocationId.value ? ((amount.value ?? 0) * parseFloat(taxRate.value)).toFixed(2) : '0',
);
const total = computed(() => ((amount.value ?? 0) + parseFloat(tax.value)).toFixed(2));

const isAmountBelowMinimum = computed(() => {
  return parseFloat(total.value) < 0.5 && parseFloat(total.value) > 0;
});

const patientCardProcessingFee = computed(() => {
  return (Number(amount.value) * patientSharePercentage.value + patientFeeFixed.value).toFixed(2);
});

const updateDescription = (value: string) => {
  description.value = value;
};

const updateSelectedLocation = (location: string) => {
  selectedLocationId.value = Number(location);
};

const updateCurrentPaymentType = (paymentType: 'cash' | 'card') => {
  currentPaymentType.value = paymentType;
};

const resetPayment = () => {
  amount.value = 0;
  description.value = '';
};

const onProcessingFeeConfirm = (data: {
  patientSharePercentage: number;
  patientFeeFixed: number;
}) => {
  patientSharePercentage.value = data.patientSharePercentage / 100;
  patientFeeFixed.value = data.patientFeeFixed;
};

const onProcessingFeeCancel = () => {
  showProcessingFeeModal.value = false;
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
