<template>
  <header :class="walletConnection.address == null ? 'bg-gray-50' : 'bg-gray-300'" class="">
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
      <div class="sm:justify-between sm:items-center sm:flex">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, Barry!
          </h1>

          <p class="mt-1.5 text-sm text-gray-500">
            Let's write a new blog post! 🎉
          </p>
        </div>

        <div class="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
          <button

            class="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition bg-white border border-gray-200 rounded-lg hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
          >
            <span class="text-sm font-medium"> View Website </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 ml-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>

          <button
            class="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>


import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {mapGetters} from 'vuex'


export default {


  data(){
    return{
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
      self.walletConnection.nftMethods.totalSupply().call()

        .then(res => {self.total=res;})


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
