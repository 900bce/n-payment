<template>
  <div class="calculation-container">
    <div class="calculation-item">
      <div>Subtotal</div>
      <div>${{ props.amount || '0.00' }}</div>
    </div>
    <div class="calculation-item">
      <div>Tax({{ props.taxRate }}%)</div>
      <div>${{ props.taxAmount || '0.00' }}</div>
    </div>
    <div class="total-item">
      <div>Total</div>
      <div>${{ props.total || '0.00' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  amount: string;
  taxRate: string;
  taxAmount: string;
  total: string;
}>();
</script>

<style scoped>
.calculation-container {
  font-weight: 500;
  font-size: var(--font-size-xs);
}

.calculation-item {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-gray-700);
}

.total-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
  border-top: 1px solid var(--color-teal-700);
  color: var(--color-black);
}
</style>
