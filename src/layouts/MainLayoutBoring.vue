<template>
  <q-layout view="lHh Lpr lFf">
    <div class="sticky-header">
      <div
        id="main-header"
        class="row header-class overlapped-header"
        :class="{ 'main-header-scrolled': isScrolled }"
      >
        <q-toolbar>
          <div class="col-4">
            <q-toolbar-title class="absolute-left q-mt-md q-ml-sm">
              Jesús Andrés Lagunes Hernández
            </q-toolbar-title>
          </div>
          <div class="col-4">
            <q-btn-toggle
              v-model="selectedPage"
              class="absolute-center q-mt-sm"
              color="black"
              text-color="white"
              toggle-color="white"
              toggle-text-color="black"
              rounded
              unelevated
              glossy
              :options="[
                { label: 'Inicio', value: 'home' },
                { label: 'Work', value: 'two' },
                { label: 'About', value: 'three' },
              ]"
            >
              <template v-slot:>
                <div class="row items-center no-wrap">
                  <div class="text-center">Pick<br />car</div>
                  <q-icon right name="directions_car" />
                </div>
              </template>
            </q-btn-toggle>
          </div>
          <div class="col-4 align">
            <q-select
              v-model="locale"
              :options="localeOptions"
              :label="$t('languageLabel')"
              class="absolute-right q-mt-md q-mr-sm"
              dense
              borderless
              emit-value
              map-options
              options-dense
              dark
              color="white"
              label-color="white"
              style="min-width: 135px; max-width: 135px"
            />
          </div>
        </q-toolbar>
      </div>
    </div>

    <div class="row">
      <q-page-container class="">
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobal } from "stores/global";

const global = useGlobal();

const { t } = useI18n();
defineOptions({
  name: "MainLayout",
});
const selectedPage = ref("home");

const updateMode = (newValue) => global.changeMode(newValue);

const { locale } = useI18n({ useScope: "global" });
const localeOptions = [
  { value: "en-US", label: "English" },
  { value: "es", label: "Español" },
];

function changeLanguage() {
  locale.value = selectedLocale.value;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

watch(
  () => global.mode,
  async (newValue) => {
    setTimeout(() => {
      let motorcycles = document.getElementById("motorcycles");
      let mainHeader = document.getElementById("main-header");
      let headerHeight = mainHeader.scrollHeight;
      console.log(motorcycles);

      if (newValue != "formal") headerHeight += motorcycles.scrollHeight;
      console.log(headerHeight);
      global.setHeaderHeigth(headerHeight);
    }, 0);
  }
);

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50; // Cambia 50 por el valor que quieras
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setTimeout(() => {
    let motorcycles = document.getElementById("motorcycles");
    let mainHeader = document.getElementById("main-header");
    let headerHeight = mainHeader.scrollHeight;
    console.log(motorcycles);

    if (global.mode != "formal") headerHeight += motorcycles.scrollHeight;
    console.log(headerHeight);
    global.setHeaderHeigth(headerHeight);
  }, 0);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss">
.sticky-header {
  // position: sticky;
  width: 100%;
  // top: 0;
  // z-index: 1000; /* Asegura que la toolbar esté por encima del contenido */
}

.small-header {
}

.header-class {
  color: white;
  // background: rgb(157, 204, 255);
}

/*.row {
  position: relative;
}

.overlapped-header {
  top: 20px;
  left: 0;
  right: 0;
  z-index: 2;
}

.toolbar-transparent {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}*/

body {
  background: linear-gradient(-45deg, #c78cff, #407fc6, #4dc6aa);
  background-size: 400% 400%;
  animation: gradient 30s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
