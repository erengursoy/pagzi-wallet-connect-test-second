



<template>
<section :class="walletConnection.address == null ? 'bg-gray-900' : 'bg-gray-400'" class="text-white">
  <div class="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        Understand User Flow.

        <span class="sm:block">
          Increase Conversion.
        </span>
      </h1>

      <p class="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
      </p>

      <div class="flex flex-wrap justify-center gap-4 mt-8">

        <div v-if="walletConnection.connectionStatus === 'falseNetwork'" class="connet-wallet bronto   xl:pr-10 lg:pr-5 pr-1 text-center">
          <p class="xl:text-2xl lg:text-xl xs:text-base text-sm">{{ walletConnection.connectionMessage }}</p>
        </div>
        <div class="connet-wallet bronto flex justify-center  xl:pr-10 lg:pr-5 pr-1 text-center" v-else-if="walletConnection.connectionStatus !== 'falseNetwork' && walletConnection.address !== null">
          <button type="button" class=" w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring">Connected Wallet</button>
          <p  class="w-full px-12 py-3 text-sm font-medium text-white  rounded sm:w-auto hover:bg-blue-600 active:bg-blue-500 focus:outline-none focus:ring">
            {{ showShortAddress(walletConnection.address) }}
          </p>
        </div>
        <div v-else class=" flex justify-center">
          <button  @click.prevent="connectWallet()" type="button" class="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring">Connect Wallet</button>

        </div>

        <a v-show=" walletConnection.address == null" class="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded sm:w-auto hover:bg-blue-600 active:bg-blue-500 focus:outline-none focus:ring" href="/about">
          Learn More
        </a>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap justify-center gap-4 mt-8 cursor-pointer my-16">
    <a @click="getTotal()" v-show=" walletConnection.address !== null" class="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring" >

      Show Contents
    </a>
  </div>

  <table  class="min-w-full text-sm divide-y-2 divide-gray-200">

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
        Name
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
        Symbol
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
        Base Url
      </th>
      <th
        @click="getTotal()"
        class="
                px-4
                py-2
                font-medium
                text-left text-gray-900
                whitespace-nowrap
              "
      >
       Total
      </th>
    </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
    <tr>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        {{ name }}
      </td>
      <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
        {{ symbol }}
      </td>
      <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
        {{ baseUrl }}
      </td>
      <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
        {{ total }}
      </td>
    </tr>
    </tbody>
  </table>
</section>
</template>


<script>


import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {mapGetters} from 'vuex'


export default {


  data(){
    return{
      name:'',
      symbol:'',
      baseUrl:'',
      total:'',
      endpoint: "https://deadtown.mvhq.art/internal-meta/",
    }
  },



  mounted() {
    const self = this;



    this.$nextTick(function () {




      // window.addEventListener("scroll", function () {
      //   const nav = document.querySelector('nav')
      //   if (document.documentElement.scrollTop >= 30) {
      //     nav.style.backgroundColor = '#e5e3e3'
      //   } else {
      //     nav.style.backgroundColor = 'transparent'
      //   }
      // });

    })
  },
  computed: mapGetters({
    walletConnection: 'wallet/walletConnection',
  }),
  methods: {
    showShortAddress(address) {
      if(address === null) return
      return address.slice(0, 5) + "..." + address.slice(-4);
    },
    getTotal(){
      const self=this;
      self.walletConnection.nftMethods.name().call()

        .then(res => {self.name=res;})

      self.walletConnection.nftMethods.symbol().call()

        .then(res => {self.symbol=res;});
      self.walletConnection.nftMethods.baseURI().call()

        .then(res => {self.baseUrl=res;});
      self.walletConnection.nftMethods.totalSupply().call()

        .then(res => {self.total=res;});



    },
    async connectWallet() {
      const self = this;
      try {
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: process.env.INFURA_ID
            }
          },
        };
        const web3Modal = new Web3Modal({
          network: process.env.NETWORK_SLUG, // optional
          cacheProvider: true, // optional
          disableInjectedProvider: false,
          providerOptions // required
        });
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const acc = await web3.eth.getAccounts();
        if (acc.length > 0) {
          const chainId = await web3.eth.getChainId();
          if (chainId !== parseInt(process.env.NETWORK_CHAINID)) {
            const storeObj = {
              connectionReady: true,
              isConnected: true,
              connectionStatus: 'falseNetwork',
              connectionMessage: 'please switch to ' + process.env.NETWORK_NAME,
              statusInfo: {
                networkToBind: process.env.NETWORK_NAME
              },
              address: acc[0],
            }
            await self.$store.dispatch('wallet/setConnection', storeObj)
          } else {
            self.$axios({method: 'get', url: process.env.CONTRACT_JSONURL, baseURL: '/'})
              .then(async (res) => {
                const nftAbi = res.data.abi
                const nft = new web3.eth.Contract(nftAbi, process.env.CONTRACT_ADDRESS);
                const address = acc[0]
                const storeObj = {
                  connectionReady: true,
                  isConnected: true,
                  connectionStatus: 'connected',
                  connectionMessage: 'Successfully connected to ' + address,
                  statusInfo: {},
                  address: acc[0],
                  contractAddress: process.env.CONTRACT_ADDRESS,
                  etherScan: process.env.ETHERSCAN,
                  nftMethods: nft.methods
                }
                self.$axios.defaults.headers.common['X-Wallet'] = address;
                await self.$store.dispatch('wallet/setConnection', storeObj)
                self.$forceUpdate()
              })
          }
          self.isConnected = true;
          self.$forceUpdate()
          // chainId
          // process..env.DEV_NETWORK_CHAINID
        }
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
          // console.log(accounts);
          if (accounts.length > 0) localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
          window.location.reload()
        });
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
          // console.log(chainId);
          window.location.reload()
        });
        // Subscribe to provider connection
        provider.on("connect", (info) => {
          // console.log(info);
          window.location.reload()
        });
        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
          localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
          window.location.reload()
          // console.log(error);
        });
      } catch (e) {
        console.log('error', e)
      }
    },
  }
}
</script>
