<template>
    <div>
        <input type="text" v-model="hahahahaha">
        <button @click="methodbaru()">tes</button>
        <button v-if="gameState === 'ready'">lol</button>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      hahahahaha: ''
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'checkLobby'
    ]),
    methodbaru: function () {
      this.$store.dispatch('checkLobby', this.hahahahaha)
      console.log(this.statusGame)
      console.log(this.roomName)
      console.log(this.playerName)
      console.log(this.gameState)
    }
  },
  computed: {
    ...mapState([
      'playerName',
      'roomName',
      'statusGame',
      'gameState'
    ])
  }
}
</script>
<style lang="scss" scoped>

</style>
