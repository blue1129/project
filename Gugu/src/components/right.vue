<template>
    <div class="box">
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        name:"right",
        data(){
            return {
                
            }
        }
    }
</script>
<style scoped>
.box{
    float:left;
    width: 75%;
}
</style>