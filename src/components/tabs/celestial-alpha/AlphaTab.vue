<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";

export default {
  name: "AlphaTab",
  components: {
    CelestialQuoteHistory,
  },
  data() {
    return {
      isRunning: false,
    };
  },
  computed: {
    runButtonOuterClass() {
      return {
        "l-alpha-run-button": true,
        "c-alpha-run-button": true,
        "c-alpha-run-button--running": this.isRunning,
        "c-alpha-run-button--not-running": !this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runButtonInnerClass() {
      return this.isRunning ? "c-alpha-run-button__inner--running" : "c-alpha-run-button__inner--not-running";
    },
    runDescription() {
      return `${GameDatabase.celestials.descriptions[7].effects()}\n
      ${GameDatabase.celestials.descriptions[7].description()}`;
    },
    runDescriptionLines() {
      return this.runDescription.split("\n").filter(line => line.trim() !== "");
    },
    symbol: () => "Ω",
    isDoomed: () => Pelle.isDoomed,
  },
  watch: {
    isRunning() {
      this.$recompute("runDescription");
    }
  },
  methods: {
    update() {
      this.isRunning = Alpha.isRunning;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Alpha's", number: 7 });
    }
  }
};
</script>

<style scoped>
.c-alpha-run-description {
  width: 46rem;
}
</style>

<template>
  <div class="l-alpha-celestial-tab">
    <CelestialQuoteHistory celestial="alpha" />
    <div class="l-alpha-run-container">
      <div v-if="hasUnlock(unlocksInfo.RUN)">
        <div class="c-alpha-run-button">
          <div
            class="c-alpha-run-button__title"
            :class="doomedDisabledClass"
          >
            {{ realityTitle }}
          </div>
          <div v-if="completed">
            <b>(Completed)</b>
          </div>
          <div
            :class="runButtonClassObject"
            @click="startRun"
          >
            <div class="c-alpha-run-button__icon__sigil">
              {{ alphaSymbol }}
            </div>
          </div>
          <div
            v-for="line in runDescription"
            :key="line"
            class="c-enslaved-run-description-line"
          >
            {{ line }}
          </div>
          <b>placeholder text</b>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-effarig-relic-description {
  width: 46rem;
}
</style>