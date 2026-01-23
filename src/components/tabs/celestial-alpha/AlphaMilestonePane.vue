<script>
import AlphaMilestoneComponent from "./AlphaMilestoneComponent";
import { ALPHA_MILESTONES, AlphaMilestones } from "@/core/celestials/alpha/alpha-milestones";

export default {
  name: "AlphaMilestonePane",
  components: {
    AlphaMilestoneComponent
  },
  computed: {
    milestones() {
      return AlphaMilestones.nextMilestoneGroup;
    }
    ,
    classObject() {
      return {};
    }
  },
};
</script>

<template>
  <div class="c-alpha-next-milestones">
    <div
      class="o-alpha-milestone-modal-button"
      onclick="Modal.alphaMilestones.show()"
      :class="classObject"
    >
      Show all milestones
    </div>
    <AlphaMilestoneComponent
      v-for="milestone in milestones"
      :key="milestone.id"
      :milestone="milestone"
    />
  </div>
</template>