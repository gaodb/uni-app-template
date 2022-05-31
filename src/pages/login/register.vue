<template>
  <view class="">
    <input placeholder="请输入姓名" placeholder-style="color: #B0B3BE;" v-model="name">
    <input type="tel" placeholder="请输入手机号" placeholder-style="color: #B0B3BE;" v-model="phone">
    <input type="number" placeholder="请输入验证码" placeholder-style="color: #B0B3BE;" v-model="code">
    <input placeholder="请输入密码" placeholder-style="color: #B0B3BE;" v-model="password" :password="true">
    <input placeholder="请确认密码" placeholder-style="color: #B0B3BE;" v-model="rePassword" :password="true">
  </view>
</template>

<script>
import req from '../../common/req.js';
import util from '../../common/util.js';

export default {
  data() {
    return {
      name: '',
      phone: '',
      code: '',
      password: '',
      rePassword: '',
    };
  },
  onLoad() {},
  onShow() {},
  methods: {},
};
</script>

<style lang="scss">
page {
  background-color: #f5f6fa;
}
</style>
