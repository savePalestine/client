<template>
  <div class="body-background">
    <!-- <div v-if="gameState !== 'ready' " class="status">
      <p>Waiting for other player..</p>
    </div> -->
    <div class="">
      <img src="http://mediad.publicbroadcasting.net/p/khpr/files/styles/x_large/public/201712/1200px-Operation_Crossroads_Baker_Edit.jpg" v-if="gameState !== 'ready' " alt="" style="position:fixed; width:100%">
        <h1 style="color: white; position: fixed; margin: 25% 0 0 32%;" v-if="gameState !== 'ready'">Waiting Player 2</h1>
      <div class="container" >
        <div class="preloader-wrapper big active" v-if="gameState !== 'ready'" style="margin: 20% 0 0 45%;">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle">
              </div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="" style="margin: -10% 0 0 -9%; position:fixed;">
      <img src="http://4.bp.blogspot.com/-aplXFI9fzIs/U-O901KtK4I/AAAAAAAAAgI/8jf7Zeo0ouA/s1600/explosion_time_animate.gif" alt="" v-if='rocket.maju<=70'>
    </div>
    <div class="row">
      <div class="" v-if='winner != null' style="position:fixed; color:white; margin: 25% 0 0 25%; text-align:center;">
        <h1>The winner is {{ winner }}</h1>
        <a class="btn waves-effect waves-light" @click='replay'>Play again!</a>
      </div>
      <div class="col s3" v-if="gameState == 'ready'">
        <h5 style="color:white; margin: 5% 0 0 5%; position: fixed; background-color:##2E1045;"> <b> {{ player1Name }}</b></h5>
        <h5 style="color:white; margin: 5% 0 0 82%; position: fixed; background-color:##2E1045;"> <b> {{ player2Name }}</b></h5>
        <img src="http://icons.iconarchive.com/icons/wikipedia/flags/256/ID-Indonesia-Flag-icon.png" alt="" style="width:5%; position:fixed; margin: 8% 0 0 7.5%;">
        <img src="https://vignette.wikia.nocookie.net/spacemonsters/images/8/85/PNGPIX-COM-Earth-Planet-Globe-World-Transparent-PNG-Image.png/revision/latest?cb=20171217074041&path-prefix=id" alt="" style="margin: 50% 0 0 10%;">
      </div>
      <div class="track" style="padding-top:0%; position:fixed;" v-if="gameState == 'ready'">

        <img class="roket" src="https://image.flaticon.com/icons/png/128/214/214337.png" alt="" v-bind:style=" { margin: rocket.position + 'px' }"/>
      </div>
      <div class="col s3" v-if="gameState == 'ready'">

        <img src="http://icons.iconarchive.com/icons/wikipedia/flags/256/IL-Israel-Flag-icon.png" alt="" style="width:5%; position:fixed; margin: 8.3% 0 0 61%;">
        <img src="https://vignette.wikia.nocookie.net/spacemonsters/images/8/85/PNGPIX-COM-Earth-Planet-Globe-World-Transparent-PNG-Image.png/revision/latest?cb=20171217074041&path-prefix=id" alt="" style="margin: 53% 0 0 240%;">
      </div>
      <div class="" style="margin: 0 0 0 70%; position:fixed;">
        <img src="http://4.bp.blogspot.com/-aplXFI9fzIs/U-O901KtK4I/AAAAAAAAAgI/8jf7Zeo0ouA/s1600/explosion_time_animate.gif" alt="" v-if='rocket.maju>=1060'>
      </div>
      <div class="" style="margin: 0 0 0 0%; position:fixed;">
        <img src="https://media1.tenor.com/images/aa90cd270b06bdac59a4c0de470460fd/tenor.gif" alt="" v-if='rocket.maju>=850' style="margin: 30% 0 0 95%; width:70%;">
        <img src="https://media1.tenor.com/images/50060464d856f3c026ccbcec59228c99/tenor.gif?itemid=5698182" alt="" v-if='rocket.maju <= 70' style="margin: 30% 0 0 95%; width:70%;">
        <img src="https://media1.giphy.com/media/HUkOv6BNWc1HO/giphy.gif" alt="" v-if='rocket.maju < 300 && rocket.maju != 70 && rocket.maju != 60' style="width:200px; margin:10% 0 0 20%">
      </div>
    </div>
    <div class="" v-if="player != ''">
      <a class="btn red" v-if='buttonActive == true && player == "Player1"' @click='maju' style="margin: 0 0 0 6%;">Player 1</a>
      <a class="btn" style="margin: 0 0 0 85%;" v-if='buttonActive == true && player == "Player2"' @click='mundur'>Player 2</a>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import { roomdatabase } from '../firebase.js'

