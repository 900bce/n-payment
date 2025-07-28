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
      @payment-selected="onPaymentSelected"
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
  selectedLocation: Location | null;
  isAmountBelowMinimum: boolean;
}>();

const emit = defineEmits(['update:selectedLocation']);

const displayAmount = computed(() => {
  return props.amount.toFixed(2);
});

const displayTaxRate = computed(() => {
  return (parseFloat(props.taxRate) * 100).toFixed(2);
});

// 支付相關的處理函數
const onPaymentSelected = (paymentType: 'cash' | 'card') => {
  console.log('Payment type selected:', paymentType);
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
