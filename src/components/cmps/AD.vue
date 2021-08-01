<template>
  <div class="a-d">
    <div class="left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanjutuijian"></use>
      </svg>
      <div class="title">{{51}}首VIP歌曲无法畅想</div>
    </div>
    <div class="right">
        VIP仅0.32元/天
    </div>
  </div>
</template>
<style lang="scss" scoped>
.a-d{
    position: relative;
    z-index: 1;
    width: 6.9rem;
    margin: 0rem 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items:center;
    background-color:#FFF;
    padding:0.2rem 0.3rem;
    border: 1px solid #000;
    border-radius: 0.2rem;
    font-size: 0.3rem;
    .left{
        display: flex;
        justify-content: space-between;
    }
    .right{
        
        color: rgb(146, 150, 155);
        font-size: 0.2rem;
        font-weight: 400;
    }
}
</style>