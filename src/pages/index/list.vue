<template>
  <view class="">
    <view class="p-24rpx pt-0rpx">
      <view class="bg-white overflow-y-auto rds24 p-24rpx pt-32rpx mt-24rpx" v-for="(item, index) in list" :key="index">
        <view class="items-center justify-between flex">
          <view class="fs34" :style="{ color: item.applyStatusEnum.color }">{{ item.applyStatusEnum.value }}</view>
          <view class="text-hex-B0B3BE fs26">{{ item.createdAt }}</view>
        </view>
        <view class="bg-hex-F9F9FC rds20 fs26 p-24rpx mt-30rpx">
          <view class="flex pb-10rpx">
            <view class="w-190rpx flex-shrink-0 text-hex-b0b3be">获取计划方式</view>
            <view class="flex-1 tex-hex-272848 babw">{{ item.notifyFileTypeName }}</view>
          </view>
          <view class="flex pb-10rpx">
            <view class="w-190rpx flex-shrink-0 text-hex-b0b3be">购置车辆种类</view>
            <view class="flex-1 tex-hex-272848 babw">{{ item.vehicleTypeName }}</view>
          </view>
          <view class="flex pb-10rpx">
            <view class="w-190rpx flex-shrink-0 text-hex-b0b3be">厂牌型号</view>
            <view class="flex-1 tex-hex-272848 babw">{{ item.brandNumApp }}</view>
          </view>
          <view class="flex">
            <view class="w-190rpx flex-shrink-0 text-hex-b0b3be">计划购置时间</view>
            <view class="flex-1 tex-hex-272848 babw">{{ item.planPurchaseTime }}</view>
          </view>
        </view>
        <view v-if="item.applyStatus == 'CHECKING'" class="revoke fs30 rds16">撤销</view>
      </view>
    </view>
    <uni-load-more :status="moreStatus"></uni-load-more>
  </view>
</template>

<script>
import util from '../../common/util';
import req from '../../common/req';

export default {
  data() {
    return {
      pageNum: 1,
      list: [],
      moreStatus: 'more',
    };
  },

  onLoad() {
    this.dataReq();
  },

  onPullDownRefresh() {
    this.pageNum = 1;
    this.dataReq();
  },
  onReachBottom() {
    if (this.moreStatus == 'more') {
      this.moreStatus = 'loading';
      this.dataReq();
    }
  },

  methods: {
    dataReq() {
      req
        .get({
          url: req.urlApi('mlyun-assets-law/vehiclePurchase/queryVehiclePurchasePageList'),
          data: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          if (res.success) {
            if (this.pageNum == 1) {
              this.list = [];
            }
            this.list = this.list.concat(res.data.list);
            this.pageNum += 1;
            this.moreStatus = this.list.length == res.data.total ? 'noMore' : 'more';
          } else {
            this.moreStatus = 'more';
            util.showToast(res.message);
          }
        });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f5f6fa;
}
.revoke {
  background-color: #5660ff;
  color: #ffffff;
  width: 170rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  float: right;
  margin-top: 24rpx;
}
</style>
