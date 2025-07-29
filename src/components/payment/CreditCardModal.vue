<template>
  <q-dialog
    :model-value="props.modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
  >
    <q-card class="credit-card-modal">
      <q-card-section class="credit-card-header">
        <h2 class="credit-card-title">Credit Card Details</h2>
        <q-btn flat round icon="close" color="grey-6" class="credit-card-close" @click="onCancel" />
      </q-card-section>

      <q-card-section class="credit-card-content">
        <div class="credit-card-form">
          <q-input
            v-model="cardData.nameOnCard"
            outlined
            label="Name on Card"
            class="credit-card-input"
          />

          <q-input
            v-model="cardData.cardNumber"
            outlined
            label="Card Number"
            mask="#### #### #### ####"
            class="credit-card-input"
          />

          <div class="credit-card-row">
            <q-input
              v-model="cardData.expirationDate"
              outlined
              label="Expiration Date"
              mask="##/##"
              placeholder="MM/YY"
              class="credit-card-input-half"
            />
            <q-input
              v-model="cardData.cvc"
              outlined
              label="CVC"
              mask="###"
              class="credit-card-input-half"
            />
          </div>

          <div class="credit-card-row">
            <q-select
              v-model="cardData.country"
              outlined
              label="Country"
              :options="countryOptions"
              class="credit-card-input-half"
            />
            <q-input v-model="cardData.zip" outlined label="ZIP" class="credit-card-input-half" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="credit-card-actions">
        <q-btn flat label="Cancel" class="credit-card-cancel" @click="onCancel" />
        <q-btn flat :label="`Pay $${props.total}`" class="credit-card-confirm" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  total: string;
}>();

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const cardData = ref({
  nameOnCard: '',
  cardNumber: '',
  expirationDate: '',
  cvc: '',
  country: 'United States',
  zip: '',
});

const countryOptions = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Taiwan',
];

const onConfirm = () => {
  emit('confirm', cardData.value);
  emit('update:modelValue', false);
};

const onCancel = () => {
  emit('cancel');
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped>
.credit-card-modal {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
}

.credit-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
}

.credit-card-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
}

.credit-card-close {
  margin: -8px;
}

.credit-card-content {
  padding: 24px;
}

.credit-card-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credit-card-input {
  width: 100%;
}

.credit-card-row {
  display: flex;
  gap: 16px;
}

.credit-card-input-half {
  flex: 1;
}

.credit-card-actions {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: space-between;
}

.credit-card-cancel,
.credit-card-confirm {
  padding: 8px 16px;
  border-radius: 6px;
  text-transform: unset;
}

.credit-card-confirm {
  background-color: var(--color-orange-400);
  color: var(--color-white);
}
</style>
