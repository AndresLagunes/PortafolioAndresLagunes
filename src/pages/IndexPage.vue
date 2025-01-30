<template>
  <div id="main-container" class="q-ma-md">
    <q-splitter
      class="border-class splitter-class"
      v-model="splitterModel"
      :style="headerHeight"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <div v-for="n in 20" :key="n" class="q-my-md">
            {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quis praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.xd
          </div>
        </div>
      </template>

      <template v-slot:after>
        <q-splitter v-model="insideModel" horizontal>
          <template v-slot:before>
            <div class="q-pa-md">
              <div class="text-h4 q-mb-md">Before</div>
              <div v-for="n in 20" :key="n" class="q-my-md">
                {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Quis praesentium cumque magnam odio iure quidem, quod
                illum numquam possimus obcaecati commodi minima assumenda
                consectetur culpa fuga nulla ullam. In, libero.
              </div>
            </div>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <div class="text-h4 q-mb-md">After</div>
              <div v-for="n in 20" :key="n" class="q-my-md">
                {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Quis praesentium cumque magnam odio iure quidem, quod
                illum numquam possimus obcaecati commodi minima assumenda
                consectetur culpa fuga nulla ullam. In, libero.
              </div>
            </div>
          </template>
        </q-splitter>
      </template>
    </q-splitter>
    <h1>{{ $t("welcome") }}</h1>
    <p>{{ $t("about") }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobal } from "stores/global";

const global = useGlobal();
const headerHeight = computed(() => {
  // let mainContainer = document.getElementById("main-container");
  return `height: calc(100vh - ${global.getHeaderHeight}px - 16px - 16px);`; //-16px dos veces de los paddings
});

const { t } = useI18n();

const splitterModel = ref(75);
const insideModel = ref(50);

defineOptions({
  name: "IndexPage",
});
</script>

<style lang="scss">
.border-class {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.splitter-class {
  // height: 500px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
