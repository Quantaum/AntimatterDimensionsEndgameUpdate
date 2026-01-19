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
    };
  },
  computed: {
  },
  methods: {
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
</style>

<template>
  <div class="l-alpha-tab">
    <div class="l-alpha-content">
      <h2>Alpha</h2>
      <p>Alpha tab - Work in progress</p>
    </div>
  </div>
</template>