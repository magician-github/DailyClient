<template>
  <div class="container">
    <FooterCom></FooterCom>
    <router-view></router-view>
  </div>
</template>

<script>
import FooterCom from './Footer'
export default {
    components:{
        FooterCom
    },
    created(){
    }
};
</script>

<style scoped>
  .container{
    width:100%;
    height:100%;
  }
</style>
