<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import { ALPHA_STAGES } from "../../../core/celestials/alpha/alpha-stages";
import { ALPHA_MILESTONES } from "../../../core/celestials/alpha/alpha-milestones";
import AlphaMilestonePane from "./AlphaMilestonePane";

export default {
  name: "AlphaTab",
  components: {
    CelestialQuoteHistory,
    PrimaryButton,
    PrimaryToggleButton,
    AlphaMilestonePane,
  },
  data: () => ({
    isRunning: false,
    completed: false,
    quote: "",
  }),
  computed: {
    stageInfo() {
      return ALPHA_STAGES[Alpha.currentStage];
    },
    alphaMilestones() {
      return ALPHA_MILESTONES;
    },
    realityTitle() {
      if (this.isRunning) return "The Darkness Takes Hold";
      return "Be Consumed by Darkness";
    },
    runButtonClassObject() {
      return {
        "c-alpha-run-button__icon": true,
        "c-alpha-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[7].effects().split("\n");
    },
    alphaSymbol: () => Alpha.symbol,
    isDoomed: () => Pelle.isDoomed,
    doomedDisabledClass() {
      return { "o-pelle-disabled": this.isDoomed };
    },
  },
  methods: {
    update() {
      this.isRunning = Alpha.isRunning;
      this.completed = Alpha.isCompleted && !this.isDoomed;
      this.quote = Alpha.quote;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Alpha's", number: 7 });
    },
  },
};
</script>

<template>
  <div class="l-alpha-celestial-tab">
    <CelestialQuoteHistory celestial="alpha" />
    <div class="l-alpha-mechanics-container">
      <div class="l-alpha-mechanics-inner">
        <div class="l-alpha-run-container">
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
              class="c-alpha-run-description-line"
            >
              {{ line }}
            </div>
            <b>Each milestone reached applies a nerf while inside Alpha and a buff outside Alpha.</b>
          </div>
          <AlphaMilestonePane />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-alpha-run-description-line {
  margin-bottom: 1rem;
}

.l-fixed-setting {
  cursor: pointer;
  pointer-events: none;
  filter: brightness(70%);
}
</style>
