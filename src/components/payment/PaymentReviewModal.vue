<template>
  <q-dialog
    :model-value="props.modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card class="payment-review-modal">
      <div class="payment-review-content">
        <div class="payment-review-icon">
          <img src="/icons/card-reader.png" alt="Card Reader" />
        </div>
        <h2 class="payment-review-title">
          <font-awesome-icon icon="fa-solid fa-eye" /> Review Details with Patient
        </h2>
        <p class="payment-review-description">
          Review details of this transaction with the customer on the device reader. If everything
          looks good, proceed to process payment.
        </p>
        <div class="payment-review-auto-process">Auto-Processing in {{ countdown }}s</div>
        <p class="payment-review-manual-hint">Or click "Process Payment" below</p>
      </div>
      <q-card-actions align="right" class="payment-review-actions">
        <q-btn flat label="Cancel" class="payment-review-cancel" @click="onCancel" />
        <q-btn flat label="Process Payment" class="payment-review-confirm" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const countdown = ref(5);
let timer: NodeJS.Timeout | null = null;

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      countdown.value = 5;
      startCountdown();
    } else {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  },
);

const startCountdown = () => {
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      onConfirm();
    }
  }, 1000);
};

const onConfirm = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  emit('confirm');
  emit('update:modelValue', false);
};

const onCancel = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  emit('cancel');
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped>
.payment-review-modal {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
}

.payment-review-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 0;
}

.payment-review-icon {
  height: 120px;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 100%;
  }
}

.payment-review-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.payment-review-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: 24px;
  line-height: 1.5;
}

.payment-review-auto-process {
  background-color: var(--color-teal-50);
  color: var(--color-teal-900);
  padding: 12px 24px;
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: 8px;
  width: 100%;
}

.payment-review-manual-hint {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin: 0;
}

.payment-review-actions {
  padding: 8px;
  display: flex;
  justify-content: space-between;
}

.payment-review-cancel,
.payment-review-confirm {
  padding: 8px 16px;
  border-radius: 6px;
  text-transform: unset;
}

.payment-review-cancel {
  color: var(--color-gray-600);
}

.payment-review-confirm {
  background-color: var(--color-orange-400);
  color: var(--color-white);
}
</style>
