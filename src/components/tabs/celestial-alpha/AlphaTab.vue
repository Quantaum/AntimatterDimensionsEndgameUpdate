<script>
import { DC } from "@/core/constants";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "AlphaTab",
  components: {
    PrimaryButton,
    GlyphSetPreview,
    CelestialQuoteHistory,
    CustomizeableTooltip
  },
  data() {
    return {
      isRunning: false,
      isDoomed: false,
    };
  },
  computed: {
    runDescription() {
      return GameDatabase.celestials.descriptions[7].effects();
    },
  },
  methods: {
    update() {
      this.isRunning = Alpha.isRunning;
      this.isDoomed = Pelle.isDoomed;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Alpha's", number: 7 });
    }
  }
};
</script>

<style scoped>
.l-alpha-tab {
  width: 100%;
}

.l-alpha-content {
  padding: 1rem;
}

.c-alpha-run-button {
  width: 100%;
  padding: 1.5rem;
  margin: 1rem 0;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  border: 2px solid #444;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.c-alpha-run-button:hover:not(.o-pelle-disabled-pointer) {
  background: linear-gradient(135deg, #2d2d2d, #404040);
  border-color: #666;
}

.c-alpha-run-button.o-pelle-disabled-pointer {
  opacity: 0.5;
  cursor: not-allowed;
}

.c-alpha-run-button__icon {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  margin-left: 1rem;
  vertical-align: middle;
}

.c-alpha-run-button__icon--running {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

<template>
  <div class="l-alpha-tab">
    <CelestialQuoteHistory celestial="alpha" />
    <div class="l-alpha-content">
      <button
        class="c-alpha-run-button"
        :class="{ 'o-pelle-disabled-pointer': isDoomed }"
        @click="startRun"
      >
        <b>
          <span v-if="isRunning">You are in </span>
          <span v-else>Start </span>
          Alpha's Reality
        </b>
        <br>
        {{ runDescription }}
      </button>
    </div>
  </div>
</template>