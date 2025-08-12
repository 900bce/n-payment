<template>
  <q-dialog v-model="isOpen" persistent maximized class="processing-fee-modal">
    <q-card class="modal-card">
      <q-card-section class="modal-header">
        <div class="header-content">
          <div class="modal-title">Edit Merchant Processing Fee</div>
          <q-btn flat round dense icon="close" class="close-btn" @click="onCancel" />
        </div>
        <p class="modal-subtitle">Only applies to this transaction</p>
      </q-card-section>

      <q-card-section class="modal-body">
        <div class="slider-section">
          <div class="slider-display">
            <span class="percentage">{{ merchantSharePercentage.toFixed(2) }}%</span>
            <span class="dollar-amount">${{ merchantShareFee }}</span>
          </div>

          <div class="slider-container">
            <q-slider
              v-model="merchantSharePercentage"
              :min="0"
              :max="totalFeePercentage"
              :step="0.01"
              class="custom-slider"
              color="teal-400"
              @update:model-value="
                (value: number | null) => value !== null && onMerchantShareChange(value)
              "
            />
            <div class="slider-divider" />
          </div>

          <div class="slider-labels">
            <span>0</span>
            <span>{{ totalFeePercentage }}%</span>
          </div>
        </div>

        <div class="fee-settings">
          <div class="fee-section">
            <div class="fee-title">Merchant processing fee</div>
            <div class="fee-inputs">
              <div class="input-group">
                <q-input
                  v-model="merchantSharePercentage"
                  type="number"
                  dense
                  outlined
                  suffix="%"
                  class="fee-input"
                />
                <span class="input-divider">/ {{ totalFeePercentage }}% + </span>
                <q-input
                  :model-value="merchantFeeFixed"
                  @update:model-value="handleMerchantFeeFixedChange"
                  :max="totalFeeFixed"
                  type="number"
                  dense
                  outlined
                  prefix="$"
                  class="fee-input"
                />
                <span class="input-divider">/ ${{ totalFeeFixed }}</span>
              </div>
            </div>
          </div>

          <div class="fee-section">
            <div class="fee-title">Patient processing fee</div>
            <div class="fee-inputs">
              <div class="input-group">
                <q-input
                  v-model="patientSharePercentage"
                  type="number"
                  dense
                  outlined
                  suffix="%"
                  class="fee-input"
                />
                <span class="input-divider">/ {{ totalFeePercentage }}% + </span>
                <q-input
                  :model-value="patientFeeFixed"
                  @update:model-value="handlePatientFeeFixedChange"
                  :max="totalFeeFixed"
                  type="number"
                  dense
                  outlined
                  prefix="$"
                  class="fee-input"
                />
                <span class="input-divider">/ ${{ totalFeeFixed }}</span>
              </div>
            </div>
          </div>

          <div class="reset-link-container">
            <button class="reset-link" @click="setPatientFeeToZero">
              Set patient processing fee to 0
            </button>
          </div>
        </div>

        <div class="transaction-summary">
          <p class="summary-text">
            On this ${{ props.transactionAmount.toFixed(2) }} transaction, you pay
            <strong>${{ merchantAmount }}</strong
            >, and patient pays
            <strong>${{ patientAmount }}</strong>
          </p>
        </div>
      </q-card-section>

      <q-card-actions class="modal-actions">
        <q-btn flat label="Cancel" class="cancel-btn" @click="onCancel" />
        <q-btn unelevated label="Update" class="update-btn" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  modelValue: boolean;
  transactionAmount: number;
  totalProcessingFeeFixed: number;
  totalProcessingFeePercentage: number;
  patientSharePercentage: number;
  patientFeeFixed: number;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (
    e: 'confirm',
    data: {
      patientSharePercentage: number;
      patientFeeFixed: number;
    },
  ): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  transactionAmount: 0,
  totalProcessingFeeFixed: 0,
  totalProcessingFeePercentage: 0,
});

const emit = defineEmits<Emits>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const totalFeeFixed = props.totalProcessingFeeFixed;
const totalFeePercentage = Number((Number(props.totalProcessingFeePercentage) * 100).toFixed(2));

const merchantSharePercentage = ref(
  Number((Number(props.patientSharePercentage) * 100).toFixed(2)),
);
const merchantFeeFixed = ref(props.patientFeeFixed);

const patientSharePercentage = computed({
  get: () => totalFeePercentage - merchantSharePercentage.value,
  set: (value) => {
    merchantSharePercentage.value = totalFeePercentage - value;
  },
});

const merchantShareFee = computed(() => {
  return ((props.transactionAmount * merchantSharePercentage.value) / 100).toFixed(2);
});

