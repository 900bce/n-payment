<template>
  <div class="payment-type-container">
    <q-tabs v-model="activeTab" dense class="payment-tabs">
      <q-tab name="cash" class="payment-tab">
        <div class="tab-content">
          <font-awesome-icon icon="fa-solid fa-sack-dollar" class="tab-icon" />
          <span class="tab-text">Pay by Cash</span>
          <span class="tab-amount">${{ props.cashAmount }}</span>
        </div>
      </q-tab>
      <q-tab name="card" class="payment-tab">
        <div class="tab-content">
          <font-awesome-icon icon="fa-solid fa-credit-card" class="tab-icon" />
          <span class="tab-text">Pay by Card</span>
          <span class="tab-amount">${{ props.cardAmount }}</span>
        </div>
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab" animated class="payment-panels">
      <q-tab-panel name="cash" class="payment-panel">
        <div class="cash-panel">
          <div class="payment-total">
            <span class="total-label">Pay by Cash Total</span>
            <span :class="['total-amount', { 'total-amount-warning': props.isAmountBelowMinimum }]">
              ${{ cashTotal }}
            </span>
          </div>
          <div v-if="props.isAmountBelowMinimum" class="total-amount-warning-desc">
            *Total amount falls below the required minimum of $0.50
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="card" class="payment-panel">
        <div class="card-panel">
          <div class="payment-total">
            <span class="total-label">Pay by Card Total</span>
            <span class="total-amount">${{ cardTotal }}</span>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  cashAmount?: string;
  cardAmount?: string;
  isAmountBelowMinimum?: boolean;
}

interface Emits {
  (e: 'payment-selected', paymentType: 'cash' | 'card'): void;
  (e: 'log-payment', paymentType: 'cash' | 'card'): void;
}

const props = withDefaults(defineProps<Props>(), {
  cashAmount: '0',
  cardAmount: '0',
  isAmountBelowMinimum: false,
});

const emit = defineEmits<Emits>();

const activeTab = ref<'cash' | 'card'>('cash');

// 計算金額
const cashTotal = computed(() => props.cashAmount);
const cardTotal = computed(() => props.cardAmount);

// 監聽 tab 變化
const onTabChange = (tab: 'cash' | 'card') => {
  emit('payment-selected', tab);
};

// 暴露給父組件的方法
defineExpose({
  activeTab,
  setActiveTab: (tab: 'cash' | 'card') => {
    activeTab.value = tab;
  },
});
</script>

<style lang="scss" scoped>
.payment-type-container {
  width: 100%;
}

.payment-tabs {
  border-radius: 8px;
  background: var(--color-white);
  border: 1px solid var(--color-teal-100);

  :deep(.q-tab--active) {
    background: var(--color-teal-100);
  }

  :deep(.q-tab__indicator) {
    display: none;
  }
}

.payment-tab {
  padding: 4px 0;
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tab-icon {
  font-size: 16px;
  color: var(--color-teal-700);
}

.tab-text {
  color: var(--color-teal-700);
  font-size: var(--font-size-xxs);
  font-weight: 500;
  text-transform: none;
}

.payment-panels {
  padding-top: 24px;
}

.payment-panel {
  padding: 0;
}

.cash-panel,
.card-panel {
  border-top: 1px solid var(--color-gray-700);
  padding: 32px 16px;
}

.payment-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: var(--font-size-xs);
  color: var(--color-black);
  font-weight: 700;
}

.total-amount {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-green-500);

  &-warning {
    color: var(--color-red-500);
  }
}

.total-amount-warning-desc {
  color: var(--color-red-500);
  font-weight: 500;
  font-size: var(--font-size-xxs);
}
</style>
