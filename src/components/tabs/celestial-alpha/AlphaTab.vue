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
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="alpha" />
    <div class="l-alpha-run">
      <div class="c-alpha-run-description">
        <span :class="{ 'o-pelle-disabled': isDoomed }">
          Enter Alpha's Reality.
        </span>
      </div>
      <div
        :class="runButtonOuterClass"
        @click="startRun"
      >
        <div
          :class="runButtonInnerClass"
          :button-symbol="symbol"
        >
          {{ symbol }}
        </div>
      </div>
      <div class="c-alpha-run-description">
        {{ runDescription }}
      </div>
    </div>
  </div>
</template>