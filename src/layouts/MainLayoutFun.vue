<template>
  <q-layout view="lHh Lpr lFf" class="background-desktop">
    <div class="sticky-header">
      <div
        class="row"
        style="height: 0"
        :class="{ 'explosions-scrolled': isScrolled }"
      >
        <div class="col text-right q-pr-lg">
          <q-img
            class="explosion"
            :class="{ 'small-explosion': isScrolled }"
            src="../assets/images/exp.gif"
          />
        </div>
        <div class="col text-left q-pl-lg">
          <q-img
            class="explosion"
            :class="{ 'small-explosion': isScrolled }"
            src="../assets/images/exp.gif"
          />
        </div>
      </div>
      <div
        id="motorcycles"
        class="row"
        :class="{
          'motorcycles-scrolled': isScrolled,
          motorcycles: !isScrolled,
        }"
      >
        <div class="col">
          <q-img
            class="bike-outer"
            :class="{ 'small-bike-outer': isScrolled }"
            :width="!isScrolled ? '70%' : '30%'"
            src="../assets/images/Royal_Enfield_Shotgun_650_NO_BG.png"
          />
        </div>
        <div class="col text-right">
          <q-img
            class="bike-inner q-mr-xl"
            :class="{ 'small-bike-inner': isScrolled }"
            :width="!isScrolled ? '50%' : '25%'"
            src="../assets/images/shotgun_650_L.png"
          />
        </div>
        <div class="col text-left">
          <q-img
            class="bike-inner q-ml-xl"
            :class="{ 'small-bike-inner': isScrolled }"
            :width="!isScrolled ? '50%' : '25%'"
            src="../assets/images/shotgun_650_R.png"
          />
        </div>
        <div class="col text-right">
          <q-img
            class="bike-outer invert-image"
            :class="{ 'small-bike-outer': isScrolled }"
            :width="!isScrolled ? '70%' : '30%'"
            src="../assets/images/Royal_Enfield_Shotgun_650_NO_BG.png"
          />
        </div>
      </div>
      <div
        id="main-header"
        class="row header-class overlapped-header"
        :class="{ 'main-header-scrolled': isScrolled }"
      >
        <q-toolbar>
          <q-toolbar-title> Jesús Andrés Lagunes Hernández </q-toolbar-title>

          <q-select
            v-model="locale"
            :options="localeOptions"
            :label="$t('languageLabel')"
            dense
            borderless
            emit-value
            map-options
            options-dense
            dark
            color="white"
            label-color="white"
            style="min-width: 150px"
          />
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

const applicationModes = [
  { label: t("formal"), tooltip: t("tooltipBoring"), value: "formal" },
  { label: t("fun"), tooltip: t("tooltipFun"), value: "fun" },
];
const selectedMode = ref("formal");
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
  isScrolled.value = window.scrollY >= 80; // Cambia 50 por el valor que quieras
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

<style lang="scss" scoped>
/* Estilo para dispositivos de escritorio */
.background-desktop {
  background-image: url("../assets/images/red_combat_6.webp");
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Asegura que el fondo cubra toda la página */
}

/* Estilo para dispositivos móviles */
@media (max-width: 600px) {
  .background-desktop {
    background-image: url("../assets/images/blue_1.webp");
  }
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000; /* Asegura que la toolbar esté por encima del contenido */
}

.header-class {
  color: white;
  background: rgba(255, 0, 0, 0.3);
}

.invert-image {
  transform: scaleX(-1);
}
.motorcycles {
  transition: font-size 0.3s ease;
  height: 110px;
}
.motorcycles-scrolled {
  transition: font-size 0.3s ease;
  height: 40px;
}

.main-hearder-scrolled {
}

.explosion {
  transition: all 0.3s ease-in-out; /* Transición suave para la imagen */
  width: 23%;
}

.explosion.small-explosion {
  width: 12%;
}

.bike-outer {
  transition: all 0.3s ease-in-out;
}

.bike-outer.small-bike-outer {
}

.bike-inner {
  transition: all 0.3s ease-in-out;
}

.bike-inner.small-bike-inner {
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
</style>
