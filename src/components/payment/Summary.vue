<template>
  <div class="summary-title">Summary</div>
  <div class="summary-container">
    <Calculation
      :amount="displayAmount"
      :tax-rate="displayTaxRate"
      :tax-amount="props.taxAmount"
      :total="props.total"
    />
    <PaymentType
      :cash-amount="props.total"
      :card-amount="props.total"
      :is-amount-below-minimum="props.isAmountBelowMinimum"
      :current-payment-type="props.currentPaymentType"
      :patient-card-processing-fee="props.patientCardProcessingFee"
      @payment-selected="onPaymentSelected"
      @edit-card-processing-fee="emit('edit-card-processing-fee')"
    />
  </div>
</template>

<script setup lang="ts">
import Calculation from 'src/components/payment/Calculation.vue';
import PaymentType from 'src/components/payment/PaymentType.vue';
import { computed } from 'vue';

const props = defineProps<{
  amount: number;
  taxRate: string;
  taxAmount: string;
  total: string;
  locations: Location[];
  selectedLocationId: number | null;
  isAmountBelowMinimum: boolean;
  currentPaymentType: 'cash' | 'card';
  patientCardProcessingFee: string;
}>();

const emit = defineEmits([
  'update:selectedLocation',
  'update:currentPaymentType',
  'edit-card-processing-fee',
]);

const displayAmount = computed(() => {
  return props.amount.toFixed(2);
});

const displayTaxRate = computed(() => {
  return (parseFloat(props.taxRate) * 100).toFixed(2);
});

const onPaymentSelected = (paymentType: 'cash' | 'card') => {
  emit('update:currentPaymentType', paymentType);
};
</script>

<style scoped>
.summary-container {
  padding: 16px;
  padding-bottom: 0;
}

.summary-title {
  padding: 26.5px 16px;
  color: var(--color-black);
  font-size: var(--font-size-md);
  font-weight: 700;
  border-bottom: 1px solid var(--color-gray-100);
}
</style>
