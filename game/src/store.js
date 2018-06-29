import Vue from 'vue'
import Vuex from 'vuex'
import { roomdatabase } from './firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomdatabase,
    checkroom: '',
    playerName: '',
    roomName: '',
    statusGame: '',
    gameState: '',
    currentValue: '',
    player1: '',
    player2: ''
  },
  mutations: {
    checkData (state, roomList) {
      state.checkroom = roomList
      console.log(state.checkroom)
    },
    stateGameName (state, playerName) {
      state.playerName = playerName
    },
    roomGameName (state, roomName) {
      state.roomName = roomName
    },
    status (state, status) {
      console.log(status)
      state.statusGame = status
    },
    nowGameState (state, status) {
      state.gameState = status
    },
    changeCurrentValue (state, payload) {
      state.currentValue = payload
    },
    changePlayer1Name  (state, payload) {
      state.player1 = payload
    },
    changePlayer2Name  (state, payload) {
      state.player2 = payload
    }
  },
  actions: {
    checkLobby ({commit}, newPlayerName) {
      roomdatabase().once('value')
        .then(snapshot => {
          let allLobby = snapshot.val()
          let LobbyFound = false
          for (let i in allLobby) {
            if (!allLobby[i].Player2) {
              roomdatabase(i).set({Player1: {Name: allLobby[i].Player1.Name}, Player2: {Name: newPlayerName}, gameState: 'ready', value: 550})
              LobbyFound = true
              roomdatabase(i).on('value', function (snapshot) {
                commit('changePlayer1Name', snapshot.val().Player1.Name)
                commit('changePlayer2Name', snapshot.val().Player2.Name)
                console.log(snapshot.val().Player1)
                console.log(snapshot.val().Player2)
                commit('changeCurrentValue', 550)
                localStorage.setItem('roomname', i)
                localStorage.setItem('player', 'player2')
                commit('roomGameName', i)
                commit('nowGameState', snapshot.val().gameState)
              })

              commit('stateGameName', newPlayerName)

              commit('nowGameState', 'ready')
              commit('status', 'Player2')
              console.log('masuk sini')
            }
          }
          if (!LobbyFound) {
            console.log('hi')
            let timestamp = new Date()
            timestamp = timestamp.getTime()
            commit('stateGameName', newPlayerName)
            commit('roomGameName', timestamp)
            localStorage.setItem('roomname', timestamp)
            localStorage.setItem('player', 'player1')
            commit('status', 'Player1')
            roomdatabase(timestamp).set({Player1: {
              Name: newPlayerName
            },
            gameState: 'not ready'})
            roomdatabase(timestamp).on('value', function (snapshot) {
              commit('nowGameState', snapshot.val().gameState)
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateValueAdd () {
      var getRoomName = localStorage.getItem('roomname')
      console.log(getRoomName)
      var changeval = this.currentValue += 10
      roomdatabase(getRoomName).on('value', function (snapshot) {
        commit('changeCurrentValue', changeval)
        this.currentValue = snapshot.val().value
        snapshot.val().value
        // console.log("snapshot update val ",snapshot.val().value)
      })

      roomdatabase(getRoomName).set({

      })
    },
    updateValueReduce () {
      var getRoomName = localStorage.getItem('roomname')
      console.log(getRoomName)
      roomdatabase(getRoomName).on('value', function (snapshot) {
        this.currentValue = snapshot.val().value
        console.log('snapshot update val ', snapshot.val().value)
        var allVal = snapshot.val().value
      })

      this.currentValue -= 10
    },
    replayGame () {
      var getRoomName = localStorage.getItem('roomname')
      console.log(getRoomName)
      roomdatabase(getRoomName).on('value', function (snapshot) {
        this.currentValue = snapshot.val().value
        console.log('snapshot update val ', snapshot.val().value)
        var allVal = snapshot.val().value
      })

      this.currentValue = 550
    }
  }
})
