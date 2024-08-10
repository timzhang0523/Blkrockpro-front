<template>
    <div class="home-page" ref="home">
     
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      language:'zh',
      language_obj:{}

    }
  },
  mounted(){
    var lan = this.language
    console.log(this.$i18n.messages[lan].one);
    this.language_obj=this.$i18n.messages[lan].one
  }
}
</script>

<style lang="less" scoped>
.fontSet(@c: #fff, @s: 24px, @f: "SimSun", @h: 24px) {
    font-family: @f;
    color: @c;
    font-size: @s;
    line-height: @h;
}

.home-page {
    width: 100vw;
        min-height:100vh;
        // background: url('../../../assets/images/home_bg.jpg');
        background-image: url('../../assets/image/home_bg.jpg');
        background-size: cover;  /* 背景图片覆盖整个元素 */
        background-position: center; /* 背景图片居中 */
        box-sizing: border-box;
        position: relative;
}
.hander{
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 25px;
    box-sizing: border-box;
    img{
        width: 60px;
        height: 60px;
    }
    span{
        color: #fff;
        font-size: 22px;
        font-weight: 600;
    }
}
.input_box{
    width: 100vw;
    height: 350px;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 45px ;
    position: absolute;
    top: 100vw;
    padding: 25px;
    box-sizing: border-box;
    text-align: center;
    .top{
        width: 100%;
        text-align: center;
        color: #b1a7a7;
        font-size: 22px;
    }
    .input{
        width: 100%;
        height: 60px;
        background-color: transparent;
        outline: none;
        border: none;
        background-color: rgba(255, 255, 255, .3);
        margin: 20px auto;
        border-radius: 15px;
        color: #fff !important;
        font-size: 20px;
        padding: 0 25px;
    box-sizing: border-box;
    }   
    .input::placeholder{
        color: #fff;
    }
    .message{
        width: 100%;
        text-align: center;
        color: #b1a7a7;
        font-size: 18px;
    }
    .button{
        display: inline-block;
        
        width: 80%;
        margin: 25px;
    }
}
</style>