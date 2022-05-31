<script>
import req from './common/req.js';

export default {
  onLaunch: function () {
    let userInfo = this.$store.state.userInfo;
    if (userInfo) {
      // 需要连接mqtt
      // req.mqttConnect(userInfo.currentStaffId);
    }
    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
};
</script>

<style lang='scss'>
/*每个页面公共css */
:root {
  /* 刘海屏安全区域高度 */
  --liuhai-top: constant(safe-area-inset-top);
  --liuhai-top: env(safe-area-inset-top);
  --liuhai-bottom: constant(safe-area-inset-bottom);
  --liuhai-bottom: env(safe-area-inset-bottom);
  /* 边框 */
  --border: 0.5px solid #e5e5e5;
}

view {
  box-sizing: border-box;
}
.sbt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.fdr {
  display: flex;
  flex-direction: row;
}
.fdc {
  display: flex;
  flex-direction: column;
}
.bwba {
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
.rds12 {
  border-radius: 12rpx;
}
.rds16 {
  border-radius: 16rpx;
}
.rds20 {
  border-radius: 20rpx;
}
.rds24 {
  border-radius: 24rpx;
}
.rds32 {
  border-radius: 32rpx;
}
.fs20 {
  font-size: 20rpx;
}
.fs22 {
  font-size: 22rpx;
}
.fs24 {
  font-size: 24rpx;
}
.fs25 {
  font-size: 25rpx;
}
.fs26 {
  font-size: 26rpx;
}
.fs28 {
  font-size: 28rpx;
}
.fs30 {
  font-size: 30rpx;
}
.fs32 {
  font-size: 32rpx;
}
.fs34 {
  font-size: 34rpx;
}
.fs38 {
  font-size: 38rpx;
}
.fs40 {
  font-size: 40rpx;
}
.fs48 {
  font-size: 48rpx;
}
.fs50 {
  font-size: 50rpx;
}
.fs54 {
  font-size: 54rpx;
}
.fs70 {
  font-size: 70rpx;
}

.btm-submit-btn-bg {
  background-color: white;
  position: fixed;
  left: 0rpx;
  bottom: 0rpx;
  width: 100%;
  padding: 24rpx;
  padding-bottom: 24rpx;
  padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  .submit-btn {
    color: white;
    font-size: 34rpx;
    background-color: #5660ff;
    border-radius: 12rpx;
    text-align: center;
    height: 90rpx;
    line-height: 90rpx;
  }
}

.submit-page-safe-pb {
  padding-bottom: 138rpx;
  padding-bottom: calc(138rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(138rpx + env(safe-area-inset-bottom));
}

.safe-area-inset-pb {
  padding-bottom: 0rpx;
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
}
</style>