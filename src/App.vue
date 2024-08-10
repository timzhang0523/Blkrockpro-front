<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {},
}
</script>

<style lang="less">
/*滚动条样式*/
.innerbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
.innerbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #02adf7;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.innerbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #1b5aa9;
}

.placeholder-white::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 16px;
}
.placeholder-white:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 16px;
}
.placeholder-white::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 16px;
}
.placeholder-white:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 16px;
}

.finger {
  cursor: pointer;
}
.overHide {
  overflow: hidden;
}
.flex {
  display: flex;
}
</style>
