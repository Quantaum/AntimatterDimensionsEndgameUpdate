<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import AlphaMilestoneComponent from "@/components/tabs/celestial-alpha/AlphaMilestoneComponent";
import { ALPHA_MILESTONES } from "@/core/celestials/alpha/alpha-milestones";

export default {
  name: "AlphaMilestoneModal",
  components: {
    ModalWrapper,
    AlphaMilestoneComponent
  },
  computed: {
    milestones() {
      return ALPHA_MILESTONES;
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      Alpha Milestones
    </template>

    <div class="l-alpha-milestone-modal-container-outer">
        <div class="l-alpha-milestone-modal-container-inner">
        <AlphaMilestoneComponent
            v-for="milestone in milestones"
            :key="milestone.id"
            :milestone="milestone"
          />
        </div>
    </div>
  </ModalWrapper>
</template>