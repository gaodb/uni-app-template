<template>
  <view class=""></view>
</template>

<script>
import req from '../../common/req.js';

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  onLoad() {},
  onShow() {
    this.userInfo = this.$store.state.userInfo ? this.$store.state.userInfo : {};
  },
  methods: {},
};
</script>

<style lang="scss">
page {
  background-color: #f5f6fa;
}
</style>
