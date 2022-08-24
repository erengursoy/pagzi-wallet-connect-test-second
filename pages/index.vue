<template>
  <div>
   <app-header></app-header>

      <api :isSelect="true" :selectClass="'border border-blue-400'" :tableClass="'divide-gray-200'" :inputClass="'border pt-10'" :endpoint="endpoint">



      </api>


    <app-main></app-main>

    <app-footer></app-footer>


  </div>
</template>

<script>
import api from "../components/api.vue";





export default {
  components: { api },
  name: "IndexPage",
  data(){
    return{
      total:'',
      endpoint: "https://deadtown.mvhq.art/internal-meta/",
    }
  },




}
</script>