const patientFeeFixed = computed({
  get: () => totalFeeFixed - merchantFeeFixed.value,
  set: (value) => {
    merchantFeeFixed.value = totalFeeFixed - value;
  },
});

const merchantAmount = computed(() => {
  return (props.transactionAmount * merchantSharePercentage.value) / 100 + merchantFeeFixed.value;
});

const patientAmount = computed(() => {
  return (props.transactionAmount * patientSharePercentage.value) / 100 + patientFeeFixed.value;
});

const handleMerchantFeeFixedChange = (value: string | number | null) => {
  if (value === null) {
    merchantFeeFixed.value = 0;
    return;
  }

  if (typeof value === 'string' && isNaN(Number(value))) {
    merchantFeeFixed.value = 0;
    return;
  }

  if (Number(value) > totalFeeFixed) {
    merchantFeeFixed.value = totalFeeFixed;
    return;
  }

  merchantFeeFixed.value = Number(value);
};

const handlePatientFeeFixedChange = (value: string | number | null) => {
  if (value === null) {
    patientFeeFixed.value = 0;
    return;
  }

  if (typeof value === 'string' && isNaN(Number(value))) {
    patientFeeFixed.value = 0;
    return;
  }

  if (Number(value) < 0) {
    patientFeeFixed.value = 0;
    return;
  }

  if (Number(value) > totalFeeFixed) {
    patientFeeFixed.value = totalFeeFixed;
    return;
  }

  patientFeeFixed.value = Number(value);
};

const onMerchantShareChange = (value: number) => {
  merchantSharePercentage.value = value;
};

const setPatientFeeToZero = () => {
  merchantSharePercentage.value = totalFeePercentage;
  handlePatientFeeFixedChange(0);
};

const onCancel = () => {
  emit('cancel');
  isOpen.value = false;
};

const onConfirm = () => {
  emit('confirm', {
    patientSharePercentage: patientSharePercentage.value,
    patientFeeFixed: patientFeeFixed.value,
  });
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
.processing-fee-modal {
  .modal-card {
    max-width: 500px;
    width: 95vw;
    border-radius: 12px !important;
    height: fit-content;
  }
}

.modal-header {
  padding: 24px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .modal-title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin: 0;
    color: var(--color-black);
  }

  .close-btn {
    color: var(--color-gray-500);
  }

  .modal-subtitle {
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--color-gray-700);
    margin: 0;
  }
}

.modal-body {
  padding: 24px;
}

.slider-section {
  margin-bottom: 32px;

  .slider-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 12px;

    .percentage {
      font-size: var(--font-size-xl);
      font-weight: 600;
      color: var(--color-black);
    }

    .dollar-amount {
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
    }
  }

  .slider-container {
    padding: 12px 20px;
    padding-bottom: 0;

    .custom-slider {
      :deep(.q-slider__track) {
        height: 6px;
      }

      :deep(.q-slider__thumb) {
        width: 20px;
        height: 20px;
      }
    }
  }

  .slider-divider {
    border-width: 0 1px;
    border-style: solid;
    border-color: var(--color-gray-300);
    height: 15px;
    margin-bottom: 8px;
  }

  .slider-labels {
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-sm);
    color: var(--color-gray-800);
  }
}

.fee-settings {
  margin-bottom: 24px;
}

.fee-section {
  margin-bottom: 24px;

  .fee-title {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--color-black);
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .fee-input {
      width: 115px;
      background: var(--color-gray-50);

      :deep(.q-field__control) {
        height: 36px;
      }

      :deep(.q-field__native) {
        color: var(--color-black);
        font-size: var(--font-size-md);
        font-weight: 700;
      }
    }

    .input-divider {
      font-size: var(--font-size-xs);
      color: var(--color-gray-600);
    }
  }
}

.reset-link-container {
  text-align: center;
  margin: 24px 0;

  .reset-link {
    background: none;
    border: none;
    color: var(--color-teal-400);
    text-decoration: underline;
    font-size: var(--font-size-sm);
    cursor: pointer;

    &:hover {
      color: var(--color-teal-500);
    }
  }
}

.transaction-summary {
  text-align: center;

  .summary-text {
    font-size: var(--font-size-sm);
    color: var(--color-black);
    margin: 0;
    font-weight: 700;
  }
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: 24px;
  gap: 12px;
  border-top: 1px solid var(--color-gray-300);

  .cancel-btn {
    color: var(--color-gray-600);
    font-weight: 600;
  }

  .update-btn {
    background: var(--color-orange-400);
    color: var(--color-white);
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 6px;
  }
}
</style>
