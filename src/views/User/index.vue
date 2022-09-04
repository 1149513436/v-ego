<template>
   <div class="">
<h2>用户中心</h2>
<el-button @click="openpdf">打印合同</el-button>

<Vuepdf ref="mypdf"/>
   </div>
</template>

<script>
import Vuepdf from './vuepdf.vue'

export default {
  name: 'UserS',
  data () {
    return {}
  },
  components: { Vuepdf},
  methods:{
    openpdf(){
      this.$refs.mypdf.dialogVisible=true
    }
  }
}
</script>

<style>
</style>
