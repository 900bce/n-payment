<template>
  <div class="amount-input-container">
    <p class="amount-input-label">Enter Amount</p>
    <div class="amount-input-field-container">
      <span class="amount-dollar-sign">$</span>
      <div class="amount-input-wrapper">
        <input
          ref="inputRef"
          type="text"
          v-model="value"
          class="amount-input-field"
          @focus="onFocus"
          @blur="onBlur"
          :style="{ width: inputWidth + 'px' }"
        />
        <span ref="measureRef" class="measure-text">{{ displayValue }}</span>
      </div>
    </div>
    <input
      type="text"
      :value="props.description"
      @input="updateDescription"
      class="description-input"
      placeholder="Description (Optional)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue';

const props = defineProps<{
  modelValue: number | null;
  description: string;
}>();

const emit = defineEmits(['update:modelValue', 'update:description']);

const isFocused = ref(false);
const inputRef = ref<HTMLInputElement>();
const measureRef = ref<HTMLSpanElement>();
const inputWidth = ref(100);

const displayValue = computed(() => {
  if (isFocused.value) {
    return props.modelValue?.toString() || '0';
  }

  if (!props.modelValue) {
    return '0.00';
  }

  return props.modelValue.toFixed(2);
});

const value = computed({
  get: () => {
    if (isFocused.value) {
      return props.modelValue?.toString() || '';
    }

    if (!props.modelValue) {
      return '0.00';
    }

    return props.modelValue.toFixed(2);
  },
  set: (val: string) => {
    const cleanValue = val.replace(/[^\d.]/g, '');

    if (cleanValue === '') {
      emit('update:modelValue', 0);
      return;
    }

    const numValue = parseFloat(cleanValue);

    if (!isNaN(numValue)) {
      const formattedValue = parseFloat(numValue.toFixed(2));
      emit('update:modelValue', formattedValue);
    }
  },
});

const calculateWidth = async () => {
  await nextTick();
  if (measureRef.value) {
    const width = measureRef.value.offsetWidth;
    inputWidth.value = Math.max(width + 20, 60);
  }
};

watch(displayValue, calculateWidth, { immediate: true });

const onFocus = () => {
  isFocused.value = true;
  calculateWidth();
};

const onBlur = () => {
  isFocused.value = false;
  calculateWidth();
};

const updateDescription = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:description', input.value);
};
</script>

<style lang="scss" scoped>
.amount-input-container {
  padding: 16px;
  text-align: center;
}

.amount-input-label {
  color: var(--color-gray-700);
  font-size: var(--font-size-lg);
  font-weight: 500;
}

.amount-input-field-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.amount-dollar-sign {
  color: var(--color-black);
  font-size: var(--font-size-4xl);
  font-weight: 900;
}

.amount-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.amount-input-field {
  border: none;
  color: var(--color-black);
  font-size: var(--font-size-6xl);
  font-weight: 700;
  background: transparent;
  min-width: 60px;
  height: 70px;
  transition: width 0.2s ease;

  &:focus {
    outline: none;
  }
}

.measure-text {
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  font-size: var(--font-size-6xl);
  font-weight: 700;
  pointer-events: none;
  top: 0;
  left: 0;
}

.description-input {
  padding: 16px;
  margin-top: 8px;
  border: none;
  border-radius: 8px 8px 0 0;
  background: var(--color-gray-0);
  width: 100%;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

@media (min-width: 768px) {
  .amount-input-container {
    padding: 100px 0;
  }

  .description-input {
    width: 400px;
  }
}
</style>