export default {
  data () {
    return {
      rocket: {
        maju: 550,
        position: '0 0 0 550'
      },
      scoreVal: 550,
      status: localStorage.getItem('player'),
      buttonActive: true,
      winner: null,
      player: ''
    }
  },
  created () {
    let self = this
    var getRoomName = localStorage.getItem('roomname')
    console.log(this.rocket)

  },
  mounted(){
  },
  computed: {
    ...mapState([
      'playerName',
      'statusGame'
    ]),
    gameState () {
      this.player = this.$store.state.statusGame
      return this.$store.state.gameState
    },
    player1Name () {
      return this.$store.state.player1
    },
    player2Name () {
      return this.$store.state.player2
    }
  },
  methods: {
    ...mapActions([

    ]),
    // maju () {
    //   this.rocket.maju += 10
    //   let position = '0 0 0 '+this.rocket.maju
    //   this.rocket.position = position
    // },
    // mundur () {
    //   this.rocket.maju -= 10
    //   let position = '0 0 0 '+this.rocket.maju
    //   this.rocket.position = position
    // },
    maju () {
      if (this.rocket.maju <= 1060) {
        var self = this
        var getRoomName = localStorage.getItem('roomname')
        roomdatabase(getRoomName).once('value', function (snapshot) {
          let object = snapshot.val()
          self.rocket.maju = snapshot.val().value
          var array = ['0 0 0', self.rocket.maju]
          var joinn = array.join(' ')
          self.rocket.position = joinn
          object.value += 10
          roomdatabase(getRoomName).set(object)
          console.log('adsfadsf',joinn)
          
          roomdatabase(getRoomName).on('value',function(snapshot){
            self.rocket.maju = snapshot.val().value
            var array = ['0 0 0', self.rocket.maju]
            var joinn = array.join(' ')
            self.rocket.position = joinn
          })
        })
      } else {
        this.buttonActive = false
        this.winner = 'Player 1'
      }
    },
    mundur () {
      if (this.rocket.maju >= 70) {
        var self = this
        var getRoomName = localStorage.getItem('roomname')

        roomdatabase(getRoomName).once('value', function (snapshot) {
          let object = snapshot.val()
          self.rocket.maju = snapshot.val().value
          var array = ['0 0 0', self.rocket.maju]
          var joinn = array.join(' ')
          self.rocket.position = joinn
          object.value -= 10
          roomdatabase(getRoomName).set(object)
          console.log('adsfadsf',joinn)
          
          roomdatabase(getRoomName).on('value',function(snapshot){
            self.rocket.maju = snapshot.val().value
            var array = ['0 0 0', self.rocket.maju]
            var joinn = array.join(' ')
            self.rocket.position = joinn
          })
        })
      } else {
        this.buttonActive = false
        this.winner = 'Player 2'
      }
    },
    replay () {
      this.rocket.position = '0 0 0 550'
      this.winner = null
      this.rocket.maju = 550
      this.buttonActive = true
      this.$store.dispatch('exit')
      this.$router.push('/')
      localStorage.clear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.status{
  color: white;
  font-size: 20px;
  margin-left: 40px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ffffff;
}

.body-background{
  text-align: left;
  background-image: url('https://images.unsplash.com/photo-1502679726485-931beda67f88?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de463bf685e4e3df80b0957fd4a2fa1c&auto=format&fit=crop&w=1355&q=80');
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
}
.modal {
  overflow: hidden;
  width: 35%;
  height: 600px;
  margin-top: 0px;
  padding: 0 0 0 0;
}

element.style {
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 1%;
}
.roket {
  margin-top: 100%;
  transform: rotate(45deg);
}
.track {
  margin: 14% 0 0 0;
}
</style>
