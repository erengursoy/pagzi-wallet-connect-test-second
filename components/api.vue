
<template>
  <div>
    <slot name="header"> </slot>
    <div class="inline-block relative w-64 py-20">
      <select
        :class="selectClass"
        v-if="isSelect"
        @change="onChange($event)"
        v-model="metaValue"
        class="
          block
          appearance-none
          w-full
          bg-white
          border border-gray-400
          hover:border-gray-500
          px-4
          py-2
          pr-8
          rounded
          shadow
          leading-tight
          focus:outline-none focus:shadow-outline
        "
      >
        <option v-for="(optionItem, optionKey) in options" :key="optionKey">
          {{ optionItem.option }}
        </option>
      </select>
      <input  :class="inputClass" v-model="metaValue" type="text" v-else>
      <div
        v-if="isSelect"
        class="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          flex
          items-center
          px-2
          text-gray-700
        "
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>

    </div>
    <div v-if="loading" class="text-center"><h1>yükleniyor...</h1></div>
    <div v-if="error.situation" class="text-center"><h1>{{error.text}}</h1></div>

    <div class="overflow-x-auto" v-if="isReady">
      <table :class="tableClass" class="min-w-full text-sm divide-y-2 divide-gray-200">
        <thead>
        <tr >
          <th
            class="
                px-4
                py-2
                font-medium
                text-left text-gray-900
                whitespace-nowrap
              "
          >
            İD
          </th>
          <th
            class="
                px-4
                py-2
                font-medium
                text-left text-gray-900
                whitespace-nowrap
              "
          >
             Name
          </th>
          <th
            class="
                px-4
                py-2
                font-medium
                text-left text-gray-900
                whitespace-nowrap
                text-center
              "
          >
            İmage
          </th>
          <th
            class="
                px-4
                py-2
                font-medium
                text-left text-gray-900
                whitespace-nowrap
              "
          >
            Background Value
          </th>
        </tr>
        </thead>

        <tbody  class="divide-y divide-gray-200">
        <tr>
          <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
            {{ items.token_id }}
          </td>
          <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
            {{ items.name }}
          </td>

          <td class="px-4 py-2 text-gray-700 whitespace-nowrap w-32">
            <img :src="items.image" alt="">
          </td>

          <td v-for="eren in items.attributes" :key="eren" v-show="eren.trait_type === 'Background'" class="px-4 py-2 text-gray-700 whitespace-nowrap">
            {{ eren.value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <slot name="footer"> </slot>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  props:{
    tableClass:'',
    selectClass:'',
    inputClass:'',
    endpoint: null,
    isSelect: {
      default: true
    }
  },
  data: function () {
    return {
      loading:false,
      error:[
        {

          situation:false,
          text:'',
        }


      ],
      items: [],
      metaValue: null,
      options: [
        {
          option: 1,
        },
        {
          option: 2,
        },
        {
          option: 3,
        },
        {
          option: 4,
        },
        {
          option: 5,
        },
        {
          option: 6,
        },
        {
          option: 7,
        },
        {
          option: 8,
        },
        {
          option: 9,
        },
        {
          option: 10,
        },
        {
          option: 11,
        },
        {
          option: 12,
        },
        {
          option: 13,
        },
        {
          option: 14,
        },
        {
          option: 15,
        },
      ],
      isReady: false,
    };
  },
  created() {
    console.log(this.endpoint)
  },

  methods: {
    onChange(event) {
      console.log('onchange',event)
      this.fetchData(this.metaValue)
    },
    fetchData(value) {
      this.error.situation = false
      this.isReady = false;
      this.loading=true
      axios.get(this.endpoint + value)
        .then((res) => {
          console.log(res.data)
          this.items = res.data;
          this.isReady = true
          this.loading=false
          this.error.situation=false
        })

        .catch((error) => {
          console.log(error.response.data.message || error.message);

          this.loading=false;
          this.error.text=error
          this.error.situation=true
          this.isReady = false
        });
    }
  },
  watch: {
    metaValue(value){
      if (value) {
        this.fetchData(value)
      }
    }
  }
};
</script>
<style lang='scss'>

</style>
