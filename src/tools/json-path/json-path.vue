<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import { jsonExtra } from '@/tools/json-path/json-path.service';

const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-path:raw-json', null);
const extraPath = useStorage('json-path:extra-path', null);

const result = computed(() => withDefaultOnError(() => jsonExtra(rawJson.value, extraPath.value), ''));

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON.parse(v),
      message: 'Provided JSON is not valid.',
    },
  ],
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px" flex justify-center gap-3>
      <n-form-item label="提取路径 :" label-placement="left" label-width="100">
        <n-input v-model:value="extraPath" />
      </n-form-item>
    </div>
  </div>

  <n-form-item
    label="原始JSON"
    :feedback="rawJsonValidation.message"
    :validation-status="rawJsonValidation.status"
  >
    <c-input-text
      ref="inputElement"
      v-model:value="rawJson"
      placeholder="Paste your raw JSON here..."
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item label="提取后的值">
    <TextareaCopyable :value="result" language="json" :follow-height-of="inputElement" />
  </n-form-item>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
