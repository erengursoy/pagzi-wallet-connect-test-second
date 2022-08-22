import {timeStampToDate, getTimeRemaining} from './helper'

export const state = () => ({
  walletConnection: {
    connectionReady: false,
    isConnected: false,
    connectionStatus: 'not_connected',
    connectAddress: '',
    connectedTooltip: '',
    connectedWallet: null,
    connectionInfo: {
      address: null
    },
    // connectionMessage: null,
    // statusInfo: null,,
    address: null,
    // contractAddress: null,
    // etherScan: null,
    // nftMethods: null
  },
  mintIsOpen: false,
  timer: {"total": 0, "days": 0, "hours": 0, "minutes": 0, "seconds": 0}
})

export const mutations = {
  SET_CONNECTION(state, payload) {
    state.walletConnection = payload;
  },
  SET_TIMER(state, payload) {
    state.timer = payload
  },
  SET_MINT_OPEN(state, payload) {
    state.mintIsOpen = payload
  }
}

export const getters = {
  walletConnection(state) {
    return state.walletConnection
  },
  isFalseNetwork(state) {
    return state.walletConnection.isConnected && state.walletConnection.connectionStatus === 'falseNetwork'
  },
  getTimer(state) {
    return state.timer
  },
  getMintIsOpen(state) {
    return state.mintIsOpen
  }
}

export const actions = {
  setConnection({commit}, payload) {
    commit('SET_CONNECTION', payload)
  },
  initTimer({commit}, payload) {
    const self = this;

    // original
    const deadlineNormalTimestamp = 1651795200;

    const deadlineNormal = timeStampToDate(deadlineNormalTimestamp);



    function clock(id, endtime) {

      const timerInterval = setInterval(async function () {
        const timeNormal = getTimeRemaining(deadlineNormal);

        let timerVal = timeNormal

        if (timeNormal.total <= 0) {
          commit('SET_MINT_OPEN', true)
          clearInterval(timerInterval);
        }

        commit('SET_TIMER', timerVal)

      }, 1000);
    }

    clock("js-clock", deadlineNormal);


  }
}
