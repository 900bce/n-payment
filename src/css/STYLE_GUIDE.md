# 設計系統樣式指南

本專案已整合完整的設計系統，包含字型大小和顏色變數及 utility classes。

## 使用方式

### 1. CSS 變數方式

在 CSS/SCSS 檔案中直接使用 CSS 變數：

```css
.my-component {
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
  background-color: var(--color-teal-50);
}
```

### 2. SCSS 變數方式

在 SCSS 檔案中使用 SCSS 變數：

```scss
.my-component {
  font-size: $font-size-lg;
  color: map-get($gray-colors, 700);
  background-color: map-get($teal-colors, 50);
}
```

### 3. Utility Classes 方式

在 HTML/Vue 模板中直接使用 class：

```html
<div class="text-lg text-gray-700 bg-teal-50">這是一個使用 utility classes 的範例</div>
```

## 字型大小

### 可用的字型大小

- `xss`: 10px
- `xs`: 12px
- `sm`: 14px
- `md`: 16px (預設)
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 32px
- `4xl`: 36px
- `5xl`: 48px
- `6xl`: 60px
- `7xl`: 72px
- `8xl`: 96px
- `9xl`: 128px

### 使用範例

```html
<!-- Utility classes -->
<h1 class="text-3xl">大標題</h1>
<p class="text-md">內文</p>
<small class="text-xs">小字</small>

<!-- CSS 變數 -->
<style>
  .title {
    font-size: var(--font-size-3xl);
  }
</style>

<!-- SCSS 變數 -->
<style lang="scss">
  .title {
    font-size: $font-size-3xl;
  }
</style>
```

## 顏色系統

### 可用的顏色

- **Gray**: `gray-0` 到 `gray-900`
- **Teal**: `teal-0` 到 `teal-900`
- **Green**: `green-0` 到 `green-900`
- **Yellow**: `yellow-0` 到 `yellow-900`
- **Amber**: `amber-0` 到 `amber-900`
- **Orange**: `orange-0` 到 `orange-900`
- **Red**: `red-0` 到 `red-900`

### 顏色層級說明

- `0`, `50`: 最淡的色調
- `100`-`300`: 淺色調
- `400`-`600`: 中等色調
- `700`-`900`: 深色調

### 使用範例

```html
<!-- 文字顏色 -->
<p class="text-gray-700">灰色文字</p>
<p class="text-teal-600">青綠色文字</p>
<p class="text-red-500">紅色文字</p>

<!-- 背景顏色 -->
<div class="bg-green-100">淺綠色背景</div>
<div class="bg-amber-500">琥珀色背景</div>

<!-- 邊框顏色 -->
<div class="border border-gray-300">灰色邊框</div>
<div class="border border-teal-400">青綠色邊框</div>
```

### CSS 變數使用

```css
.success-message {
  color: var(--color-green-700);
  background-color: var(--color-green-50);
  border-color: var(--color-green-200);
}

.warning-badge {
  color: var(--color-amber-800);
  background-color: var(--color-amber-100);
}
```

### SCSS Maps 使用

```scss
// 使用顏色 maps 來程式化生成樣式
@each $shade, $color in $gray-colors {
  .text-gray-#{$shade} {
    color: #{$color};
  }
}

// 或單獨取用
.my-component {
  color: map-get($teal-colors, 600);
  background: map-get($green-colors, 50);
}
```

## Vue 元件中的使用

### 在 `<template>` 中使用 utility classes

```vue
<template>
  <div class="bg-gray-50 p-4">
    <h2 class="text-2xl text-gray-900 mb-4">標題</h2>
    <p class="text-md text-gray-700">內容文字</p>
    <button class="bg-teal-500 text-white px-4 py-2 rounded">按鈕</button>
  </div>
</template>
```

### 在 `<style>` 中使用變數

```vue
<template>
  <div class="card">
    <h2 class="title">卡片標題</h2>
    <p class="content">卡片內容</p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  padding: 1rem;
  border-radius: 8px;
}

.title {
  font-size: var(--font-size-xl);
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

.content {
  font-size: var(--font-size-md);
  color: var(--color-gray-700);
}
</style>
```

## 最佳實踐

1. **一致性**: 統一使用設計系統中的顏色和字型大小
2. **語意化**: 選擇符合內容語意的顏色（如：成功用綠色、警告用黃色）
3. **對比度**: 確保文字和背景有足夠的對比度
4. **階層**: 使用不同的字型大小來建立視覺階層
5. **適度使用**: 避免在同一個介面中使用過多的顏色

## Quasar 整合

這些顏色變數可以與 Quasar 元件一起使用：

```vue
<template>
  <!-- 使用 Quasar 元件的 color 屬性 -->
  <q-btn :style="{ backgroundColor: 'var(--color-teal-500)' }"> 自定義顏色按鈕 </q-btn>

  <!-- 或在樣式中覆寫 -->
  <q-card class="custom-card">
    <q-card-section>
      <div class="text-lg text-gray-800">卡片內容</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.custom-card {
  background-color: var(--color-gray-50);
  border-left: 4px solid var(--color-teal-500);
}
</style>
```
