<template>
    <div class="box">
        <ul class="asd">
            <li><router-link to="/per"><span class="iconfont">&#xe647;</span>人员管理</router-link></li>
            <li><router-link to="/gonc"><span class="iconfont">&#xe648;</span>工程管理</router-link></li>
            <li><span class="iconfont">&#xe649;</span>人员管理</li>
            <li><span class="iconfont">&#xe64a;</span>人员管理</li>
            <li class="wer"><span class="iconfont">&#xe64b;</span>人员管理</li>
            
                  
                    <li class="rt">人员管理</li>
                    <li class="rty">人员管理</li>
            <li><span class="iconfont">&#xe64c;</span>人员管理</li>
            <li><span class="iconfont">&#xe64d;</span>人员管理</li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:"left",
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
.box{
    float:left;
    width: 20%;
    background-color:cornflowerblue;
}
.asd{
    float:left;
}
li{
    
    text-align: center;
    height: 80px;
    line-height: 80px;
}
@font-face {
  font-family: 'iconfont';
  src: url('../../font_32qttyo23h8/iconfont.ttf?t=1677740874380') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.rt,.rty{
    display: none;
}

.wer:hover~.rt{
    display: block;
}
.wer:hover~.rty{
    display: block;
}
/* .rty{
    display: none;
} */
</style>
<link rel="stylesheet" href="../../font_32qttyo23h8/iconfont.css"></link>