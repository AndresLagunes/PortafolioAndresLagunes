import { defineStore } from "pinia";

export const useGlobal = defineStore("global", {
  state: () => ({
    mode: "formal",
    headerHeight: 0,
  }),
  getters: {
    getHeaderHeight: (state) => state.headerHeight,
  },
  actions: {
    changeMode(newMode) {
      this.mode = newMode;
    },
    setHeaderHeigth(newHeight) {
      this.headerHeight = newHeight;
    },
  },
});
