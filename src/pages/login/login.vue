<template>
  <view class="">
    <input type="tel" placeholder="请输入手机号" placeholder-style="color: #B0B3BE;" v-model="username" />
    <input placeholder="请输入密码" placeholder-style="color: #B0B3BE;" v-model="password" :password="true" />
    <view @click="loginTap">登录</view>
    <view @click="showRegisterTap">注册</view>
    <view @click="findPwdTap">找回密码</view>
  </view>
</template>

<script>
import req from '../../common/req.js';
import util from '../../common/util.js';
import md5 from 'md5';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  onLoad() {
    this.username = uni.getStorageSync('username') || '';
    this.password = uni.getStorageSync('password') || '';
  },
  onShow() {},
  methods: {
    loginTap() {
      let data = {
        username: this.username,
        password: md5(this.password),
      };
      util.showLoading();
      req
        .postJson({
          url: req.urlApi('mlyun-auth/server/auth/login'),
          data: data,
        })
        .then((res) => {
          if (res.success) {
            this.loginSuccess(res.data);
          } else {
            util.showToast(res.msg);
          }
        });
    },
    loginSuccess(res) {
      this.$store.commit('updateUserInfo', res);
      // req.mqttConnect(res.currentStaffId);
      uni.setStorageSync('userInfo', res);
      uni.setStorageSync('username', res.phoneNo);
      uni.setStorageSync('password', this.password);
      uni.reLaunch({ url: '/pages/index/index' });
    },
    showRegisterTap() {
      uni.navigateTo({ url: '/pages/login/register' });
    },
    findPwdTap() {
      uni.navigateTo({ url: '/pages/login/findPwd' });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f5f6fa;
}
</style>
