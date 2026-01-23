<script>
export default {
  name: "AlphaMilestoneComponent",
  props: {
    milestone: {
      type: Object,
      required: true
    }
  },
  computed: {
    isCompleted() {
      return this.milestone.isCompleted();
    },
    containerClass() {
      return {
        "c-alpha-milestone": true,
        "c-alpha-milestone--completed": this.isCompleted
      };
    }
  }
};
</script>

<template>
  <div :class="containerClass">
    <div class="c-alpha-milestone__name">
      {{ milestone.name }}
    </div>

    <template v-if="isCompleted">
      <div class="c-alpha-milestone__nerf">
        Nerf: {{ milestone.nerf }}
      </div>
      <div class="c-alpha-milestone__buff">
        Buff: {{ milestone.buff }}
      </div>
    </template>
  </div>
</template>